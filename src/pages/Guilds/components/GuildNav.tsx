import { useContext } from 'react';

import { PageNav } from 'components/PageNav/PageNav';
import { GotchiIcon, KekIcon, LendingIcon } from 'components/Icons/Icons';
import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { guildNavStyles } from '../styles';

export function GuildNav() {
    const classes = guildNavStyles();

    const { guildGotchis, guildLendings, guildRealm } = useContext<any>(GuildsContext);

    const navData: any = [
        {
            name: 'gotchis',
            icon: <GotchiIcon width={24} height={24} />,
            loading: false,
            items: guildGotchis.length || '...'
        },
        {
            name: 'lendings',
            icon: <LendingIcon width={24} height={24} />,
            loading: false,
            items: guildLendings.length || '...'
        },
        {
            name: 'realm',
            icon: <KekIcon width={24} height={24} />,
            loading: false,
            items: guildRealm.length || '...'
        }
    ];

    return (
        <div className={classes.guildNav}>
            <PageNav links={navData} />
        </div>
    );
}
