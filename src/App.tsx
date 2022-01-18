import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route as Channel,
  Routes as Switch,
} from 'react-router-dom';
import '../src/common/sass/App.scss';
import { Route } from './common/config/interface/route';
import { router, allRouteName } from './common/config/routers/Router';
import { routerPath } from './common/constants/routerPath';

function App() {
  const location = window.location.pathname;
  return (
    <BrowserRouter>
      {allRouteName.includes(location) === false && (
        <Navigate to={routerPath.client.common.HOME} />
      )}
      <Switch>
        {router.map((el: Route, index: number) => {
          return <Channel path={el.path} element={el.element} key={index} />;
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
