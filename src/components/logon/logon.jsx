// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, customeref, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "./logon.css";
// import { addCustomerThunk } from "../../store/slices/addCustomerThunk";
// import { updateCustomerThunk } from "../../store/slices/updateCustomerThunk";
// import { customersFetchThunkById } from "../../store/slices/customerFetchThunkById";
// import { motion, AnimatePresence } from "framer-motion";
// // import { FaBuilding, FaPhone, FaEnvelope, FaFax, Facustomer, FaMobileAlt, FaCity, Facustomers } from "react-icons/fa";

// export const Logon = () => {
//     const params = useParams();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const customers = useSelector(state => state.customer.customers);
//     const token = useSelector(state => state.customer.token);
//     const myCustomer = useSelector(state => state.customer.customer);
//     const refDialog = customeref();

//     const [customer, setCustomer] = useState({
//         instituteName: "", 
//         mobile: "", 
//         email: "",
//         fax: "", 
//         contactName: "", 
//         contactPhone: "", 
//         city: "", 
//         community: "", 
//         amount: 0,
//         due: 0
//     });

//     const [edit, setEdit] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [registrationSuccess, setRegistrationSuccess] = useState(false);

//     useEffect(() => {
//         refDialog.current.showModal();

//         // אנימציה לפתיחת הדיאלוג
//         refDialog.current.animate(
//             [
//                 { opacity: 0, transform: 'scale(0.9)' },
//                 { opacity: 1, transform: 'scale(1)' }
//             ],
//             { duration: 300, easing: 'ease-out' }
//         );

//         if (params.id) {
//             console.log(params.id);
//             dispatch(customersFetchThunkById({ id: params.id }));
//             setEdit(true);
//         }
//     }, []);

//     useEffect(() => {
//         if (edit && myCustomer) {
//             setCustomer(myCustomer);
//         }
//     }, [myCustomer]);

//     const validateForm = () => {
//         const newErrors = {};

//         if (!customer.instituteName?.trim()) {
//             newErrors.instituteName = "יש להזין שם מוסד";
//         }

//         if (!customer.mobile?.trim()) {
//             newErrors.mobile = "יש להזין מספר טלפון";
//         }

//         if (!customer.email?.trim()) {
//             newErrors.email = "יש להזין כתובת אימייל";
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
//             newErrors.email = "יש להזין כתובת אימייל תקינה";
//         }

//         if (!customer.city?.trim()) {
//             newErrors.city = "יש להזין עיר";
//         }

