import logo from './logo.svg';
import react, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Nav from './component/nav';
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Add from "./component/add";
import Displady from "./component/disp";
import Login from "./component/login";
import { appContext, initState } from './context'

function App() {
  let history = useHistory();
  const [user, setUser] = useState(initState)
  //check login
  useEffect(() => {
    if (!user.isLogin) {
      if (!localStorage.getItem("token")) return history.replace("/login")
      setUser({ ...user, username: 'amjed', token: localStorage.getItem("token") })
      return
    }

  }, [setUser, history, user])

  return (
    <appContext.Provider value={{ ...user, setUser }}>
      <Switch>
        <div className="App">
          {user.isLogin && <Nav />}
          <Route path="/login" component={Login}></Route>
          <Route path="/add" component={Add}></Route>
          <Route path="/display" component={Displady}></Route>
        </div>
      </Switch>
    </appContext.Provider>
  );

}

export default App;
