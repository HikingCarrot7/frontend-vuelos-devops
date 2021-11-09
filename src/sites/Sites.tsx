import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Site } from 'types/entities/Site';
import { CrudTable } from '_components/crud_table';
import { FloatingButton } from '_components/forms/FloatingButton';
import { Navbar } from '_components/Navbar';
import { useSiteService } from '_services/site.service';
import { CreateSiteModal } from './CreateSiteModal';

export interface SitesProps {}

export const Sites = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sites, setSites] = useState([]);
  const { getAllSites, createSite, deleteSite, updateSite } = useSiteService();

  useEffect(() => {
    getAllSites().then((sites) => {
      setSites(sites);
    });
  }, [getAllSites]);

  const handleCreateSite = (site: Site) => {
    return createSite(site)
      .then((site) => {
        setSites((prevSites) => [...prevSites, site]);
        return site;
      })
      .catch((err) => {
        window.alert(err);
        return Promise.reject(err);
      });
  };

  const handleUpdate = (updatedData, updatedObject) => {
    return updateSite(updatedObject)
      .then((site) => true)
      .catch((err) => {
        window.alert(err);
        return Promise.reject(false);
      });
  };

  const handleDelete = (updatedData, deletedData) => {
    if (!window.confirm('¿Estás seguro que quiere eliminar esta entrada?')) {
      return Promise.resolve(false);
    }

    const { id } = deletedData;

    return deleteSite(id)
      .then((site) => true)
      .catch((err) => {
        window.alert(err);
        return Promise.reject(false);
      });
  };

  return (
    <>
      <Navbar />
      <CrudTable
        {...{
          populateWith: sites,
          handleUpdate,
          handleDelete,
        }}
      />
      <CreateSiteModal {...{ isOpen, onClose, handleCreateSite }} />
      <FloatingButton onClick={onOpen} />
    </>
  );
};
