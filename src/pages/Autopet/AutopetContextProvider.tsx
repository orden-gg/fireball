import { createContext, useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

import { useMetamask } from 'use-metamask';

import autopetApi from 'api/autopet.api';
import ghstApi from 'api/ghst.api';
import mainApi from 'api/main.api';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { LoginContext } from 'contexts/LoginContext';

import { tabStyles } from './styles';

export const AutopetContext = createContext({});

export const AutopetContextProvider = (props: any) => {
    const classes = tabStyles();

    const [ghstState, setGhstState] = useState<string>('approve');
    const [petState, setPetState] = useState<string>('approve');
    const [stakeState, setStakeState] = useState<string>('approve');
    const [connectState, setConnectState] = useState<string>('approve');

    const [isPetApproved, setIsPetApproved] = useState<boolean>(false);
    const [isStaked, setIsStaked] = useState<boolean>(false);
    const [isGhstApproved, setIsGhstApproved] = useState<boolean>(false);
    const [isUserConnected, setIsUserConnected] = useState<boolean>(false);
    const [connectedWallet, setConnectedWallet] = useState<string>('');

    const [tabs, setTabs] = useState<any>({
        connect: {
            text: 'Connect wallet',
            done: false
        },
        pet: {
            text: 'Approve Petting',
            done: false
        },
        ghst: {
            text: 'Approve GHST',
            done: false
        },
        stake: {
            text: 'Stake & Start!',
            done: false
        }
    });

    const { showSnackbar } = useContext<any>(SnackbarContext);
    const { connectMetamask } = useContext<any>(LoginContext);

    const { metaState } = useMetamask();

    const approveConnect = async (): Promise<void> => {
        setConnectState('approving');

        const isConnected: boolean = await connectMetamask();

        setConnectState('approve');

        if (!isConnected) {
            return;
        }

        updateProgress('connect', isConnected);
        setIsUserConnected(isConnected);
    };

    const approvePet = async (approval: boolean): Promise<void> => {
        const succesMessage: string = approval ? 'Petting approved!' : 'Petting approval revoked!';
        const errorMessage: string = approval ? 'Petting approval failed!' : 'Revoking petting approval failed!';

        setPetState('approving');

        try {
            const isApproved: boolean = await mainApi.approvePet(approval);

            if (isApproved) {
                setIsPetApproved(approval);
                updateProgress('pet', approval);
                showSnackbar('success', succesMessage);
            } else {
                showSnackbar('error', errorMessage);
            }

            setPetState('approve');
        } catch {
            setPetState('approve');
        }
    };

    const approveGhst = async (approval: boolean): Promise<void> => {
        const succesMessage: string = approval ? 'GHST approved!' : 'GHST approval revoked!';
        const errorMessage: string = approval ? 'GHST approval failed!' : 'Revoking GHST approval failed!';

        setGhstState('approving');

        try {
            const isApproved = await ghstApi.approveGhst(approval);

            if (isApproved) {
                setIsGhstApproved(approval);
                updateProgress('ghst', approval);
                showSnackbar('success', succesMessage);
            } else {
                showSnackbar('error', errorMessage);
            }

            setGhstState('approve');
        } catch {
            setGhstState('approve');
        }
    };

    const checkGhstSpend = async (): Promise<void> => {
        const ghstApproved: boolean = await ghstApi.isGhstApproved(connectedWallet);

        if (!ghstApproved) {
            setIsGhstApproved(ghstApproved);
            updateProgress('ghst', ghstApproved);
        }
    };

    const approveStake = async (approval: boolean) => {
        const succesMessage: string = approval ? 'Staking approved!' : 'Unstaking approved!';
        const errorMessage: string = approval ? 'Staking failed!' : 'Unstaking failed!';

        setStakeState('approving');

        try {
            const isApproved = Boolean(await autopetApi.subscribe(approval));

            if (isApproved) {
                setIsStaked(approval);
                updateProgress('stake', approval);
                showSnackbar('success', succesMessage);

                if (!approval) {
                    checkGhstSpend();
                }
            } else {
                showSnackbar('error', errorMessage);
            }

            setStakeState('approve');
        } catch {
            setStakeState('approve');
        }
    };

    const updateProgress = (name: string, isApproved: boolean) => {
        setTabs((data: any) => {
            data[name].done = isApproved;

            return { ...data };
        });
    };

    const renderButtonNode = (state: string, defaultNode: any, approvedNode: any): any => {
        switch (state) {
            case 'approved':
                return approvedNode;
            case 'approving':
                return (
                    <>
                        Approving <CircularProgress size={20} className={classes.panelButtonCitcular} />
                    </>
                );
            default:
                return defaultNode;
        }
    };

    useEffect(() => {
        const accounts: any[] = metaState.account;
        const walletConnected: boolean  = accounts.length > 0;

        setIsUserConnected(walletConnected);

        if (accounts[0] === connectedWallet || !walletConnected) {
            return;
        }

        setConnectedWallet(accounts[0]);

        (async function loadData() {
            const [petApproved, ghstApproved, users]: [boolean, boolean, any[]] = await Promise.all([
                mainApi.isPetApproved(accounts[0]),
                ghstApi.isGhstApproved(accounts[0]),
                autopetApi.getUsers()
            ]);
            const ghstStaked: boolean = users.some((address: string) => (
                accounts[0].toLowerCase() === address.toLowerCase()
            ));

            setIsPetApproved(petApproved);
            setIsGhstApproved(ghstStaked || ghstApproved);
            setIsStaked(ghstStaked);
            setTabs((data: any) => {
                data.connect.done = walletConnected;
                data.pet.done = petApproved;
                data.ghst.done = ghstStaked || ghstApproved;
                data.stake.done = ghstStaked;

                return { ...data };
            });
        })();
    }, [metaState]);

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
    );
};
