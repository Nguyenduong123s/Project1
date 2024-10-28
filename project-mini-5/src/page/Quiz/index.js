import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestions } from "../../services/questionsService";
import { getCookie } from "../../cookies";
import QuestionItem from "./QuestionItem";
import { toast } from 'react-toastify';
import { postAnswer } from "../../services/answersService";
import { getTopicById } from "../../services/topicsService";
function Quiz() {
    const param = useParams()
    const id = parseInt(param.id)
    const [questions,setQuestions] = useState([])
    const navigate = useNavigate()
    const [result,setResult] = useState([])
    const [error,setError] = useState([])
    const [topicName,setTopicName] = useState()
    useEffect(() => {
        const fetchApi = async() => {
            const result = await getQuestions(id)
            const topic = await getTopicById(id)
            setTopicName(topic.name)
            setQuestions(result)
        }
        if(getCookie('token')){
            fetchApi()
        }else{
            navigate('/login')
        }
    },[])
    const handleClick = () => {
        if(result.length != questions.length){
            toast.error("Vui lòng chọn đáp án cho câu hỏi !");
            const temp = result.map(value => value.questionId)
            const questionError = questions.filter((question) => !temp.includes(question.id))
            setError(questionError)
        }else{
            const fetchApi = async () =>{
                const value = {
                    userId : parseInt(getCookie('id')),
                    topicId : id,
                    answers : result
                }
                const postResult = await postAnswer(value)
                console.log(postResult)
                const answerId = postResult['id']
                navigate(`/result/${answerId}`)
            }
            fetchApi()
        }
    }
    return ( 
        <>
            <h3 className="m-3">Bài tập chủ đề {topicName}</h3>
           {
                questions.map((question,index) => {
                    index = index +1
                    return <QuestionItem value ={{...question,index}} setResult={setResult} questionId = {question.id} error={error}/>
                }  
                )
           }
           <button onClick={() => handleClick()} className="btn btn-warning m-3">Nộp bài</button>
        </> 
    );
}

export default Quiz;