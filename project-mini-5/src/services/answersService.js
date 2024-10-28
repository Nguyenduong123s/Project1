import { post ,get} from "../untils/request";

export const postAnswer = async (value) => {
    const result = await post('answers',value);
    return result
}
export const getAnswerById = async (id) => {
    const result = await get(`answers/${id}`);
    return result
}
export const getAllAnswerByUserId = async (id) => {
    const result = await get(`users/${id}/answers`);
    return result
}