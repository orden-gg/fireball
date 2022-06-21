import { useEffect, useState } from 'react';
import { Link } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';

import classNames from 'classnames';

import { GhstTokenGif } from 'components/Icons/Icons';
import { AUTOPET_CONTRACT } from 'api/common/api.constants';
import { AutopetApi, TheGraphApi } from 'api';
import { CommonUtils } from 'utils';

import { AutopetInfoCard } from './AutopetInfoCard';
import { infoStyles } from '../../styles';


export function AutopetInfo() {
    const classes = infoStyles();

    const [fee, setFee] = useState<string>('');
    const [frens, setFrens] = useState<string>('');
    const [totalStaked, setTotalStaked] = useState<string>('');
    const [totalGotchis, setTotalGotchis] = useState<string>('');
    const [totalUsers, setTotalUsers] = useState<string>('');

    useEffect(() => {
        AutopetApi.getUsers().then((users: any) => {
            TheGraphApi.getGotchisByAddresses(users).then((gotchis: any) => {
                setTotalGotchis(CommonUtils.formatPrice(gotchis.length));
            });

            setTotalUsers(CommonUtils.formatPrice(users.length));
        });

        AutopetApi.getFee().then((fee: number) => {
            setFee(CommonUtils.formatPrice(fee));
        });

        AutopetApi.getFrens().then((frens: number) => {
            setFrens(CommonUtils.formatPrice(frens));
        });
    }, []);

    useEffect(() => {
        if (totalUsers !== '' && fee !== '') {
            setTotalStaked(CommonUtils.formatPrice(Number(totalUsers) * Number(fee)));
        }
    }, [totalUsers, fee]);

    return (
        <div
            className={classes.autopetInfo}
        >
            <AutopetInfoCard
                name='Gotchis'
                count={totalGotchis}
            />
            <AutopetInfoCard
                name='Accounts'
                count={totalUsers}
            />
            <Link
                href={`https://polygonscan.com/address/${AUTOPET_CONTRACT}`}
                target='_blank'
                className={classNames(classes.autopetInfoCard, classes.autopetInfoLink)}
            >
                Contract
                <CallMadeIcon className={classes.autopetInfoIcon} />
            </Link>
            <AutopetInfoCard
                name='Fee'
                count={
                    fee !== '' ? (
                        <>
                            {fee}
                            <GhstTokenGif width={48} height={48} />
                            <span className={classes.autopetCardCountLabel}>staked</span>
                        </>
                    ) : (
                        null
                    )
                }
            />
            <AutopetInfoCard
                name='Frens'
                count={frens}
            />
            <AutopetInfoCard
                name='Staked'
                count={
                    totalStaked !== '' ? (
                        <>
                            {totalStaked}
                            <GhstTokenGif width={48} height={48} />
                        </>
                    ) : (
                        null
                    )
                }
            />
        </div>
    );
}
