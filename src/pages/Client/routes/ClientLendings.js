import React, { useContext } from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

import ContentInner from 'components/Content/ContentInner';
import LazySorting from 'components/Filters/LazySorting';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import { ClientContext } from 'contexts/ClientContext';
import gotchiIcon from 'assets/images/gotchi-placeholder.svg';
import fud from 'assets/images/tokens/fud.svg';
import fomo from 'assets/images/tokens/fomo.svg';
import alpha from 'assets/images/tokens/alpha.svg';
import kek from 'assets/images/tokens/kek.svg';

const sortings = [
    {
        name: 'endTime',
        key: 'endTime',
        tooltip: 'end time',
        icon: <TimerIcon fontSize='small' />
    },
    {
        name: 'income',
        key: 'income',
        tooltip: 'balanced income',
        icon: <ChangeCircleIcon fontSize='small' />
    },
    {
        name: 'total',
        key: 'totalTokens',
        tooltip: 'total tokens',
        icon: <GroupWorkIcon fontSize='small' />
    },
    {
        name: 'fud',
        key: 'fud',
        tooltip: 'fud',
        icon: <img src={fud} alt='fud' width={18} />
    },
    {
        name: 'fomo',
        key: 'fomo',
        tooltip: 'fomo',
        icon: <img src={fomo} alt='fomo' width={18} />
    },
    {
        name: 'alpha',
        key: 'alpha',
        tooltip: 'alpha',
        icon: <img src={alpha} alt='alpha' width={18} />
    },
    {
        name: 'kek',
        key: 'kek',
        tooltip: 'kek',
        icon: <img src={kek} alt='kek' width={18} />
    }
];

export default function ClientLendings() {
    const {
        lendings,
        setLendings,
        lendingsSorting,
        setLendingsSorting,
        loadingLendings
    } = useContext(ClientContext);

    return (
        <>
            <LazySorting
                items={lendings}
                setItems={setLendings}
                sortingList={sortings}
                sortingDefaults={lendingsSorting}
                setSorting={setLendingsSorting}
                placeholder={
                    <img
                        src={gotchiIcon}
                        alt='gotchi'
                        width={20}
                        height={20}
                    />
                }
            />

            <ContentInner dataLoading={loadingLendings}>
                <GotchisLazy
                    items={lendings}
                    render = {[
                        {
                            badges: [
                                'collateral',
                                'rs',
                                'kinship'
                            ]
                        },
                        'svg',
                        'name',
                        'lendingStats'
                    ]}
                />
            </ContentInner>
        </>
    );
}
