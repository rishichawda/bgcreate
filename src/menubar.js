import React, { Component } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import About from './about';
import { Dialog, DialogFooter, PrimaryButton, DefaultButton, DialogType } from 'office-ui-fabric-react';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      hideDialog: true,
    };
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
            containerClassName: 'ms-dialogMainOverride',
          }}
        >
          {null /** You can also include null values as the result of conditionals */}
          <DialogFooter>
            <PrimaryButton onClick={this.closeDialog} text="Yes, save and create new." />
            <DefaultButton onClick={this.closeDialog} style={{ backgroundColor: '#cf0000' }} text="Continue without saving." />
            <DefaultButton onClick={this.closeDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

export default MenuBar;
