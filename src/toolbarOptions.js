import * as React from 'react';
import { connect } from 'react-redux';
import {
  CommandBarButton,
  AnimationClassNames,
  DefaultButton,
} from 'office-ui-fabric-react';
import { bindActionCreators } from 'redux';
import BackgroundColorPicker from './colorPicker';
import { updateBackground } from './actions';

class ToolbarOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOne: true,
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
    const { collapseOne } = this.state;
    const collapseOneProps = {
      'data-toolbar-option': 'bg-selector',
      iconProps: { iconName: collapseOne ? 'ChevronDown' : 'ChevronUp' },
      text: 'Background color',
      onClick: () => this.toggleCollapse('collapseOne'),
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
