import React, { useEffect, useState } from 'react';
import MonthView from './MonthView';
import WeekView from './WeekView';
import { useSelector } from 'react-redux';
import './calendar.css'
import { DayView } from '../DayView/dayView';
import { useDispatch } from 'react-redux';
// import { getAllStartAQueuesThunk } from '../../redux/slices/queueSlice/getAllStartAvialableQueue';
// import { getQueuesThunk } from '../../redux/slices/queueSlice/getQueueThunk';
// import { getPatientsThunk } from "../../redux/slices/patientSlice/getPatientsThunk"
const Calendar = () => {
    const currentPatient = useSelector(state => state.PatientSlice.currentPatient)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'month' or 'week'
    const [dayDate ,setDayDate] = useState(new Date(2025 , 2 , 24))
    //const patients = useSelector(state => state.PatientSlice.patientsList)
    const [monthName , setMonthName]=  useState("")
    const dispatch = useDispatch()

    // useEffect(() => {
    //     debugger
    //     // if(patients.length > 0)
    //     //   //  dispatch(getQueuesThunk())
    //     // else;
            
    // }, [patients])

    useEffect(() => {
        debugger
       // dispatch(getPatientsThunk())
    }, [])

    const toggleView = () => {
        setView(view === 'month' ? 'week' : 'month');
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextWeek = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    };

    const goToPrevWeek = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    };

    return (
        <div id='calen'>

            {monthName != "" && <DayView date = {dayDate} monthName = {monthName} setMonthName = {setMonthName}></DayView>}
            <h2>שלום {currentPatient.firstName}</h2>
            <button onClick={toggleView}>{view === 'month' ? 'מעבר לתצוגה שבועית' : 'מעבר לתצוגה חודשית'}</button>
            {view === 'month' ? (
                <>
                    <button onClick={goToPrevMonth}>▶חודש הקודם</button>
                    <button onClick={goToNextMonth}>חודש הבא◀</button>
                    <MonthView currentDate={currentDate}  setDayDate={setDayDate} setMonthName = {setMonthName}/>
                </>
            ) : (
                <>
                    <button onClick={goToPrevWeek}>▶שבוע הקודם</button>
                    <button onClick={goToNextWeek}>שבוע הבא◀</button>
                    <WeekView currentDate={currentDate} />
                </>
            )}
            
        </div>
    );
};

export default Calendar;
