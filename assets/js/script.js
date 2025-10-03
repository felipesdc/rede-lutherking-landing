// Função para carregar o ano atual no rodapé (do seu código original)
document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

/**
 * ===================================================================================
 * CONEXÃO SEGURA COM O BANCO DE DADOS (AVISO IMPORTANTE)
 * ===================================================================================
 * * NUNCA conecte seu banco de dados diretamente a partir do JavaScript do "front-end".
 * Suas credenciais (usuário, senha, host) ficariam expostas para qualquer visitante do site.
 * * A FORMA CORRETA NA VERCEL:
 * 1. Crie uma pasta chamada `/api` na raiz do seu projeto.
 * 2. Dentro dela, crie um arquivo (ex: `get-data.js`). Este será o seu "back-end".
 * 3. Neste arquivo `/api/get-data.js`, você colocará a lógica de conexão com o Vercel Postgres,
 * usando as variáveis de ambiente (process.env.POSTGRES_URL) que a Vercel fornece.
 * 4. O JavaScript do seu "front-end" (este arquivo) fará uma chamada para a sua própria API,
 * no endereço `"/api/get-data"`.
 *
 * O código abaixo é um EXEMPLO de como o seu front-end chamaria essa API.
 */

async function buscarDadosDoBanco() {
  try {
    // O fetch chama a sua Serverless Function que está na Vercel.
    const response = await fetch("/api/get-data");

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    // Agora você tem os dados e pode usá-los para criar gráficos, etc.
    console.log("Dados recebidos do banco:", data);

    // Exemplo: usar os dados para popular uma seção da página
    // const containerGraficos = document.getElementById('graficos');
    // containerGraficos.innerHTML = JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Não foi possível buscar os dados:", error);
  }
}

// Você pode chamar essa função quando a página carregar ou quando um botão for clicado.
// Exemplo: buscarDadosDoBanco();
