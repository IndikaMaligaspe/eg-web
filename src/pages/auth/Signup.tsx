import React, {useContext, useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Container, Row , Col, Form, Toast, ToastContainer} from 'react-bootstrap';
import StyledInputText from '../../components/styled/StyledInputText';
import StyledInputButton from '../../components/styled/StyledButton';
import StyledLabel from '../../components/styled/StyledLabell';
import 'bootstrap/dist/css/bootstrap.css';

import { userSignUp , userLogin} from '../../api/authApi';
import StyledHeader from '../../components/styled/StyledHeader';
import { AuthContext } from '../../context/AuthContext';

type FormValues = {
  name:string,
  email:string,
  password:string,
}

export default function Signup() {
  const {
    register, 
    handleSubmit,
    formState: {errors},
} = useForm<FormValues>();


const [show, setShow] = useState(false);
const [toastMessage, setToastMessage] = useState<string>();
const [toastVariant, setToasVariant] = useState<string>('Danger');
const {setAuthenticated, storeToken} = useContext(AuthContext);
const navigation = useNavigate();


 const signup = async (data:any) =>{
    const signUpResponse = await userSignUp(data);
    

    if(signUpResponse.status){
        setToastMessage('Signup Success ');
        setToasVariant('Primary')
        const loginResponse = await userLogin(data.email, data.password);
        if(loginResponse.status){
          setAuthenticated(true);
          storeToken(loginResponse.message['access_token'])
          setTimeout(() =>{
              navigation("/dashboard")
          }, 5000)
        }
    } else {
      setAuthenticated(false);
      setToastMessage('Signup Error :'+signUpResponse.message);
      setToasVariant('Danger')
    }
    setShow(true)
  }
  return (
    <Row>
      <Container style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Row>
          <Col>
            <StyledHeader>Welcome to Easy Generator</StyledHeader>
          </Col>
        </Row>
        <Form autoComplete='off' onSubmit={handleSubmit(signup)} style={{border:'1px solid black', textAlign:'center',  borderRadius:'20px' , width:'20%'}}>
          <Row>
              <Col>
              <h3 style={{textAlign:'center'}}>Sign Up Form</h3>
              </Col>
          </Row>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                <StyledLabel>Name</StyledLabel>
              </Form.Label>
              <Col sm="10">
                <StyledInputText  
                  {...register("name",{required:"Name is required"})} 
                  placeholder='User Name' type='text'/>
                  {errors.name && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    {errors?.name?.message}
                  </p>
                  )}

              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                 <StyledLabel>Email</StyledLabel>
                 </Form.Label>
                 <Col sm="10">
                  <StyledInputText type='email'  
                    {...register("email",{required:"Email is required"})} 
                    placeholder='john@site.com'/>

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
              <Col >
                <StyledInputText type='password'  
                  {...register("password",{
                      required:"Password is required",
                      minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters"
                      },
                      pattern: {
                        value: /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/,
                        message: "Password must have 1 letter, 1 number, and 1 special character"
                      }
                    }
                  )} 
                />

                 {errors.password && (
                  <p className="text-danger" style={{ fontSize: 14 }}>
                    {errors.password.message}
                  </p>
                  )}

              </Col>
            </Form.Group>
            <Row>
                <Col><StyledInputButton  $primary type="submit"> Sign up</StyledInputButton></Col>
            </Row>
          </Form>
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
