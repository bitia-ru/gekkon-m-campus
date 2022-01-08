import React from 'react';
import { connect, Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import BootingScreen from './screens/BootingScreen';
import { currentUser as currentUserObtainer } from './redux/user_session/utils';
import SpotsShow from '@/v2/screens/SpotsShow';
import SpotsIndex from '@/v2/screens/SpotsIndex';
import { default as HistoryScreen } from './screens/History';
import { default as historyStoreFactory } from '@/v2/redux/History/store';
import LoginVKError from '@/v2/components/LoginVK/LoginVKError';
import LoginVKSuccess from '@/v2/components/LoginVK/LoginVKSuccess';
import SessionFetcher from './components/SessionFetcher/SessionFetcher';

const V2 = ({ currentUser }) => (
  <>
    {
      currentUser !== undefined ? (
        <Switch>
          <Route exact path={['/', '/spots']} component={SpotsIndex} />
          <Route path="/spots/:id/sectors/:sector_id" component={SpotsShow} />
          <Route path="/spots/:id" component={SpotsShow} />
          <Route path="/error" component={LoginVKError} />
          <Route path="/integrations/vk/actions/success" component={LoginVKSuccess} />
          <Provider store={historyStoreFactory()}>
            <SessionFetcher>
              <Route path="/history" component={HistoryScreen} />
            </SessionFetcher>
          </Provider>
        </Switch>
      ) : (
        <BootingScreen />
      )
    }
  </>
);

const mapStateToProps = state => ({
  currentUser: currentUserObtainer(state),
});

V2.propTypes = {
  currentUser: PropTypes.object,
};

export default connect(mapStateToProps)(V2);
