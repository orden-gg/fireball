import { useState } from 'react';

import classNames from 'classnames';

import placeholder from 'assets/images/navigation/guilds.jpg';

import { guildLogoStyles } from './styles';

interface GuildLogoProps {
  logo: string;
  className: string;
}

export function GuildLogo({ logo, className }: GuildLogoProps) {
  const classes = guildLogoStyles();

  const [isNoGuildLogo, setIsNoGuildLogo] = useState(false);

  const handleImageError = () => {
    setIsNoGuildLogo(true);
  };

  return (
    <img
      src={!isNoGuildLogo ? logo : placeholder}
      onError={handleImageError}
      alt='guild logo'
      className={classNames(className, isNoGuildLogo && classes.isNoGuildLogo)}
    />
  );
}
