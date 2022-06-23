import { useContext, useMemo, useState, useEffect } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';

import classNames from 'classnames';

import { INSTALLATION_CONTRACT, TILES_CONTRACT } from 'api/common/constants';
import alchemicaApi from 'api/alchemica.api';
import { TokenTypes } from 'data/types';
import { SnackbarContext } from 'contexts/SnackbarContext';

import { CraftContext } from '../CraftContext';

import { modalStyles } from '../styles';

export default function ApproveModal({ setIsModalOpen }) {
    const [isTokenApproving, setIsTokenApproving] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const { showSnackbar } = useContext(SnackbarContext);
    const {
        tokens,
        tokensApprovals,
        category,
        setTokenApprovals
    } = useContext(CraftContext);

    const classes = modalStyles();

    const alchemicaTokens = useMemo(() => [...tokens].splice(0, 4), [tokens]);

    const getContract = () => category === 'tile' ? TILES_CONTRACT : INSTALLATION_CONTRACT;

    const approveAlchemicaSpend = async () => {
        const operator = getContract();
        const tokenName = Object.keys(TokenTypes)[activeIndex];

        let response;

        setIsTokenApproving(true);

        try {
            response = await alchemicaApi[`approve${Object.keys(TokenTypes)[activeIndex]}`](operator);
        } catch (error) {
            return setIsTokenApproving(false);
        }

        setTokenApprovals(currentApprovals => {
            currentApprovals[category][activeIndex] = response;

            return {...currentApprovals}
        });

        response ?
            showSnackbar('success', `${tokenName} approved!`) :
            showSnackbar('error', `${tokenName} approve failed :( Please try again`);

        tokensApprovals[category].every(isApproved => isApproved) ? setIsModalOpen(false) : setIsTokenApproving(false);
    };

    useEffect(() => {
        setActiveIndex(
            tokensApprovals[category || 'tiles'].findIndex(isApproved => !isApproved)
        );
    }, [tokensApprovals]);

    return (
        <div className={classes.content}>
            <Typography variant='h5' className={classes.title}>Please approve spend before craft</Typography>
            <div className={classes.alchemica}>
                {
                    alchemicaTokens.map((token, index) =>
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
    )
}
