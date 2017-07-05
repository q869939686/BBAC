import * as React from 'react';

import {
  HashRouter as Router,
  Route
} from 'react-router-dom';


// views
import {
  HomePage,
  Error404,
  Page,
} from '@/views/';

export const routes = [
  {
    path: '/404',
    component: Error404
  },
  { 
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/page',
    component: Page,
    routes: [

    ]
  },
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = (route) => {
  var isExact = route.exact || false;
  // if exact = true will replace homePafe
  return (

      <Route
        path={route.path}
        exact={isExact}
        render={props => (
        // pass the sub-routes down to keep nesting
          <route.component
            {...props}
            parent={route.parent}
            routes={route.routes}
          />
        )}
      />
  )
}

const AppRouter = (props) => (
  <Router>
    <div>
      {
        routes.map((route, i) => (
          <RouteWithSubRoutes  key={i} {...route}/>
        ))
      }
    </div>
  </Router>
);
export default AppRouter;
