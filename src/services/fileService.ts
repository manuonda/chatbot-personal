import * as fs from 'fs';
import * as path from 'path';

import { fileURLToPath } from 'url';

// Definir __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readPromptConsultas() {
    console.log(__dirname);
    try {
        const promptConsultas = await fs.readFileSync("./messages/templateReminder.txt");
        console.log(promptConsultas);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

export {readPromptConsultas}