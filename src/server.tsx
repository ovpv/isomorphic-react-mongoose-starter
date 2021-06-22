import React from 'react';

const express = require('express');
const app = express();
const port = 3000;
import path from 'path';
import { Provider } from 'react-redux';
import { StaticRouter, Route } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { store } from './client/app/store';
import { ROUTES } from './routes';
import mongoose from 'mongoose';
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('dist/client'));
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'client/views'));
app.set('view engine', 'pug');

//mongoose Connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('We are connected');
  //api calls
});

const HTML = (Comp: any) => {
  const output = renderToString(
    <Provider store={store}>
      <StaticRouter>
        <Comp />
      </StaticRouter>
    </Provider>
  );
  return {
    title: '',
    data: output,
  };
};

const addRoute = (
  RoutePath: string,
  renderData: any,
  template: string = 'index'
) => {
  return app.get(RoutePath, (req: any, res: any) => {
    res.render(template, renderData);
  });
};

ROUTES.map(({ path, Comp }: any) => {
  addRoute(path, HTML(Comp));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
