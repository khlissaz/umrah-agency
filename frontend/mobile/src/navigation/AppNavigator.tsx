import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

// Screens
import PilgrimApp from '../screens/PilgrimApp';
import ItineraryScreen from '../screens/ItineraryScreen';
import PermitsScreen from '../screens/PermitsScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import QRCodeScreen from '../screens/QRCodeScreen';
import GroupScreen from '../screens/GroupScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Itinerary':
              iconName = 'schedule';
              break;
            case 'Permits':
              iconName = 'verified-user';
              break;
            case 'Map':
              iconName = 'map';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={PilgrimApp}
        options={{ tabBarLabel: t('nav.home') }}
      />
      <Tab.Screen 
        name="Itinerary" 
        component={ItineraryScreen}
        options={{ tabBarLabel: t('nav.itinerary') }}
      />
      <Tab.Screen 
        name="Permits" 
        component={PermitsScreen}
        options={{ tabBarLabel: t('nav.permits') }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{ tabBarLabel: t('nav.map') }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: t('nav.profile') }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 280,
        },
        drawerActiveTintColor: '#10B981',
        drawerInactiveTintColor: '#6B7280',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#10B981',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{
          drawerLabel: t('nav.home'),
          drawerIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          title: 'Omra Journey',
        }}
      />
      <Drawer.Screen 
        name="Group" 
        component={GroupScreen}
        options={{
          drawerLabel: t('nav.group'),
          drawerIcon: ({ color, size }) => (
            <Icon name="group" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="QRCode" 
        component={QRCodeScreen}
        options={{
          drawerLabel: t('nav.qrcode'),
          drawerIcon: ({ color, size }) => (
            <Icon name="qr-code" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Emergency" 
        component={EmergencyScreen}
        options={{
          drawerLabel: t('nav.emergency'),
          drawerIcon: ({ color, size }) => (
            <Icon name="emergency" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          drawerLabel: t('nav.notifications'),
          drawerIcon: ({ color, size }) => (
            <Icon name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          drawerLabel: t('nav.settings'),
          drawerIcon: ({ color, size }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}