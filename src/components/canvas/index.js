import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType,
} from 'office-ui-fabric-react';
import { generateImage } from '../../utils';
import './index.scss';
import Particles from 'react-particles-js';
import { PARTICLES_MODE } from '../../shared/constants';

class Canvas extends Component {

  saveImage = () => {
    const { closeModal, canvasBg, canvasMode } = this.props;
    generateImage(canvasBg, canvasMode);
    closeModal();
  };

  render() {
    const { canvasBg, showModal, closeModal, canvasMode } = this.props;
    return (
      <div id="particles-js" style={{ backgroundColor: canvasBg }}>
        { canvasMode === PARTICLES_MODE && <Particles canvasClassName="particles-js-canvas-el" height="100%" width="100%" /> }
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

const mapProps = ({ bgColor, mode }) => ({
  canvasBg: bgColor,
  canvasMode: mode,
});

export default connect(
  mapProps,
  null,
)(Canvas);
