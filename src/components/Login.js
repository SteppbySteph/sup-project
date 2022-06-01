import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { API_URL } from 'utils/utils'
import { Container, Form } from 'components/Styles'

import user from 'reducer/user'

import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState ('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const [mode, setMode] = useState('register')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = useSelector((store) => store.user.accessToken)

    useEffect (() => {
        if(accessToken) {
            navigate('/posts')
            // localStorage.setItem('token', accessToken)
        }
    }, [accessToken, navigate])

    const onFormSubmit = (event) => {
        event.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, email: email, password: password})
        }

        fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                batch(() => {
                    dispatch(user.actions.setUserId(data.userId))
                    dispatch(user.actions.setUsername(data.username))
                    dispatch(user.actions.setEmail(data.email))
                    dispatch(user.actions.setAccessToken(data.accessToken))
                    dispatch(user.actions.setError(null))
                    setErrorMessage(null)

                })
            } else {
                batch (() => {
                    dispatch(user.actions.setUserId(null))
                    dispatch(user.actions.setUsername(null))
                    dispatch(user.actions.setEmail(null))
                    dispatch(user.actions.setAccessToken(null))
                    dispatch(user.actions.setError(data.response))
                    setErrorMessage(data.response)
                })
            }
        })
    }

    return (
        <Container>
            <Form onSubmit={onFormSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    value={username}
                    minlength={8}
                    onChange={(e)=>setUsername(e.target.value)}
                    required/>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required/>      
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    required
                 />
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="register"
                        name="radio-buttons-group"
                    >
                    <FormControlLabel 
                        value="register" 
                        control={<Radio />} 
                        label="Register"
                        checked={mode === "register"}
                        onChange={() => setMode("register")}
                    />

                    <FormControlLabel 
                        value="login" 
                        control={<Radio />} 
                        label="Log in"
                        checked={mode === "login"}
                        onChange={() => setMode("login")}
                    />
                    </RadioGroup>
                </FormControl>

                <Button 
                    variant="contained"
                    type="submit"
                    // disabled={username.length < 8}
                >
                    Submit
                </Button>
        </Form>
        {errorMessage !== null && (
            <Alert severity="error">{errorMessage}</Alert>
        )} 
    </Container>
    )
}

export default Login

