import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso'
import styled from '@emotion/styled'
import Gotchi from 'components/Gotchi/Gotchi';

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(192px,1fr));
    grid-gap: 12px;
`;

// flex-wrap: wrap;
// justify-content: space-between;

const ItemWrapper = styled.div`
    max-width: 100%;
    min-height: 100%;
`;
// flex: 1;

const ItemContainer = styled.div`

`;

// width: 200px;

// margin-bottom: 12px;
// display: flex;
// flex: none;
// align-content: stretch;


//   @media (max-width: 1024px) {
//     width: 50%;
//   }

//   @media (max-width: 300px) {
//     width: 100%;
//   }

export default function GotchisLazy({ items }) {
    if (!items.length) return;

    return (
        <VirtuosoGrid
            style={{ height: '100%' }}
            totalCount={items.length}
            components={{
                List: ListContainer,
            }}
            itemContent={(index) => (
                <Gotchi
                    gotchi={items[index]}
                    render={[
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
            )}
        />
    );
}
