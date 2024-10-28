import { post,get } from "../untils/request";
export const getAllUsers = async () => {
    const result = await get('users');
    return result
}
export const postUser = async (vaule) =>{
    const result = await post('users',vaule)
    return result;
}