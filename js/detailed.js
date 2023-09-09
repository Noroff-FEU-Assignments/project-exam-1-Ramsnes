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
    image.src = blog._embedded["wp:featuredmedia"][0].source_url;
  } catch (error) {
    errorMsg.innerHTML =
      '<div class="error">There was an error. Contact online support at 555-444-333.</div>';
  }
}

renderHTML();
