import React from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { css, StyleSheet } from '../../aphrodite';
import withModals, { ModalContainerContext } from '../../modules/modalable';
import Profile from '../../forms/Profile/Profile';
import LogInForm from '../../forms/LogInForm/LogInForm';
import SignUpForm from '../../forms/SignUpForm/SignUpForm';
import ResetPasswordForm from '../../forms/ResetPasswordForm/ResetPasswordForm';
import LoadingIndicator from '@/v2/components/LoadingIndicator/LoadingIndicator';
import Logo from '@/v2/components/Logo/Logo';
import MainNav from '@/v2/components/MainNav/MainNav';
import MainMenu from '@/v2/components/MainMenu/MainMenu';
import TextHeader from '@/v2/layouts/MainScreen/TextHeader';

class MainScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };
  }

  modals() {
    return {
      profile: {
        hashRoute: true,
        body: <Profile />,
      },
      signin: {
        hashRoute: true,
        body: <LogInForm />,
      },
      signup: {
        hashRoute: true,
        body: <SignUpForm />,
      },
      reset_password: {
        hashRoute: true,
        body: <ResetPasswordForm />,
      },
    };
  }

  render() {
    const { children, header } = this.props;
    const { showMenu } = this.state;

    return (
      <ModalContainerContext.Consumer>
        {
          ({ isModalShown }) => (
            <div>
              <div style={{ flex: 1 }}>
                <LoadingIndicator isSticky={!isModalShown}>
                  <Logo />
                  <MainNav
                    showMenu={() => this.setState({ showMenu: true })}
                  />
                  {
                    header && (
                      typeof header === 'string' || typeof header === 'number'
                        ? <TextHeader title={header} /> : header
                    )
                  }
                  {
                    showMenu
                      ? (
                        <MainMenu
                          user={null}
                          hideMenu={() => this.setState({ showMenu: false })}
                          logIn={() => {}}
                          signUp={() => {}}
                          logOut={() => {}}
                          openProfile={() => {}}
                          enterWithVk={() => {}}
                        />
                      )
                      : ''
                  }
                  {children && children}
                </LoadingIndicator>
              </div>
              <div style={{ flex: 0 }}>
                <Footer
                  logIn={() => {}}
                  signUp={() => {}}
                  logOut={() => {}}
                />
              </div>
            </div>
          )
        }
      </ModalContainerContext.Consumer>
    );
  }
}

const style = StyleSheet.create({
});

export default withRouter(withModals(MainScreen));
