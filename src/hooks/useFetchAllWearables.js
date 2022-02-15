import { useState, useCallback } from 'react'
import thegraph from '../api/thegraph';
import itemUtils from '../utils/itemUtils';


export default function useFetchAllWearableSets() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const [wearables, setWearables] = useState({})

	const fetchAllWearableSets = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		const items = itemUtils.getIds()
			.map((id) => ({
				id: +id,
				rarity: itemUtils.getItemRarityById(id),
				rarityId: itemUtils.getItemRarityId(itemUtils.getItemRarityById(id)),
				balance: 1,
				category: id >= 126 && id <= 129 ? 2 : 0 // TODO: temporary solution to determine if item is consumable or not
			}))
		try {

			const data = await Promise.all(items
				.map(async item => { 
						const { price: priceInGhst } = await thegraph.getErc1155Price(item.id, false, item.category, 'priceInWei', 'asc')
						return {
							[item.id]: {
								...item,
								priceInGhst: priceInGhst === 0 ? Infinity : priceInGhst
							}
						}
				}))
				
			setWearables(data.reduce((r, c) => Object.assign(r, c), {}))
		} catch (error) {
			setWearables([])
			setError(error)
		}
		setIsLoading(false)
	}, [])

	return [{ isLoading, wearables, error }, fetchAllWearableSets]
}