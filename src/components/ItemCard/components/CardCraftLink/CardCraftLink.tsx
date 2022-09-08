import { Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import classNames from 'classnames';

import { CommonUtils } from 'utils';

import { cardCraftLinkStyles } from './styles';

interface CardCraftLinkProps {
    name: string;
    className?: string;
}

export function CardCraftLink({ name, className }: CardCraftLinkProps) {
    const classes = cardCraftLinkStyles();

    return (
        <Link
            className={classNames(classes.link, className)}
            href={`/craft?selected=${CommonUtils.stringToKey(name.trim(), '-')}`}
            target='_blank'
        >
            Craft <OpenInNewIcon className={classes.icon} />
        </Link>
    );
}
