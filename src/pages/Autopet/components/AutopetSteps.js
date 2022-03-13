import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { tabStyles } from '../styles';
import PetPanel from './PetPanel';
import GhstPanel from './GhstPanel';
import StakePanel from './StakePanel';
import { AutopetContext } from '../AutopetContextProvider';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { ReactComponent as Gotchi } from '../../../assets/images/gotchi-placeholder.svg'

export default function AutopetSteps() {
    const classes = tabStyles();

    const { 
        tabs,
        currentTab, setCurrentTab
    } = useContext(AutopetContext);
    
    const a11yProps = (index) => {
      return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
      };
    };

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const handleChangeIndex = (index) => {
        setCurrentTab(index);
    };

    useEffect( () => {
        for(const [index, tab] of tabs.entries()) {
            if(!tab.done) {
                setCurrentTab(index);
                break;
            } 
        }
    }, [tabs]);

    return (
        <Box className={classes.tabsWrapper}>

            <AppBar position="static">
                <Tabs
                    value={currentTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                >   
                {
                    tabs.map( (tab, index) => (
                        <Tab 
                            key={index}
                            className={ classes.tab }
                            icon={
                                index === 0 ? null : 
                                <DoubleArrowIcon className={classes.tabIcon} />
                            } 
                            iconPosition="end"
                            label={
                                <>
                                    {`${tab.text} `}
                                    {tab.done && <>(<span className={classes.tabDoneText}>done</span> <Gotchi className={classes.tabGotchi} />)</>}
                                </>
                            }
                            {...a11yProps(index)}
                        />
                    ))
                }
                </Tabs>
            </AppBar>

            <SwipeableViews
                axis='x'
                springConfig={{
                    duration: '.3s',
                    easeFunction: 'ease-in-out',
                    delay: '0s'
                }}
                index={currentTab}
                onChangeIndex={handleChangeIndex}
            >
                <PetPanel index={0} dir='x' />
                <GhstPanel index={1} dir='x' />
                <StakePanel index={2} dir='x' />
            </SwipeableViews>

        </Box>
    );
}
