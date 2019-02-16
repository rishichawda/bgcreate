import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import {
  CommandBarButton, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton,
} from 'office-ui-fabric-react';
import ToolbarOptions from './toolbarOptions';
import { resetCanvasState } from './actions';

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideDialog: true,
    };
  }

  closeDialog = () => {
    this.setState({
      hideDialog: true,
    });
  }

  resetCanvas = () => {
    const { resetCanvas } = this.props;
    resetCanvas();
    this.closeDialog();
  }

  showDialog = () => {
    this.setState({
      hideDialog: false,
    });
  }

  render() {
    const { showPanel, closePanel } = this.props;
    const { hideDialog } = this.state;
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
            onClick={this.showDialog}
          />
          <ToolbarOptions />
        </Panel>
        <Dialog
          hidden={hideDialog}
          onDismiss={this.closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Are you sure?',
            subText: 'All the current changes will be lost. Do you want to continue?',
          }}
          modalProps={{
            titleAriaId: 'reset-canvas-title',
            subtitleAriaId: 'reset-canvas-subtitle',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride',
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={this.resetCanvas} text="Yes, reset canvas." />
            <DefaultButton onClick={this.closeDialog} text="Cancel." />
          </DialogFooter>
        </Dialog>
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
