import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.scss";
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DialogType
} from "office-ui-fabric-react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  saveImage = () => {
    const { closeModal, canvasBg } = this.props;
    let finalimage = document.createElement("canvas");
    let finalimage_canvascontext = finalimage.getContext('2d');
    finalimage.width = 2000;
    finalimage.height = 2000;
    finalimage_canvascontext.fillStyle = canvasBg;
    finalimage_canvascontext.fillRect(0, 0, 2000, 2000);
    let a = document.createElement('a');
    a.href = finalimage.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    a.download = 'bgGeneratorImage.jpg';
    a.click();
    closeModal();
  };

  render() {
    const { canvasBg, showModal, closeModal } = this.props;
    return (
      <div id="particles-js" style={{ backgroundColor: canvasBg }}>
        <canvas
          ref={this.canvasRef}
          className="particles-js-canvas-el"
          style={{ height: "100%", width: "100%" }}
        />
        <Dialog
          hidden={!showModal}
          onDismiss={closeModal}
          dialogContentProps={{
            type: DialogType.normal,
            title: "Download image",
            subText:
              "Download the image to your device? The image will be saved as bgGeneratorImage.jpg."
          }}
          modalProps={{
            titleAriaId: "myLabelId",
            subtitleAriaId: "mySubTextId",
            isBlocking: false,
            containerClassName: "ms-dialogMainOverride"
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

const mapProps = ({ bgColor }) => ({
  canvasBg: bgColor
});

export default connect(
  mapProps,
  null
)(Canvas);
