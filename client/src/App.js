import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DogCreate from './components/DogCreate';
import DogDetail from './components/DogDetail';
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
        <Route exact path="/post">
          <DogCreate />
        </Route>
        <Route exact path="/home/:id">
          <DogDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
