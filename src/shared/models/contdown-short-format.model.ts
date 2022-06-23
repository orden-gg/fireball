export interface DefaultFormatOption {
    key: string;
    showIfZero: boolean;
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
