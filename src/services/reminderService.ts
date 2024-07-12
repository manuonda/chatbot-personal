import supabase from "~/database/supabase"
import { ESTADOS } from "~/models/models";
import { Reminder, Usuario } from "~/models/models";

const table = "reminder";

const addReminder = async (reminder: any, usuarioId: number) => {
  console.log("reminder : ", reminder);
  console.log("reminder.action :", reminder["Action"], reminder.Action)
  try {
    const { data, error } = await supabase
      .from(table)
      .insert({ title: reminder.Action, 
                usuario_id: usuarioId, 
                status: ESTADOS.PENDING,
                created_at: new Date().toISOString() })
      .select();
    if(data){
      return true;
    }
    return false;
  
  } catch (error) {
    console.error(`Èrror guardar reminder :${error}`)
  }
}


/**
 * List Reminder by parameter
 * @param idUsuario 
 */
const listReminder = async(idUsuario: number):Promise<Usuario[]> => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select()
      .eq('usuario_id', idUsuario);
    if( data && data.length > 0 ){
      return convertToData(data);
    }
    return [];
  } catch (error) {
    console.error(`Èrror guardar reminder :${error}`)
     throw new Error(`Se produjo un error al obtener datos : ${error}`);
  }
}

/**
 * Update Reminder status
 * @param idReminder 
 * @param status 
 * @returns 
 */
const updateReminderStatus= async ( idReminder: number , status: string): Promise<boolean> => {
   try {
    const { error } = await supabase
    .from(table)
    .update({ status})
    .eq('id', idReminder)
    if (!error) return true; return false;
   } catch (error) {
    console.error(`Error al actualizar el reminder: ${error}`)
    return false;
   }
}

const convertToData = (data: any[]): Reminder[] => {
  return data.map(item => ({
    id:item.id,
    title: item.title,
    description: item.description,
    reminder_date: item.reminder_date,
    notification_time:  item.notification_time,
    status: item.status,
    usuario_id: item.usuario_id,
    created_at: item.created_at,
  }));
}



export {addReminder , listReminder }