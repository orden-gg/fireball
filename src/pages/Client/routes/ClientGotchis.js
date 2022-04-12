import React, { useContext } from 'react';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ScienceIcon from '@mui/icons-material/Science';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import ContentInner from 'components/Content/ContentInner';
import LazySorting from 'components/Filters/LazySorting';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import { GotchiIcon } from 'components/Icons/Icons';
import { ClientContext } from 'contexts/ClientContext';

const sortings = [
    {
        name: 'id',
        key: 'id',
        tooltip: 'gotchi id',
        icon: <Grid3x3Icon fontSize='small' />
    },
    {
        name: 'mrs',
        key: 'modifiedRarityScore',
        tooltip: 'rarity score',
        icon: <EmojiEventsOutlinedIcon fontSize='small' />
    },
    {
        name: 'brs',
        key: 'baseRarityScore',
        tooltip: 'base rarity score',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'kin',
        key: 'kinship',
        tooltip: 'kinship',
        icon: <FavoriteBorderIcon fontSize='small' />
    },
    {
        name: 'experience',
        key: 'experience',
        tooltip: 'experience',
        icon: <ScienceIcon fontSize='small' />
    },
    {
        name: 'age',
        key: 'createdAt',
        tooltip: 'age',
        icon: <CalendarMonthIcon fontSize='small' />
    }
];

export default function ClientGotchis() {
    const {
        gotchis,
        setGotchis,
        gotchisSorting,
        setGotchisSorting,
        loadingGotchis
    } = useContext(ClientContext);

    return (
        <>
            <LazySorting
                items={gotchis}
                setItems={setGotchis}
                sortingList={sortings}
                sortingDefaults={gotchisSorting}
                setSorting={setGotchisSorting}
                placeholder={
                    <GotchiIcon width={20} height={20} />
                }
            />

            <ContentInner dataLoading={loadingGotchis}>
                <GotchisLazy
                    items={gotchis}
                    render = {[
                        {
                            badges: [
                                'collateral',
                                'rs',
                                'skillpoints',
                                'kinship',
                                'level'
                            ]
                        },
                        'svg',
                        'name',
                        'traits',
                        'wearablesLine',
                        'listing',
                        'rewards'
                    ]}
                />
            </ContentInner>
        </>
    );
}
