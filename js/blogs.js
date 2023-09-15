document.addEventListener("DOMContentLoaded", async function () {
  let tenBlogs = document.querySelector(".blogs10");
  let viewMore = document.querySelector(".viewMore");

  // API fetch
  const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/";
  const postsUrl = "wp/v2/posts?_embed";

  // API data(posts) fetch
  async function fetchData(page, perPage) {
    try {
      const response = await fetch(
        `${baseUrl}${postsUrl}&page=${page}&per_page=${perPage}`
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  }

  // Render the posts from API call
  async function renderHTML() {
    try {
      const tenPosts = await fetchData(currentPage, postsPerPage);

      // Append the new blogs to the existing content
      tenPosts.forEach(function (element) {
        const postsElement = document.createElement("li");
        const blogPosts = `
          <div class="content">
            <h3>${element.title.rendered}</h3>
            <img class="featuredImage" src="${element._embedded["wp:featuredmedia"][0].source_url}" alt="#" />
          </div>
        `;
        postsElement.innerHTML = blogPosts;
        postsElement.addEventListener("click", function () {
          window.location.href = `detailed.html?id=${element.id}`;
        });

        tenBlogs.appendChild(postsElement); // Append to the existing content
      });

      if (tenPosts.length < postsPerPage) {
        loadMoreButton.style.display = "none";
      }

      // Removes the loading element after rendering
      const loading = document.getElementById("loading");
      loading.remove();
    } catch (error) {
      console.error("Error rendering HTML", error);
    }
  }

  // "Load more"-button code
  let currentPage = 1;
  const postsPerPage = 10;

  // Function to load more posts
  function loadMorePosts() {
    currentPage++;
    renderHTML();
  }

  // Click event listener to "Load More" button
  const loadMoreButton = document.getElementById("loadMoreButton");
  loadMoreButton.addEventListener("click", loadMorePosts);

  // Fetching and rendering the initial posts
  const initialPosts = await fetchData(currentPage, postsPerPage);
  renderHTML();
});
