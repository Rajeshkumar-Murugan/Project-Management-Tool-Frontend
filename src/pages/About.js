import React, {useContext} from 'react'
import { UserContext } from '../UserContext'
import Navmenu from './Navmenu'


function About() {
    const {user} = useContext(UserContext)

  return (
    <div>
      <Navmenu/>
        <h3>ABOUT</h3>
        <div className="mx-auto align-self-center" style={{width: '400px', textAlign:'center'}}>
        <img src={user.data.ProfileImage} style={{width:'300px', height:"300px"}}/>
        <p><b>Full Name: </b>{user.data.name}</p>
        <p><b>Email ID: </b>{user.data.email}</p>
        <p><b>Phone Number:</b>{user.data.phone}</p>
        </div>
       
        
    </div>
  )
}

export default About