//         if (!customer.community?.trim()) {
//             newErrors.community = "יש להזין קהילה";
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const logOnn = async () => {
//         if (!validateForm()) return;

//         setIsLoading(true);

//         try {
//             if (edit) {
//                 await dispatch(updateCustomerThunk({ details: customer }));
//             } else {
//                 await dispatch(addCustomerThunk({ details: customer }));
//             }

//             setRegistrationSuccess(true);

//             // אנימציה להצלחת הרישום
//             setTimeout(() => {
//                 const animation = refDialog.current.animate(
//                     [
//                         { opacity: 1, transform: 'scale(1)' },
//                         { opacity: 0, transform: 'scale(1.1)' }
//                     ],
//                     { duration: 300, easing: 'ease-in-out' }
//                 );

//                 animation.onfinish = () => {
//                     refDialog.current.close();
//                     navigate('/customers');
//                 };
//             }, 1500);
//         } catch (error) {
//             console.error("שגיאה בשמירת הנתונים:", error);
//             setErrors({ submit: "אירעה שגיאה בתהליך השמירה. אנא נסה שנית." });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const closeDialog = () => {
//         // אנימציה לסגירת הדיאלוג
//         const animation = refDialog.current.animate(
//             [
//                 { opacity: 1, transform: 'scale(1)' },
//                 { opacity: 0, transform: 'scale(0.9)' }
//             ],
//             { duration: 200, easing: 'ease-in' }
//         );

//         animation.onfinish = () => {
//             refDialog.current.close();
//             navigate('/customers');
//         };
//     };

//     return (
//         <dialog ref={refDialog} className="auth-dialog register-dialog">
//             <div className="auth-container">
//                 <div className="auth-header">
//                     <h2 className="auth-title">{edit ? "עריכת לקוח" : "הוספת לקוח חדש"}</h2>
//                     <button 
//                         className="close-button"
//                         onClick={closeDialog}
//                         aria-label="סגור"
//                     >
//                         ×
//                     </button>
//                 </div>

//                 <div className="auth-content">
//                     <div className="logo-container1">
//                         <img src="logo2.JPG" alt="לוגו" className="auth-logo" />
//                     </div>

//                     <div className="form-container">
//                         <AnimatePresence mode="wait">
//                             {registrationSuccess ? (
//                                 <motion.div 
//                                     className="success-message"
//                                     initial={{ opacity: 0, scale: 0.8 }}
//                                     animate={{ opacity: 1, scale: 1 }}
//                                     transition={{ duration: 0.3 }}
//                                 >
//                                     <div className="success-icon">✓</div>
//                                     <h3>{edit ? "הלקוח עודכן בהצלחה!" : "הלקוח נוסף בהצלחה!"}</h3>
//                                     <p>מיד תועבר לרשימת הלקוחות...</p>
//                                 </motion.div>
//                             ) : (
//                                 <motion.div
//                                     className="step-content"
//                                     initial={{ opacity: 0, x: 20 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     exit={{ opacity: 0, x: -20 }}
//                                     transition={{ duration: 0.3 }}
//                                 >
//                                     <div className="input-group">
//                                         <div className="input-icon">
//                                             {/* <FaBuilding /> */}
//                                         </div>
//                                         <input 
//                                             type="text" 
//                                             className={`auth-input ${errors.instituteName ? 'input-error' : ''}`}
//                                             placeholder="שם המוסד"
//                                             value={customer?.instituteName || ""}
//                                             onChange={e => setCustomer({ ...customer, instituteName: e.target.value })}
//                                         />
//                                     </div>
//                                     {errors.instituteName && <div className="error-text">{errors.instituteName}</div>}

//                                     <div className="input-group">
//                                         <div className="input-icon">
//                                             {/* <Facustomers /> */}
//                                         </div>
//                                         <input 
//                                             type="text" 
//                                             className={`auth-input ${errors.community ? 'input-error' : ''}`}
//                                             placeholder="קהילה"
//                                             value={customer?.community || ""}
//                                             onChange={e => setCustomer({ ...customer, community: e.target.value })}
//                                         />
//                                     </div>
//                                     {errors.community && <div className="error-text">{errors.community}</div>}

//                                     <div className="input-group">
//                                         <div className="input-icon">
//                                             {/* <FaPhone /> */}
//                                         </div>
//                                         <input 
//                                             type="text" 
//                                             className={`auth-input ${errors.mobile ? 'input-error' : ''}`}
//                                             placeholder="טלפון"
//                                             value={customer?.mobile || ""}
//                                             onChange={e => setCustomer({ ...customer, mobile: e.target.value })}
//                                         />
//                                     </div>
//                                     {errors.mobile && <div className="error-text">{errors.mobile}</div>}

//                                     <div className="input-group">
//                                         <div className="input-icon">
//                                             {/* <FaFax /> */}
//                                         </div>
//                                         <input 
//                                             type="text" 
//                                             className="auth-input"
//                                             placeholder="פקס"
//                                             value={customer?.fax || ""}
//                                             onChange={e => setCustomer({ ...customer, fax: e.target.value })}
//                                         />
//                                     </div>

//                                     <div className="input-group">
//                                         <div className="input-icon">
//                                             {/* <FaEnvelope /> */}
//                                         </div>
//                                         <input 
//                                             type="email" 
//                                             className={`auth-input ${errors.email ? 'input-error' : ''}`}
//                                             placeholder="אימייל"
//                                             value={customer?.email || ""}
//                                             onChange={e => setCustomer({ ...customer, email: e.target.value })}
//                                         />
//                                     </div>
//                                     {errors.email && <div className="error-text">{errors.email}</div>}

//                                     <div className="input-group">
//                                         <div className="input-icon">
//                                             {/* <Facustomer /> */}
//                                         </div>
//                                         <input 
//                                             type="text" 
//                                             className="auth-input"
//                                             placeholder="שם איש קשר"
//                                             value={customer?.contactName || ""}
//                                             onChange={e => setCustomer({ ...customer, contactName: e.target.value })}
//                                         />
//                                     </div>

//                                     <div className="input-group">
//                                         <div className="input-icon">
//                                             {/* <FaMobileAlt /> */}
//                                         </div>
//                                         <input 
//                                             type="text" 
//                                             className="auth-input"
//                                             placeholder="טלפון איש קשר"
//                                             value={customer?.contactPhone || ""}
//                                             onChange={e => setCustomer({ ...customer, contactPhone: e.target.value })}
//                                         />
//                                     </div>

//                                     <div className="input-group">
//                                         <div className="input-icon">
//                                             {/* <FaCity /> */}
//                                         </div>
//                                         <input 
//                                             type="text" 
//                                             className={`auth-input ${errors.city ? 'input-error' : ''}`}
//                                             placeholder="עיר"
//                                             value={customer?.city || ""}
//                                             onChange={e => setCustomer({ ...customer, city: e.target.value })}
//                                         />
//                                     </div>
//                                     {errors.city && <div className="error-text">{errors.city}</div>}

//                                     {errors.submit && <div className="error-message">{errors.submit}</div>}

//                                     <div className="form-buttons">
//                                         {edit && (
//                                             <motion.button 
//                                                 className="secondary-button1"
//                                                 onClick={closeDialog}
//                                                 whileHover={{ scale: 1.03 }}
//                                                 whileTap={{ scale: 0.97 }}
//                                             >
//                                                 חזרה
//                                             </motion.button>
//                                         )}

//                                         <motion.button 
//                                             className="auth-button"
//                                             onClick={logOnn}
//                                             disabled={isLoading}
//                                             whileHover={{ scale: 1.03 }}
//                                             whileTap={{ scale: 0.97 }}
//                                         >
//                                             {isLoading ? (
//                                                 <div className="loader"></div>
//                                             ) : (
//                                                 edit ? "עדכן לקוח" : "הוסף לקוח"
//                                             )}
//                                         </motion.button>
//                                     </div>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </div>
//                 </div>
//             </div>
//         </dialog>
//     );
// };
// import { useDispatch } from "react-redux";
// import { useEffect, customeref, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import { addcustomerThunk } from "../../redux/slices/addcustomerFetch";
// import "./addNewcustomer.css"
// import { findcustomerByIdThunk } from "../../redux/slices/findcustomerByIdThunk";
// import { useNavigate } from "react-router-dom";
// import { Box, Button, LinearProgress } from "@mui/material";
// export const AddNewcustomer = () => {
//     const dispatch = useDispatch();


//     const [customer, setCustomer] = useState({
//         customerId: "",
//         firstName: "",
//         lastName: "",
//         phone: "",
//         email: "",
//         treatmentType: "",
//         password: ""
//     });
//     const refDialog = customeref()
//     const navigate = useNavigate();
//     useEffect(() => {
//         refDialog.current.showModal();

//     }, []);
//     const logOnn = () => {
//         dispatch(addcustomerThunk(customer));
//         navigate(`../`)

//     }

//     return <dialog className="inDiv1" ref={refDialog}>        

//         <img src="imglogo.png" alt="imglogo" className="imgLogin1" />

//         <div className="formLogin1">
//     <div className="butx" onClick={ ()=> navigate(`../`) }>x</div>

//             <fieldset className="fieldset1">
//                 <legend>פרטים אישיים</legend>
//                 <input className="logBut1" type="text" value={customer.firstName} placeholder="שם פרטי" onChange={e => setCustomer({ ...customer, firstName: e.target.value })} />
//                 <input className="logBut1" type="text" value={customer.lastName} placeholder="שם משפחה" onChange={e => setCustomer({ ...customer, lastName: e.target.value })} />
//                 <br /><input className="logBut1" type="text" value={customer.customerId} placeholder="מספר זהות" onChange={e => setCustomer({ ...customer, customerId: e.target.value })} />
//                 <input type="text" className="logBut1" value={customer.treatmentType} placeholder="סוג הטיפול" list="dlm" onChange={e => setCustomer({ ...customer, treatmentType: e.target.value })} />

//                 <datalist id="dlm">
//                     <option>קלינאות תקשורת</option>
//                     <option>ריפוי בעיסוק</option>
//                     <option>פיזיותרפיה</option>
//                     <option>ניתוח התנהגות</option>
//                     <option>טיפול רגשי</option>
//                 </datalist>

//                 <br /><input className="logBut1" type="email" value={customer.email} placeholder="כתובת מייל" onChange={e => setCustomer({ ...customer, email: e.target.value })} />
//                 <input className="logBut1" type="text" value={customer.phone} placeholder="טלפון נייד" onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
//                 <br />
//             </fieldset>
//             <br />
//             <fieldset className="fieldset1">
//                 <legend>סיסמא</legend>
//                 <input className="logBut1" type="password" value={customer.password} placeholder="בחר סיסמא" onChange={e => setCustomer({ ...customer, password: e.target.value })} />
//             </fieldset>
//             <br />
//             <button className="login1" onClick={() => { logOnn() }} >רישום</button>

//         </div>


//     </dialog>
// }
import { useDispatch } from "react-redux";
import { useEffect,  useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
// import { FaEye, FaEyeSlash, Facustomer, FaIdCard, FaPhone, FaEnvelope, FaStethoscope, FaLock } from "react-icons/fa";
import "./logon.css";
import { addCustomerThunk } from "../../store/slices/customers/addCustomerThunk";
// import { u } from "framer-motion/dist/types.d-DDSxwf0n";

export const Logon = () => {
    const dispatch = useDispatch();
    // const [customer, setCustomer] = useState({
    //     instituteName: "",
    //     fax: "",
    //     mobile: "",
    //     email: "",
    //     contactName: "",
    //     contactPhone: "",
    //     city: "",
    //     community: "",
    //     password: "",
    //     confirmPassword: ""
    //     // amount: 0,
    //     // "due": 0,   
    // });
    const [customer, setCustomer] = useState({
        instituteName: "",
        fax: "",
        mobile: "",
        email: "",
        contactName: "",
        contactPhone: "",
        city: "",
        community: "",
        password: "",
        confirmPassword: ""
        // amount: 0,
        // due: 0,   
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const dialogRef = useRef(null);
    const navigate = useNavigate();
    const israeliCities = [
        "ירושלים", "תל אביב", "חיפה", "ראשון לציון", "פתח תקווה", "אשדוד", "נתניה",
        "באר שבע", "חולון", "בני ברק", "רמת גן", "אשקלון", "רחובות", "בת ים", "הרצליה",
        "כפר סבא", "מודיעין", "רעננה", "רמלה", "לוד", "נצרת", "קריית אתא", "אילת"
    ];
    const treatmentTypes = [
        "קלינאות תקשורת",
        "ריפוי בעיסוק",
        "פיזיותרפיה",
        "ניתוח התנהגות",
        "טיפול רגשי"
    ];

    useEffect(() => {
        dialogRef.current.showModal();

        // אנימציה לפתיחת הדיאלוג
        dialogRef.current.animate(
            [
                { opacity: 0, transform: 'scale(0.9)' },
                { opacity: 1, transform: 'scale(1)' }
            ],
            { duration: 300, easing: 'ease-out' }
        );
    }, []);
    useEffect(() => {
        console.log("Current customer data:", customer);
    }, [customer]);
    const validateStep1 = () => {
        const newErrors = {};



        if (!customer.instituteName.trim()) {
            newErrors.instituteName = "יש להזין שם ";
        }
        if (!customer.mobile.trim()) {
            newErrors.mobile = "יש להזין מספר טלפון";
        } else if (!/^0\d{8}$/.test(customer.mobile)) {
            newErrors.mobile = "יש להזין מספר טלפון תקין (10 ספרות המתחיל ב-0)";
        }
        if (!customer.fax.trim()) {
            newErrors.fax = "יש להזין מספר פקס";
        } else if (!/^0\d{8}$/.test(customer.fax)) {
            newErrors.fax = "יש להזין מספר פקס תקין (10 ספרות המתחיל ב-0)";
        }
        if (!customer.city.trim()) {
            newErrors.city = "יש להזין  עיר ";
        }
        if (!customer.community.trim()) {
            newErrors.community = "יש להזין  קהילה ";
        }

        // if (!customer.customerId.trim()) {
        //     newErrors.customerId = "יש להזין מספר זהות";
        // } else if (!/^\d{9}$/.test(customer.customerId)) {
        //     newErrors.customerId = "מספר זהות חייב להכיל 9 ספרות";
        // }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!customer.email.trim()) {
            newErrors.email = "יש להזין כתובת אימייל";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
            newErrors.email = "יש להזין כתובת אימייל תקינה";
        }
        if (!customer.contactName.trim()) {
            newErrors.instituteName = "יש להזין שם ";
        }
        if (!customer.contactPhone.trim()) {
            newErrors.contactPhone = "יש להזין מספר פלאפון";
        } else if (!/^0\d{9}$/.test(customer.contactPhone)) {
            newErrors.contactPhone = "יש להזין מספר טלפון תקין (10 ספרות המתחיל ב-0)";
        }
        // } else if (!/^05\d{8}$/.test(customer.mobile)) {
        //     newErrors.mobile = "יש להזין מספר טלפון תקין (10 ספרות המתחיל ב-05)";
        // }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors = {};

        if (!customer.password) {
            newErrors.password = "יש להזין סיסמא";
        } else if (customer.password.length < 6) {
            newErrors.password = "הסיסמא חייבת להכיל לפחות 6 תווים";
        }

        if (!customer.confirmPassword) {
            newErrors.confirmPassword = "יש לאשר את הסיסמה";
        } else if (customer.password !== customer.confirmPassword) {
            newErrors.confirmPassword = "הסיסמאות אינן תואמות";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        console.log("Current step data:", customer);
    if (currentStep === 1 && validateStep1()) {
        setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
        setCurrentStep(3);
    }
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleRegister = async () => {
        // if (!validateStep3()) return;

        // setIsLoading(true);

        // try {
        //     // הסרת שדה confirmPassword לפני שליחה לשרת
        //     const { confirmPassword, ...customerToRegister } = customer;
        //     const { password, ...customerTosend } = customerToRegister;
        if (!validateStep3()) return;

        setIsLoading(true);

        try {
            // הסרת שדה confirmPassword לפני שליחה לשרת
            const { confirmPassword, ...customerToRegister } = customer;
            const { password, ...customerToSend } = customerToRegister;

            console.log("Data being sent to server:", customerToSend);
            console.log(customerToSend);
            await dispatch(addCustomerThunk({ details: customerToSend }));

            setRegistrationSuccess(true);

            // אנ
            // אנימציה להצלחת הרישום
            setTimeout(() => {
                const animation = dialogRef.current.animate(
                    [
                        { opacity: 1, transform: 'scale(1)' },
                        { opacity: 0, transform: 'scale(1.1)' }
                    ],
                    { duration: 300, easing: 'ease-in-out' }
                );

                animation.onfinish = () => {
                    navigate(`../login`);
                };
            }, 1500);
        } catch (error) {
            console.error("שגיאה ברישום:", error);
            setErrors({ submit: "אירעה שגיאה בתהליך הרישום. אנא נסה שנית." });
        } finally {
            setIsLoading(false);
        }
    };

    const closeDialog = () => {
        // אנימציה לסגירת הדיאלוג
        const animation = dialogRef.current.animate(
            [
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0.9)' }
            ],
            { duration: 200, easing: 'ease-in' }
        );

        animation.onfinish = () => {
            navigate(`../`);
        };
    };

    // רנדור תוכן הדיאלוג בהתאם לשלב הנוכחי
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">פרטים אישיים</h3>

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <Facustomer /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.instituteName ? 'input-error' : ''}`}
                                placeholder="שם משתמש"
                                value={customer.instituteName || ""}
                                onChange={e => setCustomer({ ...customer, instituteName: e.target.value })}
                            />
                        </div>
                        {errors.instituteName && <div className="error-text">{errors.instituteName}</div>}
                        {/*                         
                        <div className="input-group">
                            <div className="input-icon">
                                <Facustomer />
                            </div>
                            <input 
                                type="text" 
                                className={`auth-input ${errors.lastName ? 'input-error' : ''}`}
                                placeholder="שם משפחה"
                                value={customer.lastName}
                                onChange={e => setCustomer({ ...customer, lastName: e.target.value })}
                            />
                        </div> */}
                        {/* {errors.lastName && <div className="error-text">{errors.lastName}</div>} */}

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaIdCard /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.mobile ? 'input-error' : ''}`}
                                placeholder=" טלפון"
                                value={customer.mobile}
                                onChange={e => setCustomer({ ...customer, mobile: e.target.value })}
                            />
                        </div>
                        {errors.mobile && <div className="error-text">{errors.mobile}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaPhone /> */}
                            </div>
                            <input
                                type="tel"
                                className={`auth-input ${errors.fax ? 'input-error' : ''}`}
                                placeholder='פקס'
                                value={customer.fax}
                                onChange={e => setCustomer({ ...customer, fax: e.target.value })}
                            />
                        </div>
                        {errors.fax && <div className="error-text">{errors.fax}</div>}    <div className="input-group">
                            <div className="input-icon">
                                {/* <FaPhone /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.community ? 'input-error' : ''}`}
                                placeholder="קהילה "
                                value={customer.community}
                                onChange={e => setCustomer({ ...customer, community: e.target.value })}
                            />
                        </div>
                        {errors.community && <div className="error-text">{errors.community}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaStethoscope /> */}
                            </div>
                            <select
                                className={`auth-input ${errors.city ? 'input-error' : ''}`}
                                value={customer.city}
                                onChange={e => setCustomer({ ...customer, city: e.target.value })}
                            >
                                <option value="" disabled> עיר</option>
                                {israeliCities.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        {errors.city && <div className="error-text">{errors.city}</div>}
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">פרטי התקשרות</h3>

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaEnvelope /> */}
                            </div>
                            <input
                                type="email"
                                className={`auth-input ${errors.email ? 'input-error' : ''}`}
                                placeholder="כתובת אימייל"
                                value={customer.email}
                                onChange={e => setCustomer({ ...customer, email: e.target.value })}
                            />
                        </div>
                        {errors.email && <div className="error-text">{errors.email}</div>}

                        {/* <div className="input-group">
                            <div className="input-icon">
                               <FaPhone /> 
                            </div>
                            <input 
                                type="tel" 
                                className={`auth-input ${errors.phone ? 'input-error' : ''}`}
                                placeholder="טלפון נייד"
                                value={customer.phone}
                                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                            />
                        </div>
                        {errors.phone && <div className="error-text">{errors.phone}</div>} */}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaPhone /> */}
                            </div>
                            <input
                                type="text"
                                className={`auth-input ${errors.contactName ? 'input-error' : ''}`}
                                placeholder='שם איש קשר'
                                value={customer.contactName}
                                onChange={e => setCustomer({ ...customer, contactName: e.target.value })}
                            />
                        </div>
                        {errors.contactName && <div className="error-text">{errors.contactName}</div>}
                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaPhone /> */}
                            </div>
                            <input
                                type="tel"
                                className={`auth-input ${errors.contactPhone ? 'input-error' : ''}`}
                                placeholder="טלפון נייד"
                                value={customer.contactPhone}
                                onChange={e => setCustomer({ ...customer, contactPhone: e.target.value })}
                            />
                        </div>
                        {errors.contactPhone && <div className="error-text">{errors.contactPhone}</div>}
                        <div className="info-box">
                            <p>פרטי ההתקשרות שלך ישמשו לשליחת עדכונים ותזכורות לגבי הפגישות שלך.</p>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        className="step-content"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="step-title">הגדרת סיסמה</h3>

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaLock /> */}
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`auth-input ${errors.password ? 'input-error' : ''}`}
                                placeholder="בחר סיסמה"
                                value={customer.password}
                                onChange={e => setCustomer({ ...customer, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                            >
                                {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                            </button>
                        </div>
                        {errors.password && <div className="error-text">{errors.password}</div>}

                        <div className="input-group">
                            <div className="input-icon">
                                {/* <FaLock /> */}
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`auth-input ${errors.confirmPassword ? 'input-error' : ''}`}
                                placeholder="אימות סיסמה"
                                value={customer.confirmPassword}
                                onChange={e => setCustomer({ ...customer, confirmPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                            >
                                {/* {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} */}
                            </button>
                        </div>
                        {errors.confirmPassword && <div className="error-text">{errors.confirmPassword}</div>}

                        <div className="password-strength">
                            <div className="strength-label">חוזק הסיסמה:</div>
                            <div className="strength-meter">
                                <div
                                    className={`strength-indicator ${!customer.password ? 'empty' :
                                        customer.password.length < 6 ? 'weak' :
                                            customer.password.length < 8 ? 'medium' : 'strong'
                                        }`}
                                    style={{
                                        width: !customer.password ? '0%' :
                                            customer.password.length < 6 ? '33%' :
                                                customer.password.length < 8 ? '66%' : '100%'
                                    }}
                                ></div>
                            </div>
                            <div className="strength-text">
                                {!customer.password ? '' :
                                    customer.password.length < 6 ? 'חלשה' :
                                        customer.password.length < 8 ? 'בינונית' : 'חזקה'}
                            </div>
                        </div>

                        <div className="info-box">
                            <p>מומלץ להשתמש בסיסמה הכוללת אותיות, מספרים וסימנים מיוחדים.</p>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <dialog className="auth-dialog register-dialog" ref={dialogRef}>
            <div className="auth-container">
                <div className="auth-header">
                    <h2 className="auth-title">הרשמה למערכת</h2>
                    <button
                        className="close-button"
                        onClick={closeDialog}
                        aria-label="סגור"
                    >
                        ×
                    </button>
                </div>

                <div className="auth-content">
                    <div className="logo-container1">
                        <img src="logo2.JPG" alt="לוגו הקליניקה" className="auth-logo" />
                    </div>

                    <div className="form-container">
                        <AnimatePresence mode="wait">
                            {registrationSuccess ? (
                                <motion.div
                                    className="success-message"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="success-icon">✓</div>
                                    <h3>ההרשמה הושלמה בהצלחה!</h3>
                                    <p>מיד תועבר למסך ההתחברות...</p>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="steps-indicator">
                                        {[1, 2, 3].map(step => (
                                            <div
                                                key={step}
                                                className={`step-dot ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
                                                onClick={() => {
                                                    if (step < currentStep) {
                                                        setCurrentStep(step);
                                                    }
                                                }}
                                            >
                                                {step}
                                            </div>
                                        ))}
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {renderStepContent()}
                                    </AnimatePresence>

                                    {errors.submit && (
                                        <div className="error-message">{errors.submit}</div>
                                    )}

                                    <div className="form-buttons">
                                        {currentStep > 1 && (
                                            <motion.button
                                                className="secondary-button1"
                                                onClick={handlePrevStep}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                הקודם
                                            </motion.button>
                                        )}

                                        {currentStep < 3 ? (
                                            <motion.button
                                                className="auth-button"
                                                onClick={handleNextStep}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                הבא
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                className="auth-button"
                                                onClick={handleRegister}
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                            >
                                                {isLoading ? (
                                                    <div className="loader"></div>
                                                ) : (
                                                    "הירשם"
                                                )}
                                            </motion.button>
                                        )}
                                    </div>
                                </>
                            )}
                        </AnimatePresence>

                        {!registrationSuccess && (
                            <div className="auth-links">
                                <p>כבר רשום למערכת?</p>
                                <motion.button
                                    className="link-button"
                                    onClick={() => navigate(`/login`)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    התחבר עכשיו
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
};