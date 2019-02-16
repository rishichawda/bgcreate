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
import { PAINT_MODE, PARTICLES_MODE, NORMAL_MODE } from './shared/constants';
import PaintOptions from './paintOptions';

class ToolbarOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOne: false,
      collapseTwo: true,
      showModal: false,
      selectedType: NORMAL_MODE,
    };
    this.resetCanvasBackground = this.updateCanvasBackground.bind(this, '#fff');
  }

  componentDidUpdate() {
    const { selectedType } = this.state;
    const { canvasMode } = this.props;
    if (selectedType !== canvasMode) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        selectedType: canvasMode,
      });
    }
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
    this.closeModal(null, PAINT_MODE);
    resetCanvas();
    switchEditMode(PAINT_MODE);
  }

  updateCanvasBackground = (color) => {
    const { updateCanvasBackground } = this.props;
    updateCanvasBackground(color);
  };

  updateCanvasType = (_, options) => {
    const { switchEditMode } = this.props;
    const { selectedType } = this.state;
    switch (options.key) {
      case PAINT_MODE:
        this.setState({
          showModal: true,
        });
        break;
      case PARTICLES_MODE:
        switchEditMode(options.key);
        this.setState({
          selectedType: options.key,
        });
        loadParticles();
        break;
      case NORMAL_MODE:
        if (selectedType === PARTICLES_MODE) {
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
                { key: NORMAL_MODE, text: 'None', title: 'No effect' },
                { key: 'divider_0', text: '-', itemType: DropdownMenuItemType.Divider },
                { key: PARTICLES_MODE, text: PARTICLES_MODE },
                { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
                { key: PAINT_MODE, text: PAINT_MODE },
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
        { selectedType === PARTICLES_MODE ? <ParticlesOptions /> : null }
        { selectedType === PAINT_MODE ? <PaintOptions /> : null }
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

const mapProps = ({ mode }) => ({
  canvasMode: mode,
});

export default connect(
  mapProps,
  mapDispatch,
)(ToolbarOptions);
