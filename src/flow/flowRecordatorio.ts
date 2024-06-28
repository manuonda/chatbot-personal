import { EVENTS, addKeyword } from "@builderbot/bot";


export const flowRecordatorio = addKeyword(EVENTS.ACTION)
.addAnswer([
  '🔔 **Recordatorios**',
  'Puedes realizar varias acciones:',
  '1️⃣ - Agregar Recordatorio',
  '2️⃣ - Listar Recordatorio',
  '3️⃣ - Eliminar Recordatorio',
  '',
  'Ejemplo: escribir o grabar un audio con:',
  '➡️ "Agregar Recordatorio o nota ver temporada Doctor House el miercoles avisarme 5 minutos antes"'
].join('\n'),
{ delay: 800, capture: true },
async (ctx, ctxFn) => {
  console.log('Body recordatorio ===> ', ctx);
  if (!ctx.body.toLowerCase().includes('agregar')) {
    ctxFn.fallBack("Debes ingresar el ejemplo, o escribir *menu* para volver al inicio");
  }


});
