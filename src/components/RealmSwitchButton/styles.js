import { makeStyles } from '@mui/styles';

import mapSvg from 'assets/images/icons/map.svg';
import listSvg from 'assets/images/icons/list.svg';

const styles = makeStyles(theme => ({
    button: {
        position: 'absolute',
        top: 84,
        right: 4,
        width: 62,
        height: 34,
        padding: 7,
        transition: '.5s ease-in-out',
        zIndex: 5,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url(${mapSvg})`,
                }
            },
        },
        '& .MuiSwitch-thumb': {
            width: 32,
            height: 32,
            '&:before': {
                content: "''",
                position: 'absolute',
                width: '80%',
                height: '80%',
                left: '10%',
                top: '10%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${listSvg})`,
            },
        },
        '& .MuiSwitch-track': {
            borderRadius: 20 / 2
        },
        '& .Mui-checked+.MuiSwitch-track': {
            backgroundColor: '#fff'
        },
    }
}));

export default styles;
