import React, { useMemo, useEffect, useState } from 'react';
import { Box  } from '@mui/material';

import styles from './styles';
import ghstIcon from '../../assets/images/ghst-doubleside.gif';
import useFetchAllWearableSets from '../../hooks/useFetchAllWearableSets';
import useFetchAllWearables from '../../hooks/useFetchAllWearables';
import Wearable from '../../components/Items/Wearable/Wearable'; 
import GhostLoader from '../../components/GhostLoader/GhostLoader';
import itemUtils from '../../utils/itemUtils';
import SortingButtonGroup from './SortingButtonGroup'

export default function WearableSets() { 
    const classes = styles();
    const [sorting, setSorting] = useState()
    const [{ isLoading: isFetchingWearableSets, wearableSets }, fetchAllWearableSets] = useFetchAllWearableSets()
    const [{ isLoading: isFetchingWearables, wearables: wearablesMap }, fetchAllWearables] = useFetchAllWearables()

    useEffect(() => {
      fetchAllWearableSets()
      fetchAllWearables()
    }, [fetchAllWearableSets, fetchAllWearables])


    const isLoading = useMemo(() => isFetchingWearableSets || isFetchingWearables, [isFetchingWearableSets, isFetchingWearables])

    const sortedSets = useMemo(() => {
        if (isLoading) {
            return []
        }

        const sets = wearableSets.map(set => {
            const wearables = set.wearableIds.map((id) => wearablesMap[id])
            return ({
                ...set,
                wearables,
                totalCost: Math.round(wearables.reduce((acc, { priceInWei }) => acc + priceInWei, 0) * 10) / 10
            })
        })
        if (sorting === 'priceInWei-asc') {
            return sets.sort((a, b) => a.totalCost - b.totalCost)
        }

        if (sorting === 'priceInWei-desc') {
            return sets.sort((a, b) => b.totalCost - a.totalCost)
        }

        return sets
        // return wearableSets
    }, [isLoading, sorting, wearableSets, wearablesMap])

    if(isLoading) {
        return (
        <Box textAlign='center' paddingTop={'32px'}>
            <GhostLoader animate={isLoading} />
        </Box>)
    }

    return (
        <div className={classes.container}>
            <SortingButtonGroup value={sorting} onChange={setSorting} />
            {
                sortedSets.map((set, i) => {
                    const totalCost = set.totalCost === Infinity ? '???' : set.totalCost
                    return (
                        <div key={set.id}>
                            <h3 className={classes.title}>
                                {set.name} ({totalCost}<img src={ghstIcon} width='24' height='24' alt='GHST Token Icon' />) {itemUtils.getEmojiStats(set.traitBonuses)}
                            </h3>
                            <Box className={classes.list}>
                                {set.wearables.map((item, index) => {
                                    return (
                                        <div className={classes.listItem} key={`${set.id}-${index}`}>
                                            <Wearable wearable={item} />
                                        </div>
                                    )
                                })}
                            </Box>
                        </div>
                    )
                })
            }
        </div>
    );
}