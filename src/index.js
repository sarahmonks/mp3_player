import React from 'react';


import ReactDOM from 'react-dom';


import AppContainer from './containers/AppContainer';


import registerServiceWorker from './registerServiceWorker';


import sounds from './sounds';

import './css/main.css';
import './css/font-awesome.css';


ReactDOM.render(<AppContainer sounds={sounds} />, document.getElementById('root'));


registerServiceWorker();
