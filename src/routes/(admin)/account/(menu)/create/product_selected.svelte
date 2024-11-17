<script lang="ts">
  interface Props {
    product: {
      images: { src: string }[]
      title: string
    }
  }

  let { product }: Props = $props()
  let selectedImages = $state(
    new Set<string>(product.images.map((img) => img.src)),
  )

  function toggleImage(src: string) {
    if (selectedImages.has(src)) {
      selectedImages.delete(src)
    } else {
      selectedImages.add(src)
    }
  }
</script>

<div class="p-4">
  <h2 class="text-2xl font-bold mb-4">{product.title}</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {#each product.images as image}
      <label class="border p-2 rounded cursor-pointer relative block">
        <input
          type="checkbox"
          class="absolute top-4 right-4 w-8 h-8"
          checked={selectedImages.has(image.src)}
          onchange={() => toggleImage(image.src)}
        />
        <img src={image.src} alt={product.title} class="w-full h-auto" />
      </label>
    {/each}
  </div>
  <form method="post" action="?/createModel">
    <div class="mt-4">
      <input
        type="hidden"
        name="selectedImages"
        value={JSON.stringify([...selectedImages])}
      />
      <button class="btn btn-primary" type="submit">Add to post</button>
    </div>
  </form>
</div>

<!-- Only select the images which clearly show the product as you want to show in your social media post -->
