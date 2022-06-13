import { useState } from 'react';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import CustomTooltip from 'components/custom/CustomTooltip.js';

import { styles } from './styles';

const defaultTooltipText = <span>
    copy to <span className='highlight'>clipboard</span>
</span>;

export function CopyToClipboard({ copy }: { copy: string }) {
    const classes = styles();

    const [tooltipText, setTooltipText] = useState<string | JSX.Element>(defaultTooltipText);

    const copyText = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string) => {
        event.stopPropagation();

        toClipboard(text)
            .then(() => setTooltipText('copied!'))
            .catch(() => setTooltipText(defaultTooltipText));
    };

    const toClipboard = async (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <CustomTooltip
            title={tooltipText}
            placement='top'
            followCursor
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
