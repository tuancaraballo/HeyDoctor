import React from 'react';


import HeyDoctor from './containers/HeyDoctor'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export default () =>  <Router>
    <Switch>
        <Route path='/' component={HeyDoctor}> </Route>
    </Switch>
</Router>