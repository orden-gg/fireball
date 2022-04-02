import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Autocomplete, Avatar, Chip, Link, TextField } from '@mui/material';

import styles from './styles';
import collaterals from 'data/collaterals';
import gotchiverseUtils from 'utils/gotchiverseUtils';

export default function GotchiFilters({ gotchis, setGotchis, guilds }) {
    const classes = styles();

    const [guildsFilter, setGuildsFilter] = useState([]);

    useEffect(() => {
        filterGotchis();
    }, [guildsFilter]);

    const filterGotchis = () => {
        const filtered = gotchis.filter((gotchi) => {
            return guildsFilter.some((filter) => filter === gotchi.guild);
        });

        setGotchis(guildsFilter.length > 0 ? filtered : gotchis);
    };

    return (
        <>
            <div className={classes.section}>
                <Autocomplete
                    multiple
                    value={guildsFilter}
                    onChange={(event, newValue) => {
                        setGuildsFilter(newValue);
                    }}
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
                <Alert severity='info'>
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
