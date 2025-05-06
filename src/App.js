// // import { useState } from 'react';
// import './App.css';
// //import { Home } from './components/Home/home';
// //import { Mouse } from './components/Mouse/mouse';
// //import { Route, Routes } from 'react-router-dom';
// import { Routing } from './components/routing';


// function App() {

 
//     return (<div className='app'>

//     <Routing></Routing>

//     </div>
    
//   );
    
  
// }

// export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/more_components/ThemeProvider';

import { Routing } from './components/routing';


function App() {
 
    return (<div className='app'>
    <Routing></Routing>
    
       </div>

    // <ThemeProvider>
    //   <BrowserRouter>
    //     <Routing/>
    //   </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
