import axios from 'axios';
import React, { useState } from 'react';
import {useFormik} from 'formik'
import *as yup from 'yup'
import {Link} from 'react-router-dom'
import env from "react-dotenv";


function SignUp() {
    const [status,setStatus]  = useState( '' );

    const formik = useFormik({
      initialValues:{ 
        name:'',
        email:'',
        phone:'',
        password:'',
        ProfileImage:''
      },
      validationSchema: yup.object({
      name:yup.string().required('Name is required'),
      email:yup.string().email('Invalid email address').required('Email is required'),
      phone:yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/gm, "Invalid Number").required('Mobile Number is required'),
      password:yup.string().required('Password is required')
      }),
      onSubmit:values=>{
        save(values, null, 2)
  
      }
    })
  
  // Adding data using axios
  let save = async(val)=>{
    try {
      let res =  await axios.post(env.API_URL+'users/register',val)     
      setStatus(res.data.message)   
        
    } catch (error) {
      alert("error occured please contact the developer")
      console.log(error)
    } 
  }
  return (
    <div>
        <div className='container d-flex justify-content-center'>
    <div className='row'>
    <img src='https://cdn.dribbble.com/users/3645053/screenshots/10765315/10register_done2.gif' className="w-50 p-3 mx-auto"/>

    <h4 className='text-center contactTitle'>Sign In</h4>
         <form  onSubmit={formik.handleSubmit}>
         <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Name:</label>
            <input id="name" name="name" type="text"
                  className="form-control" placeholder='Enter Name'
                  onChange={formik.handleChange}
                  value={formik.values.name}/>
        {formik.touched.name && formik.errors.name?(<div style={{color:"red"}}>{formik.errors.name}</div>):null}
            </div>

            <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Email ID:</label>
            <input id="email" name="email" type="email"
                  className="form-control" placeholder='Enter Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}/>
        {formik.touched.email && formik.errors.email?(<div style={{color:"red"}}>{formik.errors.email}</div>):null}
            </div>

            <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Phone Number</label>
            <input id="phone" name="phone" type="mobile"
                  className="form-control" placeholder='Enter phone'
                  onChange={formik.handleChange}
                  value={formik.values.phone}/>            
        {formik.touched.phone && formik.errors.phone?(<div style={{color:"red"}}>{formik.errors.phone}</div>):null}
            </div>

            <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Password:</label>
            <input id="password" name="password" type="text"
                  className="form-control" placeholder='Enter password'
                  onChange={formik.handleChange}
                  value={formik.values.password}/>
        {formik.touched.password && formik.errors.password?(<div style={{color:"red"}}>{formik.errors.password}</div>):null}
            </div>
            <div className="mb-3">
            <label htmlFor="ProfileImage" className="col-form-label">Profile Image URL</label>
            <input id="ProfileImage" name="ProfileImage" type="text"
                  className="form-control" placeholder='Enter Image URL'
                  onChange={formik.handleChange}
                  value={formik.values.ProfileImage}/>
        {formik.touched.ProfileImage && formik.errors.ProfileImage?(<div style={{color:"red"}}>{formik.errors.ProfileImage}</div>):null}
            </div>

            <p id="signup-status">
            {status}
            </p>
            <div className="modal-footer">
            
            <div className="mx-auto">

            
            <button type='submit' className="btn btn-primary" >Sign Up</button>&nbsp;&nbsp;
            <Link to="/">                      
                 <button className="btn btn-secondary">Sign In</button>
            </Link>
            </div>

            
            
        </div>
        </form>

        </div>
        </div>

    </div>
  )
}

export default SignUp