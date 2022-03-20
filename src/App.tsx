import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route as Channel, Routes as Switch } from 'react-router-dom';
import '../src/common/sass/App.scss';

import { Route } from './common/config/interface/route';
import { router, allRouteName } from './common/config/routers/Router';
import { routerPath } from './common/constants/routerPath';

function App() {
  const [location] = useState(window.location.pathname);
  useEffect(() => {
    if (allRouteName.includes(location) === false) {
      window.location.pathname = routerPath.client.common.HOME;
    }
  }, [location]);

  return (
    <BrowserRouter>
      <Switch>
        {router.map((el: Route, index: number) => {
          return <Channel path={el.path} element={el.element} key={index} />;
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
