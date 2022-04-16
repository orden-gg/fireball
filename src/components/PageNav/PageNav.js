import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react';

import styles from './styles';

export default function PageNav({ links, query, children }) {
    const classes = styles();
    const match = useRouteMatch();
    const theme = useTheme();

    const data = useMemo(() => links, [links]);

    return (
        <div className={classes.container}>
            {
                data.map((link, index) => {
                    return (
                        <div className={classes.navItem} key={index}>
                            <Button
                                disabled={link.items === 0}
                                startIcon={link.icon}
                                component={NavLink}
                                className={classes.button}
                                activeClassName='active'
                                to={{
                                    pathname: `${match.url}/${link.name}`,
                                    search: query ? query : ''
                                }}
                            >
                                <span className={classes.navName}>{link.name}</span>
                                {
                                    link.loading ? (
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
                                        <span className={classes.label}>[{link.items}]</span>
                                    )
                                }
                            </Button>
                        </div>
                    )
                })
            }
            {children}
        </div>
    );
}
