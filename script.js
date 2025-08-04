const container = document.getElementById("anime-container");
let currentPage = 1;
let isLoading = false;

async function fetchTopAnime(page) {
  isLoading = true;
  showLoading(true);

  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    const result = await response.json();

    if (!result.data || result.data.length === 0) {
      window.removeEventListener("scroll", handleScroll);
      showLoading(false);
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
    console.error("Fetch error:", error);
  }

  showLoading(false);
  isLoading = false;
}

function handleScroll() {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (nearBottom && !isLoading) {
    currentPage++;
    fetchTopAnime(currentPage);
  }
}

function showLoading(show) {
  const loadingText = document.querySelector('.loading-text');
  if (loadingText) {
    loadingText.style.display = show ? 'block' : 'none';
  }
}

window.addEventListener("scroll", handleScroll);
fetchTopAnime(currentPage);