import { useEffect, useState } from 'react';

import { Link } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';

import classNames from 'classnames';

import { infoStyles } from '../../styles';
import AutopetInfoCard from './AutopetInfoCard';
import autopetApi from '../../../../api/autopet.api';
import thegraph from '../../../../api/thegraph';

import ghstIcon from '../../../../assets/images/ghst-doubleside.gif'

import { AUTOPET_CONTRACT } from '../../../../api/common/constants';
import commonUtils from '../../../../utils/commonUtils';

export default function AutopetInfo() {
    const classes = infoStyles();
    const [ fee, setFee ] = useState(null);
    const [ frens, setFrens ] = useState(null);
    const [ totalStaked, setTotalStaked ] = useState(null);
    const [ totalGotchis, setTotalGotchis ] = useState(null);
    const [ totalUsers, setTotalUsers ] = useState(null);

    useEffect(() => {
        autopetApi.getUsers().then(users => {
            thegraph.getGotchisByAddresses(users).then( gotchis => {
                setTotalGotchis(commonUtils.formatPrice(gotchis.length));
                setTotalUsers(commonUtils.formatPrice(users.length));
            });
        });

        autopetApi.getFee().then(fee => {
            setFee(commonUtils.formatPrice(fee));
        });

        autopetApi.getFrens().then(frens => {
            setFrens(commonUtils.formatPrice(frens));
        });
    }, []);

    useEffect(() => {
        if (totalUsers !== null & fee !== null) {
            setTotalStaked(commonUtils.formatPrice(totalUsers*fee));
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
                    fee === null ? null :
                    <>
                        {fee} 
                        <img src={ghstIcon} alt='ghst icon' className={classes.autopetInfoGhst} />
                        <span className={classes.autopetCardCountLabel}>staked</span>
                    </>
                }
            />
            <AutopetInfoCard
                name='Frens'
                count={frens}
            />
            <AutopetInfoCard
                name='Staked'
                count={
                    totalStaked === null ? null :
                    <>
                        {totalStaked}
                        <img src={ghstIcon} alt='ghst icon' className={classes.autopetInfoGhst} />
                    </> 
                }
            />
        </div>
    )
}
