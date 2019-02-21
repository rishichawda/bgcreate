import React from 'react';
import { Provider } from 'react-redux';
import MenuBar from './menubar';
import Toolbar from './toolbar';
import store from './store';
// eslint-disable-next-line import/extensions
import Canvas from './components/canvas/index.js';
import Welcome from './welcome';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbar: false,
      modal: false,
      welcomemodal: false,
    };
  }

  componentDidMount() {
    this.setState({
      welcomemodal: true,
    });
  }

  openToolbar = () => {
    this.setState({
      toolbar: true,
    });
  };

  closeModal = () => {
    this.setState({
      modal: false,
    });
  };

  openModal = () => {
    this.setState({
      modal: true,
    });
  };

  closeWelcomeModal = () => {
    this.setState({
      welcomemodal: false,
    });
  };

  closeToolbar = () => {
    this.setState({
      toolbar: false,
    });
  };

  render() {
    const { toolbar, modal, welcomemodal } = this.state;
    return (
      <Provider store={store}>
        <div>
          <Welcome
            showModal={welcomemodal}
            closeModal={this.closeWelcomeModal}
          />
          <MenuBar showModal={this.openModal} showToolbar={this.openToolbar} />
          <Toolbar showPanel={toolbar} closePanel={this.closeToolbar} />
          <Canvas showModal={modal} closeModal={this.closeModal} />
        </div>
      </Provider>
    );
  }
}

export default App;
