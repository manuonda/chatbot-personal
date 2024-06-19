import { addKeyword } from "@builderbot/bot";
import { flowRecordatorio } from "./recordatorio"; // Importa todos los flujos del directorio `flow`



export const flowMenu = addKeyword(['menu','me'])
.addAnswer([
    'Este es *menu* de opciones',
    '0 - Recordatorios',
    '1 - Listado de Archivos',
    '2 - Ejemplo'
   ].join('\n'),
   { delay: 800, capture: true},
   async(ctx, { fallBack , gotoFlow }) => {
    if( !["0","1","2"].includes(ctx.body)){
       return fallBack("Respuesta no valida, seleccion una opciòn o volver a *menu*")
    }

    switch(ctx.body){
        case "0":  return gotoFlow(flowRecordatorio)
    }

});