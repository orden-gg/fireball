import classNames from 'classnames';

import { InterfaceStyles } from '../styles';

export default function CitadelInterface({ children }) {
    const classes = InterfaceStyles();

    return (
        <div className={classNames(classes.citadelInterface, 'citadel-interface')}>
            {children}
        </div>
    );
}
