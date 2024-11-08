
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Banner from './components/Home';
import CustomerHome from './components/customers/customerhome';
import StaffHome from './components/employees/staffhome';
import Register from './components/auth/Register';
import Transaction from './components/customers/cTransaction';
import DeleteTransaction from './components/customers/delete';
import CreateTransaction from './components/customers/create';
import Verify from './components/employees/verify';
import Transactions from './components/employees/transaction';
import AddUser from './components/auth/newUser';
import Users from './components/employees/users';
import DeleteUser from './components/employees/delete';
import EditUser from './components/employees/edit';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/' element={ <Banner/>  }/>
          <Route path='/chome' element={ <CustomerHome/>  }/>
          <Route path='/shome' element={ <StaffHome/>  }/>
          <Route path='/ctransaction' element={ <Transaction/>  }/>
          <Route path='/deletectransaction/:id' element={ <DeleteTransaction/>  }/>
          <Route path='/create' element={ <CreateTransaction/>  }/>
          <Route path='/transactiondetails/:id' element={ <Verify/>  }/>
          <Route path='/transaction' element={ <Transactions/>  }/>
          <Route path='/users' element={ <Users/>  }/>
          <Route path='/adduser' element={ <AddUser/>  }/>
          <Route path='/deleteuser/:id' element={ <DeleteUser/>  }/>
          <Route path='/userdetails/:id' element={ <EditUser/>  }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
