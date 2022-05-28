// export const login = async()=>
// {
//     return{
//         id:'4',
//         username:'bob',
//         email:"rajeshlkunar@gamil.com"
//     }
// }
import axios from 'axios';

export let login = async(val)=>{  
   

        try {
          let res =  await axios.post('http://localhost:4000/users/login',val)
            if(res)
            {
              return res.data
            }
            else{
                return res.data
            } 
        } catch (error) {
          alert("error occured please contact the developer")
          console.log(error)
        } 
      
  }