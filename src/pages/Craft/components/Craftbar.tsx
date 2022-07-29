import { useState, useMemo, useEffect, useContext } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import classNames from 'classnames';

import { Erc1155Categories } from 'shared/constants';
import { CardGroup, CardImage, CardName, CardSlot, ItemCard } from 'components/ItemCard/components';
import { CustomModal } from 'components/CustomModal/CustomModal';
import { InstallationsApi, TilesApi } from 'api';
import { SnackbarContext } from 'contexts/SnackbarContext';

import { ApproveModal } from './ApproveModal';
import { AlchemicaList } from './AlchemicaList';
import { ConnectModal } from './ConnectModal';
import { CraftContext } from '../CraftContext';

import { sidebarStyles } from '../styles';

export function Craftbar() {
    const classes = sidebarStyles();

    const [craftAmount, setCraftAmount] = useState<number>(0);
    const [isCrafting, setIsCrafting] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { showSnackbar } = useContext<any>(SnackbarContext);
    const {
        isWalletConnected,
        isAlchemicaApproved,
        selectedItem,
        isItemSelected,
        category,
        maxCraftAmount
    } = useContext<any>(CraftContext);

    const isCraftDisabled: boolean = useMemo(() =>
        !maxCraftAmount || !craftAmount || !isItemSelected
    , [maxCraftAmount, craftAmount, isItemSelected]);

    const inputChange = (event: any): void => {
        const value: number = parseInt(event.target.value) || 0;

        if (maxCraftAmount < value) {
            setCraftAmount(maxCraftAmount);
        } else if (value < 0) {
            setCraftAmount(0);
        } else {
            setCraftAmount(value);
        }
    };

    const amountChange = (amount: number) => {
        setCraftAmount(craftAmount + amount);
    };

    const onCraftItems = () => {
        if (!isWalletConnected || !isAlchemicaApproved) {
            setIsModalOpen(true);
        } else {
            const amount: number = craftAmount;
            const items: number[] = Array(amount).fill(selectedItem.id);
            const gltrs: number[] = Array(amount).fill(0);
            const promise: Promise<any> = category === 'tile' ?
                TilesApi.craftTiles(items) :
                InstallationsApi.craftInstallations(items, gltrs);

            setIsCrafting(true);

            promise.then((isCrafted: boolean) => {
                if (isCrafted) {
                    showSnackbar('success', `${amount} ${selectedItem.name} crafted!`);
                } else {
                    showSnackbar('error', 'Craft failed! :( Please try again');
                }
            })
            .catch(error => console.log(error))
            .finally(() => setIsCrafting(false));
        }
    };

    const renderSelectedItem = (): JSX.Element => {
        if (isItemSelected) {
            const categoryId: string = category === 'tile' ? Erc1155Categories.Tile : Erc1155Categories.Realm;

            return <ItemCard type='golden' id={selectedItem.id} category={categoryId}>
                <CardGroup name='body'>
                    <CardSlot>{selectedItem.type}</CardSlot>
                    <CardImage id={selectedItem.id} category={categoryId} />
                    <CardName id={selectedItem.id} />
                </CardGroup>
            </ItemCard>;
        } else {
            return <></>;
        }
    };

    useEffect(() => {
        setCraftAmount(maxCraftAmount > 0 ? 1 : maxCraftAmount);
    }, [maxCraftAmount]);

    return (
        <div className={classes.sidebar}>

            <div className={classes.body}>
                <AlchemicaList cost={selectedItem.alchemicaCost} amount={craftAmount || 1} />

                <div className={classNames(classes.selectedItem, 'craft-item')}>
                    {renderSelectedItem()}
                </div>

                <TextField
                    size='small'
                    value={craftAmount}
                    onChange={inputChange}
                    className={classes.input}
                    disabled={isCrafting}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    onClick={() => amountChange(-1)}
                                    disabled={craftAmount <= 1 || !isItemSelected || isCrafting}
                                ><RemoveIcon /></IconButton>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => amountChange(1)}
                                    disabled={craftAmount === maxCraftAmount || !isItemSelected || isCrafting}
                                ><AddIcon /></IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>

            <Button
                size='large'
                variant="contained"
                fullWidth
                className={classes.button}
                onClick={onCraftItems}
                disabled={isCraftDisabled && isWalletConnected || isCrafting}
            >
                Craft
                {isCrafting &&
                    <CircularProgress size={20} className={classes.progress} />
                }
            </Button>

            <CustomModal
                modalOpen={isModalOpen && !isWalletConnected}
                setModalOpen={setIsModalOpen}
            >
                <ConnectModal />
            </CustomModal>

            <CustomModal
                modalOpen={isModalOpen && isWalletConnected}
                setModalOpen={setIsModalOpen}
            >
                <ApproveModal setIsModalOpen={setIsModalOpen} />
            </CustomModal>

        </div>
    );
}
