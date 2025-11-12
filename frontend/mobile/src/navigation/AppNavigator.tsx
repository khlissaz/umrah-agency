// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { useTranslation } from 'react-i18next';
// import {
//   Home,
//   Calendar,
//   UserCheck,
//   MapPin,
//   User,
//   Users,
//   QrCode,
//   AlertTriangle,
//   Bell,
//   Settings,
// } from 'lucide-react-native';
// import PilgrimApp from '../screens/PilgrimApp';

// // Screens
// // import ItineraryScreen from '../screens/ItineraryScreen';
// // import PermitsScreen from '../screens/PermitsScreen';
// // import MapScreen from '../screens/MapScreen';
// // import ProfileScreen from '../screens/ProfileScreen';
// // import SettingsScreen from '../screens/SettingsScreen';
// // import NotificationsScreen from '../screens/NotificationsScreen';
// // import EmergencyScreen from '../screens/EmergencyScreen';
// // import QRCodeScreen from '../screens/QRCodeScreen';
// // import GroupScreen from '../screens/GroupScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

// function TabNavigator() {
//   const { t } = useTranslation();

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           switch (route.name) {
//             case 'Home':
//               return <Home  size={size} />;
//             // case 'Itinerary':
//             //   return <Calendar color={color} size={size} />;
//             // case 'Permits':
//             //   return <UserCheck color={color} size={size} />;
//             // case 'Map':
//             //   return <MapPin color={color} size={size} />;
//             // case 'Profile':
//             //   return <User color={color} size={size} />;
//             default:
//               return <Home size={size} />;
//           }
//         },
//         tabBarActiveTintColor: '#10B981',
//         tabBarInactiveTintColor: '#6B7280',
//         tabBarStyle: {
//           backgroundColor: '#FFFFFF',
//           borderTopWidth: 1,
//           borderTopColor: '#E5E7EB',
//           paddingBottom: 5,
//           paddingTop: 5,
//           height: 60,
//         },
//         tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Home" component={PilgrimApp} options={{ tabBarLabel: t('nav.home') }} />
//       {/* <Tab.Screen name="Itinerary" component={ItineraryScreen} options={{ tabBarLabel: t('nav.itinerary') }} />
//       <Tab.Screen name="Permits" component={PermitsScreen} options={{ tabBarLabel: t('nav.permits') }} />
//       <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: t('nav.map') }} />
//       <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: t('nav.profile') }} /> */}
//     </Tab.Navigator>
//   );
// }

// function DrawerNavigator() {
//   const { t } = useTranslation();

//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerStyle: { backgroundColor: '#FFFFFF', width: 280 },
//         drawerActiveTintColor: '#10B981',
//         drawerInactiveTintColor: '#6B7280',
//         drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
//         headerStyle: { backgroundColor: '#10B981' },
//         headerTintColor: '#FFFFFF',
//         headerTitleStyle: { fontWeight: 'bold' },
//       }}
//     >
//       <Drawer.Screen
//         name="MainTabs"
//         component={TabNavigator}
//         options={{
//           drawerLabel: t('nav.home'),
//           drawerIcon: ({ color, size }) => <Home  size={size} />,
//           title: 'Omra Journey',
//         }}
//       />
//       {/* <Drawer.Screen
//         name="Group"
//         component={GroupScreen}
//         options={{
//           drawerLabel: t('nav.group'),
//           drawerIcon: ({ color, size }) => <Users color={color} size={size} />,
//         }}
//       />
//       <Drawer.Screen
//         name="QRCode"
//         component={QRCodeScreen}
//         options={{
//           drawerLabel: t('nav.qrcode'),
//           drawerIcon: ({ color, size }) => <QrCode color={color} size={size} />,
//         }}
//       />
//       <Drawer.Screen
//         name="Emergency"
//         component={EmergencyScreen}
//         options={{
//           drawerLabel: t('nav.emergency'),
//           drawerIcon: ({ color, size }) => <AlertTriangle color={color} size={size} />,
//         }}
//       />
//       <Drawer.Screen
//         name="Notifications"
//         component={NotificationsScreen}
//         options={{
//           drawerLabel: t('nav.notifications'),
//           drawerIcon: ({ color, size }) => <Bell color={color} size={size} />,
//         }}
//       />
//       <Drawer.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{
//           drawerLabel: t('nav.settings'),
//           drawerIcon: ({ color, size }) => <Settings color={color} size={size} />,
//         }}
//       /> */}
//     </Drawer.Navigator>
//   );
// }

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Main" component={DrawerNavigator} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
