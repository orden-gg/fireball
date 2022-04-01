import React, { useEffect, useState } from 'react';

import ContentWrapper from 'components/Content/ContentWrapper';
import ContentInner from 'components/Content/ContentInner';
import GotchiFilters from 'components/Filters/GotchiFilter';
import thegraphApi from 'api/thegraph.api';
import GotchisLazy from 'components/Lazy/GotchisLazy';
import Gotchi from 'components/Gotchi/Gotchi';
import commonUtils from 'utils/commonUtils';
import GotchiSorting from 'components/Filters/GotchiSorting';

export default function Lend() {
    const [lendings, setLendings] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    const defaultSorting = 'modifiedRarityScore';

    useEffect(() => {
        let mounted = true;

        thegraphApi.getLendings().then((response) => {
            if (mounted) {
                console.log(response);

                const sorted = commonUtils.basicSort(response, defaultSorting);

                setLendings(sorted);
                setDataLoading(false);
            }
        });

        // thegraphApi.getGotchisByAddress('0xc46d3c9d93febdd5027c9b696fe576dc654c66de').then((response)=> {
        // thegraphApi.getAllGotchies().then((response)=> {

        // });

        return () => mounted = false;
    }, []);

    return (
        <ContentWrapper>
            <GotchiFilters
                gotchis={lendings}
                setGotchis={setLendings}
            />

            <ContentInner dataLoading={dataLoading}>
                <GotchiSorting
                    gotchis={lendings}
                    setGotchis={setLendings}
                    defaultSorting={defaultSorting}
                />
                <GotchisLazy
                    items={lendings}
                    render = {[
                        {
                            badges: [
                                'id',
                                'skillpoints',
                                'level',
                                'collateral'
                            ]
                        },
                        'svg',
                        'name',
                        'mainTraits',
                        'numericTraits',
                        'wearablesLine',
                        'listing',
                    ]}
                />
            </ContentInner>
        </ContentWrapper>
    );
}
