// database/ProcessoService.ts
import * as Database from "./Database"; // O nosso "gerente" de banco de dados
import { Processo } from "../model/Processo"; // O nosso "molde" de Processo

const TABLE_NAME = "processos";

/**
 * Adiciona um novo processo ao banco de dados.
 * Retorna o ID do processo recém-criado.
 */
export const create = async (obj: Processo): Promise<number> => {
    const result = await Database.runQuery(
        `INSERT INTO ${TABLE_NAME} (numero, cliente, status, proximoPrazo, ultimaMovimentacao) VALUES (?, ?, ?, ?, ?)`,
        [obj.numero, obj.cliente, obj.status, obj.proximoPrazo, obj.ultimaMovimentacao]
    );
    return result.lastInsertRowId;
}

/**
 * Atualiza um processo existente no banco de dados.
 * Retorna verdadeiro se a atualização foi bem-sucedida.
 */
export const update = async (obj: Processo): Promise<boolean> => {
    const result = await Database.runQuery(
        `UPDATE ${TABLE_NAME} SET numero=?, cliente=?, status=?, proximoPrazo=?, ultimaMovimentacao=? WHERE id=?`,
        [obj.numero, obj.cliente, obj.status, obj.proximoPrazo, obj.ultimaMovimentacao, obj.id]
    );
    return result.changes > 0;
}

/**
 * Apaga um processo do banco de dados pelo seu ID.
 * Retorna verdadeiro se a exclusão foi bem-sucedida.
 */
export const deleteById = async (id: number): Promise<boolean> => {
    const result = await Database.runQuery(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
    return result.changes > 0;
}

/**
 * Busca todos os processos registados no banco.
 * Retorna um array de objetos Processo.
 */
export const findAll = async (): Promise<Processo[]> => {
    const rows = await Database.getAll(TABLE_NAME);
    // O `any` aqui é porque o retorno do SQLite não é fortemente tipado,
    // mas nós confiamos que os dados correspondem ao nosso modelo Processo.
    return rows.map((row: any) => new Processo(row));
}