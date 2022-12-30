import classNames from 'classnames';

import { styles } from './style';

interface ContentWrapperProps {
    children: JSX.Element[];
    paddingZero?: boolean;
    isShowSidebar?: boolean;
}

export function ContentWrapper({ children, paddingZero = false, isShowSidebar = true }: ContentWrapperProps) {
    const classes = styles();

    return (
        <div className={classNames(classes.content, paddingZero && classes.noPadding)}>
            <div className={classes.inner}>
                {children[0]}
            </div>

            { isShowSidebar &&
                <div className={classes.sidebar}>
                    {children[1]}
                </div>
            }
        </div>
    );
}
