import { useState } from "react";
import styles from './QuestionItem.module.scss'
import clsx from 'clsx'
function QuestionItem({value,setResult,questionId,error}) { 
    const {question,answers,index} = value
    const [idx,setIdx] = useState()
    const check = error.some(question => question.id === questionId)
    const handleChange = (id) => {
        setIdx(id)
        setResult((state) => {
            const check = state.findIndex(answer => answer.questionId == questionId)
            if(check === -1){
                const createAnswer = {
                    questionId,
                    answer : id
                }
                return [...state,createAnswer] 
            }else{
                state[check]['answer']= id;
                return state
            }
        })
    }
    const handleClick = ()=> {
        setResult(state => {
            const newState = state.filter(answer => answer.questionId != questionId)
            return newState
        })
        setIdx()
    }
    return ( 
            <div className="mt-3">
                <p className={clsx(styles.title,check && styles.error)}>Câu {index}: {question}</p>
                    {answers.map((answer,id) => (
                        <div className={clsx(styles.form)} key={id}>
                            <input className={clsx(styles.checkBox)} checked={id == idx} type="radio" onChange={() => {handleChange(id)}} />
                            <label className={clsx(styles.question)} onClick={() => {handleChange(id)}}>{answer}</label>
                        </div>  
                    ))}
                <button onClick={() => handleClick()} className="btn m-1">Xóa lựa chọn</button>
            </div>  
    );
}

export default QuestionItem;