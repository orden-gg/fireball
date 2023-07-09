import { useContext } from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Alert, Box, Button, Divider, IconButton, Link, Snackbar, Toolbar } from '@mui/material';

import classNames from 'classnames';

import { DONATE_ADDRESS } from 'shared/constants';

import { SnackbarContext } from 'contexts/SnackbarContext';

import { MusicButton } from 'components/MusicButton/MusicButton';

import { ReactComponent as DiscordIcon } from 'assets/images/icons/discord.svg';

import { GotchiverseOnline } from './components/GotchiverseOnline';
import { styles } from './styles';

export function Footer() {
  const classes = styles();
  const { isOpen, type, message, onSnackbarClose } = useContext<CustomAny>(SnackbarContext);

  return (
    <Box className={classes.footerWrapper}>
      <Toolbar className={classes.toolbar}>
        <div>
          <span className={classes.highlight}>v0.5.1</span>
          <span className={classes.footerCopyright}>
            © {' '}
            <a href='https://fireball.gg' rel='noreferrer' target='_blank'>
              fireball.gg
            </a>{' '}
            maintained by fireball ally || donate alchemica and items{' '}
            <a href={`https://fireball.gg/client/${DONATE_ADDRESS}`}> { '>>'} here {'<< '} </a>
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
            <IconButton className={classes.btn} href='https://simpleanalytics.com/fireball.gg' target='_blank'>
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
              href='https://discord.gg/etvDAXtTrg'
              target='_blank'
            >
              <DiscordIcon />
            </IconButton>
            <IconButton className={classes.btn} href='https://twitter.com/fireball_gg' target='_blank'>
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
