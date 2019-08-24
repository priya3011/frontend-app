import React from 'react';
//import ReactDOM from "react-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import { SignIn, SignUp, ForgotPassword, Dashboard, Affiliates, Investment} from './pages';
import sessionTimeout from './HOC/sessionTimeout'
import './App.scss';


          // <Route path="/affiliate" component={sessionTimeout(Dashboard)}/>
          // <Route path="/stats" component={sessionTimeout(Dashboard)}/>
          // <Route path="/exchange" component={sessionTimeout(Dashboard)}/>
          // <Route path="/contact" component={sessionTimeout(Dashboard)}/>
          // <Route path="/investment/:id" component={sessionTimeout(Dashboard)}/>

function App() {
  return (

    <div className="App">
        <Switch>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/forgotpassword" component={ForgotPassword}/>
          <Route path="/dashboard" component={sessionTimeout(Dashboard)}/>
          <Route path="/affiliate" component={sessionTimeout(Affiliates)}/>
          <Route path="/investment/:investment_id" component={sessionTimeout(Investment)}/>

          <Route render={ props => <Redirect to={{ pathname: '/signin', state: { from: props.location } }} /> } />
        </Switch>
    </div>

  );
}

export default App;
