import react,{component,useState ,useEffect} from 'react';
import "./items.css"
import axios from "axios";
import Displady from "./disp";
import { BrowserRouter,Route, Router ,useHistory  } from "react-router-dom";



function Add(props){
    const hist=useHistory();
    const [user,setuser]=useState({id:props.location.state? props.location.state.availability.id :null , 
        name:props.location.state? props.location.state.availability.name :null,
        date:props.location.state? props.location.state.availability.date :null});
        //add
    const acion=()=>{
        axios.post("http://localhost:3000/api/get/",{
            id:user.id,
            name:user.name,
            date:user.date
        }).then(res=>{
            console.log(res);
            console.log(user.id)
        });
        hist.push("/display")
    }
    //function to edit
    const onedit=(props,ev)=>{
        axios.put("http://localhost:3000/api/get/",{
            id:user.id,
            name:user.name
        }).then(res=>{
        });
        hist.push("/display")
    }






    return(
        <div className="main">
            Add to database
            <div className="div2">
            <label className="labl">user id:</label>
            <input className="labl1" type="text" value={user.id}  onChange={(e)=> setuser({...user,id:e.target.value})} />
            <label className="labl">user Name:</label>
            <input className="labl1" type="text" value={user.name} onChange={(ee)=> setuser({...user,name:ee.target.value})} />
            <label className="labl">user date:</label>
            <input className="labl1" type="text" value={user.date} onChange={(eee)=> setuser({...user,date:eee.target.value})} />
            </div>
            <button onClick={()=>acion()}>add</button>
            <button onClick={(ev)=>onedit(ev)} >edit</button>

        </div>
    )
}
export default Add
