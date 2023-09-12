let tenBlogs = document.querySelector(".blogs10");
let viewMore = document.querySelector(".viewMore");

// API fetch
const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/";
const postsUrl = "wp/v2/posts?_embed";

// API data(posts) fetch
async function fetchData() {
  try {
    const response = await fetch(baseUrl + postsUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}
fetchData();

// Render the posts from API call
async function renderHTML() {
  try {
    const tenPosts = await fetchData();

    tenBlogs.innerHTML = ``;

    tenPosts.forEach(function (element) {
      const postsElement = document.createElement("li");

      const blogPosts = `
        <div class="content">
          <h3>${element.title.rendered}</h2>
          <img class="featuredImage" src="${element._embedded["wp:featuredmedia"][0].source_url}" alt="#" />
        </div>
        `;
      postsElement.innerHTML = blogPosts;
      postsElement.addEventListener("click", function () {
        window.location.href = `detailed.html?id=${element.id}`;
      });

      tenBlogs.appendChild(postsElement);
    });

    // Remove the loading element after rendering
    const loading = document.getElementById("loading");
    loading.remove();
  } catch (error) {
    console.error("Error rendering HTML", error);
  }
}

renderHTML();