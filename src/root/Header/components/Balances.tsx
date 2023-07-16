import React, { useContext, useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, Link, useTheme } from '@mui/material';

import classNames from 'classnames';

import { BalancesContext } from 'contexts/BalancesContext';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { CommonUtils } from 'utils';

import { useLocalStorage } from 'hooks/useLocalStorage';

import { balancesStyles } from '../styles';

export function Balances() {
  const classes = balancesStyles();
  const theme = useTheme();
  const { tokens, isBalancesLoading } = useContext<CustomAny>(BalancesContext);
  const [menuOpen, setMenuOpen] = useLocalStorage(
    'visible_balances',
    JSON.parse(localStorage.getItem('visible_balances') as CustomAny) || true
  );

  const checkList = ['fud', 'fomo', 'alpha', 'kek', 'gltr', 'alloy', 'essence', 'ghst', 'matic'];
  const [checked, setChecked] = useState<boolean[]>([false]);
  const [checkBoxesOpen, setcheckBoxesOpen] = useLocalStorage(
    'visible_checkboxes_balances',
    JSON.parse(localStorage.getItem('visible_checkboxes_balances') as CustomAny) || true
  );

  const initialState = localStorage.getItem('visible_checkList')
    ? JSON.parse(localStorage.getItem('visible_checkList') as CustomAny) || true
    : {};

  const [state, setState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('visible_checkList', JSON.stringify(state));
  }, [state]);

  const handleButtonBalancesClick = (isMenuOpen) => setMenuOpen(isMenuOpen);
  const handleButtonDropboxClick = (ischeckBoxesOpen) => setcheckBoxesOpen(ischeckBoxesOpen);

  const handleCheck = (event) => {
    var updatedList = [...checked];

    if (!event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setState(updatedList);
  };

  const generateHiden = (inputToken: string): boolean => {
    const ishiden = localStorage.getItem('visible_checkList')?.toString();
    const hide = ishiden?.includes(inputToken);

    if (hide) {
      return false;
    } else {
      return true;
    }
  };

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

      <IconButton className={classes.balancesButton} onClick={() => handleButtonBalancesClick(!menuOpen)}>
        {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>

      <div className={classes.balancesWrapper}>
        {checkBoxesOpen && (
          <div className={classes.balancesCheckBoxList}>
            <div className='checkList'>
              <div className='title'>Balances:</div>
              <div className='list-container'>
                {checkList.map((item, index) => (
                  <div key={index}>
                    <input type='checkbox' value={item} defaultChecked={generateHiden(item)} onChange={handleCheck} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <IconButton className={classes.balancesCheckBoxButton} onClick={() => handleButtonDropboxClick(!checkBoxesOpen)}>
        {checkBoxesOpen ? <FilterAltOffOutlinedIcon /> : <FilterAltOutlinedIcon />}
      </IconButton>
    </div>
  );
}
