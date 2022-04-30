import React from 'react';
import { Route as Channel, Routes as Switch } from 'react-router-dom';
import '../src/common/sass/App.scss';
import { withProfiler } from '@sentry/react';

import { ProtectedRouting } from './common/config/routers/ProtectedRouting';
import { RouteAttributes } from './common/config/interface/route';
import { RenderRoute } from './common/config/routers/RenderRoute';
import { pathArrayName, routerPath } from './common/constants/routerPath';
import Navbar from './components/Navbar/Navbar';

function App() {
  //TODO: if can reduce the complexity
  React.useEffect(() => {
    const location = window.location.pathname;
    let maxError = 0;
    const allPath = pathArrayName();
    if (!allPath.includes(location)) {
      maxError = 1;
    }
    const paramPath = allPath.filter((each) => each.includes('/:'));
    const trimParam = paramPath.map((each) => each.substring(0, each.indexOf(':')));
    const current = location.substring(0, location.lastIndexOf('/')) + '/';
    if (!trimParam.includes(current)) {
      maxError += 1;
    }

    if (maxError === 2) {
      window.location.pathname = routerPath.common.HOME;
    }
  }, []);

  const renderWithNav = (navigator: boolean, path: string, element: React.ReactNode, index: number) => {
    if (navigator) {
      return (
        <Channel path={path} key={index} element={<Navbar />}>
          <Channel path={path} element={element} />
        </Channel>
      );
    }

    return <Channel path={path} element={element} key={index} />;
  };

  return (
    <Switch>
      {RenderRoute().map((route: RouteAttributes, index: number) => {
        if (route.authorized) {
          return (
            <Channel path={route.path} key={index} element={<ProtectedRouting />}>
              {renderWithNav(route.needNavigator, route.path, route.element, index)}
            </Channel>
          );
        }
        return <>{renderWithNav(route.needNavigator, route.path, route.element, index)}</>;
      })}
    </Switch>
  );
}

export default withProfiler(App);
