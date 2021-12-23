import Separator from './separator/Separator';
import Header from './header/Header';
import { Redirect, Route, Router, Switch } from 'toy-react-router';
import Record from './record/Record';
import { Suspense } from 'react';
import { PulseLoader } from 'react-spinners';

const Main = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact>
        <Separator />
      </Route>
      <Route path="/record" exact>
        <Suspense fallback={<PulseLoader />}>
          <Record />
        </Suspense>
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

export default Main;
