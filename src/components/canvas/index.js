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
import { PAINT_MODE } from '../../shared/constants';
import PaintCanvas from '../paint-canvas';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  saveImage = () => {
    const { closeModal, canvasBg, canvasMode } = this.props;
    generateImage(canvasBg, canvasMode);
    closeModal();
  };

  render() {
    const {
      canvasBg, showModal, closeModal, canvasMode,
    } = this.props;
    const props = {
      brushCol: '#000',
      className: 'react-paint',
      height: '100%',
      width: '100%',
    };
    return (
      <div id="particles-js" style={{ backgroundColor: canvasBg }}>
        { canvasMode === PAINT_MODE ? <PaintCanvas {...props} /> : (
          <canvas
            ref={this.canvasRef}
            className="particles-js-canvas-el"
            style={{ height: '100%', width: '100%' }}
          />
        )}
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
