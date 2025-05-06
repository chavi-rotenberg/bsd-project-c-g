   // import { useEffect, useState} from 'react';
// // import './style.css'
// import { useDispatch, useSelector } from "react-redux";
// // import { searchEventThunk } from '../store/slices/searchEventThunk'
// import { Outlet, useNavigate } from 'react-router-dom';
// import {deleteCustomerThunk} from '../../store/slices/customers/deleteCustomerThunk'
// import {customersFetchThunk } from '../../store/slices/customers/customersFetch';
// import './customer.css'
// import '@emotion/styled'
// import { Button } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
// // import {EditDocumentIcon} from '@mui/icons-material/EditDocument';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

// export const Customers =()=>{
//    const navigate = useNavigate()
//   const dispatch= useDispatch();
//   const customers= useSelector(state=>state.customer.customers)
//   console.log(customers)

//   const token = useSelector(state => state.customer.token);
//   const failed = useSelector(state => state.customer.failed);
//   const [delt,setDelt]=useState(false);
//   const [edit,setEdit]=useState(false);
//   const [custId, setCustId]=useState(-1);

//  useEffect(() => {

//   dispatch(customersFetchThunk());

//   // navigate(`/calendar`)

// }, [])
// useEffect(() => {

//    // if(customers.length>0)

//   // navigate(`/calendar`)

//   }, [customers])

// const  deleteCustomer=async(id)=>{
//     debugger
//     dispatch(deleteCustomerThunk(id))
//    console.log("success");

// }

//    return  <div className='CustomerPage'>
//     <h1 className='myCustomers'>my Customers</h1>

//         <table>
//             <thead>
//                 <tr>
//                <th>InstituteId</th>
//                <th>InstituteName</th>
//                <th>Fax</th>
//                <th>Telephone</th>
//                <th>Email</th>
//                <th>ContactName</th>
//                <th>ContactPhone</th>
//                <th>City</th>
//                <th>Community</th>
//                <th>Amount</th>
//                <th>Due</th>
//                <th></th>
//                <th></th>
//          </tr>   </thead>
//             <tbody>
//                 {customers.length>0 && customers.map(c=> {return<tr className={c.instituteId===custId} onClick={() => {setCustId(c.instituteId);setDelt(true);setEdit(true)}} key={c.instituteId}>
//                 <td >{c.instituteId}</td>
//                 <td>{c.instituteName}</td>
//                 <td>{c.fax}</td>
//                 <td>{c.mobile}</td>
//                 <td>{c.email}</td>
//                 <td>{c.contactName}</td>
//                 <td>{c.contactPhone}</td>
//                 <td>{c.city}</td>
//                 <td>{c.community}</td>
//                 <td>{c.amount}</td>
//                 <td>{c.due}</td>
//                 <td>
//                 {/* <Button variant='outlined' onClick={()=>deleteCustomer(c.instituteId)} endIcon={<DeleteForeverOutlinedIcon htmlColor='#3b3a3d' />}  ></Button> */}
//                 <IconButton onClick={()=>deleteCustomer(c.instituteId)} aria-label="delete" size='large' >
//                 <DeleteForeverOutlinedIcon htmlColor=' #3b3a3d'/>
//                 </IconButton>

//                 </td>
//                 <td>
//                 {/* <Button variant='outlined' style={{backgroundColor:"white"}} onClick={()=>navigate(`editCustomer/${c.instituteId}`)} endIcon={<EditNoteOutlinedIcon  htmlColor='#3b3a3d' />}></Button> */}
//                 <IconButton onClick={()=>navigate(`editCustomer/${c.instituteId}`)} aria-label="edit" size='large' >
//                 <EditNoteOutlinedIcon htmlColor=' #3b3a3d'/>
//                 </IconButton>
//                 </td>
//                </tr>})}
//             </tbody>
//         </table>
//         <button className='button' onClick={()=>navigate('newCustomer')}>add</button>

