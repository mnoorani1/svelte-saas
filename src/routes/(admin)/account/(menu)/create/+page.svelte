<script lang="ts">
  import { getContext } from "svelte"
  import type { Writable } from "svelte/store"

  let adminSection: Writable<string> = getContext("adminSection")
  adminSection.set("create")

  let shopifyDomain = ""
  let products: {
    title: string
    created_at: string
    images: { src: string }[]
    body_html: string
  }[] = []
  let error = ""

  async function fetchProducts() {
    error = ""
    products = []
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
      console.log(products.length)
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

<form on:submit|preventDefault={fetchProducts} class="mb-4">
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
{#if products.length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each products.slice(0, 20) as product}
      {#if product.images && product.images.length > 0}
        <div
          class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <img
            src={product.images[0].src}
            alt={product.title}
            class="w-full h-48 object-cover mb-3 rounded"
          />
          <h3 class="text-lg font-semibold mb-2 truncate">{product.title}</h3>
          <button
            class="btn w-20 rounded-full"
            on:click={() => console.log("Product selected:", product)}
          >
            Select Product
          </button>
        </div>
      {/if}
    {/each}
  </div>
{/if}
