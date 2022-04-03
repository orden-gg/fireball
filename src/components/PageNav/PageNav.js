import React, { useContext, useEffect } from 'react';
import { Button, Switch, Tooltip } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useHistory, useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import { ClientContext } from 'contexts/ClientContext';
import gotchiPlaceholder from 'assets/images/gotchi-placeholder.svg';
import warehousePlaceholder from 'assets/images/wearables/15.svg';
import ticketsPlaceholder from 'assets/images/tickets/rare.svg';
import realmPlaceholder from 'assets/images/icons/kek.png';

import styles from './styles';

export default function PageNav({ links, query }) {
    const classes = styles();
    const match = useRouteMatch();
    const history = useHistory();
    const theme = useTheme();

    useEffect(() => {
        console.log(links)
    }, [links]);


    const {
        clientActive,
        gotchis, loadingGotchis,
        warehouse, loadingWarehouse,
        tickets, loadingTickets,
        realm, loadingRealm,
        realmView
    } = useContext(ClientContext);

    // const updateRealmView = () => {
    //     let view = realmView === 'list' ? 'map' : 'list';
    //     let url = `${match.url}/realm/${view}`;

    //     if (clientActive) {
    //         history.push({ pathname: url, search: `?address=${clientActive}` });
    //     } else {
    //         history.push({ pathname: url });
    //     }
    // }

    return (
        <div className={classes.container}>
            {
                links.map((link, index) => {
                    return (
                        <div className={classes.navItem} key={index}>
                            <Button
                                // disabled={!gotchis.length}
                                startIcon={
                                    <img
                                        src={link.icon}
                                        alt={link.name}
                                        width={24}
                                        height={24}
                                    />
                                }
                                component={NavLink}
                                className={classes.button}
                                activeClassName='active'
                                to={{
                                    pathname: `${match.url}/${link.name}${link.subroute ? link.subroute : ''}`,
                                    search: query ? query : ''
                                }}
                            >
                                {link.name}
                                {/* {
                                    loadingGotchis ? (
                                        <ContentLoader
                                            speed={2}
                                            viewBox='0 0 28 14'
                                            backgroundColor={theme.palette.secondary.main}
                                            foregroundColor={theme.palette.primary.dark}
                                            className={classes.buttonLoader}
                                        >
                                            <rect x='0' y='0' width='28' height='14' />
                                        </ContentLoader>
                                    ) : (
                                        <span className={classes.label}>[{gotchis.length}]</span>
                                    )
                                } */}
                            </Button>
                        </div>
                    )
                })
            }

            {/* <div className={classes.navItem}>
                <Button
                    disabled={!gotchis.length}
                    startIcon={
                        <img src={gotchiPlaceholder} alt='gotchi' width={24} height={24} />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    to={{ pathname: `${match.url}/gotchis`, search: `?address=${clientActive}` }}
                >
                    Gotchis
                    {
                        loadingGotchis ? (
                            <ContentLoader
                                speed={2}
                                viewBox='0 0 28 14'
                                backgroundColor={theme.palette.secondary.main}
                                foregroundColor={theme.palette.primary.dark}
                                className={classes.buttonLoader}
                            >
                                <rect x='0' y='0' width='28' height='14' />
                            </ContentLoader>
                        ) : (
                            <span className={classes.label}>[{gotchis.length}]</span>
                        )
                    }
                </Button>
            </div>
            <div className={classes.navItem}>
                <Button
                    disabled={!warehouse.length}
                    startIcon={
                        <img src={warehousePlaceholder} alt='gotchi' width={25} />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    to={{ pathname: `${match.url}/warehouse`, search: `?address=${clientActive}` }}
                >
                    Warehouse
                    {
                        loadingGotchis || loadingWarehouse ? (
                            <ContentLoader
                                speed={2}
                                viewBox='0 0 28 14'
                                backgroundColor={theme.palette.secondary.main}
                                foregroundColor={theme.palette.primary.dark}
                                className={classes.buttonLoader}
                            >
                                <rect x='0' y='0' width='28' height='14' />
                            </ContentLoader>
                        ) : (
                            <span className={classes.label}>[{warehouse.length}]</span>
                        )
                    }
                </Button>
            </div>
            <div className={classes.navItem}>
                <Button
                    disabled={!tickets.length}
                    startIcon={
                        <img src={ticketsPlaceholder} alt='gotchi' width={22} />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    to={{ pathname: `${match.url}/tickets`, search: `?address=${clientActive}` }}
                >
                    Tickets
                    {
                        loadingTickets ? (
                            <ContentLoader
                                speed={2}
                                viewBox='0 0 28 14'
                                backgroundColor={theme.palette.secondary.main}
                                foregroundColor={theme.palette.primary.dark}
                                className={classes.buttonLoader}
                            >
                                <rect x='0' y='0' width='28' height='14' />
                            </ContentLoader>
                        ) : (
                            <span className={classes.label}>[{tickets.length}]</span>
                        )
                    }
                </Button>
            </div>
            <div className={classes.navItem}>
                <Button
                    disabled={!realm.length}
                    startIcon={
                        <img src={realmPlaceholder} alt='gotchi' width={20} />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    to={{ pathname: `${match.url}/realm/${realmView}`, search: `?address=${clientActive}` }}
                >
                    Realm
                    {
                        loadingRealm ? (
                            <ContentLoader
                                speed={2}
                                viewBox='0 0 28 14'
                                backgroundColor={theme.palette.secondary.main}
                                foregroundColor={theme.palette.primary.dark}
                                className={classes.buttonLoader}
                            >
                                <rect x='0' y='0' width='28' height='14' />
                            </ContentLoader>
                        ) : (
                            <span className={classes.label}>[{realm.length}]</span>
                        )
                    }
                </Button>
                <Tooltip
                    title={`Switch to ${realmView === 'map' ? 'list' : 'map'}`}
                    enterTouchDelay={0}
                >

                    <Switch
                        className={classes.realmViewSwitch}
                        checked={realmView === 'map'}
                        onChange={updateRealmView}
                    />
                </Tooltip>
            </div> */}
        </div>
    );
}
