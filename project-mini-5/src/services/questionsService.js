import { get } from "../untils/request"
export const getQuestions = async (id) => {
    const questions = await get('questions')
    const result = questions.filter(question => question.topicId === id)
    return result
}