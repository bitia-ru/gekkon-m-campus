import React from 'react';
import { css } from '../../aphrodite';

import { ascentActionStyles } from './styles';

const AscentAction = ({ ascent }) => (
  <div className={css(ascentActionStyles.container)}>
    <div className={css(ascentActionStyles.description)}>
      { ascent.result === 'success' ? 'Пролез трассу' : 'Сделал попытку на трассе' }
      { ' ' }
      <a href={ `/spots/${ascent.spot_id}/sectors/${ascent.sector_id}/routes/${ascent.route_id}` }>
        { `#${ascent.route_id}` }
      </a>
    </div>
    <div className={css(ascentActionStyles.category)}>{ ascent.category }</div>
  </div>
);

export default AscentAction;
