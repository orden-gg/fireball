import React, { createContext, useContext, useEffect, useState } from 'react';

import { SnackbarContext } from '../../contexts/SnackbarContext';
import { useMetamask } from 'use-metamask';

import ghstApi from '../../api/ghst.api';
import mainApi from '../../api/main.api';
import autopetApi from '../../api/autopet.api';

import { CircularProgress } from '@mui/material';
import { tabStyles } from './styles';

export const AutopetContext = createContext({});

const AutopetContextProvider = (props) => {
    const [ ghstState, setGhstState ] = useState('approve');
    const [ petState, setPetState ] = useState('approve');
    const [ stakeState, setStakeState ] = useState('approve');
    const [ isPetApproved, setIsPetApproved ] = useState(false);
    const [ isStaked, setIsStaked ] = useState(false);
    const [ isGhstApproved, setIsGhstApproved ] = useState(false);
    
    const classes = tabStyles();

    const [ currentTab, setCurrentTab ] = useState(0);
    const [ tabs, setTabs ] = useState([
        {
            text: 'Pet',
            done: false
        },
        {
            text: 'GHST',
            done: false
        },
        {
            text: 'Stake',
            done: false
        }
    ]);

    const { showSnackbar } = useContext(SnackbarContext);
    const { getAccounts } = useMetamask();

    const approvePet = async (approval) => {
        const succesMessage = approval ? 'Pet approved!' : 'Pet disapproved!';
        const errorMessage = approval ? 'Pet approval failed!' : 'Pet disapproval failed!';

        setPetState('approving');
        
        try {
            const isApproved = !!await mainApi.approvePet(approval);

            if(isApproved) {
                setIsPetApproved(approval);
                updateProgress(0, approval);
                showSnackbar('success', succesMessage);
            } else {
                showSnackbar('error', errorMessage);
            }

            setPetState('approve');
            
        } catch(error) {
            setPetState('approve');
        }
    };

    const approveGhst = async (approval) => {
        const succesMessage = approval ? 'GHST approved!' : 'GHST disapproved!';
        const errorMessage = approval ? 'GHST approval failed!' : 'GHST disapproval failed!';

        setGhstState('approving');
        
        try {
            const isApproved = !!await ghstApi.approveGhst(approval);

            if(isApproved) {
                setIsGhstApproved(approval);
                updateProgress(1, approval);
                showSnackbar('success', succesMessage);
            } else {
                showSnackbar('error', errorMessage);
            }

            setGhstState('approve');
            
        } catch(error) {
            setGhstState('approve');
        }
    };

    const approveStake = async (approval) => {
        const succesMessage = approval ? 'Stake approved!' : 'Unstake approved!';
        const errorMessage = approval ? 'Staking failed!' : 'Unstaking failed!';

        setStakeState('approving');
        
        try {
            const isApproved = !!await autopetApi.subscribe(approval);

            if(isApproved) {
                setIsStaked(approval);
                updateProgress(2, approval);
                showSnackbar('success', succesMessage);
            } else {
                showSnackbar('error', errorMessage);
            }

            setStakeState('approve');
            
        } catch(error) {
            setStakeState('approve');
        }
    };

    const updateProgress = (id, isApproved) => {
        setTabs(  (data) => {
            const duplicated = [...data];
            duplicated[id].done = isApproved;
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

            const account = await getAccounts();

            const tabsDuplicated = [...tabs];

            let ready = 0;

            const updateTabs = () => {
                if(ready === tabs.length) setTabs(tabsDuplicated);
            }

            mainApi.isPetApproved(account[0]).then( (isApproved) => {
                setIsPetApproved(isApproved);
                tabsDuplicated[0].done = isApproved;
                ++ready;
                updateTabs();
            });
            
            ghstApi.isGhstApproved(account[0]).then(isApproved => {
                console.log(isApproved);
                setIsGhstApproved(isApproved);
                tabsDuplicated[1].done = isApproved;
                ++ready;
                updateTabs();
            });
            
            autopetApi.isStaked(account[0]).then(isApproved => {
                setIsStaked(isApproved);
                tabsDuplicated[2].done = isApproved;
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
            isPetApproved,
            isGhstApproved,
            tabs,
            currentTab, setCurrentTab,

            // functions
            approveGhst,
            approvePet,
            approveStake,
            isStaked,
            renderButtonNode
        }}>
            { props.children }
        </AutopetContext.Provider>
    )
}

export default AutopetContextProvider;
