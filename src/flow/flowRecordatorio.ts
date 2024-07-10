import { EVENTS, addKeyword } from "@builderbot/bot";
import { flowMoreExamples } from "./flowMoreExamples";
import { readPromptConsultas } from "~/services/fileService";

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
    const template = await readPromptConsultas("");
    console.log("template information : " , template  );

  } catch (error) {
    console.error(`Error template `)
  }




});
