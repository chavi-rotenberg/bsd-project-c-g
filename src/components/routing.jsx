
// import { Navigate, Route, Routes } from "react-router-dom"
// import { Customers } from "./customer/Customers"
// import { NewEditCustomer } from "./customer/newEditCustomer"
// import { Login } from "./login/Login"
// import { Home } from "./home/home"
// import { Orders } from "./orders/order"
// import { MyOrders } from "./orders/myOrders"
// import { AddEditOrder } from "./orders/addEditOrder"
// import { Event } from "./diary/event"
// import { Month } from "./diary/Month"
// import { Week } from "./diary/Week"
// import { DayView } from "./DayView/dayView"
// import { Start } from "./start/start"
// import { NewEditManager } from "./manager/newEditManager"
// import { Managers } from "./manager/Managers"
// import { Profile } from './more_components/profile';
// import { About } from './more_components/about';
// import { NotFound } from './more_components/notFound';
// import { Dashboard } from './more_components/Dashboard'
// import { Activities } from "./activites/activites"



// export const Routing = () => {

//     return <>
//         <Routes>

//             <Route path={'/'} element={<Start />} >
//             </Route>            <Route path={'/activites'} element={<Activities />}/>

//             <Route path={'/login'} element={<Login />}></Route>
//             <Route path={'/managers'} element={<Managers />}>
//                 <Route path={'newManager'} element={<NewEditManager />}></Route>
//                 <Route path={'editManager/:id'} element={<NewEditManager />}></Route>
//             </Route>
//             <Route path={'/customers'} element={<Customers />}>
//                 <Route path={'newCustomer'} element={<NewEditCustomer />}></Route>
//                 <Route path={'editCustomer/:id'} element={<NewEditCustomer />}></Route>
//             </Route>
//             <Route path={'/newCustomer'} element={<NewEditCustomer />}></Route>
//             <Route path={'/home'} element={<Home />}></Route>

//             <Route path={'/home/:id'} element={<Home />}>
//                 <Route path={'newOrder'} element={<AddEditOrder />}>
                 
//                 </Route>
//                 <Route path="upcoming" element={<MyOrders upcoming={true} />} />

//                 <Route path={'month'} element={<Month />}>
//                 </Route>
//                 <Route path={"week"} element={<Week />}>
//                 </Route>
//                 <Route path={"day/:day/:month/:year"} element={<DayView />}></Route>

//                 <Route path={"event/:month/:day/:year"} element={<Event />}></Route>
//                 <Route path={"event"} element={<Event />}></Route>
//                 <Route path={'myOrders'} element={<MyOrders />}>
//                     <Route path={'editOrder/:orderId'} element={<AddEditOrder />}></Route>

//                 </Route>
//                 <Route path={'activites'} element={<Activities />}/>
//             </Route>

//             <Route path={'/orders'} element={<Orders />}>
//                 <Route path={'newOrder'} element={<AddEditOrder />}></Route>
//                 <Route path={'editOrder/:orderId'} element={<AddEditOrder />}></Route>
//             </Route>

//             {/* <Route path="/" element={<Login />} /> */}
//             {/* <Route path="/newManager" element={<NewEditManager />} /> */}

//             <Route path="/manager/:id" element={<Dashboard />} >
//             <Route path="upcoming" element={<MyOrders upcoming={true} />} />

//             <Route path={'month'} element={<Month />}>
//             </Route>
//             <Route path={"week"} element={<Week />}>
//             </Route>
//             <Route path={'newOrder'} element={<AddEditOrder />}></Route>
//             <Route path={'orders'} element={<Orders />}>
//                 <Route path={'newOrder'} element={<AddEditOrder />}></Route>
//                 <Route path={'editOrder/:orderId'} element={<AddEditOrder />}></Route>
//             </Route></Route>
//             <Route path="/profile/:id" element={<Profile />} />
//             <Route path="/about" element={<About />} />

//             <Route path="/404" element={<NotFound />} />
//             <Route path="*" element={<Navigate to="/404" replace />} />


//             {/* <Route path={'/event/:month/:day/:year'} element={<Event/>}></Route>  */}
//         </Routes>
//     </>
// }
import { Navigate, Route, Routes } from "react-router-dom";
import { Customers } from "./customer/Customers";
import { NewEditCustomer } from "./customer/newEditCustomer";
// import { Login } from "./login/Login";
import { Home } from "./home/home";
import { Orders } from "./orders/order";
import { MyOrders } from "./orders/myOrders";
import { AddEditOrder } from "./orders/addEditOrder";
import { Event } from "./diary/event";
import { Month } from "./diary/Month";
import { Week } from "./diary/Week";
import { DayView } from "./DayView/dayView";
import { Start } from "./start/start";
import { NewEditManager } from "./manager/newEditManager";
import { Managers } from "./manager/Managers";
import { Profile } from './more_components/profile';
import { About } from './more_components/about';
import { NotFound } from './more_components/notFound';
import { Dashboard } from './more_components/Dashboard';
import { Activities } from './activites/activites';
import { Logon } from "./logon/logon";

export const Routing = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path={"activites"} element={<Activities />} />

      <Route path="/" element={<About />} />
      <Route path="/login" element={<Start />} >
        <Route path="logon" element={<Logon />} />
      </Route>
      {/* <Route path="/about" element={<About />} /> */}
      <Route path="/logon" element={<Logon />} />
      
      {/* Manager routes */}
      <Route path="/managers" element={<Managers />}>
        <Route path="newManager" element={<NewEditManager />} />
        <Route path="editManager/:id" element={<NewEditManager />} />
      </Route>
      
      {/* Customer routes */}
      <Route path="/customers" element={<Customers />}>
        <Route path="newCustomer" element={<NewEditCustomer />} />
        <Route path="editCustomer/:id" element={<NewEditCustomer />} />
      </Route>
      <Route path="/newCustomer" element={<NewEditCustomer />} />
      
      {/* Home and nested routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/home/:id" element={<Home />}>
        <Route path="newOrder" element={<AddEditOrder />} />
        <Route path="upcoming" element={<MyOrders upcoming={true} />} />
        <Route path="month" element={<Month />} />
        <Route path="week" element={<Week />} />
        <Route path="day/:day/:month/:year" element={<DayView />} />
        <Route path="event/:month/:day/:year" element={<Event />} />
        <Route path="event" element={<Event />} />
        <Route path="myOrders" element={<MyOrders />}>
          <Route path="editOrder/:orderId" element={<AddEditOrder />} />
        </Route>
        {/* <Route path={"activites"} element={<Activities />} /> */}
      </Route>
      
      {/* Order routes */}
      <Route path="/orders" element={<Orders />}>
        <Route path="newOrder" element={<AddEditOrder />} />
        <Route path="editOrder/:orderId" element={<AddEditOrder />} />
      </Route>
      
      {/* Dashboard routes */}
      <Route path="/manager/:id" element={<Dashboard />}>
        <Route path="upcoming" element={<MyOrders upcoming={true} />} />
        <Route path="month" element={<Month />} />
        <Route path="week" element={<Week />} />
        <Route path="newOrder" element={<AddEditOrder />} />
        <Route path="orders" element={<Orders />}>
          <Route path="newOrder" element={<AddEditOrder />} />
          <Route path="editOrder/:orderId" element={<AddEditOrder />} />
        </Route>
      </Route>
      
      {/* Profile route */}
      <Route path="/profile/:id" element={<Profile />} />
      
      {/* Activities route */}
      <Route path="/activites" element={<Activities />} />
      
      {/* Error handling */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};
