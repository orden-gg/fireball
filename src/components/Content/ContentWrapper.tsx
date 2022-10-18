import classNames from 'classnames';

import { styles } from './style';

export function ContentWrapper({ children, paddingZero = false }: { children: JSX.Element[], paddingZero?: boolean }) {
    const classes = styles();

    return (
        <div className={classNames(classes.content, paddingZero && classes.noPadding)}>
            <div className={classes.inner}>
                {children[0]}
            </div>

            <div className={classes.sidebar}>
                {children[1]}
            </div>
        </div>
    );
}
