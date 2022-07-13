import { CountdownFormatNonZeroType, CountdownFormatZeroType } from 'shared/constants';

export interface DefaultFormatOption {
    key: CountdownFormatNonZeroType | CountdownFormatZeroType;
    isShown: boolean;
    shownIfZero: boolean;
    showIfParentIsZero?: boolean;
    parentKey?: string;
}

export interface CountdownShortFormatOption extends DefaultFormatOption {
    value: string;
}

export interface CountdownLongFormatOption extends DefaultFormatOption {
    values: string[];
}

export interface CountdownShortFormat {
    years?: CountdownShortFormatOption;
    months?: CountdownShortFormatOption;
    days?: CountdownShortFormatOption;
    hours?: CountdownShortFormatOption;
    minutes?: CountdownShortFormatOption;
    seconds?: CountdownShortFormatOption;
}

export interface CountdownLongFormat {
    years?: CountdownLongFormatOption;
    months?: CountdownLongFormatOption;
    days?: CountdownLongFormatOption;
    hours?: CountdownLongFormatOption;
    minutes?: CountdownLongFormatOption;
    seconds?: CountdownLongFormatOption;
}
