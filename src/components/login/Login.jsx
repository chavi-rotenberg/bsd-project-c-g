// // import { useEffect, useState } from "react";
// // import "./login.css"
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { managersFetchThunk } from "../../store/slices/managers/managersFetch";
// // // import { Button } from "@mui/material";
// // // import DeleteIcon from '@mui/icons-material/Delete';
// // // import SendIcon from '@mui/icons-material/Send';
// // // import Stack from '@mui/material/Stack';

// // export const Login = () => {
// //   const [manager, setManager] = useState({ name: "", email: "" });
// //   const dispatch = useDispatch();
// //   const managers= useSelector(state=>state.manager.managers)
// //   const [newManager, setNewManager] = useState(false)
// //   const navigate = useNavigate();
// //   //const route = useSelector(state => state.user.route)
// //   useEffect(() => {
// //     dispatch(managersFetchThunk());
// //     console.log(managers);
// //     // refDialog.current.showModal();
// //   }, []);
// //   // useEffect(() => {
// //   // },[]);


// //   const existing = () => {
// //     debugger
// //     if (managers) {
// //       console.log(managers.find(x => x.managerEmail === manager.email && x.managerName === manager.name));
// //       let c = managers.find(x => x.managerEmail === manager.email && x.managerName === manager.name);
// //       console.log(c);
// //       let id = c?.id;
// //       if (!c) {
// //         setNewManager(true)
// //       }
// //       else {
// //         setNewManager(false);
// //         navigate(`/home/${id}`);

// //       }

// //       //dispatch(findCustomerThunk({instituteId:id }));
// //       //  navigate("/home") 
// //     }
// //   }
// //   return <div className="inDiv" >
// //     <input className="logBut" type="text" value={manager.name} placeholder="insert name" onChange={(e) => setManager({ ...manager, name: e.target.value })} />
// //     <br />
// //     <br />
// //     <input className="logBut" type="email" value={manager.email} placeholder="insert email" onChange={(e) => setManager({ ...manager, email: e.target.value })} />
// //     <br />
// //     <button className="login" onClick={() => { existing() }}>log in</button><br /><br />
// //     <a onClick={() => setNewManager(true)}>first visit? log on</a>
// //     {/* {route && navigate(route)} */}
// //     {newManager && navigate("/newManager")}
// //     {/*  <Stack direction="row" spacing={4}>
// //       <Button variant="contained" startIcon={<DeleteIcon />}>
// //         Delete
// //       </Button>
// //       <Button variant="contained" endIcon={<SendIcon />}>
// //         Send
// //       </Button>
// //       <Button variant="contained" startIcon={<DeleteIcon />}>
// //         Delete
// //       </Button>
// //       <Button variant="contained" endIcon={<SendIcon />}>
// //         Send
// //       </Button>
// //     </Stack> */}


// //   </div>
// // }

// import { useEffect, useState } from "react";
// import "./login.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { managersFetchThunk } from "../../store/slices/managers/managersFetch";
// import { 
//   Container, 
//   Box, 
//   TextField, 
//   Button, 
//   Typography, 
//   Paper, 
//   Link,
//   InputAdornment,
//   CircularProgress
// } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import PersonIcon from '@mui/icons-material/Person';
// import LoginIcon from '@mui/icons-material/Login';
// import { Logo } from '../logoDesign/logo';
// import { editIsM } from "../../store/slices/managers/managersSlice";
// import { customersFetchThunk } from "../../store/slices/customers/customersFetch";


// export const Login = () => {
//   const [manager, setManager] = useState({ name: "", email: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const isC=useSelector(state=>state.customer.isC)
//   const isM=useSelector(state=>state.manager.isM)
//   // const editm=useSelector(state=> state.manager.editIsM)
//   const managers = useSelector(state => state.manager.managers);
//   const customers = useSelector(state => state.customer.customers);

//   const [newManager, setNewManager] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(managersFetchThunk());
//   }, [dispatch]);

//   useEffect(() => {
//   if(customers?.length==0) dispatch(customersFetchThunk());
//   }, [customers]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
    
