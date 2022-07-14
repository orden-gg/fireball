import { useEffect, useState } from 'react';
import { Avatar, Link, useMediaQuery, useTheme } from '@mui/material';

import classNames from 'classnames';

import { TheGraphApi } from 'api';

import { GOTCHI_IDS, LAST_GOTCHI_SCALE, START_ANGLE, H_D, V_D } from 'shared/constants';
import hopeUp from 'assets/images/gotchi-placeholder-up.svg';
import { Section } from 'components/Section/Section';
import { Gotchi } from 'components/Gotchi/Gotchi';

import { About } from './components/About';
import { Team } from './components/Team';

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
    const [isLoaded, setIsloaded] = useState<boolean>(false);
    const [team, setTeam] = useState<any[]>([]);

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

    useEffect(() => {
        TheGraphApi.getGotchiesByIds(GOTCHI_IDS).then((response: any) => {
            const gotchis = response.map(item => item.data.aavegotchi);

            setTeam(gotchis);
        })
        .catch((error) => console.log(error)).
        finally(() => setIsloaded(true));
    }, []);

    return (
        <div className={classes.content}>
            <div className={classes.homeBg}>
                <div className={classNames(classes.flower2, classes.bgPart)}></div>
                <div className={classNames(classes.flower1, classes.bgPart)}></div>
                <div className={classNames(classes.midgroundFar, classes.bgPart)}></div>
                <div className={classNames(classes.smokeMid, classes.bgPart)}></div>
                <div className={classNames(classes.midgroundClose, classes.bgPart)}></div>
                <div className={classNames(classes.smokeClose, classes.bgPart)}></div>
                <div className={classNames(classes.foreground, classes.bgPart)}></div>
                {
                    isLoaded && matches &&
                    <div className={classNames(classes.gotchisSemicircle, 'active')}>
                        {
                            team.map((gotchi: any, index: number) =>
                                <div
                                    className={classes.gotchiBox}
                                    style={getGotchiStyles(index)}
                                    key={index}
                                >
                                    <Gotchi
                                        className={classNames(classes.gotchi, 'narrowed team')}
                                        gotchi={gotchi}
                                        render={['name', 'svg']}
                                    />
                                </div>
                            )
                        }
                        <div
                            className={classes.gotchiBox}
                            style={getGotchiStyles(GOTCHI_IDS.length+1)}
                        >
                            <Link
                                href='https://discord.gg/orden'
                                target='_blank'
                                className={classes.teamUser}
                                underline='none'
                            >
                                <p className={classes.aavegotchiName}>You!</p>
                                <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hopeUp } />
                            </Link>
                        </div>
                    </div>
                }
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
