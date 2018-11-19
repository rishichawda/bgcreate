import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';
import MenuBar from './src/menubar';
import Toolbar from './src/toolbar';
import './index.scss';
import Canvas from './src/canvas';

initializeIcons();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbar: false,
    };
  }

    openToolbar = () => {
      this.setState({
        toolbar: true,
      });
    }

    closeToolbar = () => {
      this.setState({
        toolbar: false,
      });
    }

    render() {
      const { toolbar } = this.state;
      return (
        <div>
          <MenuBar showToolbar={this.openToolbar} />
          <Toolbar showPanel={toolbar} closePanel={this.closeToolbar} />
          <Canvas />
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
