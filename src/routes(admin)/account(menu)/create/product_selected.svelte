<script lang="ts">
  interface Props {
    product: {
      images: { src: string }[]
      title: string
    }
  }

  let { product }: Props = $props()

  function setupCanvas(img: HTMLImageElement, canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas size to match displayed image size
    const rect = img.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Draw initial image on canvas
    context.drawImage(img, 0, 0, canvas.width, canvas.height)

    let isDrawing = false

    // Drawing settings
    context.strokeStyle = "white"
    context.lineWidth = 20
    context.lineCap = "round"

    function startDrawing(e: MouseEvent) {
      isDrawing = true
      draw(e)
    }

    function stopDrawing() {
      isDrawing = false
      context?.beginPath()
    }

    function draw(e: MouseEvent) {
      if (!isDrawing) return

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY

      context?.lineTo(x, y)
      context?.stroke()
      context?.beginPath()
      context?.moveTo(x, y)
    }

    canvas.addEventListener("mousedown", startDrawing)
    canvas.addEventListener("mousemove", draw)
    canvas.addEventListener("mouseup", stopDrawing)
    canvas.addEventListener("mouseout", stopDrawing)
  }
</script>

<div class="p-4">
  <h2 class="text-2xl font-bold mb-4">{product.title}</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {#each product.images as image}
      <div class="border p-2 rounded relative">
        <img
          src={image.src}
          alt={product.title}
          class="w-full h-auto"
          onload={(e) => {
            if (e.target instanceof HTMLImageElement) {
              const img = e.target
              const canvas = img.nextElementSibling as HTMLCanvasElement
              setupCanvas(img, canvas)
            }
          }}
        />
        <canvas class="absolute inset-0 w-full h-full"></canvas>
      </div>
    {/each}
  </div>
</div>
