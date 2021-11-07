import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { FloatingButton } from '_components/forms/FloatingButton';
import { Navbar } from '_components/Navbar';
import { useSiteService } from '_services/site.service';
import { CreateSiteModal } from './CreateSiteModal';

export interface SitesProps {}

export const Sites = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAllSites } = useSiteService();

  return (
    <>
      <Navbar />
      <CreateSiteModal {...{ isOpen, onClose }} />
      <FloatingButton onClick={onOpen} />
    </>
  );
};
