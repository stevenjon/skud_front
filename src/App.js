import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import './App.css';
import Login from './Login';
import {connect} from 'react-redux'
import Admin from './components/admin/Admin';
import Otchot from './components/Otchot/Otchot';
function App({user}) {
  const [auth, setAuth] = useState()
  
  useEffect(() => {
        setAuth(window.localStorage.getItem("user"))
  }, [user])

  if(auth == "otchot" ) {
    window.location.href="#/"
    return <Otchot></Otchot>
  }
  else if(auth == "admin") {
    window.location.href="#/"
    return <Admin></Admin>    
  }
  else {
    return <Login></Login>
  }
}
const mapStateToProps = state => {
  return {
    user: state.labbay.user
  }
}
export default connect(mapStateToProps,{})(App);
