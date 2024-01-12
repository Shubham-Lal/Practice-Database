import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../Provider';

const Auth = () => {
    return (
        <div className='auth'>
            <div className='auth__container'>
                <Login />
                <Register />
            </div>
        </div>
    )
}

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(Context);

    const [loginData, setLoginData] = useState({
        username: "", password: ""
    });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const CustomHeader = new Headers();
        CustomHeader.append('Content-Type', 'application/json');
        const config = {
            method: 'POST',
            headers: CustomHeader,
            body: JSON.stringify(loginData)
        }
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, config)
            .then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    alert(result.msg);
                    localStorage.setItem('token', result.data.token);
                    setUser({
                        _id: result.data._id,
                        name: result.data.name
                    });
                    navigate('/');
                }
                if (result.success === false) {
                    alert(result.msg);
                }
            })
            .catch(err => alert(err));
    };

    return (
        <form className='auth__wrapper' onSubmit={handleLoginSubmit}>
            <p style={{ textDecoration: 'underline' }}>Login</p>
            <input
                type='text'
                placeholder='Username'
                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
                type='password'
                placeholder='Password'
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button type="submit">Sign in</button>
        </form>
    )
};

const Register = () => {
    const [registerData, setRegisterData] = useState({
        name: "", username: "", password: ""
    });

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const CustomHeader = new Headers();
        CustomHeader.append('Content-Type', 'application/json');
        const config = {
            method: 'POST',
            headers: CustomHeader,
            body: JSON.stringify(registerData)
        }
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, config)
            .then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    alert(result.msg);
                }
                if (result.success === false) {
                    alert(result.msg);
                }
            })
            .catch(err => alert(err));
    };

    return (
        <form className='auth__wrapper' onSubmit={handleRegisterSubmit}>
            <p style={{ textDecoration: 'underline' }}>Register</p>
            <input
                type='text'
                placeholder='Name'
                onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
            />
            <input
                type='text'
                placeholder='Username'
                onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
            />
            <input
                type='password'
                placeholder='Password'
                onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <button type="submit">Sign up</button>
        </form>
    )
};

export default Auth