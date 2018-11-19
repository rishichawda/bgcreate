import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';
import MenuBar from './src/menubar';
import './index.scss';

initializeIcons();

const App = () => (
  <div>
    <MenuBar />
      Hello world
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
