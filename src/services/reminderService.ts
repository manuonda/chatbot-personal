import supabase from "~/database/supabase"
import { ESTADOS } from "~/models/models";
import { Reminder, Usuario } from "~/models/models";

const table = "recordatorios";

const existUsuarioByTelefono = async (telephone) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select()
      .eq('telephone', telephone);
    const usuarios = convertToUsuarioData(data);
    const existUsuario = usuarios.length > 0 ? true : false;
    return existUsuario;
  } catch (error) {
    console.error(`Error get usuario: ${error}`)
    return error;
  }
}

/**
 * Method que permite buscar si existe un usuario 
 * por el telefono
 * @param telephone 
 * @returns 
 */
const getUsuarioByTelephone = async (telephone) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select()
      .eq('telephone', telephone);
    const usuarios =  convertToUsuarioData(data);
    if(usuarios.length > 0 ){
      return usuarios[0];
    }
    return null;
  } catch (error) {
    console.error(`Error get usuario: ${error}`)
    return error;
  }
}




const addReminder = async (reminder :Reminder, usuarioId: number) => {

  console.log("addReminder => ", reminder);
  try {
    const { data, error } = await supabase
      .from(table)
      .insert({ title: reminder.title, 
                usuario_id: usuarioId, status: ESTADOS.PENDING,
                created_at: new Date().toISOString() })
      .select();
    const usuarios: Usuario[] = convertToUsuarioData(data);
    return usuarios;
  } catch (error) {
    console.error(`Èrror guardar usuario :${error}`)
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



export { existUsuarioByTelefono, addReminder , getUsuarioByTelephone}