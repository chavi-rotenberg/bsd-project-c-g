import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Divider, 
  Avatar, 
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../logoDesign/logo';
import './navigation.css';

export const Navigation = ({ managerId, managerName }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'להזמנה', icon: <ListAltIcon />, path: `/home/${managerId}/newOrder` },
    { text: 'הסטורית הזמנות', icon: <WorkHistoryIcon />, path: `/home/${managerId}/myOrders` },
    { text: 'יומן', icon: <EditCalendarIcon />, path: `/home/${managerId}/month` },
    { text: 'הזמנות קרובות', icon: <HourglassBottomIcon />, path: `/home/${managerId}/upcoming` },
    { text: 'עלינו', icon: <HowToRegIcon />, path: `/about` },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/');
  };

  const drawerContent = (
    <Box className="drawer-content" role="presentation">
      <Box className="drawer-header">
        <Avatar className="user-avatar">
          {managerName ? managerName.charAt(0).toUpperCase() : 'U'}
        </Avatar>
        <Typography variant="h6" className="user-name">
          {managerName || 'משתמש'}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => handleNavigation(item.path)}
            className="drawer-list-item"
          >
            <ListItemIcon className="drawer-list-icon">
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleNavigation(`/profile/${managerId}`)} className="drawer-list-item">
          <ListItemIcon className="drawer-list-icon">
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="פרופיל" />
        </ListItem>
        <ListItem button onClick={handleLogout} className="drawer-list-item logout">
          <ListItemIcon className="drawer-list-icon">
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="התנתקות" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="menu-button"
          >
            <MenuIcon />
          </IconButton>
          <Box className="app-bar-logo" onClick={() => navigate(`/home/${managerId}`)}>
            <Logo size="small" />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        className="navigation-drawer"
      >
        {drawerContent}
      </Drawer>
    </>
  );
};
