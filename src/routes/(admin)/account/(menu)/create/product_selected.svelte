<script lang="ts">
  interface Props {
    product: {
      images: { src: string }[]
      title: string
    }
  }

  let { product }: Props = $props()
</script>

<div class="p-4">
  <h2 class="text-2xl font-bold mb-4">{product.title}</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {#each product.images as image}
      <div class="border p-2 rounded">
        <img src={image.src} alt={product.title} class="w-full h-auto" />
      </div>
    {/each}
  </div>
</div>
