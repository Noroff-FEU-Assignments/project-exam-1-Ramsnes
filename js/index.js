// API fetch
const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/";
const postsUrl = "wp/v2/posts?_embed";
let currentPage = 1; // Track the current page of posts

// Top slider
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
// Function for latest posts in carousel
async function fetchAndRenderLatestPosts(page) {
  const carouselContainer = document.querySelector(".carousel");

  try {
    // Fetching latest 4 posts from API, ordered by date
    const response = await fetch(
      `${baseUrl}${postsUrl}&?_embed&per_page=4&orderby=date&page=${page}`
    );
    const data = await response.json();

    // Function to handle post click
    function handlePostClick(post) {
      // Navigate to the post's URL on detailed.html
      window.location.href = `/detailed.html?id=${post.id}`; // You might need to adjust the URL structure as needed
    }

    // Clear existing carousel items
    carouselContainer.innerHTML = "";

    // Loop through the posts and create carousel items
    data.forEach(function (post) {
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");

      // Wrap the post content in an anchor element
      const postLink = document.createElement("a");
      postLink.href = `/detailed.html?id=${post.id}`; // Link to the post's detailed.html page
      postLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior
        handlePostClick(post);
      });

      // Add post content to the anchor element
      postLink.innerHTML = `
        <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
        <h3>${post.title.rendered}</h3>
        <span class="read-more">Read More</span>
      `;

      carouselItem.appendChild(postLink);
      carouselContainer.appendChild(carouselItem);
    });
  } catch (error) {
    console.error("Error fetching and rendering latest posts", error);
  }
}
fetchAndRenderLatestPosts(currentPage);
