<script lang="ts">
  interface Props {
    product: {
      images: { src: string }[]
      title: string
    }
    onSelect: () => void
  }

  let { product, onSelect }: Props = $props()
</script>

<div class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
  <img
    src={product.images[0].src}
    alt={product.title}
    class="w-full h-64 object-cover mb-4 rounded-lg"
  />
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-semibold truncate flex-1">{product.title}</h3>
    <button
      class="btn btn-primary px-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
      onclick={onSelect}
    >
      Select
    </button>
  </div>
</div>
