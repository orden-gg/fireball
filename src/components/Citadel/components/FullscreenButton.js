import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { IconButton } from '@mui/material';
import classNames from 'classnames';

import CustomTooltip from 'components/custom/CustomTooltip';
import useFullscreenStatus from 'hooks/useFullscreenStatus';

import { InterfaceStyles } from '../styles';

export default function FullscreenButton({ wrapperRef }) {
    const classes = InterfaceStyles();

    const [isFullscreen, setIsFullscreen] = useFullscreenStatus(wrapperRef);

    const onShowFullScreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            setIsFullscreen();
        }
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
            <IconButton onClick={onShowFullScreen} className={classNames(classes.citadelInterfaceButton, classes.citadelFullscreen)}>
                { isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon /> }
            </IconButton>
        </CustomTooltip>
    );
}
