import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import {Login} from '../actions/userActions'
import FormContainer from './FormContainer'
import { useDispatch, useSelector } from 'react-redux'

const LoginScreen = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,user} =userLogin

    const navigate = useNavigate();

    useEffect(()=>{

        if(user && Object.keys(user).length!==0 ){

            navigate('/Editor')
        }
    },[user,navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(Login(email,password))

    }

    if(loading){
        return <h1>Loading...</h1>
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>username</Form.Label>
                    <Form.Control type='text' placeholder='enter username' value={email} onChange={(e)=>{setEmail(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Button className='my-3' type='submit' variant='primary' >Sign In</Button>
                </Form.Group>       
            </Form>
        </FormContainer>
    )
}

export default LoginScreen