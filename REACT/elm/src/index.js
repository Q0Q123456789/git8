import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { BrowserRouter,Route,Switch} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import App from './App'
import Home from './components/home/Home'
    import HomeHeader from'./components/home/detail/HomeHeader'
import News from './components/news/News'
    import newsDetails from './components/news/detail/newsDetails'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
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
