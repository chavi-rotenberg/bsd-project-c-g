import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Paper, 
  Divider,
  Button,
  CircularProgress
} from '@mui/material';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { eventFetchThunk } from '../../store/slices/events/eventFetchThunk';
import { DashboardCard } from './DashboardCard';
import { Navigation } from './navigation';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import './Dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const [managerData, setManagerData] = useState({
    name: 'משתמש',
    upcomingEvents: 0,
    totalEvents: 0,
    totalClients: 0,
    monthlyRevenue: 0,
    recentEvents: []
  });
  
  const events = useSelector(state => state.events.events);
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(eventFetchThunk());
      setLoading(false);
      
      // This is where you would normally process the data from your Redux store
      // For now, we'll use dummy data
      setManagerData({
        name: 'שרה כהן',
        upcomingEvents: 5,
        totalEvents: 24,
        totalClients: 18,
        monthlyRevenue: 12500,
        recentEvents: [
          { id: 1, title: 'סדנת העצמה', date: '2023-06-15', client: 'חברת אלפא' },
          { id: 2, title: 'הרצאה: מנהיגות בעידן החדש', date: '2023-06-10', client: 'עיריית תל אביב' },
          { id: 3, title: 'סיור בטבע', date: '2023-06-05', client: 'בית ספר אורנים' }
        ]
      });
    };
    
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress color="primary" />
        <Typography variant="body1" className="loading-text">
          טוען נתונים...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Navigation managerId={id} managerName={managerData.name} />
      <Container maxWidth="xl" className="dashboard-container">
        <Box className="dashboard-header">
          <Typography variant="h4" className="welcome-message">
            שלום, {managerData.name}
          </Typography>
          <Typography variant="body1" className="welcome-subtitle">
            ברוכה הבאה למשרד הדיגיטלי שלך
          </Typography>
        </Box>
        
        <Grid container spacing={3} className="stats-grid">
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard 
              title="אירועים קרובים" 
              value={managerData.upcomingEvents} 
              icon={<EventIcon />} 
              color="primary"
              onClick={() => navigate(`/home/${id}/upcoming`)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard 
              title="סה״כ אירועים" 
              value={managerData.totalEvents} 
              icon={<AssignmentIcon />} 
              color="secondary"
              onClick={() => navigate(`orders`)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard 
              title="לקוחות" 
              value={managerData.totalClients} 
              icon={<PeopleIcon />} 
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard 
              title="הכנסה חודשית" 
              value={`₪${managerData.monthlyRevenue.toLocaleString()}`} 
              icon={<AttachMoneyIcon />} 
              color="success"
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={3} className="content-grid">
          <Grid item xs={12} md={8}>
            <Paper className="recent-events-paper">
              <Box className="paper-header">
                <Typography variant="h6" className="paper-title">
                  אירועים אחרונים
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                  onClick={() => navigate(`newOrder`)}
                  className="add-button"
                >
                  אירוע חדש
                </Button>
              </Box>
              <Divider />
              {managerData.recentEvents.length > 0 ? (
                <Box className="events-list">
                  {managerData.recentEvents.map((event) => (
                    <Box key={event.id} className="event-item">
                      <Box className="event-details">
                        <Typography variant="subtitle1" className="event-title">
                          {event.title}
                        </Typography>
                        <Typography variant="body2" className="event-client">
                          {event.client}
                        </Typography>
                      </Box>
                      <Typography variant="body2" className="event-date">
                        {new Date(event.date).toLocaleDateString('he-IL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box className="no-events">
                  <Typography variant="body1">
                    אין אירועים אחרונים להצגה
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper className="quick-actions-paper">
              <Typography variant="h6" className="paper-title">
                פעולות מהירות
              </Typography>
              <Divider />
              <Box className="quick-actions-list">
                <Button 
                  variant="contained" 
                  fullWidth 
                  className="quick-action-button"
                  onClick={() => navigate(`newOrder`)}
                >
                  הוספת אירוע חדש
                </Button>
                <Button 
                  variant="contained" 
                  fullWidth 
                  className="quick-action-button"
                  onClick={() => navigate(`month`)}
                >
                  צפייה ביומן
                </Button>
                <Button 
                  variant="contained" 
                  fullWidth 
                  className="quick-action-button"
                  onClick={() => navigate(`orders`)}
                >
                  הסטוריית הזמנות
                </Button>
                <Button 
                  variant="contained" 
                  fullWidth 
                  className="quick-action-button"
                  onClick={() => navigate(`/profile/${id}`)}
                >
                  עדכון פרטי פרופיל
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Outlet />
    </>
  );
};
