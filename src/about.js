import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link } from 'office-ui-fabric-react';

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
        <span id="titleId">About BgCreate - Background Creator / Generator.</span>
        <Icon iconName="Cancel" className="close-modal-icon" onClick={closeModal} />
      </div>
      <div id="subtitleId" className="modal-body">
        <div className="about-modal-footer">
          <p>
            <strong>Author: </strong>
            <Link href="https://www.github.com/rishichawda">Rishi Kumar Chawda</Link>
          </p>
          <p>
            <strong>Current version: </strong>
            {'1.1.0'}
          </p>
        </div>
        <p>
          {'This is a simple web app to generate background images with solid colors / effects and download them locally to your device. Or you can just sit back, play around with the app and enjoy!'}
        </p>
        <p>
          {'You can also doodle with the paint tool provided in the toolbar ( '}
          <strong>{'Edit > Show toolbar > Select Canvas Type > Paint'}</strong>
          {' ) in your desktop and mobile device!'}
        </p>
        <p>
          <strong>Have any ideas?</strong>
          <br />
          {'If you have any ideas on what could be added to this tool or if you would like to see some specific feature implemented, feel free to open an issue '}
          <Link href="https://github.com/rishichawda/bgcreate/issues">
        here
          </Link>
          {'! You can also open an issue if you found any bug while using the app.'}
        </p>
        <p>
          <strong>Liked this?</strong>
          <br />
          {'If you enjoyed using this app or liked something about it, please star the '}
          <Link href="https://github.com/rishichawda/bgcreate">github repository</Link>
          {' to show your support! And stay tuned - a lot of great updates are on the way!'}
        </p>
        <p>
          <strong>Do you want to contribute?</strong>
          <br />
          {'You can take a look at the list of issues open '}
          <Link href="https://github.com/rishichawda/bgcreate/issues">here</Link>
          {' and fork the repository to contribute.'}
        </p>
      </div>
    </Modal>
  </div>
);

About.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default About;
