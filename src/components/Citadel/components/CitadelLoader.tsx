import classNames from 'classnames';

import { GotchiverseGif } from 'components/Icons/Icons';

import { LoaderStyles } from '../styles';

export function CitadelLoader({ isLoaded }: { isLoaded: boolean }) {
    const classes = LoaderStyles();

    return (
        <div className={classNames(classes.citadelLoading, isLoaded && 'is-loaded')}>
            <span className={classes.citadelLoadingLine}></span>
            <span className={classes.citadelLoadingLine}></span>
            <span className={classes.citadelLoadingLine}></span>
            <div className={classes.citadelLoadingInner}>
                <GotchiverseGif width='100%' height='100%' />
            </div>
        </div>
    );
}
