import React from 'react';
import PropTypes from 'prop-types';
import Meteor from '@pomelyu/react-meteor-client';

import styles from './AccountsUIWrapper.style';

const LogoutBox = ({ closeOnClick }) => {
  const handleLogout = () => {
    Meteor.logout();
    closeOnClick();
  };

  return (
    <div style={styles.panel}>
      <button onClick={closeOnClick} style={styles.closeButton}>close</button>
      <div style={styles.panelTitle}>Logout</div>
      <button onClick={handleLogout} style={styles.panelButton}>Logout</button>
    </div>
  );
};

LogoutBox.propTypes = {
  closeOnClick: PropTypes.func,
};

LogoutBox.defaultProps = {
  closeOnClick: () => {},
};

export default LogoutBox;
