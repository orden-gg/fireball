import classNames from 'classnames';

import { ReactComponent as Placeholder } from 'assets/images/icons/ghst.svg';

interface GuildLogoProps {
  logo: string;
  className: string;
}

export function GuildLogo({ logo, className }: GuildLogoProps) {
  try {
    return <img src={logo} className={className} alt='guild logo' />;
  } catch (error) {
    return <Placeholder className={classNames(className, 'placeholder')} />;
  }
}
