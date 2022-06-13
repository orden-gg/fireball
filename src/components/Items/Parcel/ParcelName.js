import classNames from 'classnames';

import { CopyToClipboardBlock } from 'components/CopyToClipboard/CopyToClipboardBlock';
import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

export default function ParcelName({ parcel }) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles()
    };

    const size = itemUtils.getParcelSize(parcel.size);

    return (
        <CopyToClipboardBlock text={parcel.parcelHash}>
            <div className={classNames(classes.parcelName, classes.textHighlight, size)}>
                {parcel.parcelHash}
            </div>
        </CopyToClipboardBlock>
    );
}
