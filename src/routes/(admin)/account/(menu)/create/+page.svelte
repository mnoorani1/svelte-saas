<script lang="ts">
  import { onMount } from "svelte"
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

    try {
      const response = await fetch(`https://${shopifyDomain}/products.json`)
      if (!response.ok) {
        throw new Error(
          "Failed to fetch products. Please check the domain name.",
        )
      }
      const data = await response.json()
      products = data.products.slice(0, 5)
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
  <title>Shopify Products</title>
  <meta name="description" content="Fetch and display Shopify products." />
</svelte:head>

<div class="py-8 lg:py-12 px-6 max-w-lg mx-auto">
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
      placeholder="your-shopify-domain.myshopify.com"
      class="border p-2 w-full mb-2"
    />
    <button type="submit" class="bg-blue-500 text-white p-2 w-full"
      >Show my products</button
    >
  </form>

  {#if error}
    <div class="text-red-500 mb-4">{error}</div>
  {/if}
  {#if products.length > 0}
    <div class="grid grid-cols-1 gap-4">
      {#each products as product}
        {#if product.images && product.images.length > 0}
          <div class="border p-4">
            <img
              src={product.images[0].src}
              alt={product.title}
              class="w-full h-auto mb-2"
            />
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>
