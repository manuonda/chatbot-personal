import supabase from "~/database/supabase"
import { Usuario } from "~/models/usuario";

const table ="usuario";

const getByTelephone = async(telephone) => {
    try {
        const { data, error } = await supabase
        .from(table)
        .select()
        .eq('telephone', telephone);
        console.log("information : ", data, error);
        return convertToUsuarioData(data);
    } catch (error) {
        console.error(`Error get usuario: ${error}`)
        return error;
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
  


export{getByTelephone}