<script lang="ts">
  import {
    WebsiteName,
    WebsiteBaseUrl,
    WebsiteDescription,
  } from "./../../config"

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: WebsiteName,
    url: WebsiteBaseUrl,
  }

  const jsonldScript = `<script type="application/ld+json">${JSON.stringify(ldJson) + "<"}/script>`

  // Image carousel data
  const showcaseImages = [
    {
      title: "City Floral Look",
      description: "Effortlessly chic fashion photography",
      src: "/images/custom_img_samples/img1.jpg",
    },
    {
      title: "Hoodie Street Style",
      description: "Consistent brand imagery for everyday style",
      src: "/images/custom_img_samples/img2.jpg",
    },
    // Add more showcase images
  ]

  // Pricing tiers
  const pricingTiers = [
    {
      name: "Pro",
      price: 9.99,
      oneTimePrice: 14.99,
      credits: 100,
      models: 5,
      features: ["feature1", "feature2", "feature3", "feature4", "feature5"],
    },
    // Add other tiers
  ]
</script>

<svelte:head>
  <title>{WebsiteName}</title>
  <meta name="description" content={WebsiteDescription} />
  {@html jsonldScript}
</svelte:head>

<!-- Hero Section -->
<section id="home" class="relative min-h-screen">
  <div class="container mx-auto px-4 pt-32">
    <div class="text-center">
      <h1 class="text-5xl md:text-7xl font-bold mb-6">
        Turn your bland product photos into <span class="text-primary"
          >magic</span
        >
      </h1>
      <p class="text-xl mb-8">
        Skip costly photoshoots — generate high-quality realistic images with
        AI.
      </p>
      <div class="flex justify-center gap-4">
        <a href="/train-model" class="btn btn-primary btn-lg"> Get started </a>
      </div>
    </div>

    <!-- Image Showcase Carousel -->
  </div>
</section>

<!-- How it Works Section -->
<section class="py-24 bg-base-200">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold">
        Create stunning photos in three simple steps
      </h2>
      <p class="text-xl mt-4">
        Turn Your Basic Product Photos Into Stunning Marketing Images
      </p>
    </div>
    <!-- Add steps content -->
  </div>
</section>

<!-- Pricing Section -->
<section id="pricing" class="py-24">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold">Pricing</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {#each pricingTiers as tier}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="text-2xl font-bold">{tier.name}</h3>
            <div class="text-3xl font-bold mt-4">${tier.price}/month</div>
            <p class="text-base-content/60">
              <span class="line-through">${tier.oneTimePrice}</span> if purchased
              one-time
            </p>
            <ul class="mt-6 space-y-4">
              {#each tier.features as feature}
                <li class="flex items-center gap-2">
                  <span class="text-success">✓</span>
                  {feature}
                </li>
              {/each}
            </ul>
            <button class="btn btn-primary mt-6">Get the plan</button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
