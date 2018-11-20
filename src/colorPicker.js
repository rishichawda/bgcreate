import * as React from 'react';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';


class BackgroundColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#ffffff',
    };

    this.updateColor = this.updateColor.bind(this);
  }

    updateColor = (color) => {
      this.setState({
        color,
      });
    };

    render() {
      const { color } = this.state;
      const { children, onUpdate } = this.props;
      return (
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
          <ColorPicker color={color} onColorChanged={this.updateColor} />
          <div data-toolbar-item="bg-color-display">
            <div style={{ backgroundColor: color }} className="palette" />
            {React.cloneElement(children, { onClick: () => onUpdate(color) })}
          </div>
        </div>
      );
    }
}

export default BackgroundColorPicker;
