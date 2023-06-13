import React from 'react';

import { guildCardTopStyles } from './styles';

export function GuildCardTop({ children }: { children: React.ReactNode }) {
  const classes = guildCardTopStyles();

  return <div className={classes.guildCardTop}>{children}</div>;
}
