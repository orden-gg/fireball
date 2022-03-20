import { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DoneIcon from '@mui/icons-material/Done';
import { Typography } from '@mui/material';

import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';

import { ReactComponent as Gotchi } from 'assets/images/gotchi-placeholder.svg'

import PetPanel from './PetPanel';
import GhstPanel from './GhstPanel';
import StakePanel from './StakePanel';
import ConnectPanel from './ConnectPanel';
import { AutopetContext } from '../../AutopetContextProvider';
import { tabStyles } from '../../styles';

export default function AutopetSteps() {
    const classes = tabStyles();

    const { tabs } = useContext(AutopetContext);
    const [ currentTab, setCurrentTab ] = useState(0);
    const [ progress, setProgress ] = useState(0);

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

    useEffect(() => {
        for (const [index, key] of Object.keys(tabs).entries()) {
            if (!tabs[key].done) {
                setCurrentTab(index);
                break;
            }
        }

        const completeCount = Object.keys(tabs).reduce(
            (sum, key) => tabs[key].done ? 1 + sum : sum, 0
        );

        setProgress(completeCount)
    }, [tabs]);

    return (
        <>
            <Typography className={classes.autopetComplete}>
                Status: {`${progress}/${Object.keys(tabs).length}`}
            </Typography>
            <Box className={classes.tabsWrapper}>

                <AppBar position='static'>
                    <Tabs
                        value={currentTab}
                        onChange={handleChange}
                        indicatorColor='primary'
                        textColor='inherit'
                        variant='fullWidth'
                    >
                    {
                        Object.keys(tabs).map((key, index) => (
                            <Tab
                                key={index}
                                className={ classNames(classes.tab, tabs[key].done && classes.tabDone) }
                                icon={
                                    index === 0 ? null :
                                    <DoubleArrowIcon className={classes.tabIcon} />
                                }
                                iconPosition='end'
                                label={
                                    <>
                                        {`${tabs[key].text} `}
                                        {
                                            tabs[key].done &&
                                            <>
                                                <Gotchi className={classes.tabGotchi} />
                                                <DoneIcon className={classes.tabArrow} />
                                            </>
                                        }
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
                    <ConnectPanel index={0} dir='x' />
                    <PetPanel index={1} dir='x' />
                    <GhstPanel index={2} dir='x' />
                    <StakePanel index={3} dir='x' />
                </SwipeableViews>

            </Box>
        </>
    )
}
