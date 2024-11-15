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
    class="w-full h-48 object-cover mb-3 rounded"
  />
  <h3 class="text-lg font-semibold mb-2 truncate">{product.title}</h3>
  <button class="btn w-20 rounded-full" onclick={onSelect}>
    Select Product
  </button>
</div>
