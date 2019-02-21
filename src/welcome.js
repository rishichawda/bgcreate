import * as React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link } from 'office-ui-fabric-react';

const Welcome = ({ showModal, closeModal }) => (
  <div className="ms-fadeIn500">
    <Modal
      titleAriaId="titleId"
      subtitleAriaId="subtitleId"
      isOpen={showModal}
      onDismiss={closeModal}
      isBlocking={false}
      containerClassName="welcome-section"
    >
      <div className="about-header">
        <span id="titleId">Hello, there!</span>
        <Icon
          iconName="Cancel"
          className="close-modal-icon"
          onClick={closeModal}
        />
      </div>
      <div id="subtitleId" className="modal-body">
        <h3>Welcome to BgCreate v1.1!</h3>
        <p>
          {
            'As you will notice, the app has a minimal design so that most of the part is clean and focused on the content. Here is a small walkthrough of the app to get you started : '
          }
        </p>
        <p>
          {'To open the toolbar with all the options, click on the '}
          <strong>Edit</strong>
          {' option on the menu bar on top of the page and select '}
          <strong>Show toolbar</strong>
          {'.'}
        </p>
        <p>
          {
            'You can play around with the tools and available options on the toolbar and can download your currents edits with the help of the '
          }
          <strong>Download</strong>
          {' button on the menu bar on top.'}
        </p>
        <p>
          {
            "That's all you need to know for now! Rest of it pretty easy, I can assure you!"
          }
        </p>
        <p>
          {'You can also star the '}
          <Link href="https://github.com/rishichawda/bgcreate">
            github repository
          </Link>
          {
            ' later to show your support if you liked this app! And stay tuned - a lot of great updates are on the way!'
          }
        </p>
      </div>
    </Modal>
  </div>
);

Welcome.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Welcome;
