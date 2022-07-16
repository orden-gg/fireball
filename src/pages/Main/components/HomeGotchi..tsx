import { Link } from '@mui/material';

import classNames from 'classnames';

import { GotchiSvg } from 'components/Gotchi/GotchiImage/GotchiSvg';

import { teamStyles } from '../styles';

export function HomeGotchi({ gotchi }: { gotchi: any }) {
    const classes = teamStyles();

    return (
        <Link
            href={`/client/${gotchi.originalOwner?.id || gotchi.owner.id}/gotchis`}
            target='_blank'
            className={classNames(classes.homeGotchi, 'team')}>
            <div className={classes.gotchiName}><span>{gotchi.name}</span></div>
            <GotchiSvg id={gotchi.id} size='100%' />
        </Link>
    );
}
