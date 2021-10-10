import React, { useEffect, useState } from 'react';
import { Typography, FormControl, Select, MenuItem, Icon, IconButton, OutlinedInput } from '@mui/material';
import { useStyles } from './styles';

import commonUtils from '../../utils/commonUtils';
import useLocalStorage from '../../hooks/useLocalStorage';

import { useMetamask } from 'use-metamask';

import DeleteIcon from '@mui/icons-material/Delete';
import metamaskIcon from '../../assets/images/metamask-icon.png';

const ITEM_HEIGHT = 48;
const MenuProps = {
  PaperProps: {
    style: {
      width: 300,
      maxHeight: ITEM_HEIGHT * 6
    },
  }
};

export default function AddressesSelect({ placeholder, onUpdate, newAddress}) {
    const classes = useStyles();
    const [addresses, setAddresses] = useLocalStorage('ghst_addresses', JSON.parse(localStorage.getItem('ghst_addresses')) || []);
    const { metaState } = useMetamask();
    const [names, setNames] = useState([]);

    const handleChange = (event) => {
        const { target: { value } } = event;

        setAddresses((result) => {
            return result.map( item => (
                {...item, selected: value.includes(item.name)}
            ));
        });
    }

    const deleteAddress = (event, name) => {
        event.stopPropagation();
        setAddresses(addresses.filter( item => item.name !== name));
    }

    const getNames = (array) => {
        return array.filter(item => item.selected).map(item => item.name);
    }

    const updateMetamaskAddress = (address) => {

        if (!address) return setAddresses(addresses.slice(1));

        let addressesCache = addresses.length ? addresses.filter((item) => {
            return item.address.toLowerCase() !== address || item.metamask
        }) : [];

        if (
            addressesCache[0]?.metamask &&
            addressesCache[0]?.address.toLowerCase() === address
        ) return; // if address already added
        
        if (addressesCache[0]?.metamask) { // if change metamask wallet
            addressesCache[0].address = address;
        } else { // if metamask wallet not added
            addressesCache = [
                {
                    name: 'ghst_metamask_address',
                    metamask: true,
                    address: address,
                    selected: true
                },
                ...addressesCache
            ]
        }

        setAddresses(addressesCache)
    }


    useEffect( () => {
        if (metaState.isAvailable) {
            if (metaState.account.length) updateMetamaskAddress(metaState.account[0].toLowerCase());
            else if (!metaState.isConnected && addresses[0]?.metamask) updateMetamaskAddress(false);
        }
    }, [metaState]);

    useEffect( () => {
        setNames(getNames(addresses));
        if (onUpdate) onUpdate(addresses);
    }, [addresses]);

    useEffect( () => {
        if (newAddress.name && newAddress.address) {
            setAddresses([...addresses, newAddress]);
        }
    }, [newAddress]);

    return (
        <FormControl size='small' color='primary' className={classes.select}>
            <Select
                multiple
                displayEmpty
                value={names}
                onChange={handleChange}
                input={<OutlinedInput />}
                disabled={addresses.length === 0}
                renderValue={(selected) => {
                    if (!selected.length) {
                        return <em>{placeholder}</em>;
                    } else if (selected[0] === 'ghst_metamask_address') {
                        return [
                            <img src={metamaskIcon} className={classes.fieldMetamaskIcon} key="metamask icon"></img>,
                            selected.slice(1).length ? ' * ' : '',
                            selected.slice(1).join(' * ')
                        ]
                    }
                    else return selected.join(', ')
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {
                    addresses.map((item) => {
                        if (!item.metamask)  {
                            return <MenuItem
                                key={item.name}
                                name={item.name}
                                value={item.name}
                                className={classes.option}
                            >
                                <Typography className={classes.optionText}>{item.name}: {commonUtils.cutAddress(item.address)}</Typography>
                                <IconButton onClick={(event) => deleteAddress(event, item.name)} className={classes.deleteButton}>
                                    <DeleteIcon />
                                </IconButton>
                            </MenuItem>
                        } else {
                            return (
                                <MenuItem
                                    key={item.name}
                                    name={item.name}
                                    value={item.name}
                                    className={classes.option}
                                >
                                    <Icon className={classes.metamaskIcon}>
                                        <img src={metamaskIcon} ></img>
                                    </Icon>
                                    <Typography className={classes.optionText}> {commonUtils.cutAddress(item.address)}</Typography>
                                </MenuItem>
                            )
                        }
                    })
                }
            </Select>
        </FormControl>
    )
}