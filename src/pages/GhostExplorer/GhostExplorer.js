import React, { useEffect, useState, useRef } from 'react';
import { CircularProgress, Backdrop, useTheme } from '@mui/material';
import Gotchi from '../../components/Gotchi/Gotchi'; 
import thegraph from '../../api/thegraph';
import useStyles from './styles';

export default function GhostExplorer() {
    const classes = useStyles();
    const [gotchiesFromGraph, setGotchiesFromGraph] = useState(null);
    const [gotchiesShown, setGotchiesShown] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();
    const [maxGotchiQuantity, setMaxGotchiQuantity] = useState(0);

    // scrolling
    const scrollingContainerRef = useRef();
    const size = useNodeScroll(scrollingContainerRef.current);

    function useNodeScroll() {
        const [scrollDown, setScrollDown] = useState(false);

        useEffect(() => {
            function handleScroll() {
                const node = scrollingContainerRef.current,
                    clientHeight = node.clientHeight,
                    scrollHeight = node.scrollHeight,
                    scrollTop = node.scrollTop,
                    actualBottomScroll = scrollHeight - (clientHeight + scrollTop);
                    if (!actualBottomScroll) setScrollDown(true);
                    else setScrollDown(false);
            }
            
            scrollingContainerRef?.current?.addEventListener("scroll", handleScroll);
            handleScroll();
            return () =>  scrollingContainerRef?.current?.removeEventListener("scroll", handleScroll);
        }, [scrollDown]);

        return scrollDown;
    }

    const getGotchies = () => {
        thegraph.getAllGotchies().then((response) => {
            const gotchiesData = response.sort((a,b) => a.id - b.id);
            setGotchiesFromGraph(gotchiesData);
            setMaxGotchiQuantity(gotchiesData.length);
        }).catch((e)=> {
            console.log(e);
        });
    };

    const renderGotchi = (quantity) => {
        const l = gotchiesShown.length;

        if (l < maxGotchiQuantity) {
            const gotchiQuantity = l;
            let gotchiCache;

            if (gotchiQuantity < maxGotchiQuantity) {
                gotchiCache = gotchiesFromGraph.slice(gotchiQuantity, gotchiQuantity+quantity);

                gotchiCache = gotchiCache.map((item) => {
                    return (
                        <div key={item.id} className={classes.item}>
                            <Gotchi
                                gotchi={item}
                                title={item.id}
                                gotchiColor={theme.palette.customColors.gray}
                                narrowed={true}
                            />
                        </div>
                    )
                });

                const newGotchies = [...gotchiesShown, ...gotchiCache];
                
                setGotchiesShown(newGotchies);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        getGotchies();
    }, []);

    useEffect(() => {
        if (maxGotchiQuantity) renderGotchi(100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxGotchiQuantity]);

    useEffect(() => {
        if (size) {
            renderGotchi(50);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    return (
        <>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color='primary' />
            </Backdrop>
            <div className={classes.root} ref={scrollingContainerRef}>
                {gotchiesShown}
            </div>
            {/* <Pagination count={10} variant="outlined" /> */}
        </>
    );
}
