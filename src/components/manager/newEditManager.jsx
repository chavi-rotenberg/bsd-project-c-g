import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./logon.css"
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { managersFetchThunkById } from "../../store/slices/managers/managerFetchThunkById";
import { updateManagerThunk } from "../../store/slices/managers/updateManagerThunk";
import { addManagerThunk } from "../../store/slices/managers/addManagerThunk";

export const NewEditManager = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const managers = useSelector(state => state.manager.managers)
    const token = useSelector(state => state.manager.token)
    const myManager = useSelector(state => state.manager.manager)
    const refDialog = useRef();

    // const [manager, setManager] = useState({
    //     instituteName: "", mobile: "", email: "",
    //     fax: "", contactName: "", contactPhone: "", city: "", community: "", amount: 0,
    //     due: 0
    // });
    const [manager, setManager] = useState(myManager)
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(-1)
    useEffect(() => {

        //    setId(params.id)
        //    console.log(id);
        if (params.id) {
            console.log(params.id);

            //setId(parseInt(params.id))
            // console.log(id)
            // let c = Managers.find(x => x.instituteId===parseInt(params.id));
            dispatch(managersFetchThunkById({ id: params.id }));
            setManager(myManager);
            // for (const key in object) {
            //     if (Object.hasOwnProperty.call(object, key)) {
            //         const element = object[key];

            //     }.
            //}
            // 
            // setManager(c);
            console.log(manager);
            setEdit(true)
        }
        refDialog.current.showModal();

    }, [])
    //const refDialog = useRef()
    // const navigate = useNavigate();
    // useEffect(() => {
    //     refDialog.current.showModal();
    //  }, []);
    const logOnn = () => {
        debugger
        if (edit) {
            dispatch(updateManagerThunk({ details: manager }))
            refDialog.current.close();

            navigate('/Managers')
        }
        else {
            dispatch(addManagerThunk({ details: manager }));
            // console.log(token);
            refDialog.current.close();

            navigate('/Managers')

        }

        // if (token === 0) {
        //     // navigate(`/home/${}`);
        //     console.log("aabb");
        // }
        // dispatch(setCurrentUser({ username: user.username, password: user.password, token: -1 }))
        // navigate("/calender");
    }

    return <dialog ref={refDialog} className="inDiv" >

        <br /><input className="logBut" type="text" value={manager?.managerName} placeholder="insert name" onChange={e => setManager({ ...manager, managerName: e.target.value })} />
        <br /><input className="logBut" type="email" value={manager?.managerEmail} placeholder="insert email" onChange={e => setManager({ ...manager, managerEmail: e.target.value })} />
        <br /><input className="logBut" type="text" value={manager?.managerPhone} placeholder="insert phone" onChange={e => setManager({ ...manager, managerPhone: e.target.value })} />
        <br /><input className="logBut" type="text" value={manager?.managerFax} placeholder="insert fax" onChange={e => setManager({ ...manager, managerFax: e.target.value })} />
        <br /><input className="logBut" type="text" value={manager?.managerTel} placeholder="insert tel" onChange={e => setManager({ ...manager, managerTel: e.target.value })} />
       
        
        {/* {raute && refDialog.current.close()} */}
        <br /><button className="login" onClick={() => { logOnn() }}>save</button>
        {params.id && <button className="login" onClick={() => {
            refDialog.current.close();

            navigate('/Managers')
        }}>back</button>
        }
    </dialog>
}

