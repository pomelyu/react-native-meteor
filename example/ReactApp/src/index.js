import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './startup/createMeteorConnection';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
