import { EVENTS, addKeyword } from "@builderbot/bot";
import { flowMenu } from "./flowMenu";
import { flowRecordatorio } from "./flowRecordatorio";


export const flowMoreExamples = addKeyword(EVENTS.ACTION)
  .addAnswer([
    '🔔 Más ejemplos:',
    '🔹 "Agregar recordatorio: cita con el doctor el 23 de junio a las 15:00. Avisarme 1 día antes."',
    '🔹 "Agregar recordatorio: reunión de equipo el viernes a las 10:00. Avisarme 30 minutos antes."',
    '🔹 "Agregar recordatorio: comprar flores para el aniversario el lunes a las 18:00. Avisarme 1 hora antes."',
    '🔹 "Agregar recordatorio: tomar la medicina todos los días a las 9:00 AM. Avisarme 5 minutos antes."',
    '🔹 "Agregar recordatorio: llevar a mi hijo al examen de ojos el jueves a las 11:00. Avisarme 1 hora antes."'
  ].join('\n'), 
  { delay: 800 },
  async (ctx, ctxFn) => {
     ctxFn.gotoFlow(flowRecordatorio); 
  }
);
