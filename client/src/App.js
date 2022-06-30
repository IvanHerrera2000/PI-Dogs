import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
