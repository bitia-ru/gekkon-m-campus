import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { StyleSheet, css } from '../../../aphrodite';
import { currentUser } from '@/v2/redux/user_session/utils';

class MenuList extends React.PureComponent {
  onItemClicked(item) {
    if (item.navigate !== undefined) {
      const { history } = this.props;

      history.push(item.navigate);
    }

    if (item.onClicked !== undefined) {
      item.onClicked();
    }
  }

  isItemHidden(item) {
    const { user } = this.props;

    if (item.ifLoggedIn === true) {
      return !user;
    }

    if (item.ifGuest === true) {
      return !!user;
    }

    return false;
  }

  render() {
    const mapIndexed = R.addIndex(R.map);
    const { items } = this.props;

    return (
      <ul className={css(styles.mMenuList)}>
        {mapIndexed((item, index) => (
          <li
            key={index}
            style={{ listStyleType: 'none', display: this.isItemHidden(item) && 'none' }}
            className={css(styles.mMenuListItem)}
          >
            {
              item.separator
                ? ''
                : (
                  <div
                    role="button"
                    tabIndex="0"
                    onClick={item.clickable ? (() => this.onItemClicked(item)) : null}
                    className={css(styles.mMenuListLink)}
                    style={{ cursor: item.clickable ? 'pointer' : '', outline: 'none' }}
                  >
                    {item.title}
                  </div>
                )
            }
          </li>
        ), items)}
      </ul>
    );
  }
}

const styles = StyleSheet.create({
  mMenuList: {
    margin: 0,
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingTop: 0,
    paddingBottom: 0,
    ':not(:last-child)': { borderBottom: '8px solid #F0F0F0' },
  },
  mMenuListItem: {
    listStyle: 'none',
    ':not(:last-child)': { borderBottom: '1px solid #E1E1E1' },
  },
  mMenuListLink: {
    display: 'block',
    color: '#1F1F1F',
    fontFamily: 'GilroyLight, sans-serif',
    fontSize: '16px',
    textDecoration: 'none',
    lineHeight: '24px',
    paddingTop: '14px',
    paddingBottom: '14px',
    ':hover': { color: '#006CEB' },
    ':focus': { color: '#006CEB' },
    ':active': { color: '#006CEB' },
  },
});

MenuList.propTypes = {
  items: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  user: currentUser(state),
});

export default connect(mapStateToProps)(withRouter(MenuList));
