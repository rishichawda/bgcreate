import React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import ToolbarOptions from './toolbarOptions';

class Toolbar extends React.Component {
  render() {
    const { showPanel, closePanel } = this.props;
    return (
      <div>
        <Panel
          isOpen={showPanel}
          type={PanelType.smallFixedNear}
          // tslint:disable-next-line:jsx-no-lambda
          onDismiss={closePanel}
        >
          <ToolbarOptions />
        </Panel>
      </div>
    );
  }
}

export default Toolbar;
