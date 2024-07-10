import * as fs from 'fs';
import * as path from 'path';

import { fileURLToPath } from 'url';

// Definir __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readPromptConsultas(nombreFile) {
     try {
        const filePath = path.join(__dirname, '../messages/templateReminder.txt');
        const promptConsultas = await fs.readFileSync(filePath, 'utf-8');
        return promptConsultas;
    } catch (err) {
        console.error('Error reading file:', err);
        throw new Error(err)
    }
}

export {readPromptConsultas}