//         {/* {delt && <button onClick={()=>deleteCustomer(custId)}>delete</button>}
//         {edit && <button onClick={()=>navigate(`editCustomer/${custId}`)}>edit</button>} */}
//         {/* <Button variant='text'>nnnngf</Button> */}
//  <div>
//     <Outlet></Outlet>
//  </div>
//     </div>
// } 


   import { useEffect, useState, useMemo, useRef } from 'react';
   import { useDispatch, useSelector } from "react-redux";
   import { Outlet, useNavigate } from 'react-router-dom';
   import { deleteCustomerThunk } from '../../store/slices/customers/deleteCustomerThunk';
   import { customersFetchThunk } from '../../store/slices/customers/customersFetch';
   import './customer.css';

   // Material UI
   import {
     Box, Typography, Button, IconButton, Table, TableBody, TableCell, 
     TableContainer, TableHead, TableRow, TablePagination, TextField,
     Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
     Snackbar, Alert, InputAdornment, Paper, Grid, Card, CardContent,
     Avatar, Chip, Menu, MenuItem, ListItemIcon, ListItemText, Checkbox,
     Divider, Tooltip, Collapse, CircularProgress, useMediaQuery, useTheme
   } from '@mui/material';

   import {
     Add as AddIcon,
     Search as SearchIcon,
     FilterList as FilterListIcon,
     Sort as SortIcon,
     Delete as DeleteIcon,
     Edit as EditIcon,
     Visibility as VisibilityIcon,
     PeopleAlt as PeopleAltIcon,
     MonetizationOn as MonetizationOnIcon,
     LocationCity as LocationCityIcon,
     Email as EmailIcon,
     Close as CloseIcon,
     ExpandMore as ExpandMoreIcon,
     ExpandLess as ExpandLessIcon,
     Download as DownloadIcon,
     TableChart as TableChartIcon,
   //   PictureAsPdfIcon,
     Print as PrintIcon,
     SearchOff as SearchOffIcon,
     Refresh as RefreshIcon,
     MoreVert as MoreVertIcon
   } from '@mui/icons-material';

   // Charts
   import {
     BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
     Legend, ResponsiveContainer, PieChart, Pie, Cell
   } from 'recharts';

   // For exports
   import * as XLSX from 'xlsx';
   import { jsPDF } from 'jspdf';
   import 'jspdf-autotable' 
   import html2canvas from 'html2canvas';

   export const Customers = () => {
    const refPdf=useRef(null);
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const theme = useTheme();
     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
     // Redux state
     const customers = useSelector((state) => state.customer.customers || []);
     const isLoading = useSelector((state) => state.customer.isLoading);
  
     // Local state
     const [filteredCustomers, setFilteredCustomers] = useState([]);
     const [searchTerm, setSearchTerm] = useState('');
     const [page, setPage] = useState(0);
     const [rowsPerPage, setRowsPerPage] = useState(10);
     const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
     const [selectedCustomer, setSelectedCustomer] = useState(null);
     const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
     const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
     const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
     const [exportMenuAnchor, setExportMenuAnchor] = useState(null);
     const [activeFilters, setActiveFilters] = useState([]);
     const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
     const [showCharts, setShowCharts] = useState(false);
     const [anchorEl, setAnchorEl] = useState(null);
     const [advancedSearch, setAdvancedSearch] = useState({
       contactName: '',
       city: '',
       email: '',
       minAmount: ''
     });
     const [snackbar, setSnackbar] = useState({
       open: false,
       message: '',
       severity: 'success'
     });
     const [Loading, setLoading] = useState(false);
     // Colors for charts
     const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];
  
     // Fetch customers on component mount
     useEffect(() => {
       dispatch(customersFetchThunk());
     }, [dispatch]);
  
     // Memoized filtered and sorted customers
     const processedCustomers = useMemo(() => {
       if (!customers.length) return [];
    
       let result = [...customers];
    
       // Apply search
       if (searchTerm) {
         result = result.filter(customer =>
           (customer.instituteName && customer.instituteName.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (customer.contactName && customer.contactName.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
           (customer.city && customer.city.toLowerCase().includes(searchTerm.toLowerCase()))
         );
       }
    
       // Apply advanced search
       if (Object.values(advancedSearch).some(value => value !== '')) {
         if (advancedSearch.contactName) {
           result = result.filter(customer =>
             customer.contactName && customer.contactName.toLowerCase().includes(advancedSearch.contactName.toLowerCase())
           );
         }
      
         if (advancedSearch.city) {
           result = result.filter(customer =>
             customer.city && customer.city.toLowerCase().includes(advancedSearch.city.toLowerCase())
           );
         }
      
         if (advancedSearch.email) {
           result = result.filter(customer =>
             customer.email && customer.email.toLowerCase().includes(advancedSearch.email.toLowerCase())
           );
         }
      
         if (advancedSearch.minAmount) {
           result = result.filter(customer =>
             customer.amount >= parseFloat(advancedSearch.minAmount)
           );
         }
       }
    
       // Apply filters
       if (activeFilters.includes('highAmount')) {
         result = result.filter(customer => customer.amount >= 5000);
       }
    
       if (activeFilters.includes('dueSoon')) {
         const oneMonthFromNow = new Date();
         oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
      
         result = result.filter(customer => {
           if (!customer.due) return false;
           const dueDate = new Date(customer.due);
           return dueDate <= oneMonthFromNow && dueDate >= new Date();
         });
       }
    
       // Apply sorting
       if (sortConfig.key) {
         result.sort((a, b) => {
           if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
           if (!a[sortConfig.key]) return 1;
           if (!b[sortConfig.key]) return -1;
        
           const aValue = typeof a[sortConfig.key] === 'string' ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
           const bValue = typeof b[sortConfig.key] === 'string' ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];
        
           if (aValue < bValue) {
             return sortConfig.direction === 'asc' ? -1 : 1;
           }
           if (aValue > bValue) {
             return sortConfig.direction === 'asc' ? 1 : -1;
           }
           return 0;
         });
       }
    
       return result;
     }, [customers, searchTerm, advancedSearch, activeFilters, sortConfig]);
  
     // Update filtered customers when processed customers change
     useEffect(() => {
       setFilteredCustomers(processedCustomers);
     }, [processedCustomers]);
  
     // Chart data preparation
     const cityChartData = useMemo(() => {
       const cityCount = {};
    
       customers.forEach(customer => {
         if (customer.city) {
           cityCount[customer.city] = (cityCount[customer.city] || 0) + 1;
         }
       });
    
       // Convert to array and sort by count
       const cityData = Object.entries(cityCount)
         .map(([name, value]) => ({ name, value }))
         .sort((a, b) => b.value - a.value);
    
       // Take top 5 cities and group the rest as "אחר"
       if (cityData.length > 5) {
         const topCities = cityData.slice(0, 5);
         const otherCount = cityData.slice(5).reduce((sum, city) => sum + city.value, 0);
      
         return [...topCities, { name: 'אחר', value: otherCount }];
       }
    
       return cityData;
     }, [customers]);
  
     const amountChartData = useMemo(() => {
       const amountRanges = {
         '0-1000': 0,
         '1001-5000': 0,
         '5001-10000': 0,
         '10001+': 0
       };
    
       customers.forEach(customer => {
         const amount = customer.amount || 0;
         if (amount <= 1000) {
           amountRanges['0-1000']++;
         } else if (amount <= 5000) {
           amountRanges['1001-5000']++;
         } else if (amount <= 10000) {
           amountRanges['5001-10000']++;
         } else {
           amountRanges['10001+']++;
         }
       });
    
       return Object.entries(amountRanges).map(([name, value]) => ({ name, value }));
     }, [customers]);
  
     // Handlers
     const handleChangePage = (event, newPage) => {
       setPage(newPage);
     };
  
     const handleChangeRowsPerPage = (event) => {
       setRowsPerPage(parseInt(event.target.value, 10));
       setPage(0);
     };
  
     const handleSort = (key) => {
       setSortConfig({
         key,
         direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
       });
     };
  
     const handleMenuOpen = (event, customer) => {
       setAnchorEl(event.currentTarget);
       setSelectedCustomer(customer);
     };
  
     const handleMenuClose = () => {
       setAnchorEl(null);
     };
  
     const handleDeleteClick = () => {
       setOpenDeleteDialog(true);
       handleMenuClose();
     };
  
     const handleEditClick = () => {
       navigate(`editCustomer/${selectedCustomer.instituteId}`);
       handleMenuClose();
     };
  
     const handleViewDetails = () => {
       setOpenDetailsDialog(true);
       handleMenuClose();
     };
  
     const handleDeleteConfirm = async () => {
       try {
         await dispatch(deleteCustomerThunk(selectedCustomer.instituteId));
         setOpenDeleteDialog(false);
         setSnackbar({
           open: true,
           message: 'לקוח נמחק בהצלחה',
           severity: 'success'
         });
       } catch (error) {
         setSnackbar({
           open: true,
           message: 'שגיאה במחיקת הלקוח',
           severity: 'error'
         });
       }
     };
  
     const handleFilterMenuOpen = (event) => {
       setFilterMenuAnchor(event.currentTarget);
     };
  
     const handleFilterMenuClose = () => {
       setFilterMenuAnchor(null);
     };
  
     const handleFilterToggle = (filter) => {
       if (activeFilters.includes(filter)) {
         setActiveFilters(activeFilters.filter(f => f !== filter));
       } else {
         setActiveFilters([...activeFilters, filter]);
       }
     };
  
     const handleExportMenuOpen = (event) => {
       setExportMenuAnchor(event.currentTarget);
     };
  
     const handleExportMenuClose = () => {
       setExportMenuAnchor(null);
     };
  
     const handleAdvancedSearch = () => {
       // The search is applied through the useMemo hook
       // This is just to close the advanced search panel if needed
       if (Object.values(advancedSearch).every(value => value === '')) {
         setShowAdvancedSearch(false);
       }
     };
  
     const handleClearAdvancedSearch = () => {
       setAdvancedSearch({
         contactName: '',
         city: '',
         email: '',
         minAmount: ''
       });
     };
  
     const handleClearFilters = () => {
       setSearchTerm('');
       setActiveFilters([]);
       handleClearAdvancedSearch();
       setSortConfig({ key: '', direction: '' });
       handleFilterMenuClose();
     };
  
     const handleSnackbarClose = () => {
       setSnackbar({ ...snackbar, open: false });
     };
  
     const handleRefresh = () => {
       dispatch(customersFetchThunk())
         .then(() => {
           setSnackbar({
             open: true,
             message: 'רשימת הלקוחות עודכנה בהצלחה',
             severity: 'success'
           });
         })
         .catch((error) => {
           setSnackbar({
             open: true,
             message: `שגיאה בטעינת הלקוחות: ${error.message}`,
             severity: 'error'
           });
         });
     };
  
     // Export functions
     const exportToExcel = () => {
       // Create worksheet from filtered customers
       const worksheet = XLSX.utils.json_to_sheet(filteredCustomers.map(customer => ({
         'מזהה': customer.instituteId,
         'שם מוסד': customer.instituteName,
         'פקס': customer.fax || '',
         'טלפון': customer.mobile || '',
         'אימייל': customer.email || '',
         'איש קשר': customer.contactName || '',
         'טלפון איש קשר': customer.contactPhone || '',
         'עיר': customer.city || '',
         'קהילה': customer.community || '',
         'סכום': customer.amount,
         'תאריך תשלום': customer.due ? new Date(customer.due).toLocaleDateString('he-IL') : ''
       })));
    
       // Create workbook and add the worksheet
       const workbook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(workbook, worksheet, 'לקוחות');
    
       // Generate Excel file and trigger download
       XLSX.writeFile(workbook, 'רשימת_לקוחות.xlsx');
    
       // Show success message
       setSnackbar({
         open: true,
         message: 'הקובץ יוצא בהצלחה',
         severity: 'success'
       });
    
       handleExportMenuClose();
     };
  
    //  const exportToPDF = () => {
    //    const doc = new jsPDF('landscape');
    
    //    // Add title
    //    doc.setFont('Helvetica', 'bold');
    //    doc.setFontSize(18);
    //    doc.text('רשימת לקוחות', doc.internal.pageSize.width / 2, 20, { align: 'center' });
    
    //    // Add date
    //    doc.setFont('Helvetica', 'normal');
    //    doc.setFontSize(12);
    //    doc.text(`תאריך הפקה: ${new Date().toLocaleDateString('he-IL')}`, doc.internal.pageSize.width - 20, 30, { align: 'right' });
    
    //    // Create table data
    //    const tableColumn = ['מזהה', 'שם מוסד', 'איש קשר', 'טלפון', 'עיר', 'סכום', 'תאריך תשלום'];
    //    const tableRows = filteredCustomers.map(customer => [
    //      customer.instituteId,
    //      customer.instituteName,
    //      customer.contactName || '',
    //      customer.mobile || '',
    //      customer.city || '',
    //      `₪${customer.amount?.toLocaleString() || 0}`,
    //      `₪${customer.due?.toLocaleString() || 0}`
    //      //customer.due ? //new Date(customer.due).toLocaleDateString('he-IL') : ''
    //    ]);
    // console.log(tableRows);
    //   //  Generate table
    //   //  doc.autoTable({
    //   //    head: [tableColumn],
    //   //    body: tableRows,
    //   //    startY: 40,
    //   //    styles: { font: 'Helvetica', halign: 'right' },
    //   //    headStyles: { fillColor: [123, 31, 162], textColor: 255 },
    //   //    alternateRowStyles: { fillColor: [245, 247, 250] },
    //   //    margin: { top: 40 }
    //   //  });
    
    //    // Save PDF
    //    doc.save('רשימת_לקוחות.pdf');
    
    //    // Show success message
    //    setSnackbar({
    //      open: true,
    //      message: 'הקובץ יוצא בהצלחה',
    //      severity: 'success'
    //    });
    
    //    handleExportMenuClose();
    //  };
    
    const exportToPDF = async () => {
      // if (!achivments || !achivments.completeMark) return;
      
      const content = refPdf.current;
      console.log(content);
      if (!content) return;
  
      try {
         setLoading(true);
  
        const canvas = await html2canvas(content, {
          scale: 2, // איכות גבוהה יותר
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
  
        // const imgData = canvas.toDataURL('image/png');
  
        // יצירת PDF בגודל A4
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
  
        const imgWidth = 210; // רוחב דף A4 במ"מ
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  
        // שמירת הקובץ
        pdf.save(`רשימת_לקוחות.pdf`);
      } catch (error) {
        console.error('Error exporting to PDF:', error);
      } finally {
         setLoading(false);
      }
    };
  
     const handleExport = (type) => {
       switch (type) {
         case 'excel':
           exportToExcel();
           break;
         case 'pdf':
           exportToPDF();
           break;
         case 'print':
           window.print();
           handleExportMenuClose();
           break;
         default:
           break;
       }
     };
    
     // Custom label for pie chart
     const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
       const RADIAN = Math.PI / 180;
       const radius = outerRadius * 1.1;
       const x = cx + radius * Math.cos(-midAngle * RADIAN);
       const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
       return (
         <text 
           x={x} 
           y={y} 
           fill={COLORS[index % COLORS.length]}
           textAnchor={x > cx ? 'start' : 'end'} 
           dominantBaseline="central"
           style={{ fontFamily: 'Rubik, sans-serif', fontSize: 12 }}
         >
           {`${name} (${(percent * 100).toFixed(0)}%)`}
         </text>
       );
     };
    
     // Render loading state
     if (isLoading) {
       return (
         <Box className="loading-container">
           <CircularProgress color="primary" />
           <Typography variant="h6" sx={{ mt: 2 }}>טוען נתוני לקוחות...</Typography>
         </Box>
       );
     }
    
     return (
       <Box className="customers-dashboard">
         {/* Dashboard Header */}
         <Box className="dashboard-header">
           <Typography variant="h4" className="page-title">
             <PeopleAltIcon className="header-icon" />
             ניהול לקוחות
           </Typography>
           
           <Box className="header-actions">
             <Button
               variant="contained"
               startIcon={<AddIcon />}
               onClick={() => navigate('newCustomer')}
               className="add-customer-button"
             >
               הוסף לקוח
             </Button>
             
             <Button
               variant="outlined"
               startIcon={<RefreshIcon />}
               onClick={handleRefresh}
               className="refresh-button"
             >
               רענן
             </Button>
           </Box>
         </Box>
         
         {/* Stats Cards */}
         <Grid container spacing={3} className="stats-container">
           <Grid item xs={12} sm={6} md={3}>
             <Card className="stat-card total-customers">
               <CardContent>
                 <Box className="stat-icon-container">
                   <Avatar className="stat-icon">
                     <PeopleAltIcon />
                   </Avatar>
                 </Box>
                 <Typography variant="h5" component="div">
                   {customers.length}
                 </Typography>
                 <Typography color="text.secondary">
                   סה"כ לקוחות
                 </Typography>
               </CardContent>
             </Card>
           </Grid>
           
           <Grid item xs={12} sm={6} md={3}>
             <Card className="stat-card total-amount">
               <CardContent>
                 <Box className="stat-icon-container">
                   <Avatar className="stat-icon">
                     <MonetizationOnIcon />
                   </Avatar>
                 </Box>
                 <Typography variant="h5" component="div">
                   ₪{customers.reduce((sum, customer) => sum + (customer.amount || 0), 0).toLocaleString()}
                 </Typography>
                 <Typography color="text.secondary">
                   סה"כ הכנסות
                 </Typography>
               </CardContent>
             </Card>
           </Grid>
           
           <Grid item xs={12} sm={6} md={3}>
             <Card className="stat-card cities">
               <CardContent>
                 <Box className="stat-icon-container">
                   <Avatar className="stat-icon">
                     <LocationCityIcon />
                   </Avatar>
                 </Box>
                 <Typography variant="h5" component="div">
                   {new Set(customers.filter(c => c.city).map(c => c.city)).size}
                 </Typography>
                 <Typography color="text.secondary">
                   ערים
                 </Typography>
               </CardContent>
             </Card>
           </Grid>
           
           <Grid item xs={12} sm={6} md={3}>
             <Card className="stat-card emails">
               <CardContent>
                 <Box className="stat-icon-container">
                   <Avatar className="stat-icon">
                     <EmailIcon />
                   </Avatar>
                 </Box>
                 <Typography variant="h5" component="div">
                   {customers.filter(c => c.email && c.email.includes('@')).length}
                 </Typography>
                 <Typography color="text.secondary">
                   אימיילים פעילים
                 </Typography>
               </CardContent>
             </Card>
           </Grid>
         </Grid>
         
         {/* Charts Section */}
         <Box className="charts-section">
           <Button
             variant="text"
             className="toggle-charts-button"
             onClick={() => setShowCharts(!showCharts)}
             startIcon={showCharts ? <ExpandLessIcon /> : <ExpandMoreIcon />}
           >
             {showCharts ? 'הסתר גרפים' : 'הצג גרפים'}
           </Button>
           
           <Collapse in={showCharts}>
             <Grid container spacing={3} className="charts-container">
               <Grid item xs={12} md={6}>
                 <Paper className="chart-paper" elevation={3}>
                   <Typography variant="h6" className="chart-title">התפלגות לקוחות לפי ערים</Typography>
                   <ResponsiveContainer width="100%" height={300}>
                     <PieChart>
                       <Pie
                         data={cityChartData}
                         cx="50%"
                         cy="50%"
                         labelLine={false}
                         outerRadius={100}
                         fill="#8884d8"
                         dataKey="value"
                         label={renderCustomizedLabel}
                       >
                         {cityChartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))}
                       </Pie>
                       <Legend />
                       <RechartsTooltip formatter={(value, name) => [`${value} לקוחות`, name]} />
                     </PieChart>
                   </ResponsiveContainer>
                 </Paper>
               </Grid>
               
               <Grid item xs={12} md={6}>
                 <Paper className="chart-paper" elevation={3}>
                   <Typography variant="h6" className="chart-title">התפלגות לקוחות לפי סכום</Typography>
                   <ResponsiveContainer width="100%" height={300}>
                     <BarChart
                       data={amountChartData}
                       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                     >
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="name" />
                       <YAxis />
                       <RechartsTooltip formatter={(value) => [`${value} לקוחות`]} />
                       <Legend />
                       <Bar
                         dataKey="value"
                         fill="#8884d8"
                         name="מספר לקוחות"
                       >
                         {amountChartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))}
                       </Bar>
                     </BarChart>
                   </ResponsiveContainer>
                 </Paper>
               </Grid>
             </Grid>
           </Collapse>
         </Box>
         
         {/* Search and Filter Section */}
         <Box className="search-filter-container">
           <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
             <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
               <TextField
                 className="search-field"
                 placeholder="חיפוש לקוחות..."
                 variant="outlined"
                 size="small"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <SearchIcon />
                     </InputAdornment>
                   ),
                 }}
                 fullWidth
               />
               
               <Button
                 variant="text"
                 color="primary"
                 onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                 startIcon={showAdvancedSearch ? <ExpandLessIcon /> : <ExpandMoreIcon />}
               >
                 {showAdvancedSearch ? 'הסתר חיפוש מתקדם' : 'חיפוש מתקדם'}
               </Button>
             </Box>
             
             {/* Advanced Search Container */}
             <Collapse in={showAdvancedSearch}>
               <Paper className="advanced-search-container" elevation={2}>
                 <Grid container spacing={2} padding={2}>
                   <Grid item xs={12} sm={6} md={3}>
                     <TextField
                       className="advanced-search-field"
                       label="שם איש קשר"
                       variant="outlined"
                       size="small"
                       value={advancedSearch.contactName || ''}
                       onChange={(e) => setAdvancedSearch({ ...advancedSearch, contactName: e.target.value })}
                       fullWidth
                     />
                   </Grid>
                   <Grid item xs={12} sm={6} md={3}>
                     <TextField
                       className="advanced-search-field"
                       label="עיר"
                       variant="outlined"
                       size="small"
                       value={advancedSearch.city || ''}
                       onChange={(e) => setAdvancedSearch({ ...advancedSearch, city: e.target.value })}
                       fullWidth
                     />
                   </Grid>
                   <Grid item xs={12} sm={6} md={3}>
                     <TextField
                       className="advanced-search-field"
                       label="אימייל"
                       variant="outlined"
                       size="small"
                       value={advancedSearch.email || ''}
                       onChange={(e) => setAdvancedSearch({ ...advancedSearch, email: e.target.value })}
                       fullWidth
                     />
                   </Grid>
                   <Grid item xs={12} sm={6} md={3}>
                     <TextField
                       className="advanced-search-field"
                       label="סכום מינימלי"
                       variant="outlined"
                       size="small"
                       type="number"
                       value={advancedSearch.minAmount || ''}
                       onChange={(e) => setAdvancedSearch({ ...advancedSearch, minAmount: e.target.value })}
                       fullWidth
                     />
                   </Grid>
                   <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
                     <Grid item>
                       <Button
                         variant="contained"
                         color="primary"
                         onClick={handleAdvancedSearch}
                         className="advanced-search-button"
                         size="small"
                       >
                         חפש
                       </Button>
                     </Grid>
                     <Grid item>
                       <Button
                         variant="outlined"
                         color="secondary"
                         onClick={handleClearAdvancedSearch}
                         size="small"
                       >
                         נקה
                       </Button>
                     </Grid>
                   </Grid>
                 </Grid>
               </Paper>
             </Collapse>
           </Box>
           
           <Box className="filter-actions">
             {activeFilters.length > 0 && (
               <Box className="active-filters">
                 {activeFilters.includes('highAmount') && (
                   <Chip
                     label="סכום גבוה"
                     onDelete={() => handleFilterToggle('highAmount')}
                     className="filter-chip"
                     size="small"
                   />
                 )}
                 {activeFilters.includes('dueSoon') && (
                   <Chip
                     label="תשלום קרוב"
                     onDelete={() => handleFilterToggle('dueSoon')}
                     className="filter-chip"
                     size="small"
                   />
                 )}
               </Box>
             )}
             
             <Button
               variant="outlined"
               startIcon={<FilterListIcon />}
               onClick={handleFilterMenuOpen}
               className="filter-button"
               size="small"
             >
               סינון
             </Button>
             
             <Button
               variant="outlined"
               startIcon={<DownloadIcon />}
               onClick={handleExportMenuOpen}
               className="export-button"
               size="small"
             >
               ייצוא
             </Button>
           </Box>
         </Box>
        
        {/* Table Section */}
        <Paper className="table-container" ref={refPdf} elevation={3}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table" className="customers-table">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header-cell" onClick={() => handleSort('instituteId')}>
                    מזהה
                    {sortConfig.key === 'instituteId' && (
                      <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                    )}
                  </TableCell>
                  <TableCell className="table-header-cell" onClick={() => handleSort('instituteName')}>
                    שם מוסד
                    {sortConfig.key === 'instituteName' && (
                      <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                    )}
                  </TableCell>
                  {!isMobile && (
                    <>
                      <TableCell className="table-header-cell">פקס</TableCell>
                      <TableCell className="table-header-cell">טלפון</TableCell>
                    </>
                  )}
                  <TableCell className="table-header-cell" onClick={() => handleSort('email')}>
                    אימייל
                    {sortConfig.key === 'email' && (
                      <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                    )}
                  </TableCell>
                  <TableCell className="table-header-cell" onClick={() => handleSort('contactName')}>
                    איש קשר
                    {sortConfig.key === 'contactName' && (
                      <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                    )}
                  </TableCell>
                  {!isMobile && (
                    <TableCell className="table-header-cell">טלפון איש קשר</TableCell>
                  )}
                  <TableCell className="table-header-cell" onClick={() => handleSort('city')}>
                    עיר
                    {sortConfig.key === 'city' && (
                      <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                    )}
                  </TableCell>
                  {!isMobile && (
                    <TableCell className="table-header-cell">קהילה</TableCell>
                  )}
                  <TableCell className="table-header-cell" onClick={() => handleSort('amount')}>
                    סכום
                    {sortConfig.key === 'amount' && (
                      <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                    )}
                  </TableCell>
                  <TableCell className="table-header-cell" onClick={() => handleSort('due')}>
                    תאריך תשלום
                    {sortConfig.key === 'due' && (
                      <SortIcon className={`sort-icon ${sortConfig.direction === 'asc' ? 'asc' : 'desc'}`} />
                    )}
                  </TableCell>
                  <TableCell className="table-header-cell">פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((customer) => (
                      <TableRow
                        hover
                        key={customer.instituteId}
                        className="table-row"
                      >
                        <TableCell className="table-cell">{customer.instituteId}</TableCell>
                        <TableCell className="table-cell name-cell">{customer.instituteName}</TableCell>
                        {!isMobile && (
                          <>
                            <TableCell className="table-cell">{customer.fax || "-"}</TableCell>
                            <TableCell className="table-cell">{customer.mobile || "-"}</TableCell>
                          </>
                        )}
                        <TableCell className="table-cell">
                          {customer.email ? (
                            <Tooltip title="שלח אימייל">
                              <a href={`mailto:${customer.email}`} className="email-link">
                                {customer.email}
                              </a>
                            </Tooltip>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="table-cell">{customer.contactName || "-"}</TableCell>
                        {!isMobile && (
                          <TableCell className="table-cell">
                            {customer.contactPhone ? (
                              <Tooltip title="התקשר">
                                <a href={`tel:${customer.contactPhone}`} className="phone-link">
                                  {customer.contactPhone}
                                </a>
                              </Tooltip>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                        )}
                        <TableCell className="table-cell">{customer.city || "-"}</TableCell>
                        {!isMobile && (
                          <TableCell className="table-cell">{customer.community || "-"}</TableCell>
                        )}
                        <TableCell className="table-cell amount-cell">
                          ₪{(customer.amount || 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="table-cell">
                          {customer.due ? (
                            <Chip
                              label={new Date(customer.due).toLocaleDateString('he-IL')}
                              color={new Date(customer.due) < new Date() ? "error" : "default"}
                              size="small"
                            />
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="table-cell">
                          {isMobile ? (
                            <IconButton
                              size="small"
                              onClick={(event) => handleMenuOpen(event, customer)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          ) : (
                            <Box className="action-buttons">
                              <Tooltip title="עריכה">
                                <IconButton
                                  size="small"
                                  onClick={() => navigate(`editCustomer/${customer.instituteId}`)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="מחיקה">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedCustomer(customer);
                                    setOpenDeleteDialog(true);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="צפייה בפרטים">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedCustomer(customer);
                                    setOpenDetailsDialog(true);
                                  }}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 7 : 12} className="empty-state">
                      <Box className="empty-state">
                        <SearchOffIcon className="empty-state-icon" />
                        <Typography variant="h6" className="empty-state-text">
                          לא נמצאו לקוחות התואמים את החיפוש
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<RefreshIcon />}
                          onClick={handleClearFilters}
                          sx={{ mt: 2 }}
                        >
                          נקה סינון
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredCustomers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="שורות בעמוד:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
            className="table-pagination"
          />
        </Paper>
        
        {/* Filter Menu */}
        <Menu
          anchorEl={filterMenuAnchor}
          open={Boolean(filterMenuAnchor)}
          onClose={handleFilterMenuClose}
          className="filter-menu"
        >
          <MenuItem onClick={() => handleFilterToggle('highAmount')} className="filter-menu-item">
            <Checkbox
              checked={activeFilters.includes('highAmount')}
              color="primary"
              size="small"
            />
            <ListItemText primary="סכום גבוה (מעל 5,000 ₪)" />
          </MenuItem>
          <MenuItem onClick={() => handleFilterToggle('dueSoon')} className="filter-menu-item">
            <Checkbox
              checked={activeFilters.includes('dueSoon')}
              color="primary"
              size="small"
            />
            <ListItemText primary="תשלום בחודש הקרוב" />
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClearFilters} className="filter-menu-item">
            <ListItemIcon>
              <RefreshIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="נקה סינון" />
          </MenuItem>
        </Menu>
        
        {/* Export Menu */}
        <Menu
          anchorEl={exportMenuAnchor}
          open={Boolean(exportMenuAnchor)}
          onClose={handleExportMenuClose}
          className="export-menu"
        >
          <MenuItem onClick={() => handleExport('excel')} className="export-menu-item">
            <ListItemIcon>
              <TableChartIcon fontSize="small" style={{ color: '#1F7244' }} />
            </ListItemIcon>
            <ListItemText primary="ייצוא ל-Excel" />
          </MenuItem>
          <MenuItem onClick={() => handleExport('pdf')} className="export-menu-item">
            {/* <ListItemIcon> */}
              {/* <PictureAsPdfIcon fontSize="small" style={{ color: '#F40F02' }} /> */}
            {/* </ListItemIcon> */}
            <ListItemText primary="ייצוא ל-PDF" />
          </MenuItem>
          <MenuItem onClick={() => handleExport('print')} className="export-menu-item">
            <ListItemIcon>
              <PrintIcon fontSize="small" style={{ color: '#424242' }} />
            </ListItemIcon>
            <ListItemText primary="הדפסה" />
          </MenuItem>
        </Menu>
        
        {/* Action Menu for Mobile */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="עריכה" />
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="מחיקה" />
          </MenuItem>
          <MenuItem onClick={handleViewDetails}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="צפייה בפרטים" />
          </MenuItem>
        </Menu>
        
        {/* Customer Details Dialog */}
        <Dialog
          open={openDetailsDialog}
          onClose={() => setOpenDetailsDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            פרטי לקוח: {selectedCustomer?.instituteName}
            <IconButton
              aria-label="close"
              onClick={() => setOpenDetailsDialog(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedCustomer && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">מזהה</Typography>
                  <Typography variant="body1" gutterBottom>{selectedCustomer.instituteId}</Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">שם מוסד</Typography>
                  <Typography variant="body1" gutterBottom>{selectedCustomer.instituteName}</Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">אימייל</Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedCustomer.email || "-"}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">טלפון</Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedCustomer.mobile || "-"}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">פקס</Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedCustomer.fax || "-"}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">איש קשר</Typography>
                  <Typography variant="body1" gutterBottom>{selectedCustomer.contactName || "-"}</Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">טלפון איש קשר</Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedCustomer.contactPhone || "-"}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">עיר</Typography>
                  <Typography variant="body1" gutterBottom>{selectedCustomer.city || "-"}</Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">קהילה</Typography>
                  <Typography variant="body1" gutterBottom>{selectedCustomer.community || "-"}</Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">סכום</Typography>
                  <Typography variant="body1" gutterBottom color="primary" fontWeight="bold">
                    ₪{(selectedCustomer.amount || 0).toLocaleString()}
                  </Typography>
                  
                  <Typography variant="subtitle2" color="textSecondary">תאריך תשלום</Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedCustomer.due ? new Date(selectedCustomer.due).toLocaleDateString('he-IL') : "-"}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => navigate(`editCustomer/${selectedCustomer.instituteId}`)} color="primary">
              עריכה
            </Button>
            <Button onClick={() => setOpenDetailsDialog(false)} color="primary">
              סגור
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>אישור מחיקת לקוח</DialogTitle>
          <DialogContent>
            <DialogContentText>
              האם אתה בטוח שברצונך למחוק את הלקוח "{selectedCustomer?.instituteName}"?
              פעולה זו אינה ניתנת לביטול.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
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