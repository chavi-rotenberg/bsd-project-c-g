  import { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from "react-redux";
  import { Outlet, useNavigate } from 'react-router-dom';
  import './activites.css';

  // Material UI
  import {
    Box, Typography, Button, IconButton, Paper, TextField, InputAdornment,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Snackbar, Alert, CircularProgress, Grid, Collapse, Card, CardContent,
    CardActions, CardMedia, Chip, Divider, Avatar, Tooltip
  } from '@mui/material';

  import {
    Add as AddIcon,
    Search as SearchIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Refresh as RefreshIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    LocationOn as LocationOnIcon,
    AccessTime as AccessTimeIcon,
    AttachMoney as AttachMoneyIcon,
    Nightlight as NightlightIcon,
    Person as PersonIcon,
    Info as InfoIcon,
    Close as CloseIcon
  } from '@mui/icons-material';

  import { activitiesFetch } from '../../store/slices/activites/activitiesFetch';
  import { deleteActivityThunk } from '../../store/slices/activites/deleteActivityThunk';

  export const Activities = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    // Redux state
    const activities = useSelector((state) => state.activity.activities || []);
    const isLoading = useSelector((state) => state.activity.isLoading);

    // Local state
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [searchFields, setSearchFields] = useState({
      activityDescription: '',
      location: '',
      price: '',
      lenOfActivity: '',
      managerId: ''
    });
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success'
    });

    // Fetch activities on component mount
    dispatch(activitiesFetch());
    useEffect(() => {
    }, [dispatch]);










    // Handle search field changes
    const handleSearchChange = (field, value) => {
      setSearchFields(prev => ({
        ...prev,
        [field]: value
      }));
    };

    // Clear all search fields
    const clearSearch = () => {
      setSearchFields({
        activityDescription: '',
        location: '',
        price: '',
        lenOfActivity: '',
        managerId: ''
      });
    };

    // Filtered activities
    const filteredActivities = activities.filter(activity => {
      // Check if any search field is filled
      const isSearchActive = Object.values(searchFields).some(value => value !== '');
      
      // If no search is active, return all activities
      if (!isSearchActive) return true;
      
      // Check each field
      const matchesDescription = !searchFields.activityDescription || 
        (activity.activityDescription && activity.activityDescription.toLowerCase().includes(searchFields.activityDescription.toLowerCase()));
      
      const matchesLocation = !searchFields.location || 
        (activity.location && activity.location.toLowerCase().includes(searchFields.location.toLowerCase()));
      
      const matchesPrice = !searchFields.price || 
        (activity.price && activity.price.toString().includes(searchFields.price));
      
      const matchesLength = !searchFields.lenOfActivity || 
        (activity.lenOfActivity && activity.lenOfActivity.toString().includes(searchFields.lenOfActivity));
      
      const matchesManagerId = !searchFields.managerId || 
        (activity.managerId && activity.managerId.toString().includes(searchFields.managerId));
      
      // Return true if all filled fields match
      return matchesDescription && matchesLocation && matchesPrice && matchesLength && matchesManagerId;
    });

    // Event handlers
    const handleActivityClick = (activity) => {
      setSelectedActivity(activity);
      setOpenDetailsDialog(true);
    };

    const handleDeleteClick = (event, activity) => {
      event.stopPropagation(); // Prevent opening the details dialog
      setSelectedActivity(activity);
      setOpenDeleteDialog(true);
    };

    const handleEditClick = (event, activity) => {
      event.stopPropagation(); // Prevent opening the details dialog
      navigate(`editActivity/${activity.id}`);
    };

    const handleDeleteConfirm = () => {
      dispatch(deleteActivityThunk(selectedActivity.id))
        .then(() => {
          setSnackbar({
            open: true,
            message: 'הפעילות נמחקה בהצלחה',
            severity: 'success'
          });
          setOpenDeleteDialog(false);
        })
        .catch(() => {
          setSnackbar({
            open: true,
            message: 'אירעה שגיאה במחיקת הפעילות',
            severity: 'error'
          });
        });
    };

    const handleSnackbarClose = () => {
      setSnackbar({ ...snackbar, open: false });
    };

    const handleRefresh = () => {
      dispatch(activitiesFetch());
      setSnackbar({
        open: true,
        message: 'הנתונים רועננו בהצלחה',
        severity: 'info'
      });
    };

    // Generate random background color for activity cards
    const getActivityColor = (activityId) => {
      const colors = [
        '#FFD6A5', '#CAFFBF', '#9BF6FF', '#BDB2FF', '#FFC6FF', 
        '#FDFFB6', '#A0C4FF', '#FFB5A7', '#E2F0CB', '#FFDAC1'
      ];
      
      // Use the activity ID to determine the color
      const colorIndex = typeof activityId === 'number' 
        ? activityId % colors.length 
        : String(activityId).charCodeAt(0) % colors.length;
      
      return colors[colorIndex];
    };

    // Get activity image based on description or generate a placeholder
    const getActivityImage = (activity) => {
      // Default placeholder images based on activity type
      const defaultImages = {
        'טיול': process.env.PUBLIC_URL + "/start.jpg",
        'סדנה': process.env.PUBLIC_URL + "/start.jpg",
        'הרצאה': process.env.PUBLIC_URL + "/start.jpg",
        'סיור': 'https://source.unsplash.com/random/300x200/?tour',
        'אטרקציה': 'https://source.unsplash.com/random/300x200/?attraction',
        'default': 'https://source.unsplash.com/random/300x200/?activity'
      };
      
      // Try to match activity description with default images
      if (activity.activityDescription) {
        const desc = activity.activityDescription.toLowerCase();
        for (const [key, url] of Object.entries(defaultImages)) {
          if (desc.includes(key.toLowerCase())) {
            return url;
          }
        }
      }
      
      // Return default image if no match
      return defaultImages.default;
    };

    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>טוען נתוני פעילויות...</Typography>
        </Box>
      );
    }
  
    return (
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">ניהול פעילויות</Typography>
        
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('newActivity')}
            >
              הוסף פעילות
            </Button>
          
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              רענן
            </Button>
          </Box>
        </Box>
      















        {/* Search Section */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              <SearchIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              חיפוש פעילויות
            </Typography>
            
            <Button
              variant="text"
              color="primary"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              endIcon={showAdvancedSearch ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            >
              {showAdvancedSearch ? 'הסתר חיפוש מתקדם' : 'חיפוש מתקדם'}
            </Button>
          </Box>
          
          {/* Basic Search */}
          <TextField
            fullWidth
            placeholder="חיפוש לפי שם פעילות..."
            variant="outlined"
            size="small"
            value={searchFields.activityDescription}
            onChange={(e) => handleSearchChange('activityDescription', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          
          {/* Advanced Search */}
          <Collapse in={showAdvancedSearch}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="מיקום"
                  variant="outlined"
                  size="small"
                  value={searchFields.location}
                  onChange={(e) => handleSearchChange('location', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="מחיר"
                  variant="outlined"
                  size="small"
                  value={searchFields.price}
                  onChange={(e) => handleSearchChange('price', e.target.value)}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="אורך פעילות"
                  variant="outlined"
                  size="small"
                  value={searchFields.lenOfActivity}
                  onChange={(e) => handleSearchChange('lenOfActivity', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="קוד מנהל"
                  variant="outlined"
                  size="small"
                  value={searchFields.managerId}
                  onChange={(e) => handleSearchChange('managerId', e.target.value)}
                />
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={clearSearch}
              >
                נקה חיפוש
              </Button>
            </Box>
          </Collapse>
        </Paper>
      
        {/* Results Summary */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1">
            {filteredActivities.length} פעילויות נמצאו
          </Typography>
          
          {Object.values(searchFields).some(value => value !== '') && (
            <Button 
              variant="text" 
              color="primary"
              onClick={clearSearch}
            >
              נקה חיפוש
            </Button>
          )}
        </Box>
      
        {/* Activity Cards Grid */}
        {filteredActivities.length > 0 ? (
          <Grid container spacing={3}>
            {filteredActivities.map((activity) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={activity.id || activity.activityId}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                    }
                  }}
                  onClick={() => handleActivityClick(activity)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={getActivityImage(activity)}
                    alt={activity.activityDescription || "פעילות"}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      bgcolor: 'rgba(255,255,255,0.8)',
                      borderRadius: '50%',
                      p: 0.5
                    }}
                  >
                    <Tooltip title="מזהה פעילות">
                      <Chip 
                        label={activity.activityId} 
                        size="small" 
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Tooltip>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, bgcolor: getActivityColor(activity.activityId) }}>
                    <Typography variant="h6" component="div" gutterBottom noWrap>
                      {activity.activityDescription || "פעילות ללא שם"}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {activity.location || "המיקום לבחירתך"}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {activity.lenOfActivity ? `${activity.lenOfActivity} שעות` : "משך לא צוין"}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AttachMoneyIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.primary" fontWeight="bold">
                        ₪{activity.price || 0}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
                    <Box>
                      <Tooltip title="צפייה בפרטים">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActivityClick(activity);
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box>
                      <Tooltip title="עריכה">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={(e) => handleEditClick(e, activity)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="מחיקה">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={(e) => handleDeleteClick(e, activity)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 5, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              לא נמצאו פעילויות התואמות את החיפוש
            </Typography>
            {Object.values(searchFields).some(value => value !== '') && (
              <Button 
                variant="outlined" 
                onClick={clearSearch}
                sx={{ mt: 2 }}
              >
                נקה חיפוש
              </Button>
            )}
          </Paper>
        )}
      
        {/* Activity Details Dialog */}
        <Dialog
          open={openDetailsDialog}
          onClose={() => setOpenDetailsDialog(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 'none',
              border: '1px solid rgba(0,0,0,0.08)'
            }
          }}
        >
          {selectedActivity && (
            <>
              <Box sx={{ position: 'relative' }}>
                {/* תמונת רקע עם שקיפות */}
                <Box sx={{ 
                  position: 'relative',
                  height: 240,
                  overflow: 'hidden'
                }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={getActivityImage(selectedActivity)}
                    alt={selectedActivity.activityDescription || "פעילות"}
                    sx={{ 
                      objectFit: 'cover',
                      opacity: 0.7, // הוספת שקיפות לתמונה
                      filter: 'blur(1px)' // אפקט טשטוש קל
                    }}
                  />
                  {/* שכבת צבע שקופה מעל התמונה */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(25, 118, 210, 0.4)', // צבע כחול שקוף (אפשר לשנות)
                    zIndex: 1
                  }} />
                </Box>
                
                {/* תוכן מעל התמונה */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  zIndex: 2
                }}>
                  <Typography 
                    variant="h3" 
                    color="white" 
                    fontWeight="bold"
                    sx={{ 
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      mb: 1
                    }}
                  >
                    {selectedActivity.activityDescription || "פעילות ללא שם"}
                  </Typography>
                  <Chip 
                    label={`קוד פעילות: ${selectedActivity.activityId}`}
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      py: 0.5
                    }}
                  />
                </Box>
                
                <IconButton
                  onClick={() => setOpenDetailsDialog(false)}
                  sx={{ 
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.2)',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.4)'
                    },
                    zIndex: 2
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <DialogContent sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography 
                        variant="h5" 
                        color="primary.main" 
                        fontWeight="bold"
                        sx={{ 
                          mb: 3,
                          pb: 1,
                          borderBottom: '2px solid',
                          borderColor: 'primary.light',
                          display: 'inline-block'
                        }}
                      >
                        פרטי הפעילות
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box 
                          sx={{ 
                            color: 'white',
                            bgcolor: 'primary.main',
                            borderRadius: '12px',
                            p: 1.5,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <LocationOnIcon fontSize="large" />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary" fontWeight="medium">
                            מיקום
                          </Typography>
                          <Typography variant="h6">
                            {selectedActivity.location || "המיקום לבחירתך"}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box 
                          sx={{ 
                            color: 'white',
                            bgcolor: '#FF9800',
                            borderRadius: '12px',
                            p: 1.5,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <AccessTimeIcon fontSize="large" />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary" fontWeight="medium">
                            אורך הפעילות
                          </Typography>
                          <Typography variant="h6">
                            {selectedActivity.lenOfActivity ? `${selectedActivity.lenOfActivity} שעות` : "לא צוין"}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            color: 'white',
                            bgcolor: '#9C27B0',
                            borderRadius: '12px',
                            p: 1.5,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <PersonIcon fontSize="large" />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary" fontWeight="medium">
                            קוד מנהל
                          </Typography>
                          <Typography variant="h6">
                            {selectedActivity.managerId || "לא צוין"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography 
                        variant="h5" 
                        color="primary.main" 
                        fontWeight="bold"
                        sx={{ 
                          mb: 3,
                          pb: 1,
                          borderBottom: '2px solid',
                          borderColor: 'primary.light',
                          display: 'inline-block'
                        }}
                      >
                        פרטי תשלום
                      </Typography>
                      
                      <Box sx={{ 
                        p: 3, 
                        borderRadius: 4, 
                        bgcolor: 'rgba(76, 175, 80, 0.08)',
                        mb: 3,
                        border: '1px solid rgba(76, 175, 80, 0.2)'
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <AttachMoneyIcon sx={{ color: 'success.main', fontSize: 28, mr: 1 }} />
                            <Typography variant="body1" color="text.secondary" fontWeight="medium">
                              מחיר רגיל
                            </Typography>
                          </Box>
                          <Typography variant="h4" color="success.main" fontWeight="bold">
                            ₪{selectedActivity.price || 0}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ 
                        p: 3, 
                        borderRadius: 4, 
                        bgcolor: 'rgba(33, 150, 243, 0.08)',
                        border: '1px solid rgba(33, 150, 243, 0.2)'
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NightlightIcon sx={{ color: 'info.main', fontSize: 28, mr: 1 }} />
                            <Typography variant="body1" color="text.secondary" fontWeight="medium">
                              תעריף לילה
                            </Typography>
                          </Box>
                          <Typography variant="h4" color="info.main" fontWeight="bold">
                            ₪{selectedActivity.nightPrice || 0}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              
              <Box sx={{ 
                p: 3, 
                display: 'flex', 
                justifyContent: 'flex-end',
                borderTop: '1px solid rgba(0,0,0,0.08)',
                bgcolor: 'rgba(0,0,0,0.02)'
              }}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => navigate(`editActivity/${selectedActivity.id}`)}
                  startIcon={<EditIcon />}
                  sx={{ mr: 2, borderRadius: 2, px: 3 }}
                >
                  עריכת פעילות
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => setOpenDetailsDialog(false)}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  סגור
                </Button>
              </Box>
            </>
          )}
        </Dialog>
      
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>
            אישור מחיקת פעילות
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              האם אתה בטוח שברצונך למחוק את הפעילות "{selectedActivity?.activityDescription}"?
              פעולה זו אינה ניתנת לביטול.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>
              ביטול
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" autoFocus>
              מחיקה
            </Button>
          </DialogActions>
        </Dialog>
      
        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      
        {/* Outlet for nested routes */}
        <Outlet />
      </Box>
    );
  };