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
  const tenPosts = await fetchData();

  tenBlogs.innerHTML = ``;

  tenPosts.forEach(function (element) {
    const postsElement = document.createElement("li");

    const blogPosts = `
    <div class="content">
        <h2>${element.title.rendered}</h2>
        <p>${element.excerpt.rendered}</p>
        <img class="featuredImage" src="${element._embedded["wp:featuredmedia"][0].source_url}" alt="#" />
        <p>Posted: ${element.date}</p>
        
        </div>
        `;
    // <img src="${element["_links"]["wp:featuredmedia"][0].href}" alt="#" />

    postsElement.innerHTML = blogPosts;
    tenBlogs.appendChild(postsElement);
  });
}

renderHTML();
