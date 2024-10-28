import { useEffect, useRef, useState } from "react";
import './Home.scss'
import { useSelector } from "react-redux";
import { getCookie } from "../../cookies";
function Home() {
    const checkLogin = useSelector(state => state.loginReducer)
    console.log('login : ',checkLogin)
    const [name,setName] = useState('')
    useEffect(() => {
        setName(getCookie('fullname'))
    })
    return ( 
        <div className="container">
           {checkLogin ? (  
                <div className="introduce">
                    Chào mừng {name} đến với Quiz - nơi bạn có thể khám phá, thử sức và chinh phục hàng loạt câu hỏi thú vị!
                </div>
           ) :(
                <div>
                    <p className="text">
                        Website trắc nghiệm online lập trình Frontend là một nên tăng trực tuyển cho phép các lập trình viên Frontend thực hiện các bải kiểm tra, trác nghiệm, đánh
                        giá và đo đạc kiến thức của mình trong lĩnh vực lập trình Frontend.
                    </p> 
                    <p className="text">
                        Đối với các lập trinh viên Frontend, website trác nghiêm online cung cáp các bải kiểm tra để giúp họ năng cao kién thức và kỳ năng của minh trong các công
                        nghệ và công cụ lập trinh như HTML, CSS, JavaScript, jQuery, Bootstrap, Angular, React, Vue..
                    </p>
                </div>
           )
           }
        </div> 
    );
}

export default Home;