import { addKeyword } from "@builderbot/bot";
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { flowRecordatorio } from "./flowRecordatorio"; // Importa todos los flujos del directorio `flow`
import { flowInformacion } from "./flowInformation";



export const flowMenu = addKeyword<Provider>(['menu', 'me'])
.addAnswer([
  '📋 *Menú de opciones*:',
  '0️⃣ - 📅 Recordatorios',
  '1️⃣ - 📂 Archivos',
  '2️⃣ - 📝 Informaciòn',
  ' Selecciona una opciòn.'
].join('\n'),
{ capture: true },
async (ctx, ctxFn) => {
  if (!["0", "1", "2"].includes(ctx.body)) {
    return ctxFn.fallBack("Respuesta no válida, selecciona una opción o vuelve al *menu*");
  }




  switch (ctx.body) {
    case "0": return ctxFn.gotoFlow(flowRecordatorio);
    //case "1": return ctxFn.gotoFlow(flowListadoArchivos);
    case "2": return ctxFn.gotoFlow(flowInformacion);
    // case "2": return gotoFlow(flowEjemplo);
  }
});
