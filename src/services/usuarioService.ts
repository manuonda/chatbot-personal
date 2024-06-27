import supabase from "~/database/supabase"
import { Usuario } from "~/models/usuario";

const table = "usuario";

const existUsuarioByTelefono = async (telephone) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select()
      .eq('telephone', telephone);
    console.log("information : ", data, error);
    let usuarios = convertToUsuarioData(data);
    let existUsuario = usuarios.length > 0 ? true : false;
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
    console.log("information : ", data, error);
    let usuarios =  convertToUsuarioData(data);
    if(usuarios.length > 0 ){
      return usuarios[0];
    }
    return null;
  } catch (error) {
    console.error(`Error get usuario: ${error}`)
    return error;
  }
}




const addUsuario = async (usuario: Usuario) => {

  console.log("addUsuario usuario => ", usuario);
  try {
    const { data, error } = await supabase
      .from(table)
      .insert({ first_name: usuario.first_name, last_name: usuario.last_name, telephone: usuario.telephone, created_at: new Date().toISOString() })
      .select();
    console.log("insert registros : ", data, error);
    let usuarios: Usuario[] = convertToUsuarioData(data);
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



export { existUsuarioByTelefono, addUsuario , getUsuarioByTelephone}