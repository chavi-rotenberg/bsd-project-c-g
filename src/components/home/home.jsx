/**
 * Home Component Documentation
 * 
 * @description
 * This is the main landing page component for a digital office/service booking application.
 * It provides a responsive, user-friendly interface with navigation buttons for different functionalities.
 * 
 * @features
 * - Responsive design using Material-UI Grid and Stack components
 * - Conditional rendering based on user roles (customer/manager)
 * - Navigation buttons for various actions:
 *   1. New Order
 *   2. Order History
 *   3. About Us
 *   4. Calendar (for managers)
 *   5. Activities/Trips
 * 
 * @dependencies
 * - React Router (useNavigate, useParams, Outlet)
 * - Redux (useDispatch, useSelector)
 * - Material-UI components
 * - Custom Logo component
 * 
 * @state
 * - Uses Redux selectors to manage user roles and events
 * - Dispatches eventFetchThunk on component mount
 * 
 * @styling
 * - Responsive layout with mobile and desktop views
 * - Uses a clean, modern design with black, white, and accent colors
 * - Utilizes Material-UI's responsive design system
 * 
 * @navigation
 * Buttons navigate to different routes:
 * - /newOrder
 * - /myOrders
 * - /month (manager only)
 * - /activites
 * 
 * @accessibility
 * - Icons accompany each navigation button
 * - Responsive design ensures usability across devices
 */
// No changes needed as the selection was empty and the instruction was in Hebrew which translates to "Continue, this looks good!!!!"

// The existing code documentation in the file already provides comprehensive details about the Home component
// import { Outlet, useNavigate, useParams } from 'react-router-dom'
// import './home.css'
// import { Button, Stack } from '@mui/material';
// //import { Button } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import SendIcon from '@mui/icons-material/Send';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { eventFetchThunk } from '../../store/slices/events/eventFetchThunk';
// //import Stack from '@mui/material/Stack';
// import { useSelector } from 'react-redux';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import EditCalendarIcon from '@mui/icons-material/EditCalendar';
// import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

// export const Home = () => {

//   const navigate = useNavigate();
//   const dispatch=useDispatch()
//   const event =useSelector(state=>state.events.events);
//   const params = useParams();
//   const id = params.id;

//   useEffect(()=>{
//   dispatch(eventFetchThunk())
//   },[])


//   return <div>
//     {/* <button type="text" >להזמנה</button>
// <button type="text" onClick={()=>navigate(`/myOrders/${id}`)}>הסטורית הזמנות</button>
// <button type="text">.........עלינו</button>
// <button type="text">להזמנות הקרובות שלך</button>
// <button type="text">יומן </button> */}
//     <Stack direction="row" spacing={5}>
//       <Button variant="contained" className='button' onClick={()=>navigate(`newOrder`)} endIcon={<ListAltIcon />}>
//         להזמנה
//       </Button>
//       <Button variant="contained" className='button'  endIcon={<WorkHistoryIcon />} onClick={() => navigate(`myOrders`)}>
//         הסטורית הזמנות
//       </Button>
//       <Button variant="contained" className='button' endIcon={<HowToRegIcon />}>
//         .....עלינו
//       </Button>
//       <Button variant="contained" className='button' endIcon={<EditCalendarIcon />} onClick={() => navigate(`month`)}>
//         יומן
//       </Button>
//       <Button variant="contained" className='button' endIcon={<HourglassBottomIcon />}>
//         להזמנות הקרובות שלך
//       </Button>
//     </Stack>
//     <div><Outlet></Outlet></div>
//   </div>
// }
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './home.css';
import { Button, Stack, Container, Typography, Box, Grid } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventFetchThunk } from '../../store/slices/events/eventFetchThunk';
import { Logo } from '../logoDesign/logo';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const event = useSelector(state => state.events.events);
  const params = useParams();
  const id = params.id;
  const isc=useSelector(state=> state.customer.isC)
  const isM=useSelector(state=> state.manager.isM)
  
  useEffect(() => {
    dispatch(eventFetchThunk());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" className="home-container">
      <Box className="header">
        <Logo size="large" />
        <Typography variant="h6" className="welcome-text">
          ברוכים הבאים למשרד הדיגיטלי שלך
        </Typography>
      </Box>
      
      <Grid container spacing={2} className="navigation-grid">
        <Grid item xs={12} md={10} lg={8} className="nav-buttons-container">
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 2, sm: 3 }} 
            justifyContent="center" 
            alignItems="center"
            flexWrap="wrap"
            className="nav-buttons"
          >
            <Button 
              variant="contained" 
              className='nav-button new-order' 
              onClick={() => navigate(`newOrder`)} 
              startIcon={<ListAltIcon />}
            >
              להזמנה
            </Button>
            
            <Button 
              variant="contained" 
              className='nav-button order-history'  
              startIcon={<WorkHistoryIcon />} 
              onClick={() => navigate(`myOrders`)}
            >
              הסטורית הזמנות
            </Button>
            
            <Button 
              variant="contained" 
              className='nav-button about-us' 
              startIcon={<HowToRegIcon />}
            >
              עלינו
            </Button>
            
            {isM!==-1 && (
            <Button 
            variant="contained" 
            className='nav-button calendar' 
            startIcon={<EditCalendarIcon />} 
            onClick={() => navigate(`month`)}
          >
            יומן
          </Button>)}
          {/* :navigate(`/login`) */}
            
            
            <Button 
              variant="contained" 
              className='nav-button upcoming-orders' 
              startIcon={<HourglassBottomIcon />}
              onClick={() => navigate('activites')}>
             טיולים
            </Button>
          </Stack>
        </Grid>
      </Grid>
      
      <Box className="content-area">
        <Outlet />
      </Box>
    </Container>
  );
};
