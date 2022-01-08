import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { currentUser2 as currentUserObtainer } from '../../redux/user_session/utils';
import { loadUserSession } from '../../redux/user_session/actions';

class SessionFetcher extends React.PureComponent {
  componentDidMount() {
    const { fetchCurrentUser: doFetchCurrentUser } = this.props;

    doFetchCurrentUser();
  }

  render() {
    const { children, currentUser } = this.props;

    return (
      currentUser ? (
        <>{ children }</>
      ) : (
        <div>
          Загрузка...
        </div>
      )
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCurrentUser: () => dispatch(loadUserSession()),
});

const mapStateToProps = state => ({
  currentUser: currentUserObtainer(state),
});

SessionFetcher.propTypes = {
  fetchCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionFetcher);
