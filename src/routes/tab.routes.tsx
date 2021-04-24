/* eslint-disable react/display-name */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from '../styles/colors'
import { PlantSelect } from '../pages/PlantSelect'
import { MaterialIcons } from '@expo/vector-icons'
import { MyPlants } from '../pages/MyPlants'

const AppTabs = createBottomTabNavigator()

const AuthRoutes = () => {
  return (
    <AppTabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: 20,
          height: 88
        }
      }}>
      <AppTabs.Screen
        name="Nova planta"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          )
        }}
      />

      <AppTabs.Screen
        name="Minhas planta"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          )
        }}
      />
    </AppTabs.Navigator>
  )
}

export default AuthRoutes
