import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { CommandBarButton } from 'office-ui-fabric-react';
import ToolbarOptions from './toolbarOptions';
import { resetCanvasState } from './actions';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { showPanel, closePanel, resetCanvas } = this.props;
    return (
      <div>
        <Panel
          isOpen={showPanel}
          isHiddenOnDismiss
          isLightDismiss
          type={PanelType.smallFixedNear}
          onDismiss={closePanel}
        >
          <CommandBarButton
            data-toolbar-option="reset-canvas"
            iconProps={{ iconName: 'Refresh' }}
            text="Reset Canvas"
            onClick={resetCanvas}
          />
          <ToolbarOptions />
        </Panel>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  resetCanvas: bindActionCreators(resetCanvasState, dispatch),
});

export default connect(
  null,
  mapDispatch,
)(Toolbar);
