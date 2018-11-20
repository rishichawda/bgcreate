import * as React from 'react';
import { connect } from 'react-redux';
import {
  CommandBarButton,
  AnimationClassNames,
  DefaultButton,
  Dropdown,
  DropdownMenuItemType,
} from 'office-ui-fabric-react';
import { bindActionCreators } from 'redux';
import BackgroundColorPicker from './colorPicker';
import { updateBackground } from './actions';

class ToolbarOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOne: false,
      collapseTwo: true,
    };
  }

  toggleCollapse = (identifier) => {
    this.setState(prevState => ({
      [`${identifier}`]: !prevState[identifier],
    }));
  };

  updateCanvasBackground = (color) => {
    const { updateBackground } = this.props;
    updateBackground(color);
  };

  render() {
    const { collapseOne, collapseTwo } = this.state;
    const collapseOneProps = {
      'data-toolbar-option': 'bg-selector',
      iconProps: { iconName: collapseOne ? 'ChevronDown' : 'ChevronUp' },
      text: 'Background color',
      onClick: () => this.toggleCollapse('collapseOne'),
    };
    const collapseTwoProps = {
      'data-toolbar-option': 'effect-selector',
      iconProps: { iconName: collapseTwo ? 'ChevronDown' : 'ChevronUp' },
      text: 'Canvas types',
      onClick: () => this.toggleCollapse('collapseTwo'),
    };
    return (
      <div className="toolbar">
        <CommandBarButton {...collapseOneProps} />
        {!collapseOne ? (
          <div className={`${AnimationClassNames.scaleUpIn100}`}>
            <BackgroundColorPicker onUpdate={this.updateCanvasBackground}>
              <DefaultButton
                data-automation-id="test"
                allowDisabledFocus
                text="Apply"
                iconProps={{ iconName: 'BucketColor' }}
              />
            </BackgroundColorPicker>
          </div>
        ) : null}
        <CommandBarButton {...collapseTwoProps} />
        {!collapseTwo ? (
          <div className={`collapseTwoContent ${AnimationClassNames.scaleUpIn100}`}>
            <Dropdown
              placeholder="Select an option"
              label="Choose a canvas type :"
              id="effects-dropdown"
              ariaLabel="Effects dropdown"
              options={[
                { key: 'none', text: 'None', title: 'No effect' },
                { key: 'divider_0', text: '-', itemType: DropdownMenuItemType.Divider },
                { key: 'particles', text: 'Particles' },
                { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
                { key: 'paint', text: 'Paint' },
              ]}
            />
            <p>You can currently choose between particles effect and a paint tool / canvas where you can draw using mouse.</p>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  updateBackground: bindActionCreators(updateBackground, dispatch),
});

export default connect(
  null,
  mapDispatch,
)(ToolbarOptions);
