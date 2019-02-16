import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PaintCanvas extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object]),
    height: PropTypes.string,
    width: PropTypes.string,
    brushCol: PropTypes.string,
    lineWidth: PropTypes.number,
    onDraw: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    height: '100%',
    width: '100%',
    brushCol: '#ff6347',
    lineWidth: 1,
    onDraw: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      mouseDown: false,
    };
  }

  componentDidMount() {
    const { brushCol, lineWidth } = this.props;
    const context = this.canvas.getContext('2d');
    context.canvas.width = document.getElementById('particles-js').getBoundingClientRect().width;
    context.canvas.height = document.getElementById('particles-js').getBoundingClientRect().width;
    context.lineWidth = lineWidth;
    context.strokeStyle = brushCol;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    this.bb = this.canvas.getBoundingClientRect();
  }

  componentWillUpdate(nextProps) {
    const { brushCol, lineWidth } = this.props;
    const context = this.canvas.getContext('2d');
    if (
      brushCol !== nextProps.brushCol
      || lineWidth !== nextProps.lineWidth
    ) {
      context.lineWidth = nextProps.lineWidth;
      context.strokeStyle = nextProps.brushCol;
    }
  }

  mouseDown = (e) => {
    const { mouseDown } = this.state;
    if (!mouseDown) this.setState({ mouseDown: true });
    const context = this.canvas.getContext('2d');
    context.moveTo(
      (e.pageX || (e.touches && e.touches[0].pageX)) - this.bb.left,
      (e.pageY || (e.touches && e.touches[0].pageY)) - this.bb.top,
    );
  }

  mouseUp = () => (this.setState({ mouseDown: false }));

  mouseMove = (e) => {
    const context = this.canvas.getContext('2d');
    const { mouseDown } = this.state;
    if (mouseDown) {
      // prevent IOS scroll when drawing
      if (e.touches) e.preventDefault();
      if (
        (e.pageX || (e.touches && e.touches[0].pageX)) > 0
        && (e.pageY || (e.touches && e.touches[0].pageY)) < this.bb.height
      ) {
        context.lineTo(
          ((e.pageX || (e.touches && e.touches[0].pageX)) - this.bb.left),
          ((e.pageY || (e.touches && e.touches[0].pageY)) - this.bb.top),
        );
        context.stroke();
      }
    }
  }

  render() {
    const {
      width,
      height,
      onDraw,
      style,
    } = this.props;

    return (
      <canvas
          // eslint-disable-next-line no-return-assign
        ref={c => (this.canvas = c)}
        onClick={onDraw}
        height={height}
        width={width}
        style={style}
        onMouseDown={this.mouseDown}
        onTouchStart={this.mouseDown}
        onMouseUp={this.mouseUp}
        onTouchEnd={this.mouseUp}
        onMouseLeave={this.mouseUp}
        onMouseMove={this.mouseMove}
        onTouchMove={this.mouseMove}
      />
    );
  }
}
