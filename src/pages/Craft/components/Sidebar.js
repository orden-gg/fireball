import { useState, useMemo, useEffect, useContext } from 'react';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import classNames from 'classnames';

import CustomModal from 'components/Modal/Modal';
import Tile from 'components/Items/Tile/Tile';
import Installation from 'components/Items/Installation/Installation';
import commonUtils from 'utils/commonUtils';
import installationsApi from 'api/installations.api';
import tilesApi from 'api/tiles.api';
import { SnackbarContext } from 'contexts/SnackbarContext';

import ApproveModal from './ApproveModal';
import AlchemicaList from './AlchemicaList';
import ConnectModal from './ConnectModal';
import { CraftContext } from '../CraftContext';

import { sidebarStyles } from '../styles';

export default function Sidebar() {
    const [craftAmount, setCraftAmount] = useState(0);
    const [isCrafting, setIsCrafting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showSnackbar } = useContext(SnackbarContext);
    const {
        maxCraftAmount,
        selectedItem,
        category,
        isWalletConnected,
        isAlchemicaApproved
    } = useContext(CraftContext);

    const classes = sidebarStyles();

    const isItemSelected = useMemo(() =>
        !commonUtils.isEmptyObject(selectedItem)
    , [selectedItem]);
    const isCraftDisabled = useMemo(() =>
        !maxCraftAmount || !craftAmount || !isItemSelected
    , [maxCraftAmount, craftAmount, isItemSelected]);

    const inputChange = event => {
        const value = parseInt(event.target.value) || 0;

        if (maxCraftAmount < value) {
            setCraftAmount(maxCraftAmount);
        } else if (value < 0) {
            setCraftAmount(0);
        } else {
            setCraftAmount(value);
        }
    }

    const amountChange = amount => setCraftAmount(craftAmount+amount);

    const onCraftItems = async () => {
        if (!isWalletConnected || !isAlchemicaApproved) {
            setIsModalOpen(true);
        } else {
            const amount = parseInt(craftAmount);
            const items = Array(amount).fill(selectedItem.id);

            let response;

            setIsCrafting(true);

            try {
                if (category === 'tile') {
                    response = await tilesApi.craftTiles(items);
                } else {
                    const glts = Array(amount).fill(0);

                    response = await installationsApi.craftInstallations(items, glts);
                }
            } catch (error) {
                return setIsCrafting(false);
            }

            setIsCrafting(false);

            response ?
                showSnackbar('success', `${amount} ${selectedItem.name} crafted!`) :
                showSnackbar('error', `Craft failed! :( Please try again`);
        }
    }

    const renderSelectedItem = () => {
        if (isItemSelected) {
            return category === 'tile' ?
                <Tile tile={selectedItem} /> :
                <Installation installation={selectedItem} />
        } else {
            return '';
        }
    }

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
                        ),
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
            >Craft {isCrafting && <CircularProgress size={20} className={classes.progress} />}</Button>

            <CustomModal
                modalOpen={isModalOpen && !isWalletConnected}
                setModalOpen={setIsModalOpen}
                className={classes.connectModal}
            >
                <ConnectModal />
            </CustomModal>

            <CustomModal
                modalOpen={isModalOpen && isWalletConnected}
                setModalOpen={setIsModalOpen}
                className={classes.approveModal}
            >
                <ApproveModal setIsModalOpen={setIsModalOpen} />
            </CustomModal>

        </div>
    )
}
