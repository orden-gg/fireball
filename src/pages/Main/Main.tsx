import { useEffect, useState } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';

import classNames from 'classnames';
import _ from 'lodash';

import { TheGraphApi } from 'api';

import {
  EASTER_EGG_VIEW_CHANCE,
  GOTCHI_IDS,
  H_D,
  LAST_GOTCHI_SCALE,
  MAX_GOTCHIS_IN_ROW,
  MAX_ROWS,
  START_ANGLE,
  V_D
} from 'shared/constants';

import { Section } from 'components/Section/Section';

import { CommonUtils } from 'utils';

import { About } from './components/About';
import { HomeGotchi } from './components/HomeGotchi.';
import { NavigationCards } from './components/NavigationCards/NavigationCards';
import { Team } from './components/Team';
import { User } from './components/User';
import { bgStyles, styles, teamStyles } from './styles';

export function Main() {
  const classes = {
    ...bgStyles(),
    ...styles(),
    ...teamStyles()
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [membersInRow, setMembersInRow] = useState<any[]>([]);
  const [isLoaded, setIsloaded] = useState<boolean>(false);
  const [team, setTeam] = useState<any[]>([]);
  const [isRowsView, setIsRowsView] = useState<boolean>(true);

  useEffect(() => {
    const isRowsView: boolean = CommonUtils.generateRandomIntegerInRange(1, 100) < EASTER_EGG_VIEW_CHANCE;
    let isMounted: boolean = true;

    setIsRowsView(isRowsView);

    TheGraphApi.getGotchiesByIds(GOTCHI_IDS)
      .then((response: any) => {
        if (isMounted) {
          const gotchis: any[] = response.map((item) => item.data.aavegotchi);

          if (isRowsView) {
            const modifiedGotchis: any[] = _.cloneDeep(gotchis);
            const separatedGotchis: any[] = [[], [], []];

            for (const gotchi of modifiedGotchis) {
              separatedGotchis[getAvailableRowIndex(separatedGotchis)].push(gotchi);
            }

            separatedGotchis[getAvailableRowIndex(separatedGotchis)].push({
              name: 'user'
            });

            setMembersInRow(separatedGotchis);
          }

          setTeam(gotchis);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsloaded(true));

    return () => {
      isMounted = false;
    };
  }, []);

  const renderGotchisRow = (row: number): JSX.Element => {
    const isShowRow: boolean = isLoaded && matches && isRowsView;

    if (isShowRow) {
      return (
        <div className={classNames(classes.gotchisRow, classes[`gotchisRow${row + 1}`], isLoaded && 'active')}>
          {membersInRow[row].map((gotchi: any, index) =>
            gotchi.name !== 'user' ? <HomeGotchi gotchi={gotchi} key={index} /> : <User key={index} />
          )}
        </div>
      );
    } else {
      return <></>;
    }
  };

  const getGotchiStyles = (
    id: number
  ): {
    left: string;
    bottom: string;
    zIndex: number;
    transform: string;
  } => {
    const angle: number = START_ANGLE / 2 + START_ANGLE * id;
    const s: number = Math.sin(angle);
    const c: number = Math.cos(angle);
    const radius: number = (H_D * V_D) / Math.sqrt(H_D * H_D * s * s + V_D * V_D * c * c) / 2;
    const left: number = radius * c;
    const bottom: number = Math.abs(radius * s * 2);
    const scale: number = ((1 - LAST_GOTCHI_SCALE) * Math.abs(left)) / 50;

    return {
      left: left + '%',
      bottom: bottom + '%',
      zIndex: Math.floor(Math.abs(left)),
      transform: `scale(${LAST_GOTCHI_SCALE + scale})`
    };
  };

  const getAvailableRowIndex = (array: any[]): number => {
    let rowIndex = CommonUtils.generateRandomIntegerInRange(0, MAX_ROWS - 1);

    while (array[rowIndex].length >= MAX_GOTCHIS_IN_ROW[rowIndex]) {
      rowIndex = CommonUtils.generateRandomIntegerInRange(0, MAX_ROWS - 1);
    }

    return rowIndex;
  };

  return (
    <div className={classes.content}>
      <NavigationCards />
      <div className={classes.homeBg}>
        {renderGotchisRow(2)}
        {renderGotchisRow(1)}
        {renderGotchisRow(0)}
        {isLoaded && matches && !isRowsView && (
          <div className={classNames(classes.gotchisSemicircle, 'active')}>
            {team.map((gotchi: any, index: number) => (
              <div className={classes.gotchiBox} style={getGotchiStyles(index)} key={index}>
                <HomeGotchi gotchi={gotchi} key={index} />
              </div>
            ))}
            <div className={classes.gotchiBox} style={getGotchiStyles(GOTCHI_IDS.length + 1)}>
              <User />
            </div>
          </div>
        )}
        {team.length > 0 && !matches && (
          <Section backgroundColor='rgba(39, 42, 48, 0)'>
            <Team team={team} />
          </Section>
        )}
        <About />
      </div>
    </div>
  );
}
