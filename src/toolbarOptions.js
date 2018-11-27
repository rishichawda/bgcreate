import * as React from 'react';
import { connect } from 'react-redux';
import {
  CommandBarButton,
  AnimationClassNames,
  DefaultButton,
  Dropdown,
  DropdownMenuItemType,
  Dialog,
  DialogFooter,
  PrimaryButton,
  DialogType,
} from 'office-ui-fabric-react';
import { bindActionCreators } from 'redux';
import BackgroundColorPicker from './colorPicker';
import { updateBackground, resetCanvasState, switchMode } from './actions';
import { loadParticles } from './utils';
import { unloadParticles } from './utils/particles';
import ParticlesOptions from './particlesOptions';

class ToolbarOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOne: false,
      collapseTwo: true,
      showModal: false,
      selectedType: 'no-effect',
    };
    this.resetCanvasBackground = this.updateCanvasBackground.bind(this, '#fff');
  }

  toggleCollapse = (identifier) => {
    this.setState(prevState => ({
      [`${identifier}`]: !prevState[identifier],
    }));
  };

  closeModal = (_, setType = null) => {
    this.setState(prevState => ({
      showModal: false,
      selectedType: setType === null ? prevState.selectedType : setType,
    }));
  }

  switchToPaint = () => {
    const { switchEditMode, resetCanvas } = this.props;
    this.closeModal(null, 'paint');
    resetCanvas();
    switchEditMode('paint');
  }

  updateCanvasBackground = (color) => {
    const { updateCanvasBackground } = this.props;
    updateCanvasBackground(color);
  };

  updateCanvasType = (_, options) => {
    const { switchEditMode } = this.props;
    const { selectedType } = this.state;
    switch (options.key) {
      case 'paint':
        this.setState({
          showModal: true,
        });
        break;
      case 'particles':
        switchEditMode(options.key);
        this.setState({
          selectedType: options.key,
        });
        loadParticles();
        break;
      case 'no-effect':
        if (selectedType === 'particles') {
          unloadParticles();
        } else {
          this.resetCanvasBackground();
        }
        this.setState({
          selectedType: options.key,
        });
        switchEditMode(options.key);
        break;
      default:
        break;
    }
  }

  render() {
    const {
      collapseOne, collapseTwo, showModal, selectedType,
    } = this.state;
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
                { key: 'no-effect', text: 'None', title: 'No effect' },
                { key: 'divider_0', text: '-', itemType: DropdownMenuItemType.Divider },
                { key: 'particles', text: 'Particles' },
                { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
                { key: 'paint', text: 'Paint' },
              ]}
              selectedKey={selectedType}
              onChange={this.updateCanvasType}
            />
            <p>
              You can currently choose between particles
              effect and a paint tool / canvas where you can draw using mouse.
            </p>
          </div>
        ) : null}
        { selectedType === 'particles' ? <ParticlesOptions /> : null }
        <Dialog
          hidden={!showModal}
          onDismiss={this.closeModal}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Are you sure?',
            subText:
              'Switching to paint mode will reset the canvas and you might lose any changes that were made. If you want the current changes, first please download the image from the download button in the menu bar.',
          }}
          modalProps={{
            titleAriaId: 'paint-confirmation-dialog-title',
            subtitleAriaId: 'paint-confirmation-dialog-text',
            isBlocking: true,
            containerClassName: 'ms-dialogMainOverride',
          }}
        >
          {
            null /** You can also include null values as the result of conditionals */
          }
          <DialogFooter>
            <PrimaryButton onClick={this.switchToPaint} text="Yes" />
            <DefaultButton onClick={this.closeModal} text="No" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  updateCanvasBackground: bindActionCreators(updateBackground, dispatch),
  resetCanvas: bindActionCreators(resetCanvasState, dispatch),
  switchEditMode: bindActionCreators(switchMode, dispatch),
});

export default connect(
  null,
  mapDispatch,
)(ToolbarOptions);
