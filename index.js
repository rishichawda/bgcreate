import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';
import './index.scss';
import App from './src';

initializeIcons();

ReactDOM.render(<App />, document.getElementById('root'));
