import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { BrowserRouter,Route,Switch} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import Home from './components/Home'
    import HomeHeader from'./components/home/HomeHeader'
import News from './components/News'
    import newsDetails from './components/news/newsDetails'
import Header from './components/Header'
import Footer from './components/Footer'
ReactDOM.render(
    <BrowserRouter>
    {/* {renderRoutes(router)} */}
        <App>
            <Switch>
                {/* <Route component={Home}></Route> */}
                <Route exact path='/' component={Home}></Route>  
            </Switch>
            <Route exact path='/Home/HomeHeader/:id/:title/:dateTime' component={HomeHeader}></Route>
            <Route exact path='/News' component={News}></Route>
            <Route path='/News/newsDetails/:id' component={newsDetails}/>
            <Route exact path='/Header' component={Header}></Route>
            <Route exact path='/Footer' component={Footer}></Route>
        </App>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
