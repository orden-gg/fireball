import React, { useEffect, useState } from 'react';

import ContentWrapper from 'components/Content/ContentWrapper';
import ContentInner from 'components/Content/ContentInner';
import GotchiFilters from 'components/Filters/GotchiFilter';
import thegraphApi from 'api/thegraph.api';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import Gotchi from 'components/Gotchi/Gotchi';
import commonUtils from 'utils/commonUtils';

export default function Lend() {
    const [gotchis, setGotchis] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const defaultFilter = 'modifiedRarityScore';

    useEffect(() => {
        let mounted = true;

        thegraphApi.getGotchisByAddress('0x1315B9510Cd7f75A63BB59bA7d9D1FAd083d0667').then((response)=> {
        // thegraphApi.getAllGotchies().then((response)=> {
            if (mounted) {
                const sorted = commonUtils.basicSort(response, defaultFilter);

                setGotchis(sorted);
                setDataLoading(false);
            }
        });

        return () => mounted = false;
    }, []);

    return (
        <ContentWrapper>
            <GotchiFilters gotchis={gotchis} setGotchis={setGotchis} defaultFilter={defaultFilter} />

            <ContentInner>
                {!dataLoading ? (
                    <GotchisLazy
                        items={gotchis}
                    />
                ) : (
                    <span>🧑‍🦯 loading ⛑️</span>
                )}
            </ContentInner>
        </ContentWrapper>
    );
}
