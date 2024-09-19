import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Container, Row , Col, Form, Toast, ToastContainer} from 'react-bootstrap';
import StyledInputText from '../../components/styled/StyledInputText';
import StyledInputButton from '../../components/styled/StyledButton';
import StyledLink from '../../components/styled/StyledLink';
import StyledLabel from '../../components/styled/StyledLabell';

import 'bootstrap/dist/css/bootstrap.css';

import { userLogin } from '../../api/authApi';
import StyledHeader from '../../components/styled/StyledHeader';
import { AuthContext } from '../../context/AuthContext';



type SigninValues = {
    email: string;
    password: string;
}
const Signin = () =>{
    const {
        register, 
        handleSubmit,
        formState: {errors},
    } = useForm<SigninValues>();

    const [show, setShow] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>();
    const [toastVariant, setToasVariant] = useState<string>('Danger');

    const {setAuthenticated, storeToken} = useContext(AuthContext);

    const navigation = useNavigate();

    const login = async (data: any) =>{
        const loginResponse = await userLogin(data.email, data.password);
        if(loginResponse.status){
            setToastMessage('Login Success ');
            setToasVariant('Primary')
  
            setAuthenticated(true);
            console.log(loginResponse.message['access_token']);
            storeToken(loginResponse.message['access_token'])
            setShow(true)
            setTimeout(() =>{
                navigation("/dashboard")
            }, 3000)
        } else {
            setAuthenticated(false);
            setToastMessage(loginResponse.message);
            setToasVariant('Danger')
            setShow(true)
        }
    }

    return (
        <Row>
            <Container style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Row>
                    <Col> <StyledHeader>Welcome to Easy Generator</StyledHeader></Col>
                </Row>
                <Form autoComplete='off' onSubmit={handleSubmit(login)} style={{border:'1px solid black', textAlign:'center',  borderRadius:'20px' , width:'25%'}}>
                    <Row>
                        <Col>
                        <h3 style={{textAlign:'center'}}>Login Form</h3>
                        </Col>
                    </Row>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            <StyledLabel>Email</StyledLabel>
                        </Form.Label>   
                        <Col sm="10">
                            <StyledInputText type='email'  
                                    {...register("email",{required:"Email is required"})} 
                            />
                             {errors.email && (
                            <p className="text-danger" style={{ fontSize: 14 }}>
                                {errors.email.message}
                            </p>
                            )}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                            <StyledLabel>Password</StyledLabel>
                        </Form.Label>
                        <Col sm="10">
                            <StyledInputText type='password' 
                                    {...register("password",{required:"Password is required"})} 
                                    placeholder='password'/>
                                    {errors.email && (
                                <p className="text-danger" style={{ fontSize: 14 }}>
                                    {errors.email.message}
                                </p>
                                )}
                            </Col>
                    </Form.Group>
                    <Row>
                        <Col><StyledInputButton $primary type="submit"> Login</StyledInputButton></Col>
                    </Row>
                </Form> 
                <Row>
                    <Col>
                    <h3 style={{textAlign:'center'}}>If you do not have an account, <StyledLink href="/signup">Sign up</StyledLink></h3>
                    </Col>
                </Row>
            </Container>
            <ToastContainer
                className="p-3"
                position='bottom-center'
                style={{ zIndex: 1 }}
                >
                <Toast onClose={() => setShow(false)} show={show} 
                    delay={3000} 
                    autohide bg={toastVariant.toLowerCase()}
                    className="d-inline-block m-1">
                    <Toast.Header>
                        <strong className="me-auto">Login Message</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Row>
  )
}

export default Signin;
