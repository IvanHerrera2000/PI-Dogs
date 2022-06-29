import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <h1>Henry Dogs</h1> */}
        <Switch>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
