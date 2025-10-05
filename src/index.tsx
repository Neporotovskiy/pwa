import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Route, Switch } from 'wouter';

import { Main } from 'pages/main';
import { Card } from 'pages/card';

import './index.css';

createRoot(document.body).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={Main} />
      <Route path="/card" component={Card} />
    </Switch>
  </StrictMode>,
);
