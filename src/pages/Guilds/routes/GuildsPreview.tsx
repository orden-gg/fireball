import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Divider } from '@mui/material';
import { Box } from '@mui/system';

import { CommonUtils } from 'utils';

import { FudIcon, GhstTokenIcon, GotchiIcon, LendingIcon, WarehouseIcon } from 'components/Icons/Icons';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { GuildsContext } from '../GuildsContext';
import { GuildLogo } from '../components/GuildLogo';
import { GuildWearables } from '../components/GuildWearables';
import { styles } from '../styles';

export function GuildsPreview() {
  const classes = styles();

  const navigate = useNavigate();

  const { guilds, setGuildId } = useContext<any>(GuildsContext);

  const handleClick = (guild: any): void => {
    navigate(`${CommonUtils.stringToKey(guild.name)}`);
  };

  // TODO Use in the future or remove
  // const setNumber = amount => {
  //     if (amount !== undefined) {
  //         return amount
  //     } else {
  //         return <Skeleton  animation="wave" variant="text" className={classes.guildInfoAmountLoader} />;
  //     }
  // }

  const renderWaerables = (guild: any): JSX.Element => {
    if (guild.hasOwnProperty('wearables')) {
      return (
        <>
          <Divider className={classes.divider} />
          <GuildWearables wearables={guild.wearables} className={classes.guildWearable} tooltip='Guild wearable' />
        </>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    setGuildId(null);
  }, [setGuildId]);

  return (
    <Box className={classes.guildsWrapper}>
      <a
        className={classes.guildsTitle}
        href='https://fireball-gg.notion.site/How-to-add-guild-to-fireball-gg-a2bec3bd315c4d42961bc0148bb17c26'
        target='_blank'
        rel='noreferrer'
      >
        <span>how to add your guild</span>
        <ArrowForwardIcon fontSize='small' />
      </a>
      <ul className={classes.guildsList}>
        {guilds.map((guild: any, index: number) => (
          <Button
            className={classes.guildButton}
            disabled={!guild.members?.length}
            key={index}
            onClick={() => {
              handleClick(guild);
            }}
          >
            <div className={classes.guildLogo}>
              <GuildLogo logo={guild.logo} className={classes.guildLogoImage} />
            </div>
            <div className={classes.guildBody}>
              <p className={classes.guildName}>{guild.name}</p>
              <ul className={classes.guildInfoList}>
                <CustomTooltip title='Gotchis' followCursor placement='top'>
                  <li className={classes.guildInfoItem}>
                    <GotchiIcon className={classes.guildInfoItemIcon} />
                    <span className={classes.guildInfoAmount}>-</span>
                  </li>
                </CustomTooltip>
                <CustomTooltip title='Lendings' followCursor placement='top'>
                  <li className={classes.guildInfoItem}>
                    <LendingIcon className={classes.guildInfoItemIcon} />
                    <span className={classes.guildInfoAmount}>-</span>
                  </li>
                </CustomTooltip>
                <CustomTooltip title='Wearables' followCursor placement='top'>
                  <li className={classes.guildInfoItem}>
                    <WarehouseIcon className={classes.guildInfoItemIcon} />
                    <span className={classes.guildInfoAmount}>-</span>
                  </li>
                </CustomTooltip>
                <CustomTooltip title='Realm' followCursor placement='top'>
                  <li className={classes.guildInfoItem}>
                    <FudIcon className={classes.guildInfoItemIcon} />
                    <span className={classes.guildInfoAmount}>-</span>
                  </li>
                </CustomTooltip>
                <CustomTooltip title='Voting power' followCursor placement='top'>
                  <li className={classes.guildInfoItem}>
                    <GhstTokenIcon className={classes.guildInfoItemIcon} />
                    <span className={classes.guildInfoAmount}>-</span>
                  </li>
                </CustomTooltip>
              </ul>
              <div className={classes.guildWearables}>{renderWaerables(guild)}</div>
            </div>
          </Button>
        ))}
      </ul>
    </Box>
  );
}
