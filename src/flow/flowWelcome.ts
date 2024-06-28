import { EVENTS, addKeyword } from "@builderbot/bot";
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { flowMenu } from "./flowMenu";
import { existUsuarioByTelefono } from "~/services/usuarioService";
import { flowRegister } from "./flowRegister";



export const flowWelcome = addKeyword<Provider>(['hola'])
// .addAction(async (_, { flowDynamic }): Promise<void> => {
//      console.log("informationc:");
//      return flowDynamic('Hi! how can I help you?');
//  })
 .addAction({ capture: true }, async (ctx, {provider, flowDynamic, state }): Promise<void> => {
     const checkNumber = ctx.from;
     const onWhats = await provider.vendor.onWhatsApp(checkNumber);
     const existUsuario = await existUsuarioByTelefono(checkNumber);
    
     if(!onWhats[0]?.exists){
          await ctxFn.flowDynamic(`Not Exists: ${onWhats[0].exists}`)
     } else {
        //aqui le consulto para crear un registro al usuario   
        console.log("Existe el usuario");
        //verifico si existe en la base de datos para crearl
     } 
     console.log("information numero 2");
     await state.update({ name: ctx.body})
     return flowDynamic(`The user said: ${ctx.body}`);
 })
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
          } else {
             //aqui le consulto para crear un registro al usuario   
             console.log("Existe el usuario");
             //verifico si existe en la base de datos para crearl
          } 
         
          const existUsuario = await existUsuarioByTelefono(checkNumber);
          console.log("existUsuarioByTelefono : " , existUsuario)
          if (!existUsuario){
              return ctxFn.gotoFlow(flowRegister);
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


