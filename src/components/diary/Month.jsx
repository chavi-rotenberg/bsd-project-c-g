// בס"ד

import { DayView } from "../DayView/dayView";
import { Week } from "./Week";
import { useEffect, useState } from 'react'
import './calendar.css'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { eventFetchThunk } from '../../store/slices/eventFetchThunk';

import { Button } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import IconButton from '@mui/material/IconButton';
import TimerSharpIcon from '@mui/icons-material/TimerSharp';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useDispatch, useSelector } from "react-redux";
import { eventFetchThunk } from "../../store/slices/events/eventFetchThunk";
import { customersFetchThunkById } from "../../store/slices/customers/customerFetchThunkById";
import { ordersFetchThunk } from "../../store/slices/orders/ordersFetch";

export const Month = ({ }) => {
    debugger
    const parms = useParams();
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [myView, setMyView] = useState("תצוגה חודשית")
    const [notview, setNotView] = useState("תצוגה שבועית")
    const [dayView, setDayView] = useState(0)
    const myOrders = useSelector(state => state.customer.MyOrders);
    const orders = useSelector(state => state.order.orders)
    // 'month' or 'week'
    const [dayDate, setDayDate] = useState(new Date(2025, 2, 24))
    //const patients = useSelector(state => state.PatientSlice.patientsList)
    const [monthName, setMonthName] = useState("")
    const dispatch = useDispatch();
    // const username = useSelector(state => state.user.userName)
    const events = useSelector(state => state.events.events);

    useEffect(() => {
        if (events?.length == 0) dispatch(eventFetchThunk())
    }, [events])
    useEffect(() => {
        if (myOrders?.length == 0) dispatch(customersFetchThunkById({ id: parseInt(parms.id) }))
    }, [myOrders])
    useEffect(() => {
        if (orders?.length == 0) dispatch(ordersFetchThunk())
    }, [orders])
    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
    const newEvent = () => {

        navigate(`/home/${parms.id}/event`)
    };
    const newOrder = () => {
        navigate(`/newOrder`)
    }
    // const goToNextWeek = () => {
    //     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    // };

    // const goToPrevWeek = () => {
    //     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    // };
    const changeView = (view) => {
        if (view === 'תצוגה שבועית') {
            setMyView('תצוגה חודשית')
            setNotView('תצוגה שבועית')
        }
        else {
            setMyView('תצוגה שבועית')
            setNotView('תצוגה חודשית')
        }
    }
    const toDay = () => {
        // setCount(0)
        // myDate()
        setCurrentDate(new Date());
    }
    const openDayWiew = (day) => {
        // setDayView(day)
        // if(dayView===day){
        //     navigate(`day/${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`)
        // }
        navigate(`/home/${parms.id}/day/${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`)

    }

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
    const renderMonthDays = () => {

        // Get the first day of the month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
        const firstDayWeekday = firstDayOfMonth.getDay();

        // Calculate the number of days in the month
        const daysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

        // Create calendar cells array
        const calendarCells = [];
        // const eventToDay=[]
        // Add weekday headers
        weekDays.forEach(day => {
            calendarCells.push(
                <div key={`header-${day}`} style={{

                    // backgroundColor: '#4CAF50',
                    color: 'white',
                    height: '4vh',
                    padding: "10px",
                    textAlign: 'center',
                    fontWeight: 'bold',
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: '5px'
                }}>
                    {day}
                    {/* {eventToDay} */}
                </div>
            );
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayWeekday; i++) {
            calendarCells.push(
                <div key={`empty-${i}`} style={{
                    border: "1px solid #eee",
                    padding: "10px",
                    height: '4vh',
                    textAlign: 'center',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9'
                }}></div>
            );
        }

        // Add cells for each day of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            debugger
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
            debugger
            const eventToday = []
            const ordersToday = []
            const otherOrders=[]
            events.forEach(ev => {
                ev.date === splitToDate(date.toLocaleDateString()) &&
                eventToday.push(
                    <div key={ev.id} style={{
                        border: "solid 2px black"
                    }}>
                        {ev.time}
                        <br />
                        {ev.time}
                    </div>
                )
            })
            myOrders.forEach(o => {
                o.date === splitToDate(date.toLocaleDateString()) &&
                ordersToday.push(
                    <div key={o.orderId} style={{
                        border: "solid 2px black"
                    }}>
                        {o.activeHour}
                        <br />
                        {o.activityName}
                        <br />
                        {o.customerName}
                          {/* <IconButton  aria-label="edit" size='large' >
                        <StarsIcon htmlColor=' #3b3a3d' />
                    </IconButton> */}
                    </div>
                )
            })
            orders.forEach(o => {
                (o.date === splitToDate(date.toLocaleDateString()) && o.customerId!==parseInt(parms.id) )&&
                otherOrders.push(
                    <div key={o.orderId} style={{
                        border: "solid 2px black"
                    }}>
                        {o.activeHour}
                        <br />
                        {o.activityName}
                        <br />
                        {o.customerName}
                          {/* <IconButton  aria-label="edit" size='large' >
                        <StarsIcon htmlColor=' #3b3a3d' />
                    </IconButton> */}
                    </div>
                )
            })
            calendarCells.push(

                <div onClick={() => { setDayDate(date); setMonthName(monthNames[date.getMonth()]); openDayWiew(date); }}
                    key={`day-${day}`} style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        textAlign: 'center',
                        height: '4vh',
                        borderRadius: '5px',
                        color: isToday ? 'white' : 'black',
                        backgroundColor: isToday ? '#764ba2' : 'white'
                    }}>
                    {day}
                    <></>{( ordersToday?.length >0) &&
                    <IconButton  aria-label="edit" size='small' >
                        <StarsIcon htmlColor={isToday?'white':'goldenrod'} />
                    </IconButton>}
                    {(eventToday?.length>0 || otherOrders?.length >0) &&
                    <IconButton  aria-label="edit" size='small' >
                        <PlaylistAddCheckCircleIcon htmlColor={isToday?'white':'silver'} />
                    </IconButton>}
                    {/* {eventToday}
                    {ordersToday} */}
                    {/* {alert(day)} */}


                    <div>

                    </div>
                </div>
            );
        }


        // const newEventnow = () => {
        //     let f = new Date(Day);
        //     f = (f.toLocaleDateString());
        //     navigate(`event/${f}`);
        // };

        // const rightClick = (event) => {
        //     event.preventDefault();
        // };

        // const right = () => {
        //     if (view === 'תצוגה שבועית') {
        //         setCount(count + 1)
        //         myDate(count + 1)
        //     }

        // };

        // const left = () => {
        //     if (view === 'תצוגה שבועית') {
        //         setCount(count - 1)
        //         myDate(count - 1)
        //     }
        // }



        // const myDate = (count = 0) => {
        //     const str = thisDay.toDateString();
        //     let myday = thisDay.getDay();
        //     let itsDay = thisDay.getDate();
        //     let thisWeek = [];
        //     for (let i = 0; i < 7; i++) {
        //         let newd = new Date(str);
        //         let elemntDay
        //         if (i < myday) {
        //             //הימים שעברו
        //             elemntDay = (itsDay + 7 * count - (myday - i))
        //         }
        //         else
        //             elemntDay = itsDay + 7 * count + ((i - myday))
        //         newd.setDate(elemntDay);
        //         let newdstr = newd.toDateString();
        //         thisWeek.push(newdstr);
        //     }
        //     setWeek(thisWeek);
        // }

        return (

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "5px"
            }}>

                {calendarCells}
            </div>
        );
    };

    const monthNames = [
        'ינואר', 'פבואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
        'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
    ];

    return (<>


        {myView === 'תצוגה חודשית' && <>
            <Button variant="contained" className='button' onClick={() => {
                changeView(myView); //navigate(`home/${param.id}/calandar`) 
            }} endIcon={<DateRangeIcon />}>{notview}
            </Button>
            <Button variant="contained" onClick={() => newEvent()} className='button cal-button' endIcon={<AddPhotoAlternateSharpIcon />}>
                ארוע חדש
            </Button>

            <Button variant="contained" onClick={() => goToPrevMonth()} className='button cal-button' endIcon={<ArrowBackIosIcon />}>

            </Button>
            <Button variant="contained" onClick={() => goToNextMonth()} className='button cal-button' endIcon={<ArrowForwardIosIcon />}>

            </Button>

            <Button variant="contained" onClick={() => toDay()} className='button cal-button' endIcon={<TimerSharpIcon />}>
                לתאריך הנוכחי
            </Button>
            <div style={{
                padding: "20px",
                border: "3px solid #764ba2",
                height: "55vh",
                margin: "5% 20%",
                width: "60%",
                borderRadius: "10px",
                // boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}>
                <h2 style={{ textAlign: 'center' }}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>

                {renderMonthDays()}

            </div></>
        }
        {myView === "תצוגה שבועית" &&
            navigate(`/home/${parms.id}/week`)
        }
        <div><Outlet></Outlet></div>
    </>
    );
};



