import { NavLink } from 'react-router-dom';

import { LogoPilotIcon, MobileLogoIcon } from 'components/Icons/Icons';

import { logoStyles } from '../styles';

export function Logo() {
  const classes = logoStyles();

  return (
    <NavLink className={classes.logoWrapper} to='/'>
      <LogoPilotIcon className={classes.logoDesktop} width={80} height={34} />
      <MobileLogoIcon width={24} height={36} className={classes.logoMobile} />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          whiteSpace: 'nowrap',
          fontSize: 8
        }}
      >
        by{' '}
        <a
          href='https://twitter.com/PavelRudolf3'
          target='_blank'
          style={{ color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '0 2px' }}
        >
          9STX6
        </a>
      </div>
    </NavLink>
  );
}
