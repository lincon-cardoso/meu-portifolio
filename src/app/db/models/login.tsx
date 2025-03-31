import pool from "../connection";

export async function saveLogin(email: string): Promise<void> {
    const query = `
    INSERT INTO logins (email, message, timestamp)
    VALUES ($1, $2, NOW())
  `;
    const values = [email, "Login feito com sucesso"];

    try {
        await pool.query(query, values);
        console.log("Login registrado com sucesso!");
    } catch (error) {
        console.error("Erro ao registrar login:", error);
        throw error;
    }
}