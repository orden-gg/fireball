import React, { useEffect, useState } from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HideSourceIcon from '@mui/icons-material/HideSource';

import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

import CustomTooltip from 'components/custom/CustomTooltip';
import gotchiverseApi from 'api/gotchiverse.api';

import styles from './styles';

export default function GotchiverseOnline() {
    const classes = styles();
    const [isOnlineLoading, setIsOnlineLoading] = useState(true);
    const [onlineCount, setOnlineCount] = useState(0);

    const fetchInterval = 25; // seconds

    useEffect(() => {
        let mounted = true;

        const getOnline = (()=> {
            gotchiverseApi.getOnlineCount()
                .then(gotchiverseOnline => {
                    if (mounted) {
                        setOnlineCount(gotchiverseOnline);
                        setIsOnlineLoading(false);
                    }
                });
        });

        getOnline();

        const interval = setInterval(() => {
            getOnline();
        }, fetchInterval * 1000);

        return () => {
            mounted = false;

            clearInterval(interval);
        }
    }, []);

    const renderOnlineTemplate = (TemplateIcon, text) => {
        return (
            <>
                <TemplateIcon className={classes.icon}/>
                <span className={classes.count}>
                    {text}
                </span>
            </>
        );
    };

    return (
        isOnlineLoading ? (
            <ContentLoader
                speed={2}
                viewBox='0 0 60 20'
                backgroundColor='#2c2f36'
                foregroundColor='#16181a'
                className={classes.onlinePlaceholder}
            >
                <rect x='0' y='0' width='60' height='20' />
            </ContentLoader>
        ) : (
            <CustomTooltip
                title={
                    <span>gotchiverse online</span>
                }
                placement='top'
                followCursor
            >
                <div className={classNames(classes.container, onlineCount > 0 ? 'online' : 'offline')}>
                    {onlineCount > 0 ? (
                        renderOnlineTemplate(RadioButtonCheckedIcon, onlineCount)
                    ) : (
                        renderOnlineTemplate(HideSourceIcon, 'offline')
                    )}
                </div>
            </CustomTooltip>
        )
    );
}
