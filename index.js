import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { initializeIcons } from '@uifabric/icons';
import MenuBar from './src/menubar';
import Toolbar from './src/toolbar';
import './index.scss';
import Canvas from './src/canvas';
import store from './src/store';

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
        <Provider store={store}>
          <div>
            <MenuBar showToolbar={this.openToolbar} />
            <Toolbar showPanel={toolbar} closePanel={this.closeToolbar} />
            <Canvas />
          </div>
        </Provider>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
