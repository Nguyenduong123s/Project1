import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllTopics } from '../../services/topicsService';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../cookies';
function Topic() {
    const [topics,setTopics] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getAllTopics()
            setTopics(result)
        }
        if(getCookie('token')){
            fetchApi()
        }else{
            navigate('/login')
        }
    },[])
    const handleClick = (id) => {
        navigate(`/quiz/${id}`)
    }
    return ( 
    <div className='container mt-5'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic,index) => (
                <tr>
                    <td>{index + 1}</td>
                    <td>{topic.name}</td>
                    <td>
                        <button onClick={() => handleClick(topic.id)} className='btn btn-success'>Làm bài</button>
                    </td>
                </tr>
            ))}
          </tbody>
        </Table>
    </div>
    );
}

export default Topic;