import { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import classNames from 'classnames';
import _ from 'lodash';

import { GOTCHI_IDS, LAST_GOTCHI_SCALE, START_ANGLE, H_D, V_D, MAX_GOTCHIS_IN_ROW, MAX_ROWS, EASTER_EGG_VIEW_CHANCE } from 'shared/constants';
import { Section } from 'components/Section/Section';
import { TheGraphApi } from 'api';
import { CommonUtils } from 'utils';

import { About } from './components/About';
import { Team } from './components/Team';
import { User } from './components/User';
import { HomeGotchi } from './components/HomeGotchi.';

import { styles, bgStyles, teamStyles } from './styles';
interface GotchiStyles {
    left: string;
    bottom: string;
    zIndex: number;
    transform: string;
}

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
        const isRowsView = CommonUtils.generateRandomIntegerInRange(1, 100) > EASTER_EGG_VIEW_CHANCE;
        let isMounted = true;

        setIsRowsView(isRowsView);

        TheGraphApi.getGotchiesByIds(GOTCHI_IDS).then((response: any) => {
            if (isMounted) {
                const gotchis = response.map(item => item.data.aavegotchi);

                if (isRowsView) {
                    const modifiedGotchis = _.cloneDeep(gotchis);
                    const separatedGotchis: any[] = [
                        [], [], []
                    ];

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
        .catch((error) => console.log(error)).
        finally(() => setIsloaded(true));

        return () => { isMounted = false };
    }, []);

    const renderGotchisRow = (row: number) : JSX.Element => {
        if (isRowsView) {
            return (
                <div className={classNames(
                        classes.gotchisRow, classes[`gotchisRow${row+1}`],
                        isLoaded && 'active'
                    )}
                >
                    {
                        isLoaded && matches ? (
                            membersInRow[row].map((gotchi: any, index) =>
                                gotchi.name !== 'user' ? (
                                    <HomeGotchi gotchi={gotchi} />
                                ) : (
                                    <User key={index} />
                                )
                            )
                        ) : (
                            <></>
                        )
                    }
                </div>
            );
        } else {
            return <></>;
        }
    };

    const getGotchiStyles = (id: number): GotchiStyles => {
        const angle: number = START_ANGLE / 2 + START_ANGLE * id;
        const s: number = Math.sin(angle);
        const c: number = Math.cos(angle);
        const radius: number = (H_D * V_D) / Math.sqrt(H_D * H_D * s * s + V_D * V_D * c * c) / 2;
        const left: number = radius * c;
        const bottom: number = Math.abs(radius * s * 2);
        const scale: number = (1 - LAST_GOTCHI_SCALE) * Math.abs(left) / 50;

        return {
            left: left + '%',
            bottom: bottom + '%',
            zIndex: Math.floor(Math.abs(left)),
            transform: `scale(${LAST_GOTCHI_SCALE + scale})`
        };
    };

    const getAvailableRowIndex = (array: any[]): number => {
        let rowIndex = CommonUtils.generateRandomIntegerInRange(0, MAX_ROWS-1);

        while (array[rowIndex].length >= MAX_GOTCHIS_IN_ROW[rowIndex]) {
            rowIndex = CommonUtils.generateRandomIntegerInRange(0, MAX_ROWS-1);
        }

        return rowIndex;
    };

    return (
        <div className={classes.content}>
            <div className={classes.homeBg}>
                <div className={classNames(classes.flower2, classes.bgPart)}></div>
                <div className={classNames(classes.flower1, classes.bgPart)}></div>
                {renderGotchisRow(2)}
                <div className={classNames(classes.midgroundFar, classes.bgPart)}></div>
                <div className={classNames(classes.smokeMid, classes.bgPart)}></div>
                <div className={classNames(classes.midgroundClose, classes.bgPart)}></div>
                {renderGotchisRow(1)}
                <div className={classNames(classes.smokeClose, classes.bgPart)}></div>
                <div className={classNames(classes.foreground, classes.bgPart)}></div>
                {renderGotchisRow(0)}
                {
                    isLoaded && matches && !isRowsView &&
                    <div className={classNames(classes.gotchisSemicircle, 'active')}>
                        {
                            team.map((gotchi: any, index: number) =>
                                <div
                                    className={classes.gotchiBox}
                                    style={getGotchiStyles(index)}
                                    key={index}
                                >
                                    <HomeGotchi gotchi={gotchi} />
                                </div>
                            )
                        }
                        <div
                            className={classes.gotchiBox}
                            style={getGotchiStyles(GOTCHI_IDS.length+1)}
                        >
                            <User />
                        </div>
                    </div>
                }
            </div>
            {
                team.length > 0 && !matches && (
                    <Section backgroundColor='rgb(39, 42, 48)'>
                        <Team team={team} />
                    </Section>
                )
            }
            <About isRowsView={isRowsView} matches={matches} />
        </div>
    );
}
