import { useState } from 'react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import CustomTooltip from 'components/custom/CustomTooltip.js';

import styles from './styles.js';

const defaultTooltipText = <span>
    copy to <span className='highlight'>clipboard</span>
</span>;

export default function CopyToClipboard({ copy }) {
    const classes = styles();
    const [tooltipText, setTooltipText] = useState(defaultTooltipText);

    const copyText = (event, text) => {
        event.stopPropagation();

        toClipboard(text)
            .then(() => setTooltipText('copied!'))
            .catch(() => setTooltipText(defaultTooltipText));
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
            <IconButton
                className={classes.button}
                onClick={(event) => copyText(event, copy)}
                onMouseEnter={() => setTooltipText(defaultTooltipText)}
            >
                <ContentCopyIcon className={classes.icon} />
            </IconButton>
        </CustomTooltip>
    );
}
