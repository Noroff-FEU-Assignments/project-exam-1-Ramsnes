// Image slider
const images = document.querySelectorAll(".image-accordion img");
images.forEach(function (image) {
  image.onclick = function (event) {
    document
      .querySelector(".selected-image")
      .classList.remove("selected-image");
    const clickParent = event.target.parentNode;
    clickParent.classList.add("selected-image");
  };
});

// Carousel
// API fetch
const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/";
const postsUrl = "wp/v2/posts?_embed";
let currentPage = 1; // Track the current page of posts
const postsPerPage = 4; // Number of posts to display per page
let totalPosts = 0; // Total number of available posts

// Function to fetch the total number of posts
async function fetchTotalPosts() {
  try {
    const response = await fetch(`${baseUrl}${postsUrl}`);
    const data = await response.json();
    totalPosts = data.length;
  } catch (error) {
    console.error("Error fetching total posts", error);
  }
}

// Function to render the latest posts in the carousel
async function renderLatestPosts(page) {
  const carouselContainer = document.querySelector(".carousel");

  try {
    // Fetch the latest posts based on the current page
    const response = await fetch(
      `${baseUrl}${postsUrl}&per_page=${postsPerPage}&orderby=date&page=${page}`
    );
    const data = await response.json();

    // Clear existing carousel items
    carouselContainer.innerHTML = "";

    // Loop through the fetched posts and create carousel items
    data.forEach(function (post) {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      // Create post content
      const postContent = `
        <a href="/detailed.html?id=${post.id}">
          <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
          <h3>${post.title.rendered}</h3>
        </a>
      `;

      carouselItem.innerHTML = postContent;
      carouselContainer.appendChild(carouselItem);
    });
  } catch (error) {
    console.error("Error fetching and rendering latest posts", error);
  }
}

// Initialize the carousel by fetching total posts and rendering the first page
fetchTotalPosts().then(() => {
  renderLatestPosts(currentPage);
});

// Event listeners for next and previous buttons
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderLatestPosts(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  const maxPage = Math.ceil(totalPosts / postsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
  } else {
    // If we are on the last page, go back to the first page
    currentPage = 1;
  }
  renderLatestPosts(currentPage);
});
