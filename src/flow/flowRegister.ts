import { EVENTS, addKeyword } from "@builderbot/bot";
import { flowMenu } from "./flowMenu";
import { addUsuario } from "~/services/usuarioService";
import { Usuario } from "~/models/usuario";


export const flowRegister = addKeyword(EVENTS.ACTION)
.addAnswer([
  '👋 * ¡Hola! Para continuar, ¿puedes decirme tu nombre, por favor?'
].join('\n'),
{ delay: 800, capture: true },
async (ctx, ctxFn) => {
  console.log('host:  ', ctx.host, " from :", ctx.from);
  
  if (ctx.body == "") {
    ctxFn.fallBack("Debes ingresar tu nombre");
  }else {
    const usuario:Usuario = {
        first_name: ctx.body,
        last_name: ctx.body,
        telephone: ctx.from       
    }
    addUsuario(usuario)
    return ctxFn.gotoFlow(flowMenu);
  }
});
