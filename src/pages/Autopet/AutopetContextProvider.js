import { createContext, useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import { useMetamask } from 'use-metamask';

import { SnackbarContext } from '../../contexts/SnackbarContext';
import { LoginContext } from '../../contexts/LoginContext';

import ghstApi from '../../api/ghst.api';
import mainApi from '../../api/main.api';
import autopetApi from '../../api/autopet.api';

import { tabStyles } from './styles';

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
    
    const classes = tabStyles();

    const [ tabs, setTabs ] = useState({
        connect: {
            text: 'Connet wallet',
            done: false
        },
        pet: {
            text: 'Allow Pet',
            done: false
        },
        ghst: {
            text: 'Allow GHST',
            done: false
        },
        stake: {
            text: 'Stake & Start!',
            done: false
        }
    });

    const { showSnackbar } = useContext(SnackbarContext);
    const { connectMetamask } = useContext(LoginContext);

    const { getAccounts } = useMetamask();

    const approveConnect = async () => {
        setConnectState('approving');

        const isConnected = await connectMetamask();

        setConnectState('approve');

        if (!isConnected) {
            return;
        }

        updateProgress('connect', isConnected);
        setIsUserConnected(isConnected);
    }

    const approvePet = async (isApproved) => {
        const succesMessage = isApproved ? 'Pet approved!' : 'Pet disapproved!';
        const errorMessage = isApproved ? 'Pet approval failed!' : 'Pet disapproval failed!';

        setPetState('approving');

        try {
            const isApproved = await mainApi.approvePet(isApproved);

            if (isApproved) {
                setIsPetApproved(isApproved);
                updateProgress('pet', isApproved);
                showSnackbar('success', succesMessage);
            } else {
                showSnackbar('error', errorMessage);
            }

            setPetState('approve');
        } catch {
            setPetState('approve');
        }
    };

    const approveGhst = async (isApproved) => {
        const succesMessage = isApproved ? 'GHST approved!' : 'GHST disapproved!';
        const errorMessage = isApproved ? 'GHST approval failed!' : 'GHST disapproval failed!';

        setGhstState('approving');
        
        try {
            const isApproved = await ghstApi.approveGhst(isApproved);

            if (isApproved) {
                setIsGhstApproved(isApproved);
                updateProgress('ghst', isApproved);
                showSnackbar('success', succesMessage);
            } else {
                showSnackbar('error', errorMessage);
            }
            
            setGhstState('approve');
        } catch {
            setGhstState('approve');
        }
    };

    const approveStake = async (isApproved) => {
        const succesMessage = isApproved ? 'Stake approved!' : 'Unstake approved!';
        const errorMessage = isApproved ? 'Staking failed!' : 'Unstaking failed!';

        setStakeState('approving');
        
        try {
            const isApproved = Boolean(await autopetApi.subscribe(isApproved));

            if (isApproved) {
                setIsStaked(isApproved);
                updateProgress('stake', isApproved);
                showSnackbar('success', succesMessage);
            } else {
                showSnackbar('error', errorMessage);
            }

            setStakeState('approve');
        } catch {
            setStakeState('approve');
        }
    };

    const updateProgress = (name, isApproved) => {
        setTabs(data => {
            const duplicated = {...data};
            duplicated[name].done = isApproved;

            return duplicated;
        });
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

    useEffect(() => {
        (async function updateData() {
            const tabsDuplicated = {...tabs};
            let ready = 0;

            const updateTabs = () => {
                if (ready === Object.keys(tabs).length) {
                    setTabs(tabsDuplicated);
                }
            }

            const accounts = await getAccounts();
            const walletConnected  = accounts.length > 0;

            setIsUserConnected(walletConnected);

            if (!walletConnected) {
                return;
            }

            tabsDuplicated.connect.done = walletConnected;
            ++ready;
            updateTabs();

            mainApi.isPetApproved(accounts[0]).then(isApproved => {
                setIsPetApproved(isApproved);
                tabsDuplicated.pet.done = isApproved;
                ++ready;
                updateTabs();
            });
            
            ghstApi.isGhstApproved(accounts[0]).then(isApproved => {
                setIsGhstApproved(isApproved);
                tabsDuplicated.ghst.done = isApproved;
                ++ready;
                updateTabs();
            });
            
            autopetApi.getUsers().then(users => {
                const isStaked = users.some(address => (
                    accounts[0].toLowerCase() === address.toLowerCase()
                ));
                setIsStaked(isStaked);
                tabsDuplicated.stake.done = isStaked;
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
