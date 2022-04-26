import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import useRoutingInstrumentation from 'react-router-v6-instrumentation';
import { BrowserTracing } from '@sentry/tracing';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { BrowserRouter } from 'react-router-dom';

import { persistor, store } from './reduxToolKit-Saga/store';
import env from './common/config/interface/env';
import '../src/common/sass/index.css';
import App from './App';

function Application() {
  const routingInstrumentation = useRoutingInstrumentation();
  React.useEffect(() => {
    const browserTracing = new BrowserTracing({
      routingInstrumentation,
    });
    Sentry.init({
      dsn: env.reactSentryDNS,
      integrations: [browserTracing],
      tracesSampleRate: 1.0,
      normalizeDepth: 10,
      environment: env.environment,
      beforeSend(event) {
        if (event.exception) {
          Sentry.showReportDialog({ eventId: event.event_id });
        }

        return event;
      },
    });
  }, [routingInstrumentation]);

  Sentry.captureMessage('Web app start', { level: Sentry.Severity.Info });

  return <App />;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Application />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
