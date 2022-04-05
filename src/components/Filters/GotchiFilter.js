import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Alert, AlertTitle, Autocomplete, Avatar, Chip, Link, TextField } from '@mui/material';

import qs from 'query-string';

import gotchiverseUtils from 'utils/gotchiverseUtils';

import styles from './styles';

export default function GotchiFilters({ gotchis, setGotchis, guilds, whitelist, dataLoading }) {
    const classes = styles();

    const history = useHistory();
    const location = useLocation();
    const params = qs.parse(location.search);

    const [guildsFilter, setGuildsFilter] = useState([]);
    const [whitelistFilter, setWhitelistFilter] = useState(null);

    useEffect(() => {
        if (!dataLoading) {
            handleQueryParams();
            filterData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guildsFilter, whitelistFilter, dataLoading])

    useEffect(() => {
        if (params.guild) {
            setGuildsFilter(params.guild.length > 1 ? params.guild.split(',') : params.guild);
        }

        if (params.whitelist) {
            setWhitelistFilter(params.whitelist);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGuilds = (event, newValue) => {
        setGuildsFilter(newValue);
    };

    const handleWhitelist = (event, newValue) => {
        setWhitelistFilter(newValue);
    };

    const filterData = () => {
        let filtered;
        const isGuildsFilter = (guildsFilter.length > 0) === true;
        const isWhitelistFilter = typeof whitelistFilter === 'string';

        if (isGuildsFilter || isWhitelistFilter) {
            if (!isGuildsFilter) {
                filtered = gotchis.filter(gotchi =>
                    gotchi.whitelistId === whitelistFilter
                );
            } else if (!isWhitelistFilter) {
                filtered = gotchis.filter(gotchi =>
                    guildsFilter.indexOf(gotchi.guild) !== -1
                );
            } else {
                filtered = gotchis.filter(gotchi =>
                    guildsFilter.indexOf(gotchi.guild) !== -1 && gotchi.whitelistId === whitelistFilter
                );
            }
        } else {
            filtered = gotchis;
        }

        setGotchis(filtered);
    };

    const handleQueryParams = () => {
        params.guild = guildsFilter.map((filter) => filter)
        params.whitelist = whitelistFilter ? whitelistFilter : [];

        history.push({
            path: location.pathname,
            search: qs.stringify(params, { arrayFormat: 'comma' })
        });
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
                    value={whitelistFilter}
                    options={whitelist}
                    disabled={whitelist.length === 0}
                    onChange={handleWhitelist}
                    renderInput={(params) => (
                        <TextField {...params} label='Whitelist' size='small' />
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
