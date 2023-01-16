import { useContext } from 'react';
import { Box, Toolbar, Button, Link, Snackbar, Alert, IconButton, Divider } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import classNames from 'classnames';

import { MusicButton } from 'components/MusicButton/MusicButton';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { ReactComponent as DiscordIcon } from 'assets/images/icons/discord.svg';

import { GotchiverseOnline } from './components/GotchiverseOnline';
import { styles } from './styles';

export function Footer() {
    const classes = styles();
    const { isOpen, type, message, onSnackbarClose } = useContext<any>(SnackbarContext);

    return (
        <Box className={classes.footerWrapper}>
            <Toolbar className={classes.toolbar}>
                <div>
                    <span className={classes.highlight}>v0.5</span>
                    <span className={classes.footerCopyright}>
                        © fireball.gg ||{' '}
                        <a href='https://github.com/orden-gg/fireball' rel='noreferrer' target='_blank'>
                            #1 aavegotchi portal
                        </a>{' '}
                        maintained by ordengg and frens (<a href="https://fireball.gg/client/0x6865ae680c92bf047d08aa7f40ca2ec5a4f01c5a">alchemica donations address</a>) al ||{' '}
                        <a
                            href='https://fireball-gg.notion.site/fireball-gamedao-litepaper-b26d07a1cae041db82f4237f876828b9'
                            rel='noreferrer'
                            target='_blank'
                        >
                            {' '}
                            ❤️‍🔥 fireball gamedao litepaper
                        </a>
                    </span>
                </div>

                <div className={classes.buttons}>
                    <GotchiverseOnline />
                    <Button
                        className={classes.playBtn}
                        component={Link}
                        size='small'
                        color='inherit'
                        href='https://verse.aavegotchi.com'
                        target='_blank'
                    >
                        play
                    </Button>

                    <Divider orientation='vertical' className={classes.divider} />

                    <div className={classes.btnsGroup}>
                        <IconButton
                            className={classes.btn}
                            href='https://simpleanalytics.com/fireball.gg'
                            target='_blank'
                        >
                            <QueryStatsIcon />
                        </IconButton>

                        <div className={classes.btn}>
                            <MusicButton />
                        </div>
                    </div>

                    <Divider orientation='vertical' className={classes.divider} />

                    <div className={classes.btnsGroup}>
                        <IconButton
                            className={classNames(classes.btn, classes.discordIcon)}
                            href='https://discord.gg/orden'
                            target='_blank'
                        >
                            <DiscordIcon />
                        </IconButton>
                        <IconButton className={classes.btn} href='https://twitter.com/orden_gg' target='_blank'>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton className={classes.btn} href='https://github.com/orden-gg/fireball' target='_blank'>
                            <GitHubIcon />
                        </IconButton>
                        <div className={classes.socialJoin}>Join our community!</div>
                    </div>
                </div>
            </Toolbar>

            <Snackbar open={isOpen} autoHideDuration={3000} onClose={() => onSnackbarClose()}>
                <Alert elevation={6} variant='filled' severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
