import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import bcrypt from 'bcryptjs';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TabBar from '@/v1/components/TabBar/TabBar';
import Button from '@/v1/components/Button/Button';
import FormField from '@/v1/components/FormField/FormField';
import CloseButton from '@/v1/components/CloseButton/CloseButton';
import { PASSWORD_MIN_LENGTH } from '@/v1/Constants/User';
import SALT_ROUNDS from '@/v1/Constants/Bcrypt';
import RE_EMAIL from '@/v1/Constants/Constraints';
import Modal from '../../layouts/Modal';
import Api from '@/v2/utils/Api';
import { ModalContext } from '@/v2/modules/modalable';
import showToastr from '@/v2/utils/showToastr';
import toastHttpError from '@/v2/utils/toastHttpError';
import { StyleSheet, css } from '@/v2/aphrodite';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordFromSms: '',
      password: '',
      repeatPassword: '',
      errors: {},
      isWaiting: false,
    };
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('reset_password_code');
    if (code !== null) {
      const email = url.searchParams.get('user_email');
      this.setState(
        {
          email: email || url.searchParams.get('user_login'),
        },
      );
    }
  }

  resetErrors = () => {
    this.setState({ errors: {} });
  };

  onPasswordFromSmsChange = (event) => {
    this.resetErrors();
    this.setState({ passwordFromSms: event.target.value });
  };

  onPasswordChange = (event) => {
    this.resetErrors();
    this.setState({ password: event.target.value });
    this.check('password', event.target.value);
  };

  onRepeatPasswordChange = (event) => {
    this.resetErrors();
    this.setState({ repeatPassword: event.target.value });
    this.check('repeatPassword', event.target.value);
  };

  check = (field, value) => {
    const { errors, password } = this.state;
    switch (field) {
    case 'password':
      if (value === '' || value.length < PASSWORD_MIN_LENGTH) {
        const msgErr = `?????????????????????? ?????????? ???????????? ${PASSWORD_MIN_LENGTH} ????????????????`;
        this.setState({ errors: R.merge(errors, { password: [msgErr] }) });
        return false;
      }
      return true;
    case 'repeatPassword':
      if (password !== value) {
        this.setState(
          { errors: R.merge(errors, { repeatPassword: ['???????????? ???? ??????????????????'] }) },
        );
        return false;
      }
      return true;
    default:
      return true;
    }
  };

  checkAndSubmit = (type, data, passwordNew) => {
    const { password, repeatPassword } = this.state;
    let res = !this.check('password', password);
    res += !this.check('repeatPassword', repeatPassword);
    if (res > 0) {
      return;
    }
    this.onFormSubmit(type, data, passwordNew);
  };

  onFormSubmit = (type, data, password) => {
    if (type !== 'email') {
      throw `Argument error: value ${type} for argument type is invalid.`;
    }
    this.setState({ isWaiting: true });
    const url = new URL(window.location.href);
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);
    let params;
    if (R.test(RE_EMAIL, data)) {
      params = {
        user: { password_digest: hash, email: data },
        token: url.searchParams.get('reset_password_code'),
      };
    } else {
      params = {
        user: { password_digest: hash, login: data },
        token: url.searchParams.get('reset_password_code'),
      };
    }

    const self = this;
    Api.post(
      '/v1/users/reset_password',
      params,
      {
        method: 'patch',
        success() {
          showToastr(
            '???????????? ?????????????? ??????????????',
            {
              type: 'success',
              after: () => {
                window.location.href = '/';
              },
            },
          );
        },
        failed(error) {
          self.setState({ isWaiting: false });
          toastHttpError(error);
        },
      },
    );
  };

  hasError = (field) => {
    const { errors } = this.state;
    return errors[field];
  };

  errorText = (field) => {
    const { errors } = this.state;
    return R.join(
      ', ',
      errors[field] ? errors[field] : [],
    );
  };

  firstTabContent = () => {
    const { phone, passwordFromSms, isWaiting } = this.state;
    return (
      <form action="#">
        <FormField
          placeholder="?????? ??????????????"
          id="your-phone"
          onChange={null}
          type="number"
          disabled
          value={phone}
        />
        <FormField
          placeholder="???????????? ???? ??????"
          id="password-from-sms"
          onChange={this.onPasswordFromSmsChange}
          type="text"
          hasError={this.hasError('passwordFromSms')}
          errorText={this.errorText('passwordFromSms')}
          value={passwordFromSms}
        />
        <Button
          size="medium"
          buttonStyle="normal"
          title="????????????????????????"
          fullLength
          submit
          isWaiting={isWaiting}
          onClick={() => this.checkAndSubmit('phone', phone, passwordFromSms)}
        />
      </form>
    );
  };

  secondTabContent = () => {
    const {
      email, password, repeatPassword, isWaiting,
    } = this.state;
    return (
      <form action="#">
        <FormField
          placeholder="Email / ??????????"
          id="your-email"
          onChange={null}
          type="text"
          disabled
          value={email}
        />
        <FormField
          placeholder="???????????????????? ????????????"
          id="password"
          onChange={this.onPasswordChange}
          type="password"
          hasError={this.hasError('password')}
          errorText={this.errorText('password')}
          value={password}
        />
        <FormField
          placeholder="?????????????????? ????????????"
          id="repeat-password"
          onChange={this.onRepeatPasswordChange}
          type="password"
          hasError={this.hasError('repeatPassword')}
          errorText={this.errorText('repeatPassword')}
          onEnter={() => this.checkAndSubmit('email', email, password, repeatPassword)}
          value={repeatPassword}
        />
        <Button
          size="medium"
          buttonStyle="normal"
          title="??????????????????"
          fullLength
          submit
          isWaiting={isWaiting}
          onClick={() => this.checkAndSubmit('email', email, password, repeatPassword)}
        />
      </form>
    );
  };

  render() {
    return (
      <Modal>
        <ModalContext.Consumer>
          {
            ({ closeModal }) => (
              <>
                <h3 className={css(styles.modalBlockMTitleForm)}>
                  ?????????????????? ???????????? ????????????
                </h3>
                <TabBar
                  contentList={[this.firstTabContent(), this.secondTabContent()]}
                  activeList={[false, true]}
                  activeTab={2}
                  titleList={['??????????????', 'Email']}
                />
              </>
            )
          }
        </ModalContext.Consumer>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBlockMTitleForm: {
    fontSize: '24px',
    fontFamily: 'GilroyBold, sans-serif',
    lineHeight: '24px',
    textAlign: 'center',
    marginTop: '50px',
  },
});

ResetPasswordForm.propTypes = {
};

const mapDispatchToProps = dispatch => ({
  resetPassword: (
    params, afterSuccess, afterFail, afterAll,
  ) => {},
});

export default withRouter(connect(null, mapDispatchToProps)(ResetPasswordForm));
