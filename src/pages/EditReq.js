import axios from 'axios';
import {React, useState, useEffect, useContext} from 'react';
import {useNavigate,useParams} from 'react-router-dom'
import Navmenu from './Navmenu';
import { UserContext } from '../UserContext'
import env from 'react-dotenv'
function EditReq() {
    const {user} = useContext(UserContext)
    let [label,setlabel] =useState([])
    let [Projectdata,setProjectdata] =useState([])
    let [Userdata,setUserdata] =useState([])
    useEffect(() => {
        
        if(params.id){
          getData()
          getLableData()
          getUserData()
          getProjectData()
        }
}, [])


let getUserData = async()=>{
    try {     
      let Userdata = await axios.get(env.API_URL+'user')
      let Uservalue = Userdata.data.data
      setUserdata(Uservalue)
      
    } catch (error) {
      alert("Error Occured while fetching the data please contact developer")
      console.log(error)
    }
  }

  let history = useNavigate()
  let params = useParams()
  let [Issues,setIssues]= useState("");
  let [IssueID,setIssueID]= useState("");
  let [ReqTitle,setReqTitle]= useState("");
  let [Milestone,setMilestone]= useState("");
  let [ReqDes,setReqDes]= useState("");
  let [DeadLine,setDeadLine]= useState("");
  let [AssignTo,setAssignTo]= useState("");
  let [Priority,setPriority]= useState("");
  let [CreatedBy]= useState(user.data.name);
  let [Label,setLabel]= useState("");
  let [ProjectName,setProjectName]= useState("");
  let [MockupScreen,setMockupScreen]= useState("");

  let getData = async()=>{
    try {
        let res= await axios.get(env.API_URL+'Requirement/'+params.id)  
        let Editvalues = res.data.data[0]
        setReqTitle(Editvalues.ReqTitle)
        setMilestone(Editvalues.Milestone)
        setReqDes(Editvalues.ReqDes)
        setDeadLine(Editvalues.DeadLine)
        setAssignTo(Editvalues.AssignTo)
        setPriority(Editvalues.Priority)
        setLabel(Editvalues.Label)
        setProjectName(Editvalues.ProjectName)
        setMockupScreen(Editvalues.MockupScreen)
    } catch (error) {
      alert("Error occured while getting the data please contact developer")
        console.log(error)
    }

  }
// Edit and save data using axios
let save=async ()=>{
    try {
      let res = await axios.put(env.API_URL+'update-Requirement/'+params.id,{
         
          ReqTitle,
          Milestone, 
          ReqDes,
          DeadLine,
          AssignTo,
          Priority,
          CreatedBy, 
          Label,
          ProjectName,
          MockupScreen              
        })
        history('/Requirement')
    } catch (error) {
      alert("Error occured while updating the data please contact the developer")
          console.log(error)
    }
    
    }
    
    
    let getLableData = async()=>{
      try {
      
        let label= await axios.get(env.API_URL+'Label')
        let labelvalue = label.data.data
      setlabel(labelvalue)
      } catch (error) {
        alert("Error Occured while fetching the data please contact developer")
        console.log(error)
      }
      
    
    }

    let getProjectData = async()=>{
      try {     
        let projectdata = await axios.get(env.API_URL)
        let projectvalue = projectdata.data.data
        setProjectdata(projectvalue)
      } catch (error) {
        alert("Error Occured while fetching the data please contact developer")
        console.log(error)
      }
    }

  return (
    <div>
        <Navmenu/>
    <h3 style={{ background:" #ffface"}}>Edit Requirement</h3>
    <div className='container-fluid' style={{background: "bisque"}}>
      <div className="row"> 
      <div className='col-9' style={{ background:" #ffface"}}>
        <div className="col-md-12 formfields">
      <label htmlFor="Image_1" className="form-label">Requirement Title</label>
      <input type="text" value={ReqTitle} className="form-control" id="Image_1" onChange={(e)=>setReqTitle(e.target.value)}/>
        </div>

        <div className="col-md-12 formfields">
          <label htmlFor="Width" className="form-label">MockupScreen</label>
          <input type="text" value={MockupScreen} className="form-control" id="Width" onChange={(e)=>setMockupScreen(e.target.value)}/>
        </div>

        <div className="col-md-12 formfields" style={{height:"330px"}}>
          <label htmlFor="Image_3" className="form-label">Description</label>
          <textarea value={ReqDes} className="form-control" id="Image_3" onChange={(e)=>setReqDes(e.target.value)}
          style={{height:"300px"}}
          />
        </div>

        </div>     
        <div className='col'>
          <div className="col formfields">
           
           <label htmlFor="ProjectName" className="form-label" style={{ display: 'block' }}>
                ProjectName
                  </label>
            <select
                    name="ProjectName"
                    id="ProjectName"
                    className="form-control" placeholder='Select ProjectName'
                    value={ProjectName}
                    onChange={(e)=>setProjectName(e.target.value)}
                  ><option value="" label="Select option" />
                      { Projectdata.map((e,i)=>{
                        return<>
                        <option value= {e.ProjectName} label={e.ProjectName} />
                        </>})}   
                  </select>
          
          
          </div>

          <div className="col formfields">
            <label htmlFor="Image_2" className="form-label">Milestone</label>
            <input type="text" value={Milestone} className="form-control" id="Image_2"onChange={(e)=>setMilestone(e.target.value)}/>
          </div>

          <div className="col formfields">
            <label htmlFor="Width" className="form-label">Label</label>
            <select type="text" value={Label} className="form-control" id="Width" onChange={(e)=>setLabel(e.target.value)}>
            <option value="" label="Select option" />
            { label.map((e,i)=>{
                          return<>
                          <option value= {e.LabelName} label={e.LabelName} />
                          </>})} 
                
              </select>
          
          </div>

          <div className="col formfields">
            <label htmlFor="Name" className="form-label">Dead Line</label>
            <input type="date" value={DeadLine} className="form-control" id="Name" onChange={(e)=>setDeadLine(e.target.value)}/>
          </div>

          <div className="col formfields">
            <label htmlFor="Width" className="form-label">AssignTo</label>
            <select type="text" value={AssignTo} className="form-control" id="Width" onChange={(e)=>setAssignTo(e.target.value)}>
            <option value="" label="Select option" />
            
            { Userdata.map((e,i)=>{
                return<>
                <option value= {e.name} label={e.name} />
                </>})} 
            </select>

          </div>

          <div className="col formfields">
            <label htmlFor="Width" className="form-label">Priority</label>
            <select type="text" value={Priority} className="form-control" id="Width" onChange={(e)=>setPriority(e.target.value)}>
            <option value="" label="Select option" />
                <option value='Emergency' label='Emergency' />
                <option value='High' label='High' />
                <option value='Normal' label='Normal' />
                <option value='Low' label='Low' />
                
              </select>
              
          </div>
       </div>
  

  <div className="col-12 d-grid gap-2">
    <button className="btn btn-primary" onClick={save}>Update</button>
  </div>
</div>
</div>
        
    </div>
  )
}

export default EditReq