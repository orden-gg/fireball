import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import CustomTooltip from 'components/custom/CustomTooltip.js';

import styles from './styles.js'

export default function CopyToClipboard({ copy }) {
    const classes = styles();
    const [tooltipText, setTooltipText] = useState('copy to clipboard');

    const copyText = (event, text) => {
        toClipboard(text);
        event.stopPropagation();
    };

    const toClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setTooltipText('copied!');
        } catch (err) {
            setTooltipText('copy to clipboard');
        }
    };

    return (
        <CustomTooltip
            title={tooltipText}
            placement='top'
            followCursor
            className={classes.tooltip}
        >
            <IconButton
                size='small'
                onClick={(event) => copyText(event, copy)}
                onMouseEnter={() => setTooltipText('copy to clipboard')}
            >
                <ContentCopyIcon className={classes.icon} />
            </IconButton>
        </CustomTooltip>
    );
}
