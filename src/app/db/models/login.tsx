import pool from "../connection";

import { QueryResult, QueryResultRow } from "pg";

export async function executeQuery<T extends QueryResultRow>(query: string, values: unknown[]): Promise<QueryResult<T>> {
    try {
        const client = await pool.connect();
        try {
            const result = await client.query(query, values);
            return result;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Erro ao executar a consulta:", error);
        throw error;
    }
}