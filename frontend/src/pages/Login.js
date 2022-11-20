import React from 'react'
import { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async function(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email:</label>
            <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    )
}

export default Login
