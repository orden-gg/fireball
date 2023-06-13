import { useRef } from 'react';

import { useHoverRotation } from '../../hooks';
import {
  GuildCardAsset,
  GuildCardAssets,
  GuildCardBody,
  GuildCardFooter,
  GuildCardImage,
  GuildCardName,
  GuildCardTop
} from './components';
import { guildCardStyles } from './styles';

export function GuildCard({ children }: { children: React.ReactNode }) {
  const classes = guildCardStyles();

  const targetRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useHoverRotation({ targetRef, childRef });

  return (
    <div className={classes.guildCard} ref={targetRef}>
      <div ref={childRef} className={classes.guildCardInner}>
        {children}
      </div>
    </div>
  );
}

GuildCard.Top = GuildCardTop;
GuildCard.Image = GuildCardImage;
GuildCard.Body = GuildCardBody;
GuildCard.Name = GuildCardName;
GuildCard.AssetsList = GuildCardAssets;
GuildCard.Asset = GuildCardAsset;
GuildCard.Footer = GuildCardFooter;
