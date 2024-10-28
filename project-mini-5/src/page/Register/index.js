import 'bootstrap/dist/css/bootstrap.css';
import styles from './Register.module.scss'
import clsx from 'clsx'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getAllUsers, postUser } from '../../services/usersService';
import { useNavigate } from 'react-router-dom';
function Register() {
    const [fullName,setFullName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    const handleClick = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
       if((fullName === '' || fullName === undefined) && (email === '' || email === undefined) && (password === '' || password === undefined)){
            toast.error('Vui lòng nhập thông tin')
       }else if(email === '' || email === undefined){
            toast.error('Vui lòng nhập email')
       }else if(password === '' || password === undefined){
            toast.error('Vui lòng nhập mật khẩu')
       }else if(fullName === '' || fullName === undefined){
            toast.error('Vui lòng nhập họ tên')
       }else{
            if(!emailRegex.test(email)){
                toast.error('Email không hợp lệ!')
                setEmail('')
                return
            }
            if(!passwordRegex.test(password)){
                toast.error('Password cần có 8 kí tự và có chữ hoa')
                setPassword('')
                return
            }
            const fetchApi = async () => {
                const Chance = require('chance');
                const chance = new Chance();
                const token = chance.string({length : 15})
                const allUsers = await getAllUsers()
                const checkEmail = allUsers.some((user) => user.email === email)
                if(checkEmail){
                    toast.error('Email đã tồn tại !')
                    return
                }else{
                    const res = await postUser({
                        fullName,email,password,token
                    })
                    if(res){
                        toast.success("Tài khoản được lập thành công")
                        navigate("/login")
                    }else{
                        toast.error("Tài khoản tạo không thành công")
                    }
                }
            }
            fetchApi()
       }
    }
    return ( 
        <div className={clsx(styles['form-register'],'container')}>
            <p className={clsx(styles['form-register__title'])}>Register Account</p>
            <div className={clsx(styles['form-register__input'])}>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} type='text' placeholder='Full Name'/>
            </div>
            <div className={clsx(styles['form-register__input'])}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email'/>
            </div>
            <div className={clsx(styles['form-register__input'])}>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'/>
            </div>
            <input type='button' onClick={handleClick} className={clsx(styles['form-register__button'])} value='Register'/>
        </div>
    );
}

export default Register;