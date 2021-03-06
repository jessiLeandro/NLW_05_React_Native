import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confimation'
// import { PlantSelect } from '../pages/PlantSelect'

import colors from '../styles/colors'
import { PlantSave } from '../pages/PlantSave'
// import { MyPlants } from '../pages/MyPlants'
import AuthRoutes from './tab.routes'

const stackRoutes = createStackNavigator()

const routes = [
  {
    name: 'Welcome',
    component: Welcome
  },
  {
    name: 'UserIdentificationer',
    component: UserIdentification
  },
  {
    name: 'Confirmation',
    component: Confirmation
  },
  {
    name: 'PlantSelect',
    component: AuthRoutes
    // component: PlantSelect
  },
  {
    name: 'PlantSave',
    component: PlantSave
  },
  {
    name: 'MyPlants',
    component: AuthRoutes
  }
]

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}>
    {routes.map(({ name, component }, index) => (
      <stackRoutes.Screen key={index} name={name} component={component} />
    ))}
  </stackRoutes.Navigator>
)

export default AppRoutes
