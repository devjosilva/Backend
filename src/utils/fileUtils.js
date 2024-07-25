import { promises as fs } from 'fs';

export const readFile = async (filename) => {
    try {
        const data = await fs.readFile(filename, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error al leer archivo  desde fileUtil ${filename}: ${err.message}`);
        throw new Error('Error al leer archivo  desde fileUtil');
    }
};

export const writeFile = async (filename, data) => {
    try {
        await fs.writeFile(filename, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`Error al escribir archivo desde fileUtil ${filename}: ${err.message}`);
        throw new Error('Error al escribir archivo desde fileUtil ');
    }
};
