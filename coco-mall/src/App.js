import './App.css';
import { Switch, Route } from 'react-router-dom';

import Landing from './Views/Landing';

function App() {
    return (
        <>
            <Switch>
                <Route path='/' exact component={Landing} />
            </Switch>
        </>
    );
}

export default App;
