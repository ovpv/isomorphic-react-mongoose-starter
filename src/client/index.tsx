import React from 'react';
import { hydrate } from 'react-dom';
import App from './app';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (error) {
      console.log('Service worker registration failed, error:', error);
    });
}

hydrate(<App />, document.getElementById('app'));
