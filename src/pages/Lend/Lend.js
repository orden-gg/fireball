import React, { useEffect, useState } from 'react';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CopyrightIcon from '@mui/icons-material/Copyright';
import PercentIcon from '@mui/icons-material/Percent';

import ContentWrapper from 'components/Content/ContentWrapper';
import ContentInner from 'components/Content/ContentInner';
import GotchiFilters from 'components/Filters/GotchiFilter';
import { GotchiIcon } from 'components/Icons/Icons';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import LazySorting from 'components/Filters/LazySorting';
import thegraphApi from 'api/thegraph.api';
import commonUtils from 'utils/commonUtils';
import gotchiverseUtils from 'utils/gotchiverseUtils';
import guilds from 'data/guilds';

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
        name: 'kin',
        key: 'kinship',
        tooltip: 'kinship',
        icon: <FavoriteBorderIcon fontSize='small' />
    },
    {
        name: 'time',
        key: 'timeCreated',
        tooltip: 'time created',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'upfront cost',
        key: 'upfrontCost',
        tooltip: 'upfront cost',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'period',
        key: 'period',
        tooltip: 'rental period',
        icon: <AccessTimeIcon fontSize='small' />
    },
    {
        name: 'owner revenue',
        key: 'splitOwner',
        tooltip: 'owner revenue',
        icon: <CopyrightIcon fontSize='small' />
    },
    {
        name: 'borrower revenue',
        key: 'splitBorrower',
        tooltip: 'borrower revenue',
        icon: <PercentIcon fontSize='small' />
    }
];

export default function Lend() {
    const [lendings, setLendings] = useState([]);
    const [lendingsCache, setLendingsCache] = useState([]);
    const [whitelist, setWhitelist] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const [lendingsSorting, setLendingsSorting] = useState({ type: 'timeCreated', dir: 'desc' });

    const availableGuilds = guilds.filter((guild) => guild.members.length > 0);
    const guildsKeys = availableGuilds.map((guild) => commonUtils.stringToKey(guild.name));

    useEffect(() => {
        let mounted = true;
        setDataLoading(true);

        thegraphApi.getLendings().then((response) => {
            if (mounted) {
                const whitelistData = [];
                const mappedData = [];
                const { type, dir } = lendingsSorting;

                response.forEach((listing) => {
                    if (listing.whitelistId) {
                        const index = whitelistData.findIndex(savedId => savedId === listing.whitelistId);

                        if (index === -1) {
                            whitelistData.push(listing.whitelistId);
                        }
                    }

                    mappedData.push({
                        ...listing,
                        guild: gotchiverseUtils.gedAddressGuild(listing.lender)
                    })
                });

                const sorted = commonUtils.basicSort(mappedData, type, dir);

                setWhitelist(commonUtils.sortByDirection(whitelistData, 'asc'));
                setLendings(sorted);
                setLendingsCache(sorted);
                setDataLoading(false);
            }
        });

        return () => mounted = false;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ContentWrapper>
            <GotchiFilters
                gotchis={lendingsCache}
                setGotchis={setLendings}
                guilds={guildsKeys}
                whitelist={whitelist}
                dataLoading={dataLoading}
            />

            <>
                <LazySorting
                    items={lendings}
                    setItems={setLendings}
                    sortingList={sortings}
                    sortingDefaults={lendingsSorting}
                    setSorting={setLendingsSorting}
                    placeholder={
                        <GotchiIcon width={20} height={20} />
                    }
                />

                <ContentInner dataLoading={dataLoading}>
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
                            'lending'
                        ]}
                    />
                </ContentInner>
            </>
        </ContentWrapper>
    );
}
