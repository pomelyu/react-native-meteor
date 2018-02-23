import React from 'react';
import PropTypes from 'prop-types';

import LoginBox from './LoginBox';
import LogoutBox from './LogoutBox';

class AccountsUIWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel() {
    this.setState({ isOpen: !this.state.isOpen, error: '' });
  }

  render() {
    const { isOpen } = this.state;
    const { username, isLogin } = this.props;
    if (!isOpen) {
      return <button onClick={this.togglePanel}>{username}</button>;
    } else if (isLogin) {
      return <LogoutBox closeOnClick={this.togglePanel} />;
    }
    return <LoginBox closeOnClick={this.togglePanel} />;
  }
}

AccountsUIWrapper.propTypes = {
  username: PropTypes.string,
  isLogin: PropTypes.bool,
};

AccountsUIWrapper.defaultProps = {
  username: 'login',
  isLogin: false,
};

export default AccountsUIWrapper;
