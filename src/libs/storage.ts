import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'

export interface PlantProps {
  id: string
  name: string
  about: string
  water_tips: string
  photo: string
  environments: [string]
  frequency: {
    times: number
    repeat_every: string
  }
  dateTimeNotification: Date
}

interface StoragePlantPros {
  [id: string]: {
    data: PlantProps
  }
}

export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plant')
    const oldPlant = data ? (JSON.parse(data) as StoragePlantPros) : {}

    const newPlant = {
      [plant.id]: {
        data: plant
      }
    }

    await AsyncStorage.setItem(
      '@plantmanager:plant',
      JSON.stringify({
        ...newPlant,
        ...oldPlant
      })
    )
  } catch (err) {
    throw new Error(err)
  }
}

export async function loadPlant(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plant')
    const plants = data ? (JSON.parse(data) as StoragePlantPros) : {}

    const plantsSorted = Object.keys(plants)
      .map((plantId) => ({
        ...plants[plantId].data,
        hour: format(
          new Date(plants[plantId].data.dateTimeNotification),
          'HH:mm'
        )
      }))
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(a.dateTimeNotification).getTime() / 1000)
        )
      )

    return plantsSorted
  } catch (err) {
    throw new Error(err)
  }
}