//     // Validate inputs
//     if (!manager.name.trim() || !manager.email.trim()) {
//       setError("יש למלא את כל השדות");
//       setLoading(false);
//       return;
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(manager.email)) {
//       setError("כתובת אימייל לא תקינה");
//       setLoading(false);
//       return;
//     }
    
//     setTimeout(() => {
//       existing();
//       setLoading(false);
//     }, 800); // Simulating network request
//   };

//   const existing = () => {
//     if (managers) {
//       const foundManager = managers.find(
//         x => x.managerEmail === manager.email && x.managerName === manager.name
//       );
      
//       if (!foundManager) {
//         const foundCustomer = customers.find(
//           x => x.Email === manager.email && x.instuiteName === manager.name
//         );
        
//         setError("המשתמש לא נמצא במערכת");
//         setNewManager(true);
//       } else {
//         // editm(foundManager.id)
//         console.log(foundManager.id);
//         dispatch(editIsM(foundManager.id))
//         console.log(isM);
//         // isM=foundManager.id
//         console.log(isM);
//         setNewManager(false);
//         navigate(`/manager/${foundManager.id}`);
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm" className="login-container">
//       <Paper elevation={3} className="login-paper">
//         <Box className="login-box">
//           <Box className="login-header">
//             <Logo />
//             <Typography variant="h5" component="h1" className="login-title">
//               כניסה למשרד הדיגיטלי
//             </Typography>
//           </Box>
          
//           <form onSubmit={handleSubmit} className="login-form">
//             <TextField
//               fullWidth
//               label="שם"
//               variant="outlined"
//               value={manager.name}
//               onChange={(e) => setManager({ ...manager, name: e.target.value })}
//               margin="normal"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PersonIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               required
//             />
            
//             <TextField
//               fullWidth
//               label="אימייל"
//               type="email"
//               variant="outlined"
//               value={manager.email}
//               onChange={(e) => setManager({ ...manager, email: e.target.value })}
//               margin="normal"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               required
//             />
            
//             {error && (
//               <Typography color="error" variant="body2" className="error-message">
//                 {error}
//               </Typography>
//             )}
            
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               size="large"
//               className="login-button"
//               startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
//               disabled={loading}
//             >
//               {loading ? "מתחבר..." : "התחברות"}
//             </Button>
//           </form>
          
//           <Box className="login-footer">
//             <Link 
//               component="button" 
//               variant="body2" 
//               onClick={() => navigate("/newManager")} 
//               className="signup-link"
//             >
//               משתמש חדש? הירשם עכשיו
//             </Link>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Container, Grid, Paper, Typography, Button, TextField,
  Tab, Tabs, InputAdornment, IconButton, Divider, Chip,
  Fade, Zoom, Tooltip, CircularProgress, Snackbar, Alert
} from "@mui/material";

// Icons
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Business as BusinessIcon,
  ArrowForward as ArrowForwardIcon,
  Help as HelpIcon,
  Info as InfoIcon,
  EventNote as EventNoteIcon,
  LocalActivity as LocalActivityIcon,
  Security as SecurityIcon,
  Email as EmailIcon
} from '@mui/icons-material';

import "./login.css";

