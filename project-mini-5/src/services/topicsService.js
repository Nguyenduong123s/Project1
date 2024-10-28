import {get} from '../untils/request'
export const getAllTopics =  async () => {
    const result = await get('topics')
    return result
}
export const getTopicById = async (id) => {
    const result = await get(`topics/${id}`)
    return result
}