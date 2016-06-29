import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../views/App';
import Home from '../views/App/views/Home';
import Development from '../views/App/views/Development';
import {
  default as Portfolio,
  Galleries,
  Gallery
} from '../views/App/views/Portfolio';
import Sidebar from '../views/App/components/Sidebar';


export default () => (
    <Route path='/' component={App}>

        <IndexRoute name='home' components={{main: Home}} />

        <Route path='development' components={{main: Development}} />

        <Route path='portfolio' components={{main: Portfolio, sidebar: Sidebar}}>

          <IndexRoute name='portfolio' component={Galleries}/>

          <Route path=':category' component={Portfolio}>
            <IndexRoute name='portfolio-category' component={Galleries}/>
            <Route name='portfolio-gallery' path=':gallery' component={Gallery}/>
          </Route>

        </Route>

    </Route>
)
