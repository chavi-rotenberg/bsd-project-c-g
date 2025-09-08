import { useEffect, useRef, useState } from 'react'
import './calendar.css'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { eventFetchThunk } from '../../store/slices/eventFetchThunk';
// import { deleteEventThunk } from '../store/slices/deleteEventThunk';

export const Calendar = () => {
    const [menu, setMenu] = useState(false);
    const [week, setWeek] = useState([]);
    const param =useParams();
    const [Day, setDay] = useState(new Date());
    const [thisDay, setThisDay] = useState(new Date());
    const [count, setCount] = useState(0);
    const [y, setY] = useState()
    const [x, setX] = useState()
    // const token = useSelector(state => state.customer.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
   // const username = useSelector(state => state.user.userName)
     const events = useSelector(state => state.events.events);
    const [eventToEdit, setEventToEdit] = useState();
    const [eventToEditId, setEventToEditId] = useState();
    const [menuEvent, setmenuEvent] = useState(false);
    const [name, setName] = useState('');
    const [manager,setManager]=useState(false);
    // const [openEvent,setOpenEvent]=
    let s = new Date();
    const refDialog =useRef();

    useEffect(() => {
        myDate();
        window.addEventListener('contextmenu', rightClick);
        return () => {
            window.removeEventListener('contextmenu', rightClick)
        }
        
    }, [])

    useEffect(()=>{
    if(events?.length==0) dispatch(eventFetchThunk())
    },[events])

    const newEvent = () => {
       
        navigate(`event`)
    };
    const newOrder=()=>{
        navigate(`/newOrder`)
    }

    const newEventnow = () => {
        let f = new Date(Day);
        f = (f.toLocaleDateString());
        navigate(`event/${f}`);
    };

    const rightClick = (event) => {
        event.preventDefault();
    };

    const right = () => {
        setCount(count + 1)
        myDate(count + 1)
    };

    const left = () => {
        setCount(count - 1)
        myDate(count - 1);
    }

    const toDay = async () => {
        setCount(0)
        myDate()
    }

    const myDate = (count = 0) => {
        const str = thisDay.toDateString();
        let myday = thisDay.getDay();
        let itsDay = thisDay.getDate();
        let thisWeek = [];
        for (let i = 0; i < 7; i++) {
            let newd = new Date(str);
            let elemntDay
            if (i < myday) {
                //הימים שעברו
                elemntDay = (itsDay + 7 * count - (myday - i))
            }
            else 
                elemntDay = itsDay + 7 * count + ((i - myday))
            newd.setDate(elemntDay);
            let newdstr = newd.toDateString();
            thisWeek.push(newdstr);
        }
        setWeek(thisWeek);
    }
   const myMonth=()=>{

   }
    // const searchEvent = () => {
    //     if (!token) {
    //         navigate(`/login`)
    //     }
    //     else
    //         navigate(`/search`)
    // }

    // const deleteEvent = async () => {
    //     setmenuEvent(false)
    //     setMenu(false)
    //     await dispatch(deleteEventThunk({ token, eventId: eventToEditId }))
    // };

    const edit = () => {
        // let event = events.filter(e => e.id === eventToEditId)[0]
        // let date = new Date(event.date)
        // console.log(date);
        // console.log(`/event/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}/${event.id}`);
        // navigate(`/event/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}/${event.id}`)
    }

    return <div >
     {/* {openEvent && < Event ></Event>} */}
        <div className='cal-title'>
            <div style={{ width: '50%' }}  >
                <div className='cal-user'>
                  !יומן להזמנות מצא את התאריכים הפנויים שלך
                </div>
            </div>
            {/* <div style={{ width: '50%' }} className="login-img">
                <img className='cal-img' src={process.env.PUBLIC_URL + "/pic/logo5.jpg"} alt="" />
            </div> */}
        </div>

        <div className='cal'>
            <button className='title'>לוח שבועי</button>
            {/* <button onClick={() => searchEvent()} className='cal-button'>חיפוש ארוע</button> */}
            <button onClick={() => newEvent()} className='cal-button'>ארוע חדש</button>
            <button onClick={() => left()} className='cal-button'>◀</button>
            <button onClick={() => right()} className='cal-button'>▶</button>
            <button onClick={() => toDay()} className='cal-button'>לתאריך הנוכחי</button>

            {menu && <div
                style={{ position: "absolute", top: y, left: x, fontSize: "5px" }}>
                <button className='menuButton' onClick={() => newEventnow()} >להזמנה  חדשה</button>
                <br />
                {manager && <><button className='menuButton' onClick={() => newEventnow()}>לארוע  חדש</button><br /></>}
                <button className='menuButton' onClick={() => toDay()}>לתאריך הנוכחי</button>
            </div>}
{/* 
            {menuEvent && <div
                style={{ position: "absolute", top: y, left: x, }}>
                <button className='menuButton' onClick={() => edit()} >עריכה</button>
                <br />
                <button className='menuButton' onClick={() => deleteEvent()}>מחיקה</button>
            </div>} */}

            <table className='dairyTable'>
                <thead>
                    <tr>
                        {week.map((d) => <><td onContextMenu={event => {
                            setDay(d)
                            setX(event.clientX);
                            setY(event.clientY);
                            setmenuEvent(false)
                            setMenu(true);
                        }} onDoubleClick={() => { setMenu(false); }} className={d === s.toDateString() ? "th-toDay" : "th-notToDay"} >{d}</td>
                        {/* <td className='cal-white'></td> */}
                        </>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {week.map((d) => <><td
                            className={d === s.toDateString() ? "toDay td" : "notToDay td"} >
                            {events && <>
                                {events.filter(e => {
                                    console.log(new Date(e.date).toDateString()); if (new Date(e.date).toDateString() === d)
                                        return e;
                                }).map(e => <div className={new Date(e.date).toDateString() === s.toDateString() ? "event event-td" : "event event-ntd"} onContextMenu={event => {
                                    setX(event.clientX);
                                    setY(event.clientY);
                                    setEventToEdit(e);
                                    setEventToEditId(e.id);
                                    setmenuEvent(true);
                                    setMenu(false);
                                }} onDoubleClick={() => {
                                    setmenuEvent(false);
                                }} >
                                    {e.time}
                                    <br />
                                    {e.title}
                                </div>)
                                }
                            </>} 

                        </td>
                        {/* <td className='cal-white'></td> */}
                        </>)}
                    </tr>
                </tbody>
            </table>
            <div style={{ width: '50%' }} >
                {/* <img className='sen-img' src={process.env.PUBLIC_URL + "/pic/sen.jpg"} alt="" /> */}
            </div>
        </div>
      
    <div><Outlet></Outlet></div>

</div>}