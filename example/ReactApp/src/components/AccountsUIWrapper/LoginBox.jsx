import React from 'react';
import PropTypes from 'prop-types';
import Meteor, { Accounts } from 'react-meteor-client';

import styles from './AccountsUIWrapper.style';

class LoginBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginPanel: true,
      username: '',
      password: '',
      confirm: '',
      error: '',
    };

    this.toggleLogin = this.toggleLogin.bind(this);
    this.nameOnChange = this.nameOnChange.bind(this);
    this.passwordOnChange = this.passwordOnChange.bind(this);
    this.confirmOnChange = this.confirmOnChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  toggleLogin() {
    this.setState({ isLoginPanel: !this.state.isLoginPanel });
  }

  nameOnChange(event) {
    this.setState({ username: event.target.value });
  }

  passwordOnChange(event) {
    this.setState({ password: event.target.value });
  }

  confirmOnChange(event) {
    this.setState({ confirm: event.target.value });
  }

  handleLogin() {
    const { username, password } = this.state;
    const { closeOnClick } = this.props;
    const self = this;
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        self.setState({ error: error.reason, username: '', password: '', confirm: '' });
      } else {
        self.setState({ error: '', username: '', password: '', confirm: '' });
        closeOnClick();
      }
    });
  }

  handleSignup() {
    const { username, password, confirm } = this.state;
    if (password !== confirm) {
      this.setState({ password: '', confirm: '', error: 'Password not matech' });
      return;
    }
    const self = this;
    Accounts.createUser({ username, password }, (err) => {
      if (err) {
        self.setState({ error: err.reason, username: '', password: '', confirm: '' });
      } else {
        self.handleLogin();
      }
    });
  }

  render() {
    const { username, password, confirm, error, isLoginPanel } = this.state;
    const { closeOnClick } = this.props;
    const { title, text, buttonOnClick } = isLoginPanel ? {
      title: 'Login',
      text: 'signup',
      buttonOnClick: this.handleLogin,
    } : {
      title: 'Signup',
      text: 'login',
      buttonOnClick: this.handleSignup,
    };
    return (
      <div style={styles.panel}>
        <div style={styles.buttonHolder}>
          <button onClick={this.toggleLogin} style={styles.closeButton}>{text}</button>
          <button onClick={closeOnClick} style={styles.closeButton}>close</button>
        </div>
        <div style={styles.panelTitle}>{title}</div>
        <div style={styles.panelInputHolder}>
          <div style={styles.panelInputLabel}>Account</div>
          <input value={username} onChange={this.nameOnChange} style={styles.panelInput} />
        </div>
        <div style={styles.panelInputHolder}>
          <div style={styles.panelInputLabel}>Password</div>
          <input type="password" value={password} onChange={this.passwordOnChange} style={styles.panelInput} />
        </div>
        {
          !isLoginPanel ? (
            <div style={styles.panelInputHolder}>
              <div style={styles.panelInputLabel}>Comfirm Password</div>
              <input type="password" value={confirm} onChange={this.confirmOnChange} style={styles.panelInput} />
            </div>
          ) : null
        }
        <div style={styles.panelErrorText}>{error || ' '}</div>
        <button onClick={buttonOnClick} style={styles.panelButton}>{title}</button>
      </div>
    );
  }
}

LoginBox.propTypes = {
  closeOnClick: PropTypes.func,
};

LoginBox.defaultProps = {
  closeOnClick: () => {},
};

export default LoginBox;
