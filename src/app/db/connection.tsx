import { Pool } from "pg";

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    user: "postgres", // Substitua pelo seu usuário do PostgreSQL
    host: "postgres.railway.internal", // Host do banco de dados
    database: "railway", // Nome do banco de dados
    password: "FmnXIcnhxoqCJpVqvrpZUlaSMwTzGdQQ", // Substitua pela sua senha
    port: 5432, // Porta padrão do PostgreSQL
});

export default pool;