import { EVENTS, addKeyword } from "@builderbot/bot";
import { flowMenu } from "./menu";


export const flowRegister = addKeyword(EVENTS.ACTION)
.addAnswer([
  '👋 * ¡Hola! Para continuar, ¿puedes decirme tu nombre, por favor?'
].join('\n'),
{ delay: 800, capture: true },
async (ctx, ctxFn) => {
  console.log('Body recordatorio ===> ', ctx);
  
  if (ctx.body == "") {
    ctxFn.fallBack("Debes ingresar tu nombre");
  }else {
    ctxFn.gotoFlow(flowMenu);
  }
});
