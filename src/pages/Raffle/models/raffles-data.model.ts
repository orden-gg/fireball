import { DateTime } from 'luxon';

export interface RafflesData {
    id: number;
    name: string;
    type: string;
    startDate: DateTime;
    endDate: DateTime;
    tickets: number[];
    icon: string;
}
