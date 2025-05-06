import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import './notFound.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" className="not-found-container">
      <Box className="not-found-content">
        <ErrorOutlineIcon className="not-found-icon" />
        <Typography variant="h2" className="not-found-title">
          404
        </Typography>
        <Typography variant="h5" className="not-found-subtitle">
          העמוד שחיפשת לא נמצא
        </Typography>
        <Typography variant="body1" className="not-found-message">
          ייתכן שהעמוד הוסר, שונה שמו או שאינו זמין כרגע.
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<HomeIcon />} 
          className="not-found-button"
          onClick={() => navigate('/')}
        >
          חזרה לדף הבית
        </Button>
      </Box>
    </Container>
  );
};
