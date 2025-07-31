let { API_URL } = process.env;

if (!API_URL) {
  console.error("Erro: API_URL não está definido nas variáveis de ambiente.");
}

// Função para buscar os dados do endpoint
export default async function fetchImages() {
  try {
    const response = await fetch(API_URL); // Usando a URL já extraída
    if (!response.ok) {
      // Verifica se a resposta é um erro HTTP (e.g., 404, 500)
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null; // Retorna null ou [] como valor padrão
  }
}
