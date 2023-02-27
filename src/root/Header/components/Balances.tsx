import React, { useContext } from 'react';
import { IconButton, Link, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import classNames from 'classnames';
import ContentLoader from 'react-content-loader';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { BalancesContext } from 'contexts/BalancesContext';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { CommonUtils } from 'utils';

import { balancesStyles } from '../styles';

// TODO add types
export function Balances() {
  const classes = balancesStyles();
  const theme = useTheme();

  const [menuOpen, setMenuOpen] = useLocalStorage(
    'visible_balances',
    JSON.parse(localStorage.getItem('visible_balances') as any) || true
  );

  const { tokens, isBalancesLoading } = useContext<any>(BalancesContext);

  const handleButtonClick = (isMenuOpen) => setMenuOpen(isMenuOpen);

  if (!tokens.length) {
    return <></>;
  }

  return (
    <div className={classes.balancesWrapper}>
      {menuOpen && (
        <div className={classes.balancesList}>
          {tokens.map((token, index) =>
            isBalancesLoading ? (
              <ContentLoader
                speed={2}
                viewBox='0 0 55 20'
                backgroundColor={theme.palette.secondary.dark}
                foregroundColor={'#16181a'}
                className={classes.balanceLoader}
                key={index}
              >
                <rect x='0' y='0' width='55' height='20' />
              </ContentLoader>
            ) : (
              <CustomTooltip
                title={
                  <React.Fragment>
                    <p className={classes.balancePrice}>{token.balance !== 0 ? `${token.balance}$` : ''}</p>
                    <span>
                      {token.pricePerToken}$/<span className='highlight'>{token.key}</span>
                    </span>
                  </React.Fragment>
                }
                enterTouchDelay={0}
                placement='bottom'
                followCursor
                key={index}
              >
                <Link className={classes.balance} href={token.swapUrl} target='_blank'>
                  <div className={classNames(classes.balanceValue, token.key)}>
                    {token.icon}
                    <p>{CommonUtils.convertFloatNumberToSuffixNumber(token.amount)}</p>
                  </div>
                </Link>
              </CustomTooltip>
            )
          )}
        </div>
      )}

      <IconButton className={classes.balancesButton} onClick={() => handleButtonClick(!menuOpen)}>
        {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
    </div>
  );
}
