import { Avatar, Link } from '@mui/material';

import { teamStyles } from '../styles';
import { Gotchi } from 'components/Gotchi/Gotchi';
import hopeUp from 'assets/images/gotchi-placeholder-up.svg';

export function Team({ team }) {
    const classes = teamStyles();

    return (
        <div className={classes.gotchisWrapper}>
            {
                team.map((gotchi: any, index: number) =>
                    <Gotchi
                        className='narrowed team'
                        gotchi={gotchi}
                        key={index}
                        render={['name', 'svg']}
                    />
                )
            }
            <Link
                href='https://discord.gg/orden'
                target='_blank'
                className={classes.teamUser}
                underline='none'
            >
                <p className={classes.aavegotchiName}>You!</p>
                <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hopeUp } />
            </Link>
        </div>
    );
}
