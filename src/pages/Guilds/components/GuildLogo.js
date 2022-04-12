import classNames from 'classnames';

import { ReactComponent as Placeholder } from 'assets/images/icons/ghst.svg';

export default function GuildLogo({ logo, className }) {
    try {
        const logoUrl = require(`assets/images/guilds/${logo}`).default;

        return <img src={logoUrl} className={className} alt='guild logo' />
    } catch (error) {
        console.log(error);

        return <Placeholder className={classNames(className, 'placeholder')} />;
    }
}
