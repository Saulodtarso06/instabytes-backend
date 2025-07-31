import fetchImages from "./fetchApis";

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
const imageGrid = document.querySelector(".image-grid");

// Inicializando o modal escondido
modal.style.display = "none";

// Função para buscar e exibir os dados do endpoint
async function displayImages() {
  try {
    const data = await fetchImages();

    // Validação dos dados recebidos
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Nenhum dado encontrado ou formato inválido.");
    }

    // Criar fragmento para melhor performance
    const fragment = document.createDocumentFragment();

    data.forEach((item) => {
      const article = document.createElement("article");
      article.dataset.description = item.descricao;

      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = item.imgUrl;
      img.alt = item.alt || "Imagem sem descrição";
      img.tabIndex = 0; // Para acessibilidade

      // Adiciona evento de clique diretamente no elemento criado
      img.addEventListener("click", () => openModal(img, article.dataset.description));

      figure.appendChild(img);
      article.appendChild(figure);
      fragment.appendChild(article);
    });

    imageGrid.appendChild(fragment);
  } catch (error) {
    console.error("Erro ao carregar imagens:", error);
  }
}

// Função para abrir o modal
function openModal(image, description = "") {
  modal.style.display = "block";
  modalImg.src = image.src;
  modalImg.alt = image.alt;

  const caption = description || image.alt;
  captionText.innerHTML = `<p>${caption}</p>`;
}

// Evento de fechar o modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fechar o modal clicando fora dele
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Teclado: fechar modal com ESC
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
});

// Chamar a função para buscar e exibir as imagens ao carregar a página
document.addEventListener("DOMContentLoaded", displayImages);
