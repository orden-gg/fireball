import { useState, useCallback } from 'react'
import thegraph from '../api/thegraph';


export default function useFetchAllWearableSets() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const [wearableSets, setWearableSets] = useState([])

	const fetchAllWearableSets = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			const data = await thegraph.getAllWearableSets()
			setWearableSets(data)
		} catch (error) {
			setWearableSets([])
			setError(error)
		}
		setIsLoading(false)
	}, [])

	return [{ isLoading, wearableSets, error }, fetchAllWearableSets]
}