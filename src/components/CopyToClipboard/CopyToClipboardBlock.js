import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import CustomTooltip from 'components/custom/CustomTooltip.js';

import styles from './styles.js';

const defaultTooltipText = <span>
    copy to <span className='highlight'>clipboard</span>
</span>;

export default function CopyToClipboardBlock({ children, text }) {
    const classes = styles();
    const [tooltipText, setTooltipText] = useState(defaultTooltipText);

    const copyText = (event, text) => {
        event.stopPropagation();

        toClipboard(text)
            .then(r => setTooltipText('copied!'))
            .catch(err => setTooltipText(defaultTooltipText));
    };

    const toClipboard = async (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <CustomTooltip
            title={tooltipText}
            placement='top'
            followCursor
            className={classes.tooltip}
        >
            <div
                className={classes.block}
                onClick={(event) => copyText(event, text)}
                onMouseEnter={() => setTooltipText(defaultTooltipText)}
            >
                <span>{children}</span>
                <ContentCopyIcon className={classes.blockIcon} />
            </div>
            {/* <IconButton
                className={classes.button}
                onClick={(event) => copyText(event, text)}
                onMouseEnter={() => setTooltipText(defaultTooltipText)}
            >
                <ContentCopyIcon className={classes.icon} />
            </IconButton> */}
        </CustomTooltip>
    );
}
