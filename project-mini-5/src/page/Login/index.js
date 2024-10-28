import 'bootstrap/dist/css/bootstrap.css';
import styles from './Login.module.scss'
import clsx from 'clsx'
import { useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllUsers } from '../../services/usersService';
import { getCookie, setCookie } from '../../cookies';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../action/login';
function Login() {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogin = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
       if((email === '' || email === undefined) && (password === '' || password === undefined)){
            toast.error('Vui lòng nhập thông tin')
       }else if(email === '' || email === undefined){
            toast.error('Vui lòng nhập email')
       }else if(password === '' || password === undefined){
            toast.error("Vui lòng nhập password")
       }else{
            if(!emailRegex.test(email)){
                toast.error('Email không hợp lệ !')
                setEmail('')
                return
            }
            if(!passwordRegex.test(password)){
                toast.error('Password cần có 8 kí tự và có chữ hoa')
                setPassword('')
                return
            }
            const fetchApi = async () => {
                const allUsers = await getAllUsers()
                const checkEmail = allUsers.find(user => user.email === email)
                console.log(checkEmail)
                if(checkEmail){
                    if(checkEmail.password === password){
                        setCookie('id',checkEmail.id,1)
                        setCookie('fullname',checkEmail.fullName,1)
                        setCookie('email',checkEmail.email,1)
                        setCookie('password',checkEmail.password,1)
                        setCookie('token',checkEmail.token,1)
                        toast.success('Bạn đã đăng nhập thành công!')
                        dispatch(login())
                        navigate('/')
                    }else{
                        toast.error('Mật khẩu không chính xác')
                        setPassword('')
                    }
                }else{
                    toast.error('Email không tồn tại')
                }
            }
            fetchApi()
       }
    }
    useEffect(() => {
        if(getCookie('token')){
            dispatch(login())
            navigate('/')
        }
    },[])
    return ( 
        <div className={clsx(styles['form-login'],'container')}>
            <p className={clsx(styles['form-login__title'])}>Login Quiz</p>
            <div className={clsx(styles['form-login__input'])}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email'/>
            </div>
            <div className={clsx(styles['form-login__input'])}>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'/>
            </div>
            <input type='button' onClick={handleLogin} className={clsx(styles['form-login__button'])} value='Login'/>
        </div>
    );
}

export default Login;