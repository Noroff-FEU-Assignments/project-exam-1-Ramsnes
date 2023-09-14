const baseUrl = "https://cors.noroff.dev/ramsnes.no/wp-json/wp/v2/";
const errorMsg = document.querySelector(".loadingClass");

// getting id
function getProductId() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  return id;
}

// fetching id
async function fetchProduct(id) {
  const response = await fetch(baseUrl + `posts/${id}`);
  const data = await response.json();
  return data;
}

// render HTML
async function renderHTML() {
  try {
    const id = getProductId();
    const blog = await fetchProduct(id);
    console.log(blog);
    const uniquePost = document.getElementById("mainPostWrapper");
    uniquePost.removeAttribute("class");
    const loading = document.getElementById("loading");
    loading.remove();

    // title change dynamically
    document.title = `Jiu Jitsu - ${blog.title.rendered}`;

    const header = document.getElementById("postTitle");
    header.innerHTML = blog.title.rendered;

    const text = document.getElementById("postText");
    text.innerHTML = blog.excerpt.rendered;

    const image = document.getElementById("postImg");
    // Fetches the featured media data and set the image src since I had trouble using same code as in blogs.js
    fetch(blog._links["wp:featuredmedia"][0].href)
      .then((response) => response.json())
      .then((featuredMediaData) => {
        if (featuredMediaData.source_url) {
          image.src = featuredMediaData.source_url;
        } else {
          // In case the  featured image URL is missing
          image.src = ""; // Default image
        }
      });
  } catch (error) {
    errorMsg.innerHTML =
      '<div class="error">There was an error. Contact online support at 555-444-333.</div>';
  }
}

renderHTML();
