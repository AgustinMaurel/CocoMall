import './App.css';
import { Switch, Route } from 'react-router-dom';
import Landing from './Views/Landing';
// import LoginScreen from './Views/Auth/LoginScreen';
import RegisterScreen from './Views/Auth/RegisterScreen';

function App() {
    return (
        <>
            <Switch>
                <Route path='/' exact component={Landing} />
                {/* <Route path='/auth/login' exact component={LoginScreen} /> */}
                <Route path='/auth/register' exact component={RegisterScreen} />
            </Switch>
        </>
    );
}

export default App;
