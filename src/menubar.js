import React, { Component } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import About from './about';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  // Data for CommandBar
  getItems = () => [
    {
      key: 'newItem',
      name: 'New',
      cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
      iconProps: {
        iconName: 'Add',
      },
      ariaLabel: 'Use left and right arrow keys to navigate',
    },
    {
      key: 'share',
      name: 'Share',
      iconProps: {
        iconName: 'Share',
      },
      disabled: true,
      onClick: () => console.log('Share'),
    },
    {
      key: 'download',
      name: 'Download',
      iconProps: {
        iconName: 'Download',
      },
      onClick: () => console.log('Download'),
    },
  ];

   getOverlflowItems = () => {
     const { showToolbar } = this.props;
     return [
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
     ];
   };

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

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <About showModal={showModal} closeModal={this.closeModal} />
        <CommandBar
          items={this.getItems()}
          overflowItems={this.getOverlflowItems()}
          farItems={this.getFarItems()}
          ariaLabel="Use left and right arrow keys to navigate between commands"
        />
      </div>
    );
  }
}

export default MenuBar;
