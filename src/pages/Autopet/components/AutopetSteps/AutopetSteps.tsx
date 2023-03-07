import { useContext, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import DoneIcon from '@mui/icons-material/Done';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import classNames from 'classnames';

import { GotchiIcon } from 'components/Icons/Icons';

import { AutopetContext } from '../../AutopetContextProvider';
import { tabStyles } from '../../styles';
import { ConnectPanel } from './ConnectPanel';
import { GhstPanel } from './GhstPanel';
import { PetPanel } from './PetPanel';
import { StakePanel } from './StakePanel';

export function AutopetSteps() {
  const classes = tabStyles();

  const { tabs } = useContext<any>(AutopetContext);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const a11yProps = (index: number): any => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`
    };
  };

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number): void => {
    setCurrentTab(newValue);
  };

  const handleChangeIndex = (index: number): void => {
    setCurrentTab(index);
  };

  useEffect(() => {
    const keys: string[] = Object.keys(tabs);
    const completeCount: number = keys.reduce((sum, key) => (tabs[key].done ? 1 + sum : sum), 0);

    for (const [index, key] of keys.entries()) {
      if (!tabs[key].done || index === keys.length - 1) {
        setCurrentTab(index);

        break;
      }
    }

    setProgress(completeCount);
  }, [tabs]);

  return (
    <>
      <Typography className={classes.autopetComplete}>Status: {`${progress}/${Object.keys(tabs).length}`}</Typography>
      <Box className={classes.tabsWrapper}>
        <AppBar position='static'>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='inherit'
            variant='fullWidth'
          >
            {Object.keys(tabs).map((key, index) => (
              <Tab
                key={index}
                className={classNames(classes.tab, tabs[key].done && classes.tabDone)}
                icon={index === 0 ? null : <DoubleArrowIcon className={classes.tabIcon} />}
                iconPosition='end'
                label={
                  <>
                    {`${tabs[key].text} `}
                    {tabs[key].done && (
                      <>
                        <GotchiIcon className={classes.tabGotchi} width={20} height={20} />
                        <DoneIcon className={classes.tabArrow} />
                      </>
                    )}
                  </>
                }
                {...a11yProps(index)}
              />
            ))}
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
  );
}
