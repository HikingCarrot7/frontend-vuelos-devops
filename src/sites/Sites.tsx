import React from 'react';
import { FloatingButton } from '_components/forms/FloatingButton';
import { CreateSiteModal } from './CreateSiteModal';

export interface SitesProps {}

export const Sites = () => {
  return (
    <>
      <CreateSiteModal />
      <FloatingButton />
    </>
  );
};
