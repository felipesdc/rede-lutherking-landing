// api/get-data.js

// 1. Importa a função 'neon' da biblioteca
import { neon } from "@neondatabase/serverless";

// 2. Esta é a função principal da sua API
export default async function handler(request, response) {
  try {
    // 3. Conecta ao banco usando a variável de ambiente da Vercel.
    // A Vercel nomeia essa variável como POSTGRES_URL por padrão.
    const sql = neon(process.env.POSTGRES_URL);

    // 4. Escreva e execute sua query SQL.
    // A biblioteca já retorna as linhas (rows) diretamente.
    const rows = await sql`
      SELECT categoria, COUNT(*) as quantidade 
      FROM sua_tabela 
      GROUP BY categoria 
      ORDER BY quantidade DESC;
    `;

    // 5. Retorna os dados em formato JSON com status 200 (OK)
    response.status(200).json(rows);
  } catch (error) {
    // Em caso de erro, retorna uma mensagem clara.
    console.error("Erro ao executar a query:", error);
    response.status(500).json({ error: "Erro ao buscar dados do banco." });
  }
}
