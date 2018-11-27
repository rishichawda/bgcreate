import React, { Component } from 'react';
import { CommandBarButton, AnimationClassNames } from 'office-ui-fabric-react';

class ParticlesOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }

  toggleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse,
    }));
  }

  render() {
    const { collapse } = this.state;
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
          <div className={`${AnimationClassNames.scaleUpIn100}`}>
              Particles options
          </div>
        ) : null}
      </div>
    );
  }
}

export default ParticlesOptions;
