import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../logon/logon.css"
import * as React from 'react';
// import Button from '@mui/joy/Button';
// import Divider from '@mui/joy/Divider';
import { useParams } from 'react-router-dom';
import { addOrderThunk } from "../../store/slices/orders/addOrderThunk";
import { updateOrderThunk } from "../../store/slices/orders/updateOrderThunk";
import { findOrderThunk } from "../../store/slices/orders/findOrderThunk";
// import { Input } from "@mui/material";
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
//import Stack from '@mui/joy/Stack';
//import LocationOn from '@mui/icons-material/LocationOn';
// import { Stack } from "@mui/material";
// import { LocationOn } from "@mui/icons-material";
export const AddEditOrder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const orders = useSelector(state => state.order.orders)
  const myOrder = useSelector(state => state.order.order)
  const isM=useSelector(state=>state.manager.isM)

  // const [order, setOrder] = useState({
  //     instituteName: "", mobile: "", email: "",
  //     fax: "", contactName: "", contactPhone: "", city: "", community: "", amount: 0,
  //     due: 0
  // });
  const [order, setOrder] = useState(myOrder)
  const [edit, setEdit] = useState(false);
  const refDialog = useRef();

  const [id, setId] = useState();
  const [currency, setCurrency] = React.useState('dollar');
  useEffect(() => {
    if(params.id){
      setOrder({...order,customerId:params.id})
    }
    //    setId(params.id)
    //    console.log(id);
    else if(params.orderId) {
      debugger
      console.log(params.orderId);
      //setId(parseInt(params.id))
      // console.log(id)
      //let c = orders.find(x => x.instituteId===parseInt(params.id));
      dispatch(findOrderThunk({ id: params.orderId }))
      console.log(myOrder);
      // for (const key in object) {
      //     if (Object.hasOwnProperty.call(object, key)) {
      //         const element = object[key];

      //     }
      //}
      // 
      // setOrder(order);
      console.log(order);
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
    if ( order.activityId && order.customerId) {
      debugger
      if (edit) {

        dispatch(updateOrderThunk({ details: order }))
        refDialog.current.close();

        navigate('/orders')
      }
      else {
        
        console.log(params.id);
        dispatch(addOrderThunk({ details: order }));
        refDialog.current.close();
        if(params.id)
        navigate(`/home/${params.id}`)
        // console.log(token);
        else
        navigate('/orders')
      }
      
    }
    else {
      alert("can't add/ edit")

    }
  }
  const cancele = () => {
    console.log(isM);
    refDialog.current.close();
    if(params.id && params.orderId)
       navigate(`/home/${params.id}/myOrders`)
    else if(params.id && parseInt(params.id)===isM)
       navigate(`/manager/${params.id}`)
    else if(params.id)
       navigate(`/home/${params.id}`)
    else navigate(`/orders`)
}
  return <dialog ref={refDialog} className="inDiv" >

    <br /><input className="logBut" type="text" value={order?.payment} placeholder="insert payment" onChange={e => setOrder({ ...order, payment: parseInt(e.target.value) })} />
    <br />{!params.id && <>
      <input className="logBut" type="text" value={order?.customerId} placeholder="insert customerId" onChange={e => setOrder({ ...order, customerId: parseInt(e.target.value) })} />
      <br /></>
    }
    <input className="logBut" type="text" value={order?.brokerId} placeholder="insert brokerId" onChange={e => setOrder({ ...order, brokerId: parseInt(e.target.value) })} />
    <br /><input className="logBut" type="text" value={order?.amountOfParticipants} placeholder="insert amountOfParticipants" onChange={e => setOrder({ ...order, amountOfParticipants: parseInt(e.target.value) })} />
    <br /><input className="logBut" type="date" value={order?.date} placeholder="insert date" onChange={e => setOrder({ ...order, date: e.target.value })} />
    <br /><input className="logBut" type="text" value={order?.activityId} placeholder="insert activityId" onChange={e => setOrder({ ...order, activityId: parseInt(e.target.value) })} />
    <br /><input className="logBut" type="text" value={order?.activeHour} placeholder="insert activeHour" onChange={e => setOrder({ ...order, activeHour: e.target.value })} />
    {/* <br /><input className="logBut" type="text" value={order?.activeMinutes} placeholder="insert activeMinutes" onChange={e => setOrder({ ...order, activeMinutes:parseInt(e.target.value)})} /> */}
    <br /><button className="login" onClick={() => { logOnn() }}>save</button>
    <br /><button className="login" onClick={() => { cancele() }}>back</button>




    {/* <Input
        placeholder="סוג טיול"
        startDecorator={{ dollar: '$', baht: '฿', yen: '¥' }[currency]}
        endDecorator={
          <React.Fragment>
            <Divider orientation="vertical" />
            <Select
              variant="plain"
              value={currency}
              onChange={(_, value) => setCurrency(value)}
              slotProps={{
                listbox: {
                  variant: 'outlined',
                },
              }}
              sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
            >
              <Option value="dollar">US dollar</Option>
              <Option value="baht">Thai baht</Option>
              <Option value="yen">Japanese yen</Option>
            </Select>
          </React.Fragment>
        }
        sx={{ width: 300 }}
      />
      <Input
        placeholder="Your location"
        startDecorator={
          <Button variant="soft" color="neutral" startDecorator={<LocationOn/>}>
            Locate
          </Button>
        }
        sx={{ width: 300 }}
      /> */}
    {/* {raute && refDialog.current.close()} */}
  </dialog>

}