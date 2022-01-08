import React from 'react';
import moment from 'moment';
import { css } from '../../aphrodite';
import Api from '../../utils/Api';
import AscentAction from './AscentAction';
import Button from '@/v1/components/Button/Button';

import { userActionsStyles } from './styles';

class UserActionsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      period: {
        to: moment(),
        from: moment().add(-1, 'week'),
      },
    };

    this.fetchUserActions(this.state.period);
  }

  fetchUserActions = (period) => {
    const self = this;
    const { actions } = this.state;

    Api.get(
      '/v2/users/self/ascents',
      {
        params: {
          period: [period.from.format('YYYY-MM-DD'), period.to.format('YYYY-MM-DD')],
        },
        success(ascents) {
          self.setState({
            actions: [
              ...actions,
              { period, ascents },
            ],
          });
        },
        failed(error) {
          console.log(error);
        },
      },
    );
  }

  loadMore = () => {
    const { period } = this.state;
    const newPeriodTo = moment(period.from).add(-1, 'day');

    const newPeriod = {
      to: newPeriodTo,
      from: moment(newPeriodTo).add(-1, 'week'),
    };

    this.fetchUserActions(newPeriod);

    this.setState({ period: newPeriod });
  }

  render() {
    const { actions } = this.state;

    return (
      actions ? (
        <div className={css(userActionsStyles.container)}>
          {
            actions.map(
              row => <>
                <div className={css(userActionsStyles.actionsCaption)}>
                  { `${row.period.from.format('DD.MM')} — ${row.period.to.format('DD.MM')}` }
                </div>
                {
                  row.ascents.length > 0 ? (
                    row.ascents.map(
                      ascent => <AscentAction ascent={ascent} />,
                    )
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      { 'Нет пролазов' }
                    </div>
                  )
                }
              </>,
            )
          }
          <div style={{ marginTop: '20px' }}>
            <Button title="Ещё" onClick={this.loadMore} />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>Загрузка ...</div>
      )
    );
  }
}

export default UserActionsList;
