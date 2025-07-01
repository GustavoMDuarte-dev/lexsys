// database/Database.ts
import * as SQLite from 'expo-sqlite';

const DB_NAME = "lexsys.db";

const getConnection = async () => {
    return await SQLite.openDatabaseAsync(DB_NAME);
}

const createDb = async () => {
    const db = await getConnection();
    // Adicionamos o comando para criar a tabela 'processos'
    const queries = `
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT,
            telefone TEXT,
            status TEXT,
            tags TEXT
        );

        CREATE TABLE IF NOT EXISTS processos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            numero TEXT NOT NULL,
            cliente TEXT,
            status TEXT,
            proximoPrazo TEXT,
            ultimaMovimentacao TEXT
        );
    `;
    // O método execAsync pode executar múltiplos comandos de uma só vez
    await db.execAsync(queries);
}

export const initDb = async () => {
    await createDb();
    console.log("Banco de dados 'lexsys.db' inicializado com as tabelas 'clientes' e 'processos'.");
}

export const runQuery = async (sql: string, args: (string | number)[] = []) => {
    const db = await getConnection();
    return await db.runAsync(sql, args);
}

export const getAll = async (tableName: string) => {
    const db = await getConnection();
    return await db.getAllAsync(`SELECT * FROM ${tableName}`);
}