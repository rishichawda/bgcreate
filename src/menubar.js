import React, { Component } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import {
  Dialog, DialogFooter, PrimaryButton, DefaultButton, DialogType,
} from 'office-ui-fabric-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import About from './about';
import { generateImage } from './utils';
import { resetCanvasState } from './actions';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      hideDialog: true,
    };
    this.createWithSave = this.createNew.bind(this, true);
    this.createWithoutSave = this.createNew.bind(this, false);
  }

  createNew = (shouldSave) => {
    const { generateNewCanvas } = this.props;
    if (shouldSave) {
      generateImage();
    }
    this.closeDialog();
    generateNewCanvas();
  }

  // Data for CommandBar
  getItems = () => {
    const { showToolbar, showModal } = this.props;
    return [
      {
        key: 'newItem',
        name: 'New',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Add',
        },
        ariaLabel: 'Use left and right arrow keys to navigate',
        onClick: this.showDialog,
      },
      {
        key: 'edit',
        name: 'Edit',
        iconProps: {
          iconName: 'Edit',
        },
        subMenuProps: {
          items: [
            {
              key: 'menu',
              name: 'Show toolbar',
              iconProps: {
                iconName: 'ColorSolid',
              },
              onClick: () => showToolbar(),
            },
            {
              key: 'rename',
              name: 'Rename...',
              secondaryText: '(Currently not available.)',
              disabled: true,
              iconProps: {
                iconName: 'Edit',
              },
            },
          ],
        },
      },
      {
        key: 'download',
        name: 'Download',
        iconProps: {
          iconName: 'Download',
        },
        onClick: () => showModal(),
      },
    ];
  }

  getOverlflowItems = () => [
    {
      key: 'share',
      name: 'Share',
      iconProps: {
        iconName: 'Share',
      },
      disabled: true,
    },
  ];

  getFarItems = () => [
    {
      key: 'info',
      name: 'About',
      iconProps: {
        iconName: 'Info',
      },
      onClick: () => this.showModal(),
    },
  ];

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  closeDialog = () => {
    this.setState({
      hideDialog: true,
    });
  }

  showDialog = () => {
    this.setState({
      hideDialog: false,
    });
  }

  render() {
    const { showModal, hideDialog } = this.state;
    return (
      <div>
        <About showModal={showModal} closeModal={this.closeModal} />
        <CommandBar
          items={this.getItems()}
          overflowItems={this.getOverlflowItems()}
          farItems={this.getFarItems()}
          ariaLabel="Use left and right arrow keys to navigate between commands"
        />
        <Dialog
          hidden={hideDialog}
          onDismiss={this.closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Are you sure?',
            subText: 'Do you want to save current changes before creating a new image?',
          }}
          modalProps={{
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride new-file-modal',
          }}
        >
          {null /** You can also include null values as the result of conditionals */}
          <DialogFooter>
            <PrimaryButton onClick={this.createWithSave} text="Yes, save and create new." />
            <PrimaryButton onClick={this.createWithoutSave} style={{ backgroundColor: '#f06060' }} text="Continue without saving." />
            <DefaultButton onClick={this.closeDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  generateNewCanvas: bindActionCreators(resetCanvasState, dispatch),
});

export default connect(null, mapDispatch)(MenuBar);
