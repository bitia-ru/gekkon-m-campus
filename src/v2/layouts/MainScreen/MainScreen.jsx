import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { css, StyleSheet } from '../../aphrodite';
import withModals, { ModalContainerContext } from '../../modules/modalable';
import MainScreenContext from '@/v2/contexts/MainScreenContext';
import Profile from '../../forms/Profile/Profile';
import LogInForm from '../../forms/LogInForm/LogInForm';
import SignUpForm from '../../forms/SignUpForm/SignUpForm';
import ResetPasswordForm from '../../forms/ResetPasswordForm/ResetPasswordForm';
import LoadingIndicator from '@/v2/components/LoadingIndicator/LoadingIndicator';
import Logo from '@/v2/components/Logo/Logo';
import MainNav from '@/v2/components/MainNav/MainNav';
import MainMenu from '@/v2/components/MainMenu/MainMenu';
import TextHeader from '@/v2/layouts/MainScreen/TextHeader';
import FilterBlock from '@/v2/components/FilterBlock/FilterBlock';
import { SessionContext } from '../../fetchers/SessionFetcher';

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
      filters: {
        hashRoute: true,
        body: <FilterBlock />,
      },
    };
  }

  render() {
    const { children, header, backgroundColor } = this.props;
    const { showMenu } = this.state;

    return (
      <SessionContext.Consumer>
        {
          (session) => (
            <ModalContainerContext.Consumer>
              {
                ({ isModalShown }) => (
                  <div
                    className={css(
                      style.container,
                      isModalShown ? style.unscrollable : style.scrollable,
                    )}
                    style={{ backgroundColor }}
                    ref={(ref) => { this.containerRef = ref; }}
                  >
                    <div style={{ flex: 1 }}>
                      <LoadingIndicator>
                        <Logo />
                        <MainNav showMenu={() => this.setState({ showMenu: true })} />
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
                                currentUser={session?.currentUser}
                                hideMenu={() => this.setState({ showMenu: false })}
                              />
                            )
                            : ''
                        }
                        <MainScreenContext.Provider
                          value={{ parentContainerRef: this.containerRef }}
                        >
                          {children && children}
                        </MainScreenContext.Provider>
                      </LoadingIndicator>
                    </div>
                  </div>
                )
              }
            </ModalContainerContext.Consumer>
          )
        }
      </SessionContext.Consumer>
    );
  }
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
    overflowX: 'hidden',
  },
  scrollable: { overflowY: 'auto' },
  unscrollable: { overflowY: 'hidden' },
});

MainScreen.propTypes = {
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  backgroundColor: PropTypes.string,
};

export default withRouter(withModals(MainScreen));
