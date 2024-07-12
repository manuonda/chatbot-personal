import { EVENTS, addKeyword } from "@builderbot/bot";
import { flowMoreExamples } from "./flowMoreExamples";
import { readPromptConsultas } from "~/services/fileService";
import { addReminder } from "~/services/reminderService";

import { chat } from '../provider/openai'
import * as gpt3Encoder  from 'gpt-3-encoder'
import { getUsuarioByTelephone } from "~/services/usuarioService";

const TEMPLATE_REMINDER="templateReminder.txt";

export const flowRecordatorio = addKeyword(EVENTS.ACTION)
.addAnswer([
  '🔔 **Recordatorios**',
  'Puedes realizar varias acciones:',
  '1️⃣ - Agregar Recordatorio',
  '2️⃣ - Listar Recordatorio',
  '3️⃣ - Eliminar Recordatorio',
  '[4 - Màs ejemplos',
  '',
  'Para agregar un recordatorio, escribe o graba un audio con:',
 '➡️ Agregar recordatorio: ver temporada de Doctor House el miércoles. Avisarme 5 minutos antes.'
].join('\n'),
{ delay: 800, capture: true },
async (ctx, ctxFn) => {
  const checkNumber = ctx.from;
  if(['0','1','2','3','4'].includes(ctx.body)){
      switch(ctx.body){
        // Todo mas ejemplos:
        case '4': return ctxFn.gotoFlow(flowMoreExamples)
      }
  }


  if (!ctx.body.toLowerCase().includes('agregar')) {
    ctxFn.fallBack("Debes ingresar el ejemplo, o escribir *menu* para volver al inicio");
  }
  
  try {
    const content = ctx.body.toLowerCase();
    const promptTemplate = await readPromptConsultas("");
    const resultado = await chat(promptTemplate, content);  
    const fullPrompt = promptTemplate.replace("${text}", content);
    const user_session = ctxFn.state.get('user_session');
    let idUsuario = null
    if (user_session != null && user_session !== undefined){
        idUsuario = user_session['id'];
    } else {
       const usuario = await getUsuarioByTelephone(checkNumber);
       console.log(`Usuario obtenido :${usuario.id}`);
       idUsuario = usuario.id;
    }
    const resultadoReminder = JSON.parse(resultado);
    await addReminder(resultadoReminder, idUsuario );

    //calculate numero de tokens
    const tokens = gpt3Encoder.encode(fullPrompt);
    console.log("Tokens : ", tokens.length);
    console.log("resultado : " , resultado);

  } catch (error) {
    console.error(`Error template `)
  }




});