export const Login = () => {
  const navigate = useNavigate();
  
  // State for tab selection (admin/customer)
  const [tabValue, setTabValue] = useState(0);
  
  // State for form inputs
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    instituteId: ""
  });
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoverEffect, setHoverEffect] = useState(false);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError("");
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (error) setError("");
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (tabValue === 0) { // Admin login
      if (!formData.username || !formData.password) {
        setError("נא למלא שם משתמש וסיסמה");
        return;
      }
    } else { // Customer login
      if (!formData.instituteId || !formData.email) {
        setError("נא למלא מזהה מוסד ואימייל");
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (tabValue === 0) {
        // Admin login logic
        if (formData.username === "admin" && formData.password === "admin") {
          navigate("/customers");
        } else {
          setError("שם משתמש או סיסמה שגויים");
        }
      } else {
        // Customer login logic - for demo, just navigate to home
        navigate("/home");
      }
    } catch (err) {
      setError("אירעה שגיאה בהתחברות. נסה שוב מאוחר יותר.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Container maxWidth={false} disableGutters className="login-container">
      {/* Animated background elements */}
      <div className="animated-bg"></div>
      <div className="animated-bg bg2"></div>
      <div className="animated-bg bg3"></div>
      
      <Grid container className="content-grid">
        {/* Left side - Login form */}
        <Grid item xs={12} md={5} className="form-section">
          <Fade in={true} timeout={800}>
            <Paper elevation={6} className="login-card">
              <div className="card-header">
                <Typography variant="h4" component="h1" className="login-title">
                  {tabValue === 0 ? "כניסת מנהל" : "כניסת לקוח"}
                </Typography>
                <Typography variant="subtitle1" className="login-subtitle">
                  ברוכים הבאים למערכת הזמנת התוכניות
                </Typography>
              </div>
              
              {/* Login tabs */}
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                className="login-tabs"
              >
                <Tab 
                  icon={<AdminPanelSettingsIcon />} 
                  label="מנהל" 
                  className="login-tab"
                />
                <Tab 
                  icon={<BusinessIcon />} 
                  label="לקוח" 
                  className="login-tab"
                />
              </Tabs>
              
              <Divider className="divider" />
              
              {/* Login form */}
              <form onSubmit={handleSubmit} className="login-form">
                {tabValue === 0 ? (
                  // Admin login form
                  <>
                    <TextField
                      name="username"
                      label="שם משתמש"
                      variant="outlined"
                      fullWidth
                      value={formData.username}
                      onChange={handleInputChange}
                      className="form-field"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon className="field-icon" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <TextField
                      name="password"
                      label="סיסמה"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-field"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon className="field-icon" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                ) : (
                  // Customer login form
                  <>
                    <TextField
                      name="instituteId"
                      label="מזהה מוסד"
                      variant="outlined"
                      fullWidth
                      value={formData.instituteId}
                      onChange={handleInputChange}
                      className="form-field"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon className="field-icon" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    
                    <TextField
                      name="email"
                      label="אימייל"
                      type="email"
                      variant="outlined"
                      fullWidth
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-field"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon className="field-icon" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </>
                )}
                
                {error && (
                  <Typography color="error" className="error-message">
                    {error}
                  </Typography>
                )}
                
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  className="login-button"
                  disabled={isLoading}
                  onMouseEnter={() => setHoverEffect(true)}
                  onMouseLeave={() => setHoverEffect(false)}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      {tabValue === 0 ? "התחברות כמנהל" : "התחברות כלקוח"}
                      <ArrowForwardIcon className="button-icon" />
                    </>
                  )}
                </Button>
              </form>
              
              <div className="features-section">
                <Chip
                  icon={<EventNoteIcon />}
                  label="הזמנת תוכניות"
                  className="feature-chip"
                />
                <Chip
                  icon={<LocalActivityIcon />}
                  label="ניהול אירועים"
                  className="feature-chip"
                />
                <Chip
                  icon={<SecurityIcon />}
                  label="אבטחה מתקדמת"
                  className="feature-chip"
                />
              </div>
              
              <div className="help-section">
                <Typography variant="body2" className="help-text">
                  צריכים עזרה?
                </Typography>
                <div className="help-options">
                  <Tooltip title="שכחתי סיסמה" arrow placement="top">
                    <IconButton className="help-button">
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="צור קשר" arrow placement="top">
                    <IconButton className="help-button">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              
              <Button
                variant="text"
                className="back-button"
                onClick={() => navigate("/")}
              >
                חזרה לדף הבית
              </Button>
            </Paper>
          </Fade>
        </Grid>
        
        {/* Right side - Image and info */}
        <Grid item xs={12} md={7} className="image-section">
          <Zoom in={true} timeout={1000}>
            <div className="image-content">
              <div className="image-container">
                <img
                  src={process.env.PUBLIC_URL + "/login-bg.jpg"}
                  alt="תמונת רקע"
                  className={`hero-image ${hoverEffect ? 'zoom-effect' : ''}`}
                />
                <div className="image-overlay"></div>
              </div>
              
              <div className="image-text-container">
                <Typography variant="h2" className="image-title">
                  מערכת ניהול אירועים מתקדמת
                </Typography>
                
                <Typography variant="h6" className="image-description">
                  פתרון דיגיטלי מושלם להזמנת תוכניות והפקות
                </Typography>
                
                <div className="stats-container">
                  <div className="stat-item">
                    <Typography variant="h4" className="stat-number">+100</Typography>
                    <Typography variant="body2" className="stat-label">תוכניות זמינות</Typography>
                  </div>
                  <div className="stat-item">
                    <Typography variant="h4" className="stat-number">24/7</Typography>
                    <Typography variant="body2" className="stat-label">שירות זמין</Typography>
                  </div>
                  <div className="stat-item">
                    <Typography variant="h4" className="stat-number">+1000</Typography>
                    <Typography variant="body2" className="stat-label">לקוחות מרוצים</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </Grid>
      </Grid>
      
      <footer className="footer">
        <Typography variant="body2" className="footer-text">
          © {new Date().getFullYear()} כל הזכויות שמורות | מערכת הזמנת תוכניות והפקות
        </Typography>
      </footer>
    </Container>
  );
};
