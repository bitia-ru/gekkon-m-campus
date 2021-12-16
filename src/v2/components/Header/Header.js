import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Slider from '@/v2/components/Slider/Slider';
import getArrayByIds from '@/v1/utils/getArrayByIds';
import SectorContext from '@/v1/contexts/SectorContext';
import SpotContext from '@/v1/contexts/SpotContext';
import { StyleSheet, css } from '../../aphrodite';

class Header extends PureComponent {
  constructor(props) {
    super(props);
  }

  onSliderClick = (sectorId, currentSectors) => {
    const { changeSectorFilter } = this.props;
    const index = R.findIndex(R.propEq('id', sectorId))(currentSectors) + 1;
    if (index < currentSectors.length) {
      changeSectorFilter(currentSectors[index].id);
    } else {
      changeSectorFilter(0);
    }
  };

  render() {
    const {
      data, spots, sectors,
    } = this.props;
    return (
      <SpotContext.Consumer>
        {
          ({ spot }) => {
            const sectorIds = spot ? R.map(s => s.id)(spots[spot.id].sectors) : [];
            const currentSectors = getArrayByIds(sectorIds, sectors);
            return (
              <SectorContext.Consumer>
                {
                  ({ sector }) => (
                    <Slider
                      text={data.name}
                      onClick={() => this.onSliderClick(
                        sector ? sector.id : 0, currentSectors,
                      )}
                    />
                  )
                }
              </SectorContext.Consumer>
            );
          }
        }
      </SpotContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  headerM: {
    backgroundColor: '#F2F1EB',
    width: '100%',
    minHeight: '602px',
    maxWidth: '100%',
    position: 'relative',
    fontFamily: 'GilroyRegular, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  headerMItemsContainer: {
    paddingTop: '134px',
    paddingLeft: '24px',
    paddingRight: '24px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  headerMHeader: {
    fontFamily: 'GilroyBold',
    fontSize: '36px',
    lineHeight: '44px',
    marginBottom: '24px',
    marginTop: 0,
    color: '#ffffff',
  },
  headerMDescr: {
    marginBottom: '28px',
    color: '#ffffff',
  },
});

Header.propTypes = {
  data: PropTypes.object.isRequired,
  changeSectorFilter: PropTypes.func.isRequired,
  sectors: PropTypes.object.isRequired,
  spots: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  sectors: state.sectorsStore.sectors,
  spots: state.spotsStoreV2.spots,
});

export default withRouter(connect(mapStateToProps)(Header));
