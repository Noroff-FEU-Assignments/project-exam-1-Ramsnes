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
    const product = await fetchProduct(id);
    const uniquePost = document.getElementById("mainPostWrapper");
    uniquePost.removeAttribute("class");
    const loading = document.getElementById("loading");
    loading.remove();

    // title change dynamically
    document.title = `Jiu Jitsu - ${product.title.rendered}`;

    const description = document.getElementById("description");
    description.innerHTML = product.description;

    const image = document.getElementById("jacketImg");
    image.src = product.image;

    const jacketPrice = document.getElementById("jacketPrice");
    jacketPrice.innerHTML = "Price: " + product.price;

    const header = document.getElementById("header");
    header.innerHTML = product.title;

    const sizes = document.getElementById("sizes");
    sizes.innerHTML = "Sizes available: " + product.sizes;
  } catch (error) {
    errorMsg.innerHTML =
      '<div class="error">There was an error. Contact online support at 555-444-333.</div>';
  }
}
