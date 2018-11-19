import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';
import './index.scss';

initializeIcons();

const App = () => (
  <div>
      Hello world
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
