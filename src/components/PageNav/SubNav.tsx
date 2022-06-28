import { NavLink } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material';

import classNames from 'classnames';

import { styles } from './styles';

export function SubNav({ links }: { links: any }) {
    const classes = styles();

    const theme = useTheme();

    return (
        <>
            {
                links.map((subLink: any, index: number) => {
                    return (
                        <div className={classes.navItem} key={index}>
                            <Button
                                disabled={subLink.items === 0}
                                component={NavLink}
                                className={classNames(classes.button, classes.subButton)}
                                to={subLink.route}
                            >
                                <span className={classes.navName}>{subLink.name}</span>
                                { subLink.loading ? (
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
                                    <span className={classes.label}>[{subLink.items}]</span>
                                )}
                            </Button>
                        </div>
                    );
                })
            }
        </>
    );
}
