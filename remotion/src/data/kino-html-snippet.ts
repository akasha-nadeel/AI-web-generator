/**
 * HTML snippet shown streaming in Beat 2's code editor pane.
 * Hand-written to be visually compelling: real Tailwind, recognizable
 * structure, balanced line lengths so it reads at 14-16px on screen.
 */
export const KINO_HTML_SNIPPET = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Kino — Stream Cinema</title>
    <link href="https://cdn.tailwindcss.com" rel="stylesheet" />
  </head>
  <body class="bg-[#0E0E0E] text-white font-sans">
    <header class="flex justify-between p-12">
      <span class="font-bold text-2xl tracking-wide">
        KINO<span class="text-[#E63838]">.</span>
      </span>
      <nav class="flex gap-8 text-sm opacity-80">
        <a>Movies</a><a>Series</a><a>Top 10</a>
      </nav>
    </header>

    <section class="relative h-[800px] px-20 flex flex-col justify-end">
      <p class="text-[#E63838] tracking-[0.2em] mb-4">
        NOW STREAMING
      </p>
      <h1 class="font-display text-[160px] leading-[0.9]
                 uppercase tracking-tight">
        The Last <br />
        <span class="text-[#E63838]">Frontier</span>
      </h1>
      <button class="mt-8 bg-[#E63838] px-9 py-4
                     rounded-full font-semibold">
        ▶ Watch Now
      </button>
    </section>

    <section class="px-20 py-16">
      <h2 class="text-3xl font-bold uppercase mb-8">
        Top Trending
      </h2>
      <div class="grid grid-cols-5 gap-8">
        <!-- 5 trending posters with outline-stroke numbers -->
      </div>
    </section>

    <section class="px-20 py-16">
      <h2 class="text-3xl font-bold uppercase mb-8">
        By Genre
      </h2>
      <div class="grid grid-cols-4 gap-6">
        <div class="bg-[#E63838] aspect-square rounded-2xl p-8">
          Action
        </div>
        <div class="bg-[#7A3FFF] aspect-square rounded-2xl p-8">
          Sci-Fi
        </div>
        <div class="bg-[#0E9694] aspect-square rounded-2xl p-8">
          Drama
        </div>
        <div class="bg-[#FF8A1F] aspect-square rounded-2xl p-8">
          Thriller
        </div>
      </div>
    </section>
  </body>
</html>`;
