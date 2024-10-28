import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getCookie } from '../../cookies';
import { useNavigate } from 'react-router-dom';
import { getAllAnswerByUserId } from '../../services/answersService';
import { getTopicById } from '../../services/topicsService';
function Answers() {
    const [allAnswers,setAllAnswers] = useState([])
    const [topicName,setTopicName] = useState()
    const navigate = useNavigate()
    const handleClick = (id) => {
        navigate(`/result/${id}`)
    }
    useEffect(() => {
        const fetchApi = async () => {
            if(getCookie('token')){
                const userId = parseInt(getCookie('id'))
                const result = await getAllAnswerByUserId(userId)
                const topicMap = {};
                await Promise.all(
                    result.map(async (answer) => {
                        if (!topicMap[answer.topicId]) {
                            const topic = await getTopicById(answer.topicId);
                            topicMap[answer.topicId] = topic.name;
                        }
                    })
                );
                setTopicName(topicMap)
                setAllAnswers(result)
            }else{
                navigate('/login')
            }
        }
        fetchApi()
    },[])
    return (
        <div className='container'>
            <h3>Danh sách cái bài bạn đã làm</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Tên chủ đề</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                    allAnswers.map(answer => (
                        <tr>
                            <td>{answer.id}</td>
                            <td>{topicName[answer.topicId]}</td>
                            <td><button onClick={() => {handleClick(answer.id)}} className='btn'>Xem chi tiết</button></td>
                        </tr>
                    ))
                }
              </tbody>
            </Table>
        </div>
      );
}

export default Answers;