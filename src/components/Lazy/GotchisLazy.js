import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled'

import { VirtuosoGrid } from 'react-virtuoso'

import Gotchi from 'components/Gotchi/Gotchi';

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(192px,1fr));
    grid-gap: 12px;
`;

const NoContent = styled.div`
    text-align: center;
    padding: 24px;
`;

export default function GotchisLazy({ items, render }) {
    const gridRef = useRef(null);;

    useEffect(() => {
        if (items.length) {
            scrollToTop();
        }
    }, [items]);

    const scrollToTop = () => {
        gridRef.current.scrollToIndex({
            index: 0,
            align: 'start',
            behavior: 'auto'
        });
    };

    if (!items) {
        return;
    }

    if (items.length === 0) {
        return <NoContent>
            <span>No gotchis</span>
        </NoContent>
    }

    return (
        <VirtuosoGrid
            ref={gridRef}
            style={{ height: 'calc(100% - 40px)' }}
            totalCount={items.length}
            components={{
                List: ListContainer,
            }}
            itemContent={(index) => (
                <Gotchi
                    gotchi={items[index]}
                    render={render}
                />
            )}
        />
    );
}
