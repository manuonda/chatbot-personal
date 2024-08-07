import { EVENTS, addKeyword } from "@builderbot/bot";
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { flowMenu } from "./flowMenu";
import { addUsuario, existUsuarioByTelefono, getUsuarioByTelephone } from "~/services/usuarioService";
import { flowRegister } from "./flowRegister";



export const flowWelcome = addKeyword<Provider>(['hola'])
 .addAction( async (ctx, {provider, flowDynamic, state, gotoFlow }): Promise<void> => {
     const checkNumber = ctx.from;
     const onWhats = await provider.vendor.onWhatsApp(checkNumber);
     const existUsuarioDB = await existUsuarioByTelefono(checkNumber);
     const existUsuarioWspWeb = onWhats[0]?.exists;
    
    //  console.log("informacion que onda");
    //  console.log("existe usuario de base de datos : ", existUsuarioDB);
    //  console.log("existe usuario de wsp web: ", existUsuarioWspWeb);
     if(!existUsuarioDB){
         if(!existUsuarioWspWeb){
             return gotoFlow(flowRegister);
         } else {
            await addUsuario({
                first_name: ctx.name,
                last_name: ctx.name,
                telephone: ctx.from 
            });
         }
     } else { 
          // TODO if exist usuario in wsp puedo actualizar el usuario 
          // en la base de datos
          const usuario = await getUsuarioByTelephone(ctx.from);
          await state.update({ name: usuario.first_name , telephone: ctx.from , user_session:usuario});   
          await flowDynamic(`Hola ${usuario.first_name}.`);
          //return gotoFlow(flowMenu);
     }
    
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


