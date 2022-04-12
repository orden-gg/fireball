import classNames from 'classnames';

import { ReactComponent as Placeholder } from 'assets/images/icons/ghst.svg';

export default function GuildLogo({ logo, className }) {
    return logo ?
        <img src={logo} className={className} alt='guild-logo'></img> :
        <Placeholder className={classNames(className, 'placeholder')} />;
}
