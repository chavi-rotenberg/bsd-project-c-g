import { useEffect, useRef, useState } from 'react'
// import './style.css'
import { addEventThunk } from '../../store/slices/events/addEventThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editEventThunk } from '../../store/slices/events/editEventThunk';
import { findEventThunkById } from '../../store/slices/events/findEvenThunkById';
// import Input from '@mui/joy/Input';

export const Event = () => {

    const navigate = useNavigate();
    // const token = useSelector(state => state.user.token);
    // const events = useSelector(state => state.events.events);
    const evnt=useSelector(state=> state.events.evnt)
    const dispatch = useDispatch();
    const {id, month, day, year, eventId } = useParams();
    const [thisDay, setThisDay] = useState(new Date());
    const [thisEvent, setThisEvent] = useState({})
    const [title, settitle] = useState(" ");
    const [date, setDate] = useState(thisDay);
    const [time, setTime] = useState(new Date().getTime());
    const [description, setDescription] = useState(" ");
    const [lenOfEvent, setLenOfEvent] = useState(" ");
    // const [id, setId] = useState()
    const refDialog = useRef();

    // const [details, setDetails] = useState({
    //     title: thisEvent ? thisEvent.title : "",
    //     date: thisEvent ? thisEvent.date : thisDay,
    //     time: thisEvent ? thisEvent.time : new Date().getTime(),
    //     description: thisEvent ? thisEvent.description : "",
    //     lenOfEvent: thisEvent ? thisEvent.lenOfEvent : 0,
    // });

    useEffect(() => {
        refDialog.current.showModal();
    }, [])

    useEffect(() => {
        if (day && !eventId) {
            let s = `${year}-${day}-${month}`

            if (month < 10)
                s = `${year}-0${day}-${month}`
            if (day < 10)
                s = `${year}-${day}-0${month}`
            if (month < 10 && day < 10)
                s = `${year}-0${day}-0${month}`

            //setDetails({ ...details, date: s })
            setThisEvent({...thisEvent,date:s})
        }
        if (eventId) {
           // let i = events.filter(x => x.id === eventId)[0]
            dispatch(findEventThunkById({eventId:parseInt(eventId)}))
            console.log(evnt);
            setThisEvent(evnt);
            //let x = { "title": i.title, "date": i.date, "time": i.time, "description": i.description,"lenOfEvent":i.lenOfEvent }
            //setDetails(x);
            // if (i) {
            //     console.log(i.title + ',' + i.date + ',' + i.time + ',' + i.description + '\n id--' + i.id);
            //     console.log(thisEvent.title + ',' + thisEvent.date + ',' + thisEvent.time + ',' + thisEvent.description + '\n id--' + thisEvent.id);
            //     setId(i.id)
            //     settitle(i.title)
            //     setDate(i.date)
            //     setTime(i.time)
            //     setDescription(i.description)
            //     setDetails(i);
            //     setLenOfEvent(i);
            //     console.log(details.title + '*' + details.date + '*' + details.time + '*' + details.description);
            // }
        }
    }, [eventId, day])

    const cancele = () => {
        refDialog.current.close();
        navigate(`/home/${id}/month`)
    }

    const saveEvent = async () => {

      if(thisEvent.date && thisEvent.title)
        if(eventId){
       
            dispatch(editEventThunk({details:thisEvent}));
        }
        else{
            dispatch(addEventThunk({details:thisEvent}))
        }
        refDialog.current.close();
        navigate(`/home/${id}/calandar`)

    }

    const saveEditEvent = async () => {
        dispatch(editEventThunk({ event: { title: title, date: date, time: time, description: description, id: eventId,lenOfEvent:lenOfEvent }}))
        refDialog.current.close();
        navigate(`/home/${id}/calandar`)

    }

    return <dialog ref={refDialog} classtitle='event-dialog'>

        <div style={{ width: '20%', alignItems: 'center', marginRight: '250px' }} classtitle="login-img">
            <img classtitle='eve-img' src={process.env.PUBLIC_URL + "/pic/444.jpg"} alt="" />
        </div>

        {/* {!eventId && <div>
            <input type="text" placeholder="eventHeader" onChange={(e) => setDetails({ ...details, title: e.target.value })} />
            {day && <input type="text" value={`${month}-${day}-${year}`} placeholder="event date" />}
            {!day && <input type="date" placeholder="event date" onChange={(e) => setDetails({ ...details, date: e.target.value })} />}
            <input type="time" placeholder="event time" onChange={(e) => setDetails({ ...details, time: e.target.value })} />
            <br />
            <textarea title="" id="" cols="30" rows="5" onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
            <br />
            <input type="number" placeholder="lenOfEvent" onChange={(e) => setDetails({ ...details, lenOfEvent: e.target.value })} />

            <button classtitle="b-event" onClick={() => saveEvent()}>save </button>
            <button classtitle="b-event" onClick={() => cancele()}>cancele</button>
        </div>}

        {eventId && <div>
            <input type="text" value={`${title}`} onChange={(e) =>
                settitle(e.target.value)} />
            <input type="text" value={`${date}`} placeholder="event date" onChange={(e) => setDate(e.target.value)
            } />
            <input type="time" value={`${time}`} placeholder="event time" onChange={(e) => setTime(e.target.value)
            } />
            <br />
            <textarea value={`${description}`} title="" id="" cols="30" rows="5" onChange={(e) => setDescription(e.target.value)
            }></textarea>
            <br />
            <button classtitle="b-event" onClick={() => saveEditEvent()}>save </button>
            <button classtitle="b-event" onClick={() => cancele()}>cancele</button>
        </div>
        } */}
        <br />
        <div>
        <button  className="login" onClick={() => { saveEvent() }}>save</button> 
        <button  className="login" onClick={() => { cancele() }}>back</button>
         </div>
         {/* <Input >Label</Input> */}

        <br /><input className="logBut" type="text" value={thisEvent?.title} placeholder="insert title" onChange={e => setThisEvent({ ...thisEvent, title: e.target.value })} />
        <br /><input className="logBut" type="date" value={thisEvent?.date} placeholder="insert date" onChange={e => setThisEvent({ ...thisEvent, date: e.target.value })} />
        <br /><input className="logBut" type="text" value={thisEvent?.time} placeholder="insert time" onChange={e => setThisEvent({ ...thisEvent, time: e.target.value })} />
        <br /><textarea className="logBut" type="text" value={thisEvent?.description} placeholder="insert description" onChange={e => setThisEvent({ ...thisEvent, description: e.target.value })} />
        <br /><input className="logBut" type="text" value={thisEvent?.lenOfEvent} placeholder="insert lenOfEvent" onChange={e => setThisEvent({ ...thisEvent, lenOfEvent: parseInt(e.target.value) })} />
     

    </dialog>
}
