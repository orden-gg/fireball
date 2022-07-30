import classNames from 'classnames';

import { Erc721Categories, HauntIds } from 'shared/constants';
import { H1OpenedPortalIcon, H1SealedPortalIcon, H2OpenedPortalIcon, H2SealedPortalIcon } from 'components/Icons/Icons';

import { styles } from './styles';

interface CardPortalImageProps {
    category: string;
    hauntId: string;
    className?: string;
}

export function CardPortalImage({ category, hauntId, className }: CardPortalImageProps) {
    const classes = styles();

    const renderPortalImage = (): JSX.Element => {
        let PortalIcon: any;

        if (hauntId === HauntIds.Haunt1) {
            PortalIcon = category === Erc721Categories.ClosedPortal ? H1SealedPortalIcon : H1OpenedPortalIcon;
        } else {
            PortalIcon = category === Erc721Categories.ClosedPortal ? H2SealedPortalIcon : H2OpenedPortalIcon;
        }

        return <PortalIcon className={classes.image} width='100%' height='100%' />;
    };

    return (
        <div className={classNames(classes.imageWrapper, className)}>
            {renderPortalImage()}
        </div>
    );
}
