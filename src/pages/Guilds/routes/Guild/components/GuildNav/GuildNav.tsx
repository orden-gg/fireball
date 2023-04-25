// import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { PageNavLink } from 'shared/models';

// import { RealmSwitchButton } from 'pages/Client/components/RealmSwitchButton/RealmSwitchButton';
import { GotchiTypeNames } from 'pages/Guilds/constants';

import { GotchiIcon } from 'components/Icons/Icons';
import { PageNav } from 'components/PageNav/PageNav';
import { SubNav } from 'components/PageNav/SubNav';

import { guildNavStyles } from './styles';

export function GuildNav() {
  const classes = guildNavStyles();

  const ownedGotchisCount: number = useAppSelector(fromGuildsStore.getOwnedGotchisCount);
  const borrowedGotchisCount: number = useAppSelector(fromGuildsStore.getBorrowedGotchisCount);
  const lentGotchisCount: number = useAppSelector(fromGuildsStore.getLentGotchisCount);

  const navData: PageNavLink[] = [
    {
      path: 'gotchis',
      icon: <GotchiIcon width={24} height={24} />,
      isLoading: false,
      count: ownedGotchisCount, // + borrowedGotchisCount
      isShowSubRoutes: true,
      subNavComponent: (
        <SubNav
          links={[
            {
              name: GotchiTypeNames.Owned,
              path: 'gotchis/owned',
              isLoading: false,
              count: ownedGotchisCount
            },
            {
              name: GotchiTypeNames.Lentout,
              path: 'gotchis/lended',
              isLoading: false,
              count: lentGotchisCount
            },
            {
              name: GotchiTypeNames.Borrowed,
              path: 'gotchis/borrowed',
              isLoading: false,
              count: borrowedGotchisCount
            }
          ]}
        />
      )
    }
    // {
    //   path: 'portals',
    //   icon: <H1SealedPortalIcon width={24} height={24} />,
    //   isLoading: isInitialPortalsLoading,
    //   count: portalsCount
    // },
    // {
    //   path: 'warehouse',
    //   icon: <WarehouseIcon width={24} height={24} />,
    //   isLoading: isInitialWarehouseLoading,
    //   count: warehouseCount
    // },
    // {
    //   path: 'installations',
    //   icon: <AnvilIcon width={24} height={24} />,
    //   isLoading: isInitialInstallationsLoading || isInitialTilesLoading,
    //   count: installationsCount + tilesCount
    // },
    // {
    //   path: 'realm',
    //   icon: <KekIcon width={24} height={24} alt='realm' />,
    //   isLoading: isInitialRealmLoading,
    //   count: realmCount
    // }
  ];

  return (
    <div className={classes.guildNav}>
      <PageNav
        links={navData}
        // TODO should be shown in the future
        // beforeContent={(
        //     <Button
        //         to={account as string}
        //         className={classes.customBtn}
        //         component={NavLink}
        //     >
        //         <GameControllerIcon width={24} height={24} />
        //     </Button>
        // )}
        // afterContent={<>{subroute.includes('realm') && <RealmSwitchButton view={realmView} navigate={navigate} />}</>}
      />
    </div>
  );
}
