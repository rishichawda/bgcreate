import React, { Component } from 'react';
import {
  CommandBarButton, AnimationClassNames, Dropdown,
} from 'office-ui-fabric-react';
import { updateParticlesShape } from './utils/particles';

class ParticlesOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      selected: ['circle'],
    };
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
              label="Particle types:"
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
          </div>
        ) : null}
      </div>
    );
  }
}

export default ParticlesOptions;
