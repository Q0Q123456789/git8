import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter,Route,Switch} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';


import App from './App';
import Home from './components/Home'
    import HomeHeader from'./components/home/HomeHeader'
import News from './components/News'
import Header from './components/Header'
import Footer from './components/Footer'

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                {/* <Route component={Home}></Route> */}
                <Route exact path='/' component={Home}></Route>  
            </Switch>
            <Route exact path='/Home/HomeHeader' component={HomeHeader}></Route>
            <Route exact path='/News' component={News}></Route>
            <Route exact path='/Header' component={Header}></Route>
            <Route exact path='/Footer' component={Footer}></Route>
        </App>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
