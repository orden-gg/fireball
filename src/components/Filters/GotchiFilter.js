import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Alert, AlertTitle, Autocomplete, Avatar, Chip, Link, TextField } from '@mui/material';

import qs from 'query-string';

import gotchiverseUtils from 'utils/gotchiverseUtils';

import styles from './styles';
import commonUtils from 'utils/commonUtils';
import { useParams } from 'react-router-dom';

export default function GotchiFilters({ gotchis, setGotchis, guilds, whitelist, dataLoading }) {
    const classes = styles();

    const history = useHistory();
    const location = useLocation();
    const params = qs.parse(location.search);

    const [guildsFilter, setGuildsFilter] = useState([]);
    const [whitelistFilter, setWhitelistFilter] = useState('');

    useEffect(() => {
      console.log('query', params)
    }, [])

    useEffect(() => {
        if(!commonUtils.isEmptyObject(params)) {
            if (params.guild) {
                setGuildsFilter(params.guild.split(','));
            }
            if (params.whitelist) {
                setWhitelistFilter(params.whitelist);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //   console.log('guilds filter', guildsFilter)
    // }, [guildsFilter])

    // useEffect(() => {
    //   console.log('whitelist filter', whitelistFilter)
    // }, [whitelistFilter])


    useEffect(() => {
        if (!dataLoading) {
            filterData([guildsFilter, whitelistFilter]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLoading]);

    const handleGuilds = (event, newValue) => {
        filterData([newValue, whitelistFilter]);
        handleQueryParams(newValue)
        setGuildsFilter(newValue);
    };

    const handleWhitelist = (event, newValue) => {
        // filterData([newValue, whitelistFilter]);
        // handleQueryParams(newValue)
        setWhitelistFilter(newValue);
    };

    // const filterGotchis = (filters) => {
    //     let filteredGotchis;

    //     if (filters.length > 0) {
    //         filteredGotchis = gotchis.filter(gotchi =>
    //             filters.some((filter) => filter === gotchi.guild)
    //         );
    //     } else {
    //         filteredGotchis = gotchis;
    //     }

    //     setGotchis(filteredGotchis);
    // };

    const filterData = (conditions) => {
        let filtered;

        if (conditions[0].length > 0 || conditions[1] !== null) {
            filtered = gotchis.filter(gotchi => {

            }
                // conditions.some((filter) => filter === gotchi.guild)
            );
        } else {
            filtered = gotchis;
        }

        console.log('filtered', filtered)

        // setGotchis(filtered);
    };

    const handleQueryParams = (filters) => {
        console.log('param', params)

        params.guild = filters.map((filter) => filter)
        params.whitelist = 22;
        let string = qs.stringify(params, {arrayFormat: 'comma'});

        console.log('string', string)

        // if (filters.length > 0) {
        //     history.push({
        //         path: location.pathname,
        //         search: `?guild=${filters.map((filter) => filter)}`
        //     });
        // } else {
        //     history.push({ path: location.pathname });
        // }
    };

    return (
        <>
            <div className={classes.section}>
                <Autocomplete
                    id='guilds-autocomplete'
                    multiple
                    value={guildsFilter}
                    onChange={handleGuilds}
                    options={guilds}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField {...params} size='small' label='Guilds'/>
                    )}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip
                                label={option}
                                size='small'
                                avatar={
                                    <Avatar src={gotchiverseUtils.getGuildImg(option)} alt={option} />
                                }
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                />
            </div>

            <div className={classes.section}>
                <Autocomplete
                    id='whitelist-autocomplete'
                    disablePortal
                    options={whitelist}
                    disabled={whitelist.length === 0}
                    onChange={handleWhitelist}
                    renderInput={(params) => (
                        <TextField {...params} label='Whitelist Id' size='small' />
                    )}
                />
            </div>

            <div className={classes.section}>
                <Alert severity='info' icon={false}>
                    <AlertTitle>Note!</AlertTitle>
                    More complex filters <strong>comming soon!</strong>.<br />
                    This page will be guild-focused.<br />
                    To achive best experience
                    <Link
                        href='https://fireball-gg.notion.site/How-to-add-guild-to-fireball-gg-a2bec3bd315c4d42961bc0148bb17c26'
                        target='_blank'
                        style={{ marginLeft: '6px', color: 'cyan', textDecoration: 'underline' }}
                    >
                        <strong>add your guild!</strong>
                    </Link>
                </Alert>
            </div>
        </>
    )
}
