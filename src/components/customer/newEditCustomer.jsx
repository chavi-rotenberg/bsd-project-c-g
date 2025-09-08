// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import "./logon.css"
// import { useParams } from 'react-router-dom';
// import { addCustomerThunk } from "../../store/slices/customers/addCustomerThunk";
// import { useNavigate } from "react-router-dom";
// import { updateCustomerThunk } from "../../store/slices/customers/updateCustomerThunk";
// import { customersFetchThunkById } from "../../store/slices/customers/customerFetchThunkById";
// import { Button } from "@mui/material";

// export const NewEditCustomer = () => {
//     const params = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const customers = useSelector(state => state.customer.customers)
//     const token = useSelector(state => state.customer.token)
//     const myCustomer = useSelector(state => state.customer.customer)
//     const refDialog = useRef();

//     // const [customer, setCustomer] = useState({
//     //     instituteName: "", mobile: "", email: "",
//     //     fax: "", contactName: "", contactPhone: "", city: "", community: "", amount: 0,
//     //     due: 0
//     // });
//     const [customer, setCustomer] = useState(myCustomer)
//     const [edit, setEdit] = useState(false);
//     const [id, setId] = useState(-1)
//     useEffect(() => {

//         //    setId(params.id)
//         //    console.log(id);
//         if (params.id) {
//             console.log(params.id);

//             //setId(parseInt(params.id))
//             // console.log(id)
//             // let c = customers.find(x => x.instituteId===parseInt(params.id));
//             dispatch(customersFetchThunkById({ id: params.id }));
//             setCustomer(myCustomer);
//             // for (const key in object) {
//             //     if (Object.hasOwnProperty.call(object, key)) {
//             //         const element = object[key];

//             //     }.
//             //}
//             // 
//             // setCustomer(c);
//             console.log(customer);
//             setEdit(true)
//         }
//         refDialog.current.showModal();

//     }, [])
//     //const refDialog = useRef()
//     // const navigate = useNavigate();
//     // useEffect(() => {
//     //     refDialog.current.showModal();
//     //  }, []);
//     const logOnn = () => {
//         debugger
//         if (edit) {
//             dispatch(updateCustomerThunk({ details: customer }))
//             refDialog.current.close();

//             navigate('/customers')
//         }
//         else {
//             dispatch(addCustomerThunk({ details: customer }));
//             // console.log(token);
//             refDialog.current.close();

//             navigate('/customers')

//         }

//         // if (token === 0) {
//         //     // navigate(`/home/${}`);
//         //     console.log("aabb");
//         // }
//         // dispatch(setCurrentUser({ username: user.username, password: user.password, token: -1 }))
//         // navigate("/calender");
//     }

//     return <dialog ref={refDialog} className="inDiv" >

//         <br /><input className="logBut" type="text" value={customer?.community} placeholder="insert community" onChange={e => setCustomer({ ...customer, community: e.target.value })} />
//         <br /><input className="logBut" type="text" value={customer?.mobile} placeholder="insert telephone" onChange={e => setCustomer({ ...customer, mobile: e.target.value })} />
//         <br /><input className="logBut" type="text" value={customer?.fax} placeholder="insert fax" onChange={e => setCustomer({ ...customer, fax: e.target.value })} />
//         <br /><input className="logBut" type="email" value={customer?.email} placeholder="insert email" onChange={e => setCustomer({ ...customer, email: e.target.value })} />
//         <br /><input className="logBut" type="text" value={customer?.contactName} placeholder="insert contactName" onChange={e => setCustomer({ ...customer, contactName: e.target.value })} />
//         <br /><input className="logBut" type="text" value={customer?.contactPhone} placeholder="insert contactPhone" onChange={e => setCustomer({ ...customer, contactPhone: e.target.value })} />
//         <br /><input className="logBut" type="text" value={customer?.city} placeholder="insert city" onChange={e => setCustomer({ ...customer, city: e.target.value })} />
//         <input className="logBut" type="text" value={customer?.instituteName} placeholder="insert name" onChange={e => setCustomer({ ...customer, instituteName: e.target.value })} />
//         {/* {raute && refDialog.current.close()} */}
//         <br /><button className="login" onClick={() => { logOnn() }}>log on</button>
//         {params.id && <button className="login" onClick={() => {
//             refDialog.current.close();

//             navigate('/customers')
//         }}>back</button>
//         }
//     </dialog>
// }

