<script lang="ts">
  import { sortedBlogPosts, blogInfo } from "./posts"

  let apiResult = "Loading..."
  let error = ""

  async function makeApiCall() {
    try {
      const response = await fetch("/blog/api/replicate", {
        method: "POST",
      })
      const data = await response.json()
      apiResult = JSON.stringify(data, null, 2)
    } catch (e) {
      error = e instanceof Error ? e.message : String(e)
    }
  }
</script>

<svelte:head>
  <title>{blogInfo.name}</title>
  <meta name="description" content="Our blog posts." />
</svelte:head>

<div class="py-8 lg:py-12 px-6 max-w-lg mx-auto">
  <div
    class="text-3xl lg:text-5xl font-medium text-primary flex gap-3 items-baseline text-center place-content-center"
  >
    <div
      class="text-center leading-relaxed font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
    >
      {blogInfo.name}
    </div>
    <a href="/blog/rss.xml" target="_blank" rel="noreferrer">
      <img
        class="flex-none w-5 h-5 object-contain"
        src="/images/rss.svg"
        alt="rss feed"
      />
    </a>
  </div>
  <div class="text-lg text-center">A demo blog with sample content.</div>

  {#each sortedBlogPosts as post}
    <a href={post.link}>
      <div class="card my-6 bg-white shadow-xl flex-row overflow-hidden">
        <div class="flex-none w-6 md:w-32 bg-secondary"></div>
        <div class="py-6 px-6">
          <div class="text-xl">{post.title}</div>
          <div class="text-sm text-accent">
            {post.parsedDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div class="text-slate-500">{post.description}</div>
        </div>
      </div>
    </a>
  {/each}

  <div class="my-8 p-4 bg-gray-100 rounded">
    <button class="btn mb-4" on:click={makeApiCall}>Test API</button>
    <h2 class="text-xl mb-4">API Test Result:</h2>
    {#if error}
      <div class="text-red-500">Error: {error}</div>
    {:else}
      <pre class="whitespace-pre-wrap">{apiResult}</pre>
    {/if}
  </div>
</div>
