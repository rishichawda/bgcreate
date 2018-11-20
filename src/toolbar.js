import React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { CommandBarButton } from 'office-ui-fabric-react';
import ToolbarOptions from './toolbarOptions';

const Toolbar = ({ showPanel, closePanel }) => (
  <div>
    <Panel
      isOpen={showPanel}
      isHiddenOnDismiss
      type={PanelType.smallFixedNear}
      onDismiss={closePanel}
    >
      <CommandBarButton
        data-toolbar-option="reset-canvas"
        iconProps={{ iconName: 'Refresh' }}
        text="Reset Canvas"
        onClick={() => alert('Reset Canvas Clicked')}
      />
      <ToolbarOptions />
    </Panel>
  </div>
);

export default Toolbar;
