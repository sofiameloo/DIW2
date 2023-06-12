
function createResponseDetails(product) {
    return `
    <div class="col-md-12">
    <div class="conteudo-container">
      <div class="conteudo-produto">
        <img class="card-img-top" src="${product.image}" alt="${product.title}">
        <p class="ratings">${displayRating(product.rating.rate)}</p>
        <h1 class="title">${product.title}</h1>
        <p class="stock">Estação: ${product.season}</p>
        <div class="price">
            <div class="price-container">
            <br>
            <span class="price">${product.price} BRL</span>
            <br>
            <button id="procurar2" type="submit" class="btn btn-primary">Adicionar ao carrinho</button>
            </div>
        </div>
      </div>
      <div class="container">
        <h3>Detalhes:</h3>
        <p class="description">${product.description}</p>
      </div>
    </div>
  </div>
  </div>
    `;
  }

  function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  }
  
  async function fetchProducts() {
    try {
      const productId = getProductId();
      const url = `http://diwserver.vps.webdock.cloud:8765/products/${productId}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  function displayRating(rate) {
    const roundedRate = Math.round(rate);
    let stars = "";
    for (let i = 0; i < roundedRate; i++) {
      stars += "★";
    }
    for (let j = roundedRate; j < 5; j++) {
      stars += "☆";
    }
    return stars;
  }
  
  async function renderPage() {
    const product = await fetchProducts();
    const productDetails = createResponseDetails(product);
    const productDetailsContainer = document.querySelector('#response-details');
    productDetailsContainer.innerHTML = productDetails;
  }
  
  renderPage();