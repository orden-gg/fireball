import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { IconButton } from '@mui/material';

import CustomTooltip from 'components/custom/CustomTooltip';
import useFullscreenStatus from 'hooks/useFullscreenStatus';

import { InterfaceStyles } from '../styles';

export default function FullscreenButton({ wrapperRef }) {
    const [isFullscreen, setIsFullscreen] = useFullscreenStatus(wrapperRef);
    const classes = InterfaceStyles();

    const onShowFullScreen = () => {
        isFullscreen ? document.exitFullscreen() : setIsFullscreen();
    }

    if (isFullscreen === null) {
        return '';
    }

    return (
        <CustomTooltip
            title={'Fullscreen'}
            enterTouchDelay={0}
            placement='left'
        >
            <IconButton onClick={onShowFullScreen} className={classes.citadelInterfaceButton}>
                { isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon /> }
            </IconButton>
        </CustomTooltip>
    );
}
