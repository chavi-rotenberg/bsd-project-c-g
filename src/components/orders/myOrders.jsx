
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { searchEventThunk } from '../store/slices/searchEventThunk'
import { Outlet, useNavigate } from 'react-router-dom';
//import { ordersFetchThunk } from '../../store/slices/ordersFetch';
import './order.css'
//import { ordersFetchThunkById } from '../../store/slices/orderFetchById';
import { useParams } from 'react-router-dom';
//import {  useFormStatus } from 'react-dom';

import { customersFetchThunkById } from '../../store/slices/customers/customerFetchThunkById';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// import {EditDocumentIcon} from '@mui/icons-material/EditDocument';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { deleteOrderThunk } from '../../store/slices/orders/deleteOrderThunk';

export const MyOrders = () => {
    const navigate = useNavigate()
    debugger
    //const status = useForm();
    //const status =useFormStatus();
    const params = useParams();
    const dispatch = useDispatch();
    const myOrders = useSelector(state => state.customer.MyOrders);
    console.log(myOrders);
    const id = params.id;
    const token = useSelector(state => state.order.token);
    const failed = useSelector(state => state.order.failed);
    const [today, setToday] = useState(new Date().toLocaleDateString());
    const [before, setBefore] = useState(false);

    useEffect(() => {
        debugger
        //dispatch(ordersFetchThunkById(id));
        dispatch(customersFetchThunkById({ id }));
        console.log(myOrders);
        //alert("I am in myOrders");
        // navigate(`/calendar`)

        if (today === new Date().toLocaleDateString()) {
            setToday(splitToDate(today));
        }

    }, [])
    // useEffect(() => {

    //     // if(orders.length>0)

    //     // navigate(`/calendar`)

    // }, [orders])
    
    useEffect(() => {

        // dispatch(ordersFetchThunkById(id));
        console.log(myOrders);

        // navigate(`/calendar`)

    }, [myOrders])
    const splitToDate = (d) => {
        const s = d.split("/");
        console.log(s);
        if (parseInt(s[0]) < 10)
            s[0] = "0" + s[0];
        if (parseInt(s[1]) < 10)
            s[1] = "0" + s[1];
        d = s[2] + "-" + s[0] + "-" + s[1];
        console.log(d);
        return d;
    }
    const deleteOrder = async (orderId) => {
        debugger
        dispatch(deleteOrderThunk(orderId))
        console.log("success");

    }
    const cheakDate = (date) => {
        //2026-03-19

        const d1 = date.split("-");
        const d2 = today.split("-");
        console.log(d1, d2);
        if (d1[0] < d2[0])
            //    setBefore(true)
            return true
        else if (d1[0] === d2[0] && d1[1] < d2[1])
            //  setBefore(true)
            return true
        else if (d1[0] === d2[0] && d1[1] === d2[1] && d1[2] < d2[2])
            //    setBefore(true)
            return true
        else //setBefore(false) 
            return false
    }
    return <div className='orderPage'>
        <h1 className='myOrders'>הסטורית הזמנות שלי</h1>

        {/* {status.pending && <button>jkjuhgjifi</button>} */}
        <table>
            <thead>
                <tr>
                    <th>קוד הזמנה</th>
                    <th>שם מתווך/ת</th>
                    <th>כמות משתתפים</th>
                    <th>תאריך</th>
                    <th>שם פעילות</th>
                    <th>שעה</th>
                    {/* <th>דקות</th> */}
                    <th>סה"כ לתשלום</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {myOrders && myOrders.map(o => {
                    return <>{cheakDate(o.date) === false && <tr key={o.orderId}>
                        <td>{o.orderId}</td>
                        <td>{o.brokerName}</td>
                        <td>{o.amountOfParticipants}</td>
                        <td>{o.date}</td>
                        <td>{o.activityName}</td>
                        <td>{o.activeHour}</td>
                        {/* <td>{o.activeMinutes}</td> */}
                        <td>{o.payment}</td>
                        <td>
                            <IconButton onClick={() => deleteOrder(o.orderId)} aria-label="delete" size='large' >
                                <DeleteForeverOutlinedIcon htmlColor=' #3b3a3d' />
                            </IconButton>
                        </td>
                        <td>
                            <IconButton onClick={() => navigate(`editOrder/${o.orderId}`)} aria-label="edit" size='large' >
                                <EditNoteOutlinedIcon htmlColor=' #3b3a3d' />
                            </IconButton>
                        </td>
                    </tr>}</>
                })}
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <th>קוד הזמנה</th>
                    <th>שם מתווך/ת</th>
                    <th>כמות משתתפים</th>
                    <th>תאריך</th>
                    <th>שם פעילות</th>
                    <th>שעה</th>
                    <th>סה"כ לתשלום</th>
                  
                </tr>
            </thead>
            <tbody>
                {myOrders && myOrders.map(o => {
                    cheakDate(o.date)
                    return <>{cheakDate(o.date) === true && <tr key={o.orderId}>
                        <td>{o.orderId}</td>
                        <td>{o.brokerName}</td>
                        <td>{o.amountOfParticipants}</td>
                        <td>{o.date}</td>
                        <td>{o.activityName}</td>
                        <td>{o.activeHour}</td>
                        <td>{o.payment}</td>
                     
                    </tr>}</>
                })}
            </tbody>
        </table>
        <Button  variant='contained' className='button' onClick={() => navigate(`/home/${params.id}`)}>back</Button>
        <div><Outlet></Outlet></div>
    </div>
} 