import React from 'react';
import { PropTypes } from 'prop-types';
import Api from '../utils/Api';


export const SessionContext = React.createContext(null);

export class SessionFetcher extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const self = this;

    Api.get(
      '/v1/users/self',
      {
        success(payload) {
          const currentUser = payload;

          self.setState({ currentUser });
        },
        failed(error) {
          if (error?.response?.status === 404) {
            self.setState({ currentUser: null });
          }

          // Proccess other errors
        },
      },
    );
  }

  render() {
    const { children } = this.props;
    const { currentUser } = this.state;

    return (
      currentUser !== undefined ? (
        <SessionContext.Provider value={{ currentUser }}>
          <>{ children }</>
        </SessionContext.Provider>
      ) : (
        <div>
          Загрузка...
        </div>
      )
    );
  }
}

SessionFetcher.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};
