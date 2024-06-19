import { addKeyword } from "@builderbot/bot";
import { flowRecordatorio } from "./recordatorio"; // Importa todos los flujos del directorio `flow`



export const flowMenu = addKeyword(['menu', 'me'])
.addAnswer([
  '📋 *Menú de opciones*:',
  '0️⃣ - 📅 Recordatorios',
  '1️⃣ - 📂 Listado de Archivos',
  '2️⃣ - 📝 Ejemplo',
  ' Selecciona una opciòn.'
].join('\n'),
{ capture: true },
async (ctx, ctxFn) => {
    console.log("aqui ingreso : " , ctx);
  if (!["0", "1", "2"].includes(ctx.body)) {
    return ctxFn.fallBack("Respuesta no válida, selecciona una opción o vuelve al *menu*");
  }

  console.log("flowMenu : " + ctx.body);

  switch (ctx.body) {
    case "0": return ctxFn.gotoFlow(flowRecordatorio);
    // case "1": return gotoFlow(flowListadoArchivos);
    // case "2": return gotoFlow(flowEjemplo);
  }
});