import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { addCustomerThunk } from "../../store/slices/customers/addCustomerThunk";
import { updateCustomerThunk } from "../../store/slices/customers/updateCustomerThunk";
import { customersFetchThunkById } from "../../store/slices/customers/customerFetchThunkById";
import "./logon.css";

// Material UI
import {
    Box, Typography, Paper, Grid, TextField, Button, IconButton,
    CircularProgress, Snackbar, Alert, MenuItem, InputAdornment,
    Divider, FormHelperText, FormControl, Select, InputLabel, FormControlLabel, Checkbox,Autocomplete
} from '@mui/material';

import {
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon,
    Business as BusinessIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Fax as FaxIcon,
    Person as PersonIcon,
    LocationCity as LocationCityIcon,
    Groups as GroupsIcon,
    AttachMoney as AttachMoneyIcon,
    Event as EventIcon,
    Close as CloseIcon,
    Add as AddIcon,
    Edit as EditIcon
} from '@mui/icons-material';
const israeliCities = [
    "ירושלים", "תל אביב", "חיפה", "ראשון לציון", "פתח תקווה", "אשדוד", "נתניה",
    "באר שבע", "חולון", "בני ברק", "רמת גן", "אשקלון", "רחובות", "בת ים", "הרצליה",
    "כפר סבא", "מודיעין", "רעננה", "רמלה", "לוד", "נצרת", "קריית אתא", "אילת"
];
// Israeli cities for dropdown


