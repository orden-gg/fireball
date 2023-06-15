import { useContext, useEffect, useState } from 'react';

import { Button, CircularProgress, Typography } from '@mui/material';

import classNames from 'classnames';
import _ from 'lodash';

import { AlchemicaApi } from 'api';

import { Erc1155Categories, INSTALLATION_CONTRACT, TILES_CONTRACT, TokenTypes } from 'shared/constants';

import { SnackbarContext } from 'contexts/SnackbarContext';

import { CraftContext } from '../CraftContext';
import { modalStyles } from '../styles';

export function ApproveModal({ setIsModalOpen }: { setIsModalOpen: (value: boolean) => void }) {
  const classes = modalStyles();

  const [isTokenApproving, setIsTokenApproving] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { showSnackbar } = useContext<CustomAny>(SnackbarContext);
  const { tokens, tokensApprovals, category, setTokenApprovals } = useContext<CustomAny>(CraftContext);

  const approveAlchemicaSpend = (): void => {
    const operator: string = category === Erc1155Categories.Tile ? TILES_CONTRACT : INSTALLATION_CONTRACT;
    const tokenName: string = Object.keys(TokenTypes)[activeIndex];

    setIsTokenApproving(true);

    AlchemicaApi[`approve${tokenName}`](operator)
      .then((isApproved: boolean) => {
        if (isApproved) {
          setTokenApprovals((currentApprovals: CustomAny[]) => {
            const modified = _.cloneDeep(currentApprovals);

            modified[category][activeIndex] = isApproved;

            return modified;
          });
          showSnackbar('success', `${tokenName} approved!`);
        } else {
          showSnackbar('error', `${tokenName} approve failed :( Please try again`);
        }
      })
      .finally(() => setIsTokenApproving(false));
  };

  useEffect(() => {
    const isSomeNotApproved: boolean = tokensApprovals[category].some((isApproved: boolean) => !isApproved);

    const activeIndex: number = tokensApprovals[category].findIndex((isApproved: boolean) => !isApproved);

    setActiveIndex(activeIndex);

    if (isSomeNotApproved) {
      setIsTokenApproving(false);
    } else {
      setIsModalOpen(false);
    }
  }, [tokensApprovals]);

  return (
    <div className={classes.content}>
      <Typography variant='h5' className={classes.title}>
        Please approve spend before craft
      </Typography>
      <div className={classes.alchemica}>
        {[...tokens].splice(0, 4).map((token: CustomAny, index: number) => (
          <span
            key={index}
            className={classNames(
              classes.token,
              tokensApprovals[category][index] && classes.approved,
              activeIndex === index && classes.active
            )}
          >
            <span className={classes.tokenIcon}>{token.icon}</span>
          </span>
        ))}
      </div>
      <Button
        size='large'
        variant='contained'
        className={classes.button}
        onClick={approveAlchemicaSpend}
        disabled={isTokenApproving}
      >
        Approve {isTokenApproving && <CircularProgress size={20} className={classes.progress} />}
      </Button>
    </div>
  );
}
