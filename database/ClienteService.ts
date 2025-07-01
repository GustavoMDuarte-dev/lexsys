
import * as Database from "./Database"; 
import { Cliente } from "../model/Cliente"; 

const TABLE_NAME = "clientes";

export const create = async (obj: Cliente): Promise<number> => {
    const result = await Database.runQuery(
        `INSERT INTO ${TABLE_NAME} (nome, email, telefone, status, tags) VALUES (?, ?, ?, ?, ?)`,
        [obj.nome, obj.email, obj.telefone, obj.status, obj.tags]
    );
    return result.lastInsertRowId;
}

export const update = async (obj: Cliente): Promise<boolean> => {
    const result = await Database.runQuery(
        `UPDATE ${TABLE_NAME} SET nome=?, email=?, telefone=?, status=?, tags=? WHERE id=?`,
        [obj.nome, obj.email, obj.telefone, obj.status, obj.tags, obj.id]
    );
    return result.changes > 0;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const result = await Database.runQuery(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
    return result.changes > 0;
}

export const findAll = async (): Promise<Cliente[]> => {
    const rows = await Database.getAll(TABLE_NAME);
    return rows.map((row: any) => new Cliente(row));
}