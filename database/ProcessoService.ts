
import * as Database from "./Database"; 
import { Processo } from "../model/Processo"; 

const TABLE_NAME = "processos";

export const create = async (obj: Processo): Promise<number> => {
    const result = await Database.runQuery(
        `INSERT INTO ${TABLE_NAME} (numero, cliente, status, proximoPrazo, ultimaMovimentacao) VALUES (?, ?, ?, ?, ?)`,
        [obj.numero, obj.cliente, obj.status, obj.proximoPrazo, obj.ultimaMovimentacao]
    );
    return result.lastInsertRowId;
}


export const update = async (obj: Processo): Promise<boolean> => {
    const result = await Database.runQuery(
        `UPDATE ${TABLE_NAME} SET numero=?, cliente=?, status=?, proximoPrazo=?, ultimaMovimentacao=? WHERE id=?`,
        [obj.numero, obj.cliente, obj.status, obj.proximoPrazo, obj.ultimaMovimentacao, obj.id]
    );
    return result.changes > 0;
}


export const deleteById = async (id: number): Promise<boolean> => {
    const result = await Database.runQuery(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
    return result.changes > 0;
}

export const findAll = async (): Promise<Processo[]> => {
    const rows = await Database.getAll(TABLE_NAME);
    return rows.map((row: any) => new Processo(row));
}