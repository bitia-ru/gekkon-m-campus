import React from 'react';
import { withRouter } from 'react-router-dom';
import MainPageContent from '@/v2/components/MainPageContent/MainPageContent';
import ScrollToTopOnMount from '@/v1/components/ScrollToTopOnMount';
import MainScreen from '@/v2/layouts/MainScreen/MainScreen';

const SpotsIndex = () => (
  <>
    <ScrollToTopOnMount />
    <MainScreen>
      <MainPageContent />
    </MainScreen>
  </>
);

export default withRouter(SpotsIndex);
