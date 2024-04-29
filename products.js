// Function to display products
function displayProducts() {
  var container = document.getElementById('products-container');
  var html = '';

  // Fetching products from JSON file
  fetch('products.json')
  .then(response => response.json())
  .then(products => {
      products.forEach(function(product) {
          html += `
              <div class="produto">
                  <div class="card-inner">
                      <div class="face">
                          <img src="${product.imagem}" alt="${product.nome}">
                          <h2>${product.nome}</h2>
                      </div>
                      <div class="face back">
                          <p>${product.descricao}</p>
                      </div>
                  </div>
              </div>
          `;
      });

      container.innerHTML = html;
  })
  .catch(error => console.error('Error fetching products:', error));
}

// Function to add a new product
function addProduct() {
  var newProduct = {
    nome: document.getElementById('nome').value,
    descricao: document.getElementById('descricao').value,
    imagem: document.getElementById('imagem').value
  };

  // Creating HTML for the new product
  var newProductHTML = `
    <div class="produto">
        <div class="card-inner">
            <div class="face">
                <img src="${newProduct.imagem}" alt="${newProduct.nome}">
                <h2>${newProduct.nome}</h2>
            </div>
            <div class="face back">
                <p>${newProduct.descricao}</p>
            </div>
        </div>
    </div>
  `;

  // Appending the new product HTML to the products container
  var container = document.getElementById('products-container');
  container.innerHTML += newProductHTML;

  // Clearing the form fields
  document.getElementById('nome').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('imagem').value = '';
}

// Função para alternar o modo de exclusão
function toggleExclusao() {
  var btnExcluir = document.getElementById('btn-excluir');
  var cards = document.querySelectorAll('.produto');

  if (btnExcluir.classList.contains('exclusao-ativa')) {
    btnExcluir.classList.remove('exclusao-ativa');
    cards.forEach(card => card.removeEventListener('click', selecionarProduto));
  } else {
    btnExcluir.classList.add('exclusao-ativa');
    cards.forEach(card => card.addEventListener('click', selecionarProduto));
  }
}

// Função para lidar com o clique em um card durante o modo de exclusão
function selecionarProduto(event) {
  var modal = document.getElementById('modal-exclusao');
  var produtoSelecionado = event.currentTarget;

  // Abrir modal de confirmação de exclusão
  modal.style.display = 'block';

  // Salvar o produto selecionado para exclusão
  produtoSelecionado.classList.add('produto-selecionado');
}

// Função para fechar o modal de confirmação de exclusão
function fecharModalExclusao() {
  var modal = document.getElementById('modal-exclusao');
  modal.style.display = 'none';

  // Remover seleção do produto
  var produtoSelecionado = document.querySelector('.produto-selecionado');
  if (produtoSelecionado) {
    produtoSelecionado.classList.remove('produto-selecionado');
  }
}

// Função para confirmar a exclusão do produto
function confirmarExclusao() {
  var modal = document.getElementById('modal-exclusao');
  var produtoSelecionado = document.querySelector('.produto-selecionado');

  // Remover o produto selecionado do HTML
  if (produtoSelecionado) {
    produtoSelecionado.remove();
  }

  // Fechar o modal
  modal.style.display = 'none';
}

// Função para limpar todos os campos do formulário
function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('imagem').value = '';
}

// Chamando a função para exibir os produtos
displayProducts();
