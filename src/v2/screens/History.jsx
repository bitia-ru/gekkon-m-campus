import React from 'react';
import ScrollToTopOnMount from '@/v1/components/ScrollToTopOnMount';
import MainScreen from '@/v2/layouts/MainScreen/MainScreen';
import ScreenTitle from '../components/ScreenTitle/ScreenTitle';
import UserActionsList from '../components/UserActionsList/UserActionsList';

const History = () => (
  <>
    <ScrollToTopOnMount />
    <MainScreen header={<ScreenTitle text="Действия" />} backgroundColor="#F2F1EB">
      <UserActionsList />
    </MainScreen>
  </>
);

export default History;
