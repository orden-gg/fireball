import { User } from './User';
import { HomeGotchi } from './HomeGotchi.';

import { teamStyles } from '../styles';

export function Team({ team }) {
    const classes = teamStyles();

    return (
        <div className={classes.gotchisWrapper}>
            {
                team.map((gotchi: any, index: number) =>
                    <HomeGotchi gotchi={gotchi} key={index} />
                )
            }
            <User />
        </div>
);
}
