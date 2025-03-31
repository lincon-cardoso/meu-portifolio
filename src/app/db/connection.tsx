import { Pool } from "pg";

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    user: "postgres", // Substitua pelo seu usuário do PostgreSQL
    host: "postgres.railway.internal", // Ou o host do seu banco de dados
    database: "postgresql://postgres:FmnXIcnhxoqCJpVqvrpZUlaSMwTzGdQQ@postgres.railway.internal:5432/railway", // Nome do banco de dados
    password: "FmnXIcnhxoqCJpVqvrpZUlaSMwTzGdQQ", // Substitua pela sua senha
    port: 5432, // Porta padrão do PostgreSQL
});

export default pool;