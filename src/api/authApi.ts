import axios from "axios"

const BASE_URL = 'http://localhost:8000';

type apiResponse = {
    status: boolean;
    message: any;
}


export const userLogin = async (email: string, password: string) : Promise<apiResponse> =>{
  let loginResp =  {} as apiResponse
  try{
    let params = {
        email: email,
        password: password
    }
    

    const response = await axios.post(`${BASE_URL}/auth/login/`, params);
    
    response.status === 201 ? loginResp.status = true: loginResp.status = false;
    loginResp.message = response.data;
  } catch (err){
    loginResp.status = false;
    loginResp.message = (err as Error).message
  }
  return loginResp;
}

export const userSignUp = async (data:any) : Promise<apiResponse> =>{
    let signUpRespose =  {} as apiResponse
    try{
      let params = {
          email: data.email,
          password: data.password,
          name: data.name
      }
      const response = await axios.post(`${BASE_URL}/user/`, params);
      signUpRespose.status = true;
      signUpRespose.message = response.data;
    } catch (err: any){
        signUpRespose.status = false;
        if (err.response.status === 409){
          signUpRespose.message = "User already existing"
        } else if (err.response.status === 404){
          signUpRespose.message = "User does not existing"
        } else {
          signUpRespose.message = (err as Error).message
        }    
    }
    return signUpRespose;
  }