import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import ReactGA from 'react-ga';
import { Provider as StyletronProvider } from 'styletron-react';
import { Helmet } from 'react-helmet';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Constants from './components/Constants';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/LandingPage/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import Leaderboard from './components/Leaderboard';
import About from './components/About';
import Setting from './components/Setting';
import Submit from './components/Submit';
import Post from './components/Post';
import Draft from './components/Draft';
import ResetPassword from './components/ResetPassword';
import './App.css';

const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
});

function initializeReactGA() {
  ReactGA.initialize('UA-162280414-1');
  ReactGA.pageview('/');
}

initializeReactGA();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Helmet>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-162280414-1"></script>
            <script>
              {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-162280414-1');`}
            </script>
            <script>
              {`(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:1751072,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
            </script>
          </Helmet>
          <BrowserRouter>
            <Switch>
              <Route exact path={Constants.PATHS.HOME} component={Home} />
              <Route exact path={Constants.PATHS.LEADERBOARD} component={Leaderboard} />
              <Route exact path={Constants.PATHS.ABOUT} component={About} />
              <Route exact path="/home/:id" component={Home} />
              <Route exact path={Constants.PATHS.LOGIN} component={Login} />
              <Route exact path={Constants.PATHS.SIGNUP} component={Signup} />
              <Route exact path={Constants.PATHS.SUBMIT} component={Submit} />
              <Route exact path={Constants.PATHS.SETTING} component={Setting} />
              <Route exact path={Constants.PATHS.DRAFT} component={Draft} />
              <Route exact path={'/settings'} component={Setting} />
              <Route path="/user/:id" component={User} />
              <Route path="/post/:id" component={Post} />
              <Route path="/reset-password/:token" component={ResetPassword} />
              <Route render={props => <ErrorPage {...props} errorCode="404" />} /> />
            </Switch>
          </BrowserRouter>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
