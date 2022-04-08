import React from 'react';
import { BrowserRouter, Route as Channel, Routes as Switch } from 'react-router-dom';
import '../src/common/sass/App.scss';

import { ProtectedRouting } from './common/config/routers/ProtectedRouting';
import { RenderRoute } from './common/config/routers/RenderRoute';
import { pathArrayName, routerPath } from './common/constants/routerPath';

function App() {
  const location = window.location.pathname;
  const allPath = pathArrayName();
  if (!allPath.includes(location)) {
    window.location.pathname = routerPath.common.HOME;
  }

  return (
    <BrowserRouter>
      <Switch>
        {RenderRoute.map((route, index) => {
          if (route.authorized) {
            return (
              <Channel path={route.path} key={index} element={<ProtectedRouting />}>
                <Channel path={route.path} element={route.element} />
              </Channel>
            );
          }
          return <Channel path={route.path} element={route.element} key={index} />;
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
