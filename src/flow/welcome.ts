import { EVENTS, addKeyword } from "@builderbot/bot";
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { flowMenu } from "./menu";


export const flowWelcome = addKeyword<Provider>(['hola'])
.addAnswer( 
     ['Bienvenido to Boot Personal. Lo cual podras realizar varias acciones' , 
      'Escribe *menu* para ver las opciones'
     ],
    { capture: true},
    async(ctx, ctxFn) => {
         const checkNumber = ctx.from;
         try {
          const onWhats = await  ctxFn.provider.vendor.onWhatsApp(checkNumber);
          if(!onWhats[0]?.exists){
               await ctxFn.flowDynamic(`Not Exists: ${onWhats[0].exists}`)
          } 

          if(ctx.body.toLocaleLowerCase().includes('menu')){
               return ctxFn.gotoFlow(flowMenu);
          } 
          return ctxFn.fallBack('Debe ingresar la opcion menù');

         } catch (error) {
            await ctxFn.flowDynamic(`Error : ${error}`)
         }
       
    }
)


