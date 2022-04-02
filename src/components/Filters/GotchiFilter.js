import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Alert, AlertTitle, Autocomplete, Avatar, Chip, Link, TextField } from '@mui/material';

import qs from 'query-string';

import gotchiverseUtils from 'utils/gotchiverseUtils';

import styles from './styles';

export default function GotchiFilters({ gotchis, setGotchis, guilds, dataLoading }) {
    const classes = styles();

    const history = useHistory();
    const location = useLocation();
    const params = qs.parse(location.search);

    const [guildsFilter, setGuildsFilter] = useState([]);

    useEffect(() => {
        if(params.guild) {
            setGuildsFilter(params.guild.split(','));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(!dataLoading) {
            filterGotchis(guildsFilter);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataLoading]);

    const handleChange = (event, newValue) => {
        filterGotchis(newValue);
        handleQueryParams(newValue)
        setGuildsFilter(newValue);
    };

    const filterGotchis = (filters) => {
        let filteredGotchis;

        if (filters.length > 0) {
            filteredGotchis = gotchis.filter(gotchi =>
                filters.some((filter) => filter === gotchi.guild)
            );
        } else {
            filteredGotchis = gotchis;
        }

        setGotchis(filteredGotchis);
    };

    const handleQueryParams = (filters) => {
        if (filters.length > 0) {
            history.push({
                path: location.pathname,
                search: `?guild=${filters.map((filter) => filter)}`
            });
        } else {
            history.push({ path: location.pathname });
        }
    };

    return (
        <>
            <div className={classes.section}>
                <Autocomplete
                    multiple
                    value={guildsFilter}
                    onChange={handleChange}
                    options={guilds}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size='small'
                            label='Guilds'
                        />
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
