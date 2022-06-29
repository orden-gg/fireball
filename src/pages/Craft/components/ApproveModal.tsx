import { useContext, useState, useEffect } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';

import classNames from 'classnames';

import { INSTALLATION_CONTRACT, TILES_CONTRACT, TokenTypes } from 'shared/constants';
import { AlchemicaApi } from 'api';
import { SnackbarContext } from 'contexts/SnackbarContext';

import { CraftContext } from '../CraftContext';

import { modalStyles } from '../styles';

// TODO add types
export function ApproveModal({ setIsModalOpen }: { setIsModalOpen: (value: boolean) => void }) {
    const classes = modalStyles();

    const [isTokenApproving, setIsTokenApproving] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { showSnackbar } = useContext<any>(SnackbarContext);
    const {
        tokens,
        tokensApprovals,
        category,
        setTokenApprovals
    } = useContext<any>(CraftContext);

    const approveAlchemicaSpend = (): void => {
        const operator: string = category === 'tile' ? TILES_CONTRACT : INSTALLATION_CONTRACT;
        const tokenName: string = Object.keys(TokenTypes)[activeIndex];

        setIsTokenApproving(true);

        AlchemicaApi[`approve${Object.keys(TokenTypes)[activeIndex]}`](operator).then((isApproved: boolean) => {
            if (isApproved) {
                setTokenApprovals(currentApprovals => {
                    currentApprovals[category][activeIndex] = isApproved;

                    return { ...currentApprovals };
                });
                showSnackbar('success', `${tokenName} approved!`);
            } else {
                showSnackbar('error', `${tokenName} approve failed :( Please try again`);
            }
        }).finally(() => setIsTokenApproving(false));

    };

    useEffect(() => {
        const isSomeNotApproved: boolean = tokensApprovals[category].some((isApproved: boolean) => !isApproved);
        const activeIndex: number = tokensApprovals[category || 'tiles'].findIndex((isApproved: boolean) => !isApproved);

        setActiveIndex(activeIndex);

        if (isSomeNotApproved) {
            setIsTokenApproving(false);
        } else {
            setIsModalOpen(false);
        }
    }, [tokensApprovals]);

    return (
        <div className={classes.content}>
            <Typography variant='h5' className={classes.title}>Please approve spend before craft</Typography>
            <div className={classes.alchemica}>
                {
                    [...tokens].splice(0, 4).map((token: any, index: number) =>
                        <span
                            key={index}
                            className={classNames(
                                classes.token,
                                tokensApprovals[category || 'tiles'][index] && classes.approved,
                                activeIndex === index && classes.active
                            )}
                        >
                            <span className={classes.tokenIcon}>{token.icon}</span>
                        </span>
                    )
                }
            </div>
            <Button
                size='large'
                variant="contained"
                className={classes.button}
                onClick={approveAlchemicaSpend}
                disabled={isTokenApproving}
            >Approve {isTokenApproving && <CircularProgress size={20} className={classes.progress} />}</Button>
        </div>
    );
}
