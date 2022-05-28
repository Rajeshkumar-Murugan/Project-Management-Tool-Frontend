import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext'
import axios from 'axios';
import {useFormik} from 'formik'
import *as yup from 'yup'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import env from 'react-dotenv'


function SignIn() {
    const {user,setUser} = useContext(UserContext)

    const formik = useFormik({
        initialValues:{ 
          email:'',
          password:''
        },
        validationSchema: yup.object({
        email:yup.string().email('Invalid email address').required('Email is required'),
        password:yup.string().required('Password is required')
        }),
        onSubmit:values=>{

          loggedin(values, null, 2)
        }
      })

      const [username, setUsername] = useState('')
      const [email, setEmail] = useState('')
      const [Phone, setPhone] = useState('')
      const [loginstatus, setLoginstatus] = useState('')
    
      const [status,setStatus]  = useState( '' );
      const [forgetPWDstatus, setforgetPWDstatus] = useState('')

      let history = useNavigate()

      let loggedin = async(val)=>{  
        try {
          let res =  await axios.post(env.API_URL+'users/login',val)
            if(res)
            {
              setStatus(res.data.message)
              if(res.data.message === "Login successfully"){
                
                    const user = res.data
                    setUser(user)
                
                setUsername(res.data.data.name)
                setEmail(res.data.data.email)
                setPhone(res.data.data.phone)
                setLoginstatus(res.data.message)
                history('/Project-list') 
              }
              else{
                  setStatus(res.data.message)
              }
                   
            }
            else{
              setStatus(res.data.message)         
            } 
        } catch (error) {
          alert("error occured please contact the developer")
          console.log(error)
        } 
      }
    
      const forms = useFormik({
        initialValues:{ 
          email:''
        },
        validationSchema: yup.object({
        email:yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit:values=>{
            // alert(values.email)
            let val = values.email
            forgetpwd(val, null, 2)
        }
      })

      const forgetpwd = async(data) => {
        var obj = JSON.stringify({ email: data});
        let object = JSON.parse(obj)
       
        try {
          let res =  await axios.post(env.API_URL+'users/forget-password',object)
          setforgetPWDstatus(res.data.message)
                
        } catch (error) {
          alert("error occured please contact the developer")
          console.log(error)
        } 
      }

  return (
    <div>
        {/* <MyContext.Provider value={{loginstatus,username,email,Phone}}> */}
        
<div className='container d-flex justify-content-center'>
    <div className='row'>
    <img src='https://i.pinimg.com/originals/58/22/46/58224674a4868f695d1f0e4ff61bf959.gif' className="w-50 p-3 mx-auto"/>

    <h4 className='text-center contactTitle'>Sign In</h4> 
     <form onSubmit={formik.handleSubmit} name="loginform">
            <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Email ID:</label>
            <input id="email" name="email" type="email"
                  className="form-control" placeholder='Enter Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}/>
        {formik.touched.email && formik.errors.email?(<div style={{color:"red"}}>{formik.errors.email}</div>):null}

            </div>
            <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Password:</label>
            <input id="password" name="password" type="text"
                  className="form-control" placeholder='Enter password'
                  onChange={formik.handleChange}
                  value={formik.values.password}/>
        {formik.touched.password && formik.errors.password?(<div style={{color:"red"}}>{formik.errors.password}</div>):null}
            </div>
            <div id='login-status'>{status}</div>
            
            
            <a href='#' data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="text-decoration-none">
                Forget password
                </a>

            
            <div className="modal-footer"> </div>
            <div className="d-flex justify-content-evenly">

            
            <button type="sumbit" className="btn btn-primary">Login</button>
            <Link to="/Sign-up">                      
                 <button className="btn btn-secondary">Sign Up</button>
            </Link>
            </div>
        </form>

        <div>
                

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Forget Password</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
    <form onSubmit={forms.handleSubmit} name="loginform">
    <div className="modal-body ">
        <div className='d-flex justify-content-center'>
        <img src='http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2018/03/16/VpSrwGLX9OChNxj7qKY16tFP/reset_password/images/icon_lock.gif'/>
        </div>

        <div className="mb-3">
        <label htmlFor="recipient-name" className="col-form-label">Email ID:</label>
        <input id="email" name="email" type="email"
            className="form-control" placeholder='Enter Email'
            onChange={forms.handleChange}
            value={forms.values.email}/>
            {forms.touched.email && forms.errors.email?(<div style={{color:"red"}}>{forms.errors.email}</div>):null}
            
        </div>
        <p>{forgetPWDstatus}</p>
    </div>
                    <div className="modal-footer">
                       
                     <button type="sumbit" className="btn btn-primary" >Check</button> 
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    
                    </div>
                    </form>
                </div>
                </div>
                </div>
            </div>
        </div>
        </div>
     {/* </MyContext.Provider> */}
     
    </div>
  )
}

export default SignIn