import { ReactComponent as Placeholder } from 'assets/images/icons/ghst.svg';
import classNames from 'classnames';

interface GuildLogoProps {
  logo: string;
  className: string;
}

export function GuildLogo({ logo, className }: GuildLogoProps) {
  try {
    const logoUrl = require(`assets/images/guilds/${logo}`).default;

    return <img src={logoUrl} className={className} alt='guild logo' />;
  } catch (error) {
    return <Placeholder className={classNames(className, 'placeholder')} />;
  }
}
