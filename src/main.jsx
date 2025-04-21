import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import * as serviceWorkerRegistration from './utils/serviceWorkerRegistration';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    // Show a notification when new content is available
    if (window.confirm('New version available! Reload to update?')) {
      if (registration.waiting) {
        // When the user claims they want to update, send a message to the
        // waiting service worker
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      window.location.reload();
    }
  },
});
