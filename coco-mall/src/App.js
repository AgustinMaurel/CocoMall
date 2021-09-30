import './App.css';
import { Switch, Route } from 'react-router-dom';

import Landing from './Views/Landing';
import ShopCreate from './Views/ShopCreate';

function App() {
    return (
        <>
            <Switch>
                <Route path='/' exact component={Landing} />
                <Route path="/create/shop" exact component={ShopCreate}/>
            </Switch>
        </>
    );
}

export default App;
