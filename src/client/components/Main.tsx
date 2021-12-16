import Separator from './separator/Separator';
import Header from './header/Header';
import { Redirect, Route, Router, Switch } from 'toy-react-router';
import Record from './record/Record';

const Main = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact>
        <Separator />
      </Route>
      <Route path="/record" exact>
        <Record />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

export default Main;
