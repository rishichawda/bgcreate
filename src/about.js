// @codepen
import * as React from 'react';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const About = ({ showModal, closeModal }) => (
  <div className="ms-fadeIn500">
    <Modal
      titleAriaId="titleId"
      subtitleAriaId="subtitleId"
      isOpen={showModal}
      onDismiss={closeModal}
      isBlocking={false}
      containerClassName="about-section"
    >
      <div className="about-header">
        <span id="titleId">About this application.</span>
        <Icon iconName="Cancel" className="close-modal-icon" onClick={closeModal} />
      </div>
      <div id="subtitleId" className="modal-body">
        <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </Modal>
  </div>
);

export default About;
