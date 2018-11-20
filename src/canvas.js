import React, { Component } from 'react';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  render() {
    return (
      <div id="particles-js">
        <canvas
          ref={this.canvasRef}
          className="particles-js-canvas-el"
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    );
  }
}

export default Canvas;
