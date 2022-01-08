import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../../aphrodite';

const ScreenTitle = ({ text }) => (
  <div className={css(styles.container)}>{text}</div>
);

ScreenTitle.propTypes = {
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    height: '76px',
    width: '100vw',
    lineHeight: '76px',
    fontSize: '34px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'GilroyBold, sans-serif',
  },
});

export default ScreenTitle;
