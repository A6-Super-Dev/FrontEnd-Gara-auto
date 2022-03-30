import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route as Channel, Routes as Switch } from 'react-router-dom';
import '../src/common/sass/App.scss';

import { ProtectedRouting } from './common/config/routers/ProtectedRouting';
import { Home } from './pages/client/common/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Channel path="/home" element={<ProtectedRouting />}>
          <Channel path="/home" element={<Home />} />
        </Channel>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
