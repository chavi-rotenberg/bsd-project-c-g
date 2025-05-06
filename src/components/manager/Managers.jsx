
import { useEffect, useState} from 'react';
// import './style.css'
import { useDispatch, useSelector } from "react-redux";
// import { searchEventThunk } from '../store/slices/searchEventThunk'
import { Outlet, useNavigate } from 'react-router-dom';

import './manager.css'
import '@emotion/styled'
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// import {EditDocumentIcon} from '@mui/icons-material/EditDocument';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { managersFetchThunk } from '../../store/slices/managers/managersFetch';
import { deleteManagerThunk } from '../../store/slices/managers/deleteManagerThunk';

export const Managers = ( )=>{
   const navigate = useNavigate()
  const dispatch= useDispatch();
  const managers= useSelector(state=>state.manager.managers)
  console.log(managers)
  
  const token = useSelector(state => state.manager.token);
  const failed = useSelector(state => state.manager.failed);
  const [delt,setDelt]=useState(false);
  const [edit,setEdit]=useState(false);
  const [mngId, setMngId]=useState(-1);
  
 useEffect(() => {
    
  dispatch(managersFetchThunk());
       
  // navigate(`/calendar`)
    
}, [])
useEffect(() => {
    
   // if(managers.length>0)
         
  // navigate(`/calendar`)
      
  }, [managers])

const  deleteManager=async(id)=>{
    debugger
    dispatch(deleteManagerThunk(id))
   console.log("success");

}
   

   return  <div className='CustomerPage'>
    <h1 className='myCustomers'>my managers</h1>
    

        <table>
            <thead>
                <tr>
               <th>id</th>
               <th>name</th>
               <th>email</th>
               <th>phone</th>
               <th>fax</th>
               <th>tel</th>
               <th></th>
               <th></th>
            
         </tr>   </thead>
            <tbody>
                {managers.length>0 && managers.map(c=> {return<tr className={c.id===mngId} onClick={() => {setMngId(c.id);setDelt(true);setEdit(true)}} key={c.id}>
                <td >{c.id}</td>
                <td>{c.managerName}</td>
                <td>{c.managerEmail}</td>
                <td>{c.managerPhone}</td>
                <td>{c.managerFax}</td>
                <td>{c.managerTel}</td>
                
                <td>
                {/* <Button variant='outlined' onClick={()=>deleteCustomer(c.instituteId)} endIcon={<DeleteForeverOutlinedIcon htmlColor='#3b3a3d' />}  ></Button> */}
                <IconButton onClick={()=>deleteManager(c.id)} aria-label="delete" size='large' >
                <DeleteForeverOutlinedIcon htmlColor=' #3b3a3d'/>
                </IconButton>
              
                </td>
                <td>
                {/* <Button variant='outlined' style={{backgroundColor:"white"}} onClick={()=>navigate(`editCustomer/${c.instituteId}`)} endIcon={<EditNoteOutlinedIcon  htmlColor='#3b3a3d' />}></Button> */}
                <IconButton onClick={()=>navigate(`editManager/${c.id}`)} aria-label="edit" size='large' >
                <EditNoteOutlinedIcon htmlColor=' #3b3a3d'/>
                </IconButton>
                </td>
               </tr>})}
            </tbody>
        </table>
        <button className='button' onClick={()=>navigate('newManager')}>add</button>

        {/* {delt && <button onClick={()=>deleteCustomer(custId)}>delete</button>}
        {edit && <button onClick={()=>navigate(`editCustomer/${custId}`)}>edit</button>} */}
        {/* <Button variant='text'>nnnngf</Button> */}
 <div>
    <Outlet></Outlet>
 </div>
    </div>
} 