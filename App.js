import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './src/screens/Home';
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsCard from './src/screens/DetailsCard';
import { combineReducers, createStore } from 'redux';
import { Provider, useSelector } from 'react-redux'
import reducer from './src/reducers/reducer';
import Login from './src/screens/Login';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import Register from './src/screens/Register';
import ResetPassword from './src/screens/ResetPassword';
import Profile from './src/screens/Profile';
import Cart from './src/screens/Cart';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Favorite from './src/screens/Favorite';
import themeReducer from './src/reducers/ThemeReducer';


const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    HeaderColor: '#404040',
    TextColor: 'white',
    TabIcon: 'white',
    CardImg: 'white'
  }
}
const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    HeaderColor: 'white',
    TextColor: 'black',
    TabIcon: 'red',
    CardImg: '#ccc',
  }
}
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const rooReducer = combineReducers({
  cart: reducer,
  myDarMode: themeReducer
})
const persistedReducer = persistReducer(persistConfig, rooReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)
const Tabs = createBottomTabNavigator()

const RootHome = () => {
  const cart = useSelector(state => state.cart.cart)
  const favorite = useSelector(state => state.cart.favorite)
  const { colors } = useTheme()
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Favorite') {
            iconName = 'favorite'
          }
          else if (route.name === 'Cart') {
            iconName = 'add-shopping-cart'
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })
      }

      tabBarOptions={{
        activeTintColor: colors.TabIcon,
        inactiveTintColor: 'gray',
      }}>
      <Tabs.Screen name='Home' component={Home} />
      <Tabs.Screen name='Favorite' component={Favorite} options={{ tabBarBadge: favorite.length }} />
      <Tabs.Screen name='Cart' component={Cart} options={{ tabBarBadge: cart.length }} />
    </Tabs.Navigator>
  )
}
export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}

export function Navigation() {
  const Stack = createStackNavigator()
  const { currentUser } = useAuth()
  const currentTheme = useSelector(state => state.myDarMode)

  return (
    <NavigationContainer theme={currentTheme ? customDarkTheme : customDefaultTheme}>
      {currentUser !== null ? (
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='HomeRoute' component={RootHome} />
          <Stack.Screen name='Details' component={DetailsCard} />
          <Stack.Screen name='Profile' component={Profile} />
        </Stack.Navigator>
      ) :
        (
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='ResetPass' component={ResetPassword} />
          </Stack.Navigator>
        )}
    </NavigationContainer>

  )
}
