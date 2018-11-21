import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { canvasBg } = this.props;
    if (prevProps.canvasBg !== canvasBg) {
      this.updateCanvasBackground(canvasBg);
    }
  }

  updateCanvasBackground = (color) => {
    const { height, width } = this.canvasRef.current.getBoundingClientRect();
    const ctx = this.canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.rect(0, 0, height, width);
    ctx.fillStyle = color;
    ctx.fill();
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

const mapProps = ({ bgColor }) => ({
  canvasBg: bgColor,
});

export default connect(mapProps, null)(Canvas);
