import { NavLink } from 'react-router-dom';

import { LogoIcon, MobileLogoIcon } from 'components/Icons/Icons';

import styles from './styles';

export default function Logo() {
    const classes = styles();

    return (
        <NavLink className={classes.logoWrapper} to='/' >
            <LogoIcon className={classes.logoDesktop} width={80} height={34} />
            <MobileLogoIcon width={24} height={36} className={classes.logoMobile} />
        </NavLink>
    )
}
