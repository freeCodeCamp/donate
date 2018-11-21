import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';

import { reducer as formReducer } from 'redux-form';

import { reducer as app, epics as appEpics } from './app';
import servicesCreator from './createServices';
import { _csrf } from './cookieVaules';

const serviceOptions = {
  context: _csrf ? { _csrf } : {},
  xhrPath: '/external/services',
  xhrTimeout: 15000
};

const rootReducer = combineReducers({
  app,
  form: formReducer,
  router
});

const rootEpic = combineEpics(...appEpics);

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {
    window: typeof window !== 'undefined' ? window : {},
    location: typeof window !== 'undefined' ? window.location : {},
    document: typeof window !== 'undefined' ? document : {},
    services: servicesCreator(serviceOptions)
  }
});

export const createStore = history =>
  reduxCreateStore(
    rootReducer,
    applyMiddleware(epicMiddleware, routerMiddleware(history))
  );
