import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Divider } from '@mui/material';

import { Sorting, SortingItem, SortingListItem } from 'shared/models';
import { CustomToggleButtonGroup } from 'components/custom/CustomToggleButtonGroup';

import { styles } from './styles';

const directions: SortingListItem[] = [
    {
        name: 'desc',
        key: 'desc',
        tooltip: 'from 🔶 to 🔸',
        icon: <ArrowDownwardIcon fontSize='small' />
    },
    {
        name: 'asc',
        key: 'asc',
        tooltip: 'from 🔸 to 🔶',
        icon: <ArrowUpwardIcon fontSize='small' />
    }
];

export interface LazySortingProps extends Sorting { }

// TODO move out from Filters directory:)
export function LazySorting({ sortingList, sortingDefaults, onSortingChange }: LazySortingProps) {
    const classes = styles();

    const { type, dir }: SortingItem = sortingDefaults;

    const onSortChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, sortBy: string, sortDir: string) => {
        if (!sortBy) {
            return;
        }

        onSortingChange(sortBy, sortDir);
    };

    const onDirectionChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, sortDir: string, sortBy: string) => {
        if (!sortDir) {
            return;
        }

        onSortingChange(sortBy, sortDir);
    };

    return (
        <div className={classes.inner}>
            <CustomToggleButtonGroup
                value={type}
                onChange={(event, value) => onSortChange(event, value, dir)}
                ariaLabel='sorting'
                list={sortingList}
            />

            <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />

            <CustomToggleButtonGroup
                value={dir}
                onChange={(event, value) => onDirectionChange(event, value, type)}
                ariaLabel='sorting direction'
                list={directions}
            />
        </div>
    );
}
