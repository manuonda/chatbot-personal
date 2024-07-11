import * as dotenv from "dotenv"
dotenv.config()
import {OpenAI} from  "openai"
import { promises as fs } from 'fs';

const openaiApiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL;

export const chat = async (prompt, messages) => {
    try {
        const openai = new OpenAI({
            apiKey:openaiApiKey
        });
        
       
        const completion = await openai.chat.completions.create({
            model: model,
            messages:[
                { role: "system" , content:prompt},
                { role: "user", content:  messages}
                
            ]
        });

        
        //console.log(completion);
        const answ = completion.choices[0].message.content;
        return answ;
        
    } catch (error) {
        console.error("Error al conectar openai : " + error);
        return "ERROR"
    }

};




