<script lang="ts">
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"
  import DisplayProducts from "./display_products.svelte"
  import ProductSelected from "./product_selected.svelte"

  let selectedProduct: {
    title: string
    images: { src: string }[]
  } | null = $state(null)

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("create")

  let shopifyDomain = $state("")
  let products: {
    title: string
    images: { src: string }[]
  }[] = $state([])
  let error = $state("")

  async function fetchProducts() {
    error = ""
    products = []
    selectedProduct = null
    if (!shopifyDomain) {
      error = "Please enter a Shopify domain name."
      return
    }

    // Sanitize and normalize the domain
    shopifyDomain = shopifyDomain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//i, "") // Remove protocol
      .replace(/\/+$/, "") // Remove trailing slashes
      .replace(/[^a-z0-9.-]/g, "") // Remove special chars except dots and hyphens

    try {
      const response = await fetch(`https://${shopifyDomain}/products.json`)
      if (!response.ok) {
        throw new Error(
          "Failed to fetch products. Please check the domain name.",
        )
      }
      const data = await response.json()
      products = data.products.slice(0, 6)
    } catch (err) {
      if (err instanceof Error) {
        error = err.message
      } else {
        error = "An unknown error occurred."
      }
    }
  }
</script>

<svelte:head>
  <title>Create</title>
  <meta name="description" content="Fetch and display Shopify products." />
</svelte:head>

<h1 class="text-2xl font-bold mb-6">Get Shopify products</h1>

<div class="text-3xl lg:text-5xl font-medium text-primary text-center">
  Shopify Products
</div>
<div class="text-lg text-center mb-4">
  Enter your Shopify domain to see your products.
</div>

<form onsubmit={fetchProducts} class="mb-4">
  <input
    type="text"
    bind:value={shopifyDomain}
    placeholder="Your Shopify domain"
    class="border p-2 w-full mb-2"
  />
  <button type="submit" class="btn btn-primary">Show my products</button>
</form>

{#if error}
  <div class="text-red-500 mb-4">{error}</div>
{/if}
{#if selectedProduct}
  <ProductSelected product={selectedProduct} />
{:else}
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    {#each products.slice(0, 20) as product}
      {#if product.images && product.images.length > 0}
        <DisplayProducts
          {product}
          onSelect={() => (selectedProduct = product)}
        />
      {/if}
    {/each}
  </div>
{/if}
