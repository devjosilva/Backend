const fs = require('fs/promises');
const path = require('path');

const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(path.join(__dirname, '../data', filePath), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
};

const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(path.join(__dirname, '../data', filePath), JSON.stringify(data, null, 2));
    } catch (err) {
        throw err;
    }
};

module.exports = { readFile, writeFile };
