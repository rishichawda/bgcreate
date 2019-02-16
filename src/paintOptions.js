import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  CommandBarButton, AnimationClassNames, DefaultButton, SpinButton,
} from 'office-ui-fabric-react';
import { bindActionCreators } from 'redux';
import {
  updateParticlesShape, updateParticlesDensity, toggleOpacityAnimation,
} from './utils/particles';
import ColorPicker from './colorPicker';
import { updateBrushCol, updateLineWidth } from './actions';

class PaintOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      selected: ['circle'],
    };
  }

  changeDensity = (value) => {
    updateParticlesDensity(value);
  }

  toggleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse,
    }));
  }

  onChangeTypes = (_, options) => {
    let { selected } = this.state;
    if (selected.indexOf(options.key) !== -1) {
      if (selected.length !== 1) {
        selected = selected.filter(val => val !== options.key);
        this.setState({
          selected,
        });
        updateParticlesShape(selected);
      }
    } else {
      selected = [...selected, options.key];
      this.setState({
        selected,
      });
      updateParticlesShape(selected);
    }
  }

  toggleOpacity = (_, value) => {
    toggleOpacityAnimation(value);
  }

  updatePencilColor = (color) => {
    const { updatePencilColor } = this.props;
    updatePencilColor(color);
  }

  updatePencilWidth = (e) => {
    const { updatePencilWidth } = this.props;
    updatePencilWidth(Number(e.target.value));
    return e.target.value;
  }

  render() {
    const { collapse } = this.state;
    const { pencilWidth, pencilColor } = this.props;
    const paintConfigProps = {
      'data-toolbar-option': 'paint-config',
      iconProps: { iconName: collapse ? 'ChevronDown' : 'ChevronUp' },
      text: 'Paint options',
      onClick: this.toggleCollapse,
    };
    return (
      <div>
        <CommandBarButton {...paintConfigProps} />
        {!collapse ? (
          <div className={`${AnimationClassNames.scaleUpIn100} paint-config-collapse`}>
            <h4>Select pencil styles: </h4>
            <SpinButton
              ariaLabel="Pencil size selector"
              value={pencilWidth}
              label="Pencil size:"
              min={0}
              max={100}
              step={1.0}
              onBlur={this.updatePencilWidth}
              onDecrement={(value) => {
                this.updatePencilWidth({ target: { value: Number(value) - 1 } });
              }}
              onIncrement={(value) => {
                this.updatePencilWidth({ target: { value: Number(value) + 1 } });
              }}
              incrementButtonAriaLabel="Increase value by 1"
              decrementButtonAriaLabel="Decrease value by 1"
            />
            <p style={{ marginBottom: 0 }}>Select pencil color :</p>
            <ColorPicker color={pencilColor} className="particles-color-picker" onUpdate={this.updatePencilColor}>
              <DefaultButton
                data-automation-id="particles-color"
                text="Apply"
                iconProps={{ iconName: 'BucketColor' }}
              />
            </ColorPicker>
            <hr />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  updatePencilColor: bindActionCreators(updateBrushCol, dispatch),
  updatePencilWidth: bindActionCreators(updateLineWidth, dispatch),
});

const mapState = ({ paint: { lineWidth, brushCol } }) => ({
  pencilWidth: lineWidth,
  pencilColor: brushCol,
});

export default connect(mapState, mapDispatch)(PaintOptions);
