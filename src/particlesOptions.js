import React, { Component } from 'react';
import {
  CommandBarButton, AnimationClassNames, Dropdown, Slider,
} from 'office-ui-fabric-react';
import { updateParticlesShape, updateParticlesDensity } from './utils/particles';

class ParticlesOptions extends Component {
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
      selected = selected.filter(val => val !== options.key);
      this.setState({
        selected,
      });
    } else {
      selected = [...selected, options.key];
      this.setState({
        selected,
      });
    }
    updateParticlesShape(selected);
  }

  render() {
    const { collapse, selected } = this.state;
    const particlesConfigProps = {
      'data-toolbar-option': 'particles-config',
      iconProps: { iconName: collapse ? 'ChevronDown' : 'ChevronUp' },
      text: 'Particle options',
      onClick: this.toggleCollapse,
    };
    return (
      <div>
        <CommandBarButton {...particlesConfigProps} />
        {!collapse ? (
          <div className={`${AnimationClassNames.scaleUpIn100} particles-config-collapse`}>
            <Dropdown
              placeholder="Select particle types"
              label="Particle types :"
              id="particles-type-dropdown"
              defaultSelectedKeys={selected}
              onChange={this.onChangeTypes}
              multiSelect
              options={[
                { key: 'circle', text: 'Circle' },
                { key: 'edge', text: 'Edge' },
                { key: 'triangle', text: 'Triangle' },
                { key: 'polygon', text: 'Polygon', disabled: true },
                { key: 'star', text: 'Star' },
              ]}
            />
            <p>You can either select any one type of particle or if you want, multiple types too!</p>
            <hr />
            <Slider
              label="Density :"
              min={1100}
              max={200}
              step={-50}
              defaultValue={800}
              onChange={this.changeDensity}
              showValue={false}
              disabled={selected.length >= 2}
              className="density-slider"
            />
            <p>Change the density of particles on the canvas.</p>
            <hr />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ParticlesOptions;
