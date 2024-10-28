import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAnswerById } from "../../services/answersService";
import { getTopicById } from "../../services/topicsService";
import ResultItem from "./ResultItem";
import { getQuestions } from "../../services/questionsService";
import { getCookie } from "../../cookies";
function Result() {
    const [answerById,SetAnswerById] = useState({})
    const [topicName,setTopicName] = useState()
    const param = useParams()
    const answerId = parseInt(param.id)
    const [questions,setQuestions] = useState([])
    const [countCorrect,setCountCorrect] = useState()
    const navigate = useNavigate()
    const topicRedo = useRef()
    const handleClick = () => {
        navigate(`/quiz/${topicRedo.current}`)
    }
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAnswerById(answerId)
            const allQuestions = await getQuestions(result.topicId)
            const topic = await getTopicById(result.topicId)
            topicRedo.current = result.topicId
            const count = result.answers.reduce((total,answer) => {
                console.log(total)
                const check = allQuestions.findIndex((question) => {
                    return question.id === answer.questionId && question.correctAnswer === answer.answer
                })
                if(check != -1){
                    return total +1
                }else{
                    return total
                }
            },0)
            setCountCorrect(count)
            SetAnswerById(result.answers)
            setTopicName(topic.name)
            setQuestions(allQuestions)
        }
        if(getCookie('token')){
            fetchApi()
        }else{
            navigate('/login')
        }
    },[])
    return ( 
        <div>
            <h4 className="m-3">Kết quả chủ đề {topicName}</h4>
            <div className="d-flex ms-3">
                <p>Đúng <b>{countCorrect}</b></p>
                <p className="ms-2">Sai <b>{questions.length - countCorrect}</b></p>
                <p className="ms-2">Tổng số câu <b>{questions.length}</b></p>
                <p className="ms-2">Tỷ lệ đúng <b>{(countCorrect/questions.length).toFixed(2) * 100}%</b></p>
            </div>
            {questions.map((question,index) => {
                index = index+1;
                const answer = answerById.filter((answer) => {
                    return answer.questionId === question.id
                })
                return <ResultItem value = {{...question,index}} result = {answer} />
            })}
            <button onClick={() => {handleClick()}} className="btn btn-info m-3">Làm lại</button>
        </div>
    );
}

export default Result;