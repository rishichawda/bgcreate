import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
} from 'office-ui-fabric-react';
import Particles from 'react-particles-js';
import { generateImage } from '../../utils';
import './index.scss';
import { PARTICLES_MODE } from '../../shared/constants';

class Canvas extends Component {
  saveImage = () => {
    const { closeModal, canvasBg, canvasMode } = this.props;
    generateImage(canvasBg, canvasMode);
    closeModal();
  };

  render() {
    const {
      canvasBg, showModal, closeModal, canvasMode, canvasConfig,
    } = this.props;
    return (
      <div id="particles-js" style={{ backgroundColor: canvasBg }}>
        { canvasMode === PARTICLES_MODE && <Particles params={canvasConfig} canvasClassName="particles-js-canvas-el" height="100vh" width="100vw" /> }
        <Dialog
          hidden={!showModal}
          onDismiss={closeModal}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Download image',
            subText:
              'Download the image to your device? The image will be saved as bgGeneratorImage.jpg.',
          }}
          modalProps={{
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride',
          }}
        >
          {
            null /** You can also include null values as the result of conditionals */
          }
          <DialogFooter>
            <PrimaryButton onClick={this.saveImage} text="Save" />
            <DefaultButton onClick={closeModal} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

const mapProps = ({ bgColor, mode, particlesOptions }) => ({
  canvasBg: bgColor,
  canvasMode: mode,
  canvasConfig: particlesOptions,
});

export default connect(
  mapProps,
  null,
)(Canvas);
