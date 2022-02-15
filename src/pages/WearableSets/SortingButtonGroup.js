import { useCallback } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ghst from '../../assets/images/ghst-doubleside.gif';
import styles from './styles';

export default function SortingButtonGroup({ value, onChange }) {
	const classes = styles();
	const handleChange = useCallback((evt, value) => {
		onChange(value)
	}, [onChange])
	return (
		<ToggleButtonGroup
			value={value}
			exclusive
			onChange={handleChange}
			color='primary'
			aria-label='gotchis sort'
			// fullWidth
			size={'small'}
		>
			<ToggleButton className={classes.toggleItem} value={'priceInGhst-asc'} aria-label='modified rarity score'>
				<img src={ghst} alt='ghst' />
				<ArrowDownwardIcon />
			</ToggleButton>
			<ToggleButton className={classes.toggleItem} value={'priceInGhst-desc'} aria-label='modified rarity score'>
				<img src={ghst} alt='ghst' />
				<ArrowUpwardIcon />
			</ToggleButton>
		</ToggleButtonGroup>
	)
}