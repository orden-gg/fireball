import { useEffect, useState } from 'react';
import { Avatar, Link, useMediaQuery, useTheme } from '@mui/material';

import classNames from 'classnames';
import _ from 'lodash';

import { TheGraphApi } from 'api';

import { GOTCHI_IDS, MAX_ROWS, MAX_GOTCHIS_IN_ROW } from 'shared/constants';
import hopeUp from 'assets/images/gotchi-placeholder-up.svg';
import { Section } from 'components/Section/Section';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { CommonUtils } from 'utils';

import { About } from './components/About';
import { Team } from './components/Team';

import { styles, bgStyles, teamStyles } from './styles';

export function Main2() {
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

    const renderGotchisRow = (row: number) : JSX.Element => {
        return <div className={classNames(
                classes.gotchisRow, classes[`gotchisRow${row+1}`],
                isLoaded && 'active'
            )}
        >
            {
                isLoaded && matches ? (
                    membersInRow[row].map((gotchi: any, index) =>
                        gotchi.name !== 'user' ? (
                            <Gotchi
                                className={classNames('narrowed team', classes.gotchi)}
                                gotchi={gotchi}
                                key={index}
                                render={['name', 'svg']}
                            />
                        ) : (
                            <Link
                                href='https://discord.gg/orden'
                                target='_blank'
                                className={classNames(classes.teamUser, classes.gotchi)}
                                underline='none'
                                key={index}
                            >
                                <p className={classes.aavegotchiName}>You!</p>
                                <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hopeUp } />
                            </Link>
                        )
                    )
                ) : (
                    <></>
                )
            }
        </div>;
    };

    const getAvailableRowIndex = (array: any[]): number => {
        let rowIndex = CommonUtils.generateRandomIntegerInRange(0, MAX_ROWS-1);

        while (array[rowIndex].length >= MAX_GOTCHIS_IN_ROW[rowIndex]) {
            rowIndex = CommonUtils.generateRandomIntegerInRange(0, MAX_ROWS-1);
        }

        return rowIndex;
    };

    useEffect(() => {
        TheGraphApi.getGotchiesByIds(GOTCHI_IDS).then((response: any) => {
            const separatedGotchis: any[] = [
                [], [], []
            ];

            for (const item of response) {
                separatedGotchis[getAvailableRowIndex(separatedGotchis)].push(item.data.aavegotchi);
            }

            setTeam(_.flatten(separatedGotchis));

            separatedGotchis[getAvailableRowIndex(separatedGotchis)].push({
                name: 'user'
            });

            setMembersInRow(separatedGotchis);
        }).catch((error) => console.log(error)).
        finally(() => setIsloaded(true));
    }, []);

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
            </div>
                {
                    team.length > 0 && !matches ? (
                        <Section backgroundColor='rgb(39, 42, 48)'>
                            <Team team={team} />
                        </Section>
                    ) : <></>
                }
            <About />
        </div>
    );
}
