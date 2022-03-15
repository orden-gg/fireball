import React, { createContext, useContext, useEffect, useState } from 'react';

import { SnackbarContext } from '../../contexts/SnackbarContext';
import { useMetamask } from 'use-metamask';

import ghstApi from '../../api/ghst.api';
import mainApi from '../../api/main.api';
import autopetApi from '../../api/autopet.api';

import { CircularProgress } from '@mui/material';
import { tabStyles } from './styles';
import { LoginContext } from '../../contexts/LoginContext';
import thegraph from '../../api/thegraph';

export const AutopetContext = createContext({});

const AutopetContextProvider = (props) => {
    const [ ghstState, setGhstState ] = useState('approve');
    const [ petState, setPetState ] = useState('approve');
    const [ stakeState, setStakeState ] = useState('approve');
    const [ connectState, setConnectState ] = useState('approve');
    const [ isPetApproved, setIsPetApproved ] = useState(false);
    const [ isStaked, setIsStaked ] = useState(false);
    const [ isGhstApproved, setIsGhstApproved ] = useState(false);
    const [ isUserConnected, setIsUserConnected ] = useState(false);

    const [ totalGotchis, setTotalGotchis ] = useState(null);
    const [ totalUsers, setTotalUsers ] = useState(null);
    
    const classes = tabStyles();

    const [ tabs, setTabs ] = useState({
        connect: {
            text: 'Connet wallet',
            done: false
        },
        pet: {
            text: 'Pet',
            done: false
        },
        ghst: {
            text: 'GHST',
            done: false
        },
        stake: {
            text: 'Stake',
            done: false
        }
    });

    const { showSnackbar } = useContext(SnackbarContext);
    const { getAccounts } = useMetamask();
    const { connectMetamask } = useContext(LoginContext);

    const approveConnect = async () => {
        setConnectState('approving');

        const isConnected = await connectMetamask();
        setConnectState('approve');
        if(!isConnected) return;
        updateProgress('connect', isConnected);
        setIsUserConnected(isConnected);
    }

    const approvePet = async (approval) => {
        const succesMessage = approval ? 'Pet approved!' : 'Pet disapproved!';
        const errorMessage = approval ? 'Pet approval failed!' : 'Pet disapproval failed!';

        setPetState('approving');

        const isApproved = await mainApi.approvePet(approval);

        if(isApproved) {
            setIsPetApproved(approval);
            updateProgress('pet', approval);
            showSnackbar('success', succesMessage);
        } else {
            showSnackbar('error', errorMessage);
        }

        setPetState('approve');
    };

    const approveGhst = async (approval) => {
        const succesMessage = approval ? 'GHST approved!' : 'GHST disapproved!';
        const errorMessage = approval ? 'GHST approval failed!' : 'GHST disapproval failed!';

        setGhstState('approving');
        
        const isApproved = await ghstApi.approveGhst(approval);
        if(isApproved) {
            setIsGhstApproved(approval);
            updateProgress('ghst', approval);
            showSnackbar('success', succesMessage);
        } else {
            showSnackbar('error', errorMessage);
        }

        setGhstState('approve');
    };

    const approveStake = async (approval) => {
        const succesMessage = approval ? 'Stake approved!' : 'Unstake approved!';
        const errorMessage = approval ? 'Staking failed!' : 'Unstaking failed!';

        setStakeState('approving');
        
        const isApproved = !!await autopetApi.subscribe(approval);

        if(isApproved) {
            setIsStaked(approval);
            updateProgress('stake', approval);
            showSnackbar('success', succesMessage);
        } else {
            showSnackbar('error', errorMessage);
        }

        setStakeState('approve');
    };

    const updateProgress = (name, isApproved) => {
        setTabs(  (data) => {
            const duplicated = {...data};
            duplicated[name].done = isApproved;
            return duplicated;
        } );
    };

    const renderButtonNode = (state, defaultNode, approvedNode) => {
        switch (state) {
            case 'approved' : 
                return approvedNode
            case 'approving': 
                return (
                    <>
                        Approving <CircularProgress size={20} className={classes.panelButtonCitcular} />
                    </>
                )
            default:
                return defaultNode
        }
    }

    useEffect( () => {

        (async function getUserAccount() {

            autopetApi.getUsers().then( users => {
                thegraph.getGotchisByAddresses(users).then( gotchis => {
                    setTotalGotchis(gotchis.length);
                    setTotalUsers(users.length);
                });
            });

            const tabsDuplicated = {...tabs};
            let ready = 0;

            const updateTabs = () => {
                if(ready === Object.keys(tabs).length) setTabs(tabsDuplicated);
            }

            const account = await getAccounts();
            const walletConnected  = account.length > 0;

            setIsUserConnected(walletConnected);

            if(!walletConnected) return;
            tabsDuplicated.connect.done = walletConnected;
            ++ready;
            updateTabs();

            mainApi.isPetApproved(account[0]).then( (isApproved) => {
                setIsPetApproved(isApproved);
                tabsDuplicated.pet.done = isApproved;
                ++ready;
                updateTabs();
            });
            
            ghstApi.isGhstApproved(account[0]).then(isApproved => {
                setIsGhstApproved(isApproved);
                tabsDuplicated.ghst.done = isApproved;
                ++ready;
                updateTabs();
            });
            
            autopetApi.isStaked(account[0]).then(isApproved => {
                setIsStaked(isApproved);
                tabsDuplicated.stake.done = isApproved;
                ++ready;
                updateTabs();
            });
        })();

    }, []);

    return (
        <AutopetContext.Provider value={{
            // states
            ghstState,
            petState,
            stakeState,
            connectState,

            isPetApproved,
            isGhstApproved,
            isUserConnected,
            isStaked,

            tabs,

            totalGotchis,
            totalUsers,

            // functions
            approveGhst,
            approvePet,
            approveStake,
            approveConnect,
            renderButtonNode
        }}>
            { props.children }
        </AutopetContext.Provider>
    )
}

export default AutopetContextProvider;