export const NewEditCustomer = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const myCustomer = useSelector(state => state.customer.customer);
    const isLoading = useSelector(state => state.customer.isLoading);

    // Local state
    const [customer, setCustomer] = useState({
        instituteName: "",
        mobile: "",
        email: "",
        fax: "",
        contactName: "",
        contactPhone: "",
        city: "",
        community: "",
        amount: 0,
        due: ""
    });
    const refDialog = useRef();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const isEditMode = Boolean(params.id);
    const formTitle = isEditMode ? "עריכת לקוח" : "הוספת לקוח חדש";
    useEffect(() => {
        refDialog.current.showModal();
    }, []);
    // Fetch customer data if in edit mode
    useEffect(() => {
        if (isEditMode) {
            dispatch(customersFetchThunkById({ id: params.id }));
        }
    }, [dispatch, params.id, isEditMode]);

    // Update form when customer data is loaded
    useEffect(() => {
        if (isEditMode && myCustomer) {
            // Format date for the date input
            let formattedDue = "";
            if (myCustomer.due) {
                const dueDate = new Date(myCustomer.due);
                formattedDue = dueDate.toISOString().split('T')[0];
            }

            setCustomer({
                ...myCustomer,
                due: formattedDue
            });
        }
    }, [myCustomer, isEditMode]);

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        // Required fields
        if (!customer.instituteName) {
            newErrors.instituteName = "שם המוסד הוא שדה חובה";
        }

        // Email validation
        if (customer.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(customer.email)) {
            newErrors.email = "כתובת אימייל לא תקינה";
        }

        // Phone validation
        if (customer.mobile && !/^0\d{8,9}$/.test(customer.mobile)) {
            newErrors.mobile = "מספר טלפון לא תקין";
        }

        if (customer.contactPhone && !/^0\d{8,9}$/.test(customer.contactPhone)) {
            newErrors.contactPhone = "מספר טלפון איש קשר לא תקין";
        }

        // Amount validation
        // if (customer.amount && isNaN(Number(customer.amount))) {
        //     newErrors.amount = "הסכום חייב להיות מספר";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        debugger
        // if (isEditMode) {
        //     if (!validateForm()) {
        //         return;
        //     }

        //     dispatch(updateCustomerThunk({ details: customer }))
        //     refDialog.current.close();

        //     navigate('/customers')
        // }
        // else {
        //     if (!validateForm()) {
        //         return;
        //     }
        //     setIsSubmitting(true);
        //     dispatch(addCustomerThunk({ details: customer }));
        //     // console.log(token);
        //     refDialog.current.close();

        //     navigate('/customers')

        // }

        // if (token === 0) {
        //     // navigate(`/home/${}`);
        //     console.log("aabb");
        // }
        // dispatch(setCurrentUser({ username: user.username, password: user.password, token: -1 }))
        // navigate("/calender");



        setIsSubmitting(true);

        try {
            // Prepare data for submission
            const customerData = {
                ...customer,
                amount: Number(customer.amount) || 0
            };

            if (isEditMode) {
                dispatch(updateCustomerThunk({ details: customerData })).unwrap();
                setSnackbar({
                    open: true,
                    message: 'הלקוח עודכן בהצלחה',
                    severity: 'success'
                });
            } else {
                dispatch(addCustomerThunk({ details: customerData })).unwrap();
                setSnackbar({
                    open: true,
                    message: 'הלקוח נוסף בהצלחה',
                    severity: 'success'
                });
            }

            // Navigate after a short delay to show the success message
            setTimeout(() => {
                refDialog.current.close();
                navigate('/customers');
            }, 1500);
        } catch (error) {
            setSnackbar({
                open: true,
                message: `שגיאה: ${error.message || 'אירעה שגיאה בשמירת הנתונים'}`,
                severity: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: value
        });

        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // If loading data in edit mode
    if (isEditMode && isLoading) {
        return (
            <Box className="loading-container">
                <CircularProgress color="primary" />
                <Typography variant="h6" sx={{ mt: 2 }}>טוען נתוני לקוח...</Typography>
            </Box>
        );
    }

    return (<dialog ref={refDialog}>
        <Box className="customer-form-container">
            <Paper elevation={3} className="customer-form-paper">
                <Box className="form-header">
                    <Typography variant="h5" className="form-title">
                        {isEditMode ? <EditIcon className="form-icon" /> : <AddIcon className="form-icon" />}
                        {formTitle}
                    </Typography>
                    <IconButton
                        className="back-button"
                        onClick={() => navigate('/customers')}
                        aria-label="חזור לרשימת הלקוחות"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    {/* Basic Information */}
                    <Grid item xs={12}>
                        <Typography variant="h6" className="section-title">
                            <BusinessIcon className="section-icon" />
                            פרטי מוסד
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="instituteName"
                            label="שם מוסד"
                            value={customer.instituteName || ''}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={Boolean(errors.instituteName)}
                            helperText={errors.instituteName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BusinessIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="community"
                            label="קהילה"
                            value={customer.community || ''}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <GroupsIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box sx={{ position: 'relative' }}>
                            <InputAdornment 
                                position="start" 
                                sx={{ position: 'absolute', top: '50%', right: '14px', transform: 'translateY(-50%)', zIndex: 1 }}
                            >
                                <LocationCityIcon />
                            </InputAdornment>
                            <TextField
                                select
                                name="city"
                                label="עיר"
                                value={customer.city || ''}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    sx: { paddingRight: '40px' }
                                }}
                                SelectProps={{
                                    native: true // שימוש בתגית select רגילה של HTML
                                }}
                            >
                                <option value="">בחר עיר</option>
                                {israeliCities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </TextField>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="amount"
                            label="סכום"
                            type="number"
                            value={customer.amount || ''}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(errors.amount)}
                            helperText={errors.amount}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AttachMoneyIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="due"
                            label="תאריך תשלום"
                            type="number"
                            value={customer.due || ''}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EventIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Contact Information */}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography variant="h6" className="section-title">
                            <PersonIcon className="section-icon" />
                            פרטי התקשרות
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="mobile"
                            label="טלפון"
                            value={customer.mobile || ''}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(errors.mobile)}
                            helperText={errors.mobile}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="fax"
                            label="פקס"
                            value={customer.fax || ''}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FaxIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            label="אימייל"
                            type="email"
                            value={customer.email || ''}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    {/* Contact Person */}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography variant="h6" className="section-title">
                            <PersonIcon className="section-icon" />
                            איש קשר
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="contactName"
                            label="שם איש קשר"
                            value={customer.contactName || ''}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="contactPhone"
                            label="טלפון איש קשר"
                            value={customer.contactPhone || ''}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(errors.contactPhone)}
                            helperText={errors.contactPhone}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>

                <Box className="form-actions">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="submit-button"
                    >
                        {isSubmitting ? (
                            <>
                                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                                שומר...
                            </>
                        ) : (
                            isEditMode ? 'עדכן לקוח' : 'הוסף לקוח'
                        )}
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => { refDialog.current.close(); navigate('/customers') }}
                        className="cancel-button"
                    >
                        ביטול
                    </Button>
                </Box>
            </Paper>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
 
    </dialog>
    );

}
