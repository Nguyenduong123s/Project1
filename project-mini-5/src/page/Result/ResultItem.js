import styles from './ResultItem.module.scss'
import clsx from 'clsx';
function ResultItem({value,result}) {
    const {index,question,answers,correctAnswer} = value
    return ( 
        <div className="mt-3">
                <p className={clsx(styles.title)}>
                    Câu {index}: {question}
                    {
                        correctAnswer === result[0].answer ? <p className='btn btn-success ms-3'>Đúng</p> : <p className='btn btn-danger ms-3'>Sai</p>

                    }
                </p>
                    {answers.map((answer,id) => (
                            <div className={clsx(styles.form)} key={id}>
                                <input className={clsx(styles.checkBox)} type="radio" disabled = {true} checked = {result[0].answer == id}/>
                                <label className={clsx(styles.question,
                                        id === correctAnswer && styles.correct,
                                        (result[0].answer === id) && (result[0].answer !== correctAnswer) && styles.wrong
                                    )}
                                >
                                    {answer}
                                </label>
                            </div> 
                    ))}
            </div>
     );
}

export default ResultItem;