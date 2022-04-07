import React, { useContext, useEffect } from 'react';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';

import ContentInner from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import LazySorting from 'components/Filters/LazySorting';
import Parcel from 'components/Items/Parcel/Parcel';
import { ClientContext } from 'contexts/ClientContext';
import fud from 'assets/images/icons/fud.png';
import fomo from 'assets/images/icons/fomo.png';
import alpha from 'assets/images/icons/alpha.png';
import kek from 'assets/images/icons/kek.png';
import realmIcon from 'assets/images/icons/kek.png';

const sortings = [
    {
        name: 'size',
        key: 'size',
        tooltip: 'size',
        icon: <HeightIcon fontSize='small' />
    },
    {
        name: 'district',
        key: 'district',
        tooltip: 'district',
        icon: <HouseIcon fontSize='small' />
    },
    {
        name: 'fudBoost',
        key: 'fudBoost',
        tooltip: 'fud boost',
        icon: <img src={fud} alt='Fud' width={18} />
    },
    {
        name: 'fomoBoost',
        key: 'fomoBoost',
        tooltip: 'fomo boost',
        icon: <img src={fomo} alt='Fud' width={18} />
    },
    {
        name: 'alphaBoost',
        key: 'alphaBoost',
        tooltip: 'alpha boost',
        icon: <img src={alpha} alt='Fud' width={18} />
    },
    {
        name: 'kekBoost',
        key: 'kekBoost',
        tooltip: 'kek boost',
        icon: <img src={kek} alt='Fud' width={18} />
    }
];

export default function ClientRealmList() {
    const {
        realm,
        setRealm,
        realmSorting,
        setRealmSorting,
        loadingRealm,
        setRealmView
    } = useContext(ClientContext);

    useEffect(() => {
        setRealmView('list');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <LazySorting
                items={realm}
                setItems={setRealm}
                sortingList={sortings}
                setSorting={setRealmSorting}
                defaults={realmSorting}
                placeholder={
                    <img
                        src={realmIcon}
                        alt='realm'
                        width={20}
                        height={20}
                    />
                }
            />

            <ContentInner dataLoading={loadingRealm}>
                <ItemsLazy
                    items={realm}
                    component={(props) => <Parcel parcel={props} />}
                />
            </ContentInner>
        </>
    );
}
