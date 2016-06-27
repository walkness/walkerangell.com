import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../views/App';
import Home from '../views/App/views/Home';
import {
  default as Portfolio,
  Galleries,
  Gallery
} from '../views/App/views/Portfolio';


export default () => (
    <Route path='/' component={App}>

        <IndexRoute name='home' component={Home} />

        <Route path='portfolio' component={Portfolio}>

          <IndexRoute name='portfolio' component={Galleries}/>

          <Route path=':category' component={Portfolio}>
            <IndexRoute name='portfolio-category' component={Galleries}/>
            <Route name='portfolio-gallery' path=':gallery' component={Gallery}/>
          </Route>

        </Route>

    </Route>
)
