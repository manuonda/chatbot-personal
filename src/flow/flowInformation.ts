import { EVENTS, addKeyword } from "@builderbot/bot";
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { flowRecordatorio } from "./flowRecordatorio"; // Importa todos los flujos del directorio `flow`
import { flowMenu } from "./flowMenu";



export const flowInformacion = addKeyword(EVENTS.ACTION)
  .addAnswer([
    '📝 *Información sobre el Asistente Personal *:',
    'Este bot está diseñado para ayudarte a gestionar recordatorios y archivos de manera eficiente.',
    'Puedes:',
    '- . Agregar nuevos recordatorios',
    '- . Listar los recordatorios existentes',
    '- . Gestionar tus archivos',
  ].join('\n'),
  { delay: 800},
  async (ctx, ctxFn) => {
     await ctxFn.gotoFlow(flowMenu);
  });