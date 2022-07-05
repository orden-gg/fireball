import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';

import { styles } from './styles';

export function WhitelistId({ whitelistId }) {
    const classes = styles();

    return (
        <div className={classes.whitelist}>
            <PlaylistAddCheckOutlinedIcon fontSize='small'/>
            {whitelistId}
        </div>
    )
}
