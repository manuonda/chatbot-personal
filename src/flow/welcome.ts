import { EVENTS, addKeyword } from "@builderbot/bot";

export const flowWelcome = addKeyword(['hola','hi','hello'])
.addAnswer( 
     ['Bienvenido to Boot' , 
      'Escribe *menu* para ver las opciones'
     ],
    { capture: true},
    async(ctx, ctxFn) => {
         console.log(ctx.body.includes("menu"));
    }
)


