import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ROUTES } from '../routes';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {ROUTES.map(({ path, Comp }: any) => (
            <Route path={path} component={Comp} />
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
