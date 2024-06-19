import { EVENTS, addKeyword } from "@builderbot/bot";


export const flowRecordatorio  = addKeyword(EVENTS.ACTION)
.addAnswer(['** Recordatorios** puedes realizar varias acciones',
            ' Listar Recordatorio',
            ' Agregar Recordatorio',
            ' Eliminar Recordatorio',
            ' Ejemplo escribir o grabar un audio lo siguiente:',
            ' Agregar Recordatorio ver temporada Doctor House'
].join('\n'),
{ delay: 800, capture: true },
  async(ctx, ctxFn) => {
    console.log('body recordatorio : ' , ctx);
     if(!ctx.body.toLocaleLowerCase().includes('agregar')){
         ctxFn.fallBack("Debe ingresar el ejemplo , sino escribir **menu** para volver al inicio")
     }
  } 
);