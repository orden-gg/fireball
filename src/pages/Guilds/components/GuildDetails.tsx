import { useState } from 'react';

import { Button, Typography } from '@mui/material';

import { CustomModal } from 'components/CustomModal/CustomModal';

import { guildDetailsStyles } from '../styles';
import { GuildWearables } from './GuildWearables';

export function GuildsDetails({ guild }: { guild: CustomAny }) {
  const classes = guildDetailsStyles();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  if (!guild?.description?.length && !guild?.wearables.length) {
    return <></>;
  }

  return (
    <>
      <div className={classes.detailsWrapper}>
        <Button variant='contained' className={classes.detailsButton} onClick={() => setModalOpen(true)}>
          More Details
        </Button>
      </div>

      <CustomModal modalOpen={modalOpen} setModalOpen={setModalOpen} className={classes.modal}>
        <ul className={classes.detailsList}>
          {guild.description?.map((item: CustomAny, index: number) => (
            <li className={classes.detailsItem} key={index}>
              <p className={classes.detailTitle}>{item.title}</p>
              <div className={classes.detailBody}>
                <Typography className={classes.detailText}>{item.text}</Typography>
              </div>
            </li>
          ))}
          {guild.wearables?.length > 0 && (
            <li className={classes.detailsItem}>
              <p className={classes.detailTitle}>Guild wearables</p>
              <div className={classes.detailBody}>
                <div className={classes.guildWearables}>
                  {<GuildWearables wearables={guild.wearables} className={classes.guildWearable} />}
                </div>
              </div>
            </li>
          )}
        </ul>
      </CustomModal>
    </>
  );
}
