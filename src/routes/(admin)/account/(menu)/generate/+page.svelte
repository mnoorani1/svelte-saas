<script lang="ts">
  import Replicate from "replicate"

  let isGenerating = false
  let output: string[] = []

  async function generateImage() {
    isGenerating = true

    try {
      const response = await fetch("/account/generate", {
        method: "POST",
      })
      const data = await response.json()

      if (data.success) {
        output = data.output
      }
    } catch (error) {
      console.error("Generation failed:", error)
    } finally {
      isGenerating = false
    }
  }
</script>

<div class="flex flex-col items-center gap-4 p-4">
  <button on:click={generateImage} disabled={isGenerating}>
    {isGenerating ? "Generating..." : "Generate Image"}
  </button>

  {#if output.length > 0}
    <div class="mt-4">
      {#each output as imageUrl}
        <img
          src={imageUrl}
          alt="Generated image"
          class="max-w-md rounded-lg shadow-lg"
        />
      {/each}
    </div>
  {/if}
</div>
