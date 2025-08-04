const container = document.getElementById("anime-container");

let currentPage = 1;
let isLoading = false;

async function fetchTopAnime(page) {
  isLoading = true;

  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    const result = await response.json();

    if (!result.data || result.data.length === 0) {
      window.removeEventListener("scroll", handleScroll); // Hentikan jika data habis
      return;
    }

    result.data.forEach((anime, index) => {
      const card = document.createElement("div");
      card.className = "anime-card";

      const rank = (page - 1) * 25 + index + 1;

      card.innerHTML = `
        <span class="rank">Rank #${rank}</span>
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Gagal memuat data:", error);
  }

  isLoading = false;
}

function handleScroll() {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    !isLoading
  ) {
    currentPage++;
    fetchTopAnime(currentPage);
  }
}

window.addEventListener("scroll", handleScroll);

// Load halaman pertama saat awal
fetchTopAnime(currentPage);