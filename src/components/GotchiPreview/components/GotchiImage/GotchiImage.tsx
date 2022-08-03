
import { useState } from 'react';

import classNames from 'classnames';

import { GOTCHI_SIDES } from 'shared/constants';
import { GotchiSvg } from 'components/Gotchi/GotchiImage/GotchiSvg';

import { gotchiImageStyles } from './styles';

export function GotchiImage({ id }: { id: string }) {
    const classes = gotchiImageStyles();

    const [view, setView] = useState<string>('svg');

    return <div className={classNames(classes.gotchiSvg, 'hide-bg')}>
        <GotchiSvg id={id} size='100%' view={view} />
        <div className={classes.imageSlider}>
            {GOTCHI_SIDES.map((name: string) =>
                <div
                    className={classNames(classes.side)}
                    onMouseEnter={() => setView(name)}
                    key={name}
                ></div>
            )}
            <div className={classNames(classes.sideLine, view)}></div>
        </div>
    </div>;
}
