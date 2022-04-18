import Gotchi from 'components/Gotchi/Gotchi';
import GotchisLazy from 'components/Lazy/GotchisLazy';

import { guildContentStyles } from '../styles';

export default function GuildGotchis({ gotchis }) {
    const classes = guildContentStyles();

    return (
        <div className={classes.guildGotchis}>
            {
                gotchis?.length > 0 ? (
                    <GotchisLazy
                        items={gotchis}
                        renderItem={id => (
                            <Gotchi
                                gotchi={gotchis[id]}
                                className='narrowed'
                                render={[
                                    'svg',
                                    'name'
                                ]}
                            />
                        )}
                    />
                ) : null
            }
        </div>
    );
}
