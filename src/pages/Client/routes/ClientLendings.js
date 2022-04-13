import React, { useContext } from 'react';
import TimerIcon from '@mui/icons-material/Timer';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, GotchiIcon, KekTokenIcon } from 'components/Icons/Icons';
import ContentInner from 'components/Content/ContentInner';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import { ClientContext } from 'contexts/ClientContext';

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
        tooltip: 'alchemica power',
        icon: <LocalFireDepartmentIcon fontSize='small' />
    },
    {
        name: 'total',
        key: 'totalTokens',
        tooltip: 'total alchemica',
        icon: <GroupWorkIcon fontSize='small' />
    },
    {
        name: 'fud',
        key: 'fud',
        tooltip: 'fud',
        icon: <FudTokenIcon height={18} width={18} />
    },
    {
        name: 'fomo',
        key: 'fomo',
        tooltip: 'fomo',
        icon: <FomoTokenIcon height={18} width={18} />
    },
    {
        name: 'alpha',
        key: 'alpha',
        tooltip: 'alpha',
        icon: <AlphaTokenIcon height={18} width={18} />
    },
    {
        name: 'kek',
        key: 'kek',
        tooltip: 'kek',
        icon: <KekTokenIcon height={18} width={18} />
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

    const sorting = {
        items: lendings,
        setItems: setLendings,
        sortingList: sortings,
        sortingDefaults: lendingsSorting,
        setSorting: setLendingsSorting
    };

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={lendings.length}
                placeholder={
                    <GotchiIcon width={20} height={20} />
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
