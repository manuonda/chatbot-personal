import supabase from "~/database/supabase"

const table ="usuario";

const getByTelephone = async(telephone) => {
    try {
        const { data, error } = await supabase
        .from(table)
        .select()
        .eq('telephone', telephone);
        console.log("information : ", data, error);
        if (error) {
            return null;
        }
        return data;
    } catch (error) {
        console.error(`Error get usuario: ${error}`)
        return error;
    }
}



export{getByTelephone}