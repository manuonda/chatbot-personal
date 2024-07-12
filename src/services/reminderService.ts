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


const convertToUsuarioData = (data: any[]): Usuario[] => {
  return data.map(item => ({
    id: item.id,
    name: item.name,
    created_at: item.created_at,
    updated_at: item.updated_at,
    first_name: item.first_name,
    last_name: item.last_name,
    email: item.email,
    telephone: item.telephone
  }));
}



export {addReminder }