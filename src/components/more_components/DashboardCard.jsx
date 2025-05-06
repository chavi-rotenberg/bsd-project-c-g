import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './DashboardCard.css';

export const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary', 
  onClick,
  subtitle
}) => {
  const colorMap = {
    primary: '#FF7043',
    secondary: '#8D6E63',
    info: '#29B6F6',
    success: '#66BB6A',
    warning: '#FFA726',
    error: '#EF5350'
  };

  const bgColor = colorMap[color] || color;

  return (
    <Paper className="dashboard-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <Box className="card-content">
        <Box className="card-icon-container" style={{ backgroundColor: bgColor }}>
          {icon}
        </Box>
        <Box className="card-text">
          <Typography variant="h6" className="card-title">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" className="card-subtitle">
              {subtitle}
            </Typography>
          )}
          <Typography variant="h4" className="card-value">
            {value}
          </Typography>
        </Box>
      </Box>
      {onClick && (
        <Box className="card-action">
          <IconButton size="small" className="card-action-button">
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};
