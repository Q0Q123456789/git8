import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';


import { Router, Route, Link,IndexRedirect,browserHistory} from 'react-router' 

//引入组件


import Home from './components/Home.js';
import News from './components/News.js';
import User from './components/User.js';


import NewsContent from './components/NewsContent.js';


import registerServiceWorker from './registerServiceWorker';


//browserHistory 可以让路由变得漂亮    js跳转路由
ReactDOM.render(

  <Router  history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="home" component={Home} />
        <Route path="news" component={News}>     
        </Route>
        <Route path="user" component={User}>     
        </Route>
        <Route path="newscontent/:aid" component={NewsContent}>     
        </Route>
    </Route>
  </Router>,
    
    document.getElementById('root')
);
registerServiceWorker();
