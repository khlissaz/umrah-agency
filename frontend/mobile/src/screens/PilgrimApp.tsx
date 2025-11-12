// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
//   RefreshControl,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import LinearGradient from 'react-native-linear-gradient';
// import { useTranslation } from 'react-i18next';

// interface PilgrimData {
//   id: string;
//   name: string;
//   groupName: string;
//   packageName: string;
//   status: 'confirmed' | 'in_progress' | 'completed';
//   departureDate: Date;
//   returnDate: Date;
//   currentLocation: string;
//   nextActivity: {
//     name: string;
//     time: string;
//     location: string;
//     type: 'ritual' | 'transport' | 'meal' | 'rest';
//   };
//   permits: {
//     haram: { status: 'active' | 'expired' | 'pending'; validUntil?: Date };
//     nabawi: { status: 'active' | 'expired' | 'pending'; validUntil?: Date };
//   };
//   itinerary: {
//     day: number;
//     date: Date;
//     activities: Array<{
//       time: string;
//       name: string;
//       location: string;
//       type: string;
//       completed: boolean;
//     }>;
//   }[];
// }

// export default function PilgrimApp() {
//   const { t, i18n } = useTranslation();
//   const [pilgrimData, setPilgrimData] = useState<PilgrimData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     loadPilgrimData();
//   }, []);

//   const loadPilgrimData = async () => {
//     try {
//       // Simulate API call
//       setTimeout(() => {
//         setPilgrimData({
//           id: 'P-2024-001',
//           name: 'Ahmed Al-Rashid',
//           groupName: 'Ramadan Umrah Group 2024',
//           packageName: 'Premium Umrah Experience',
//           status: 'in_progress',
//           departureDate: new Date('2024-03-15'),
//           returnDate: new Date('2024-03-25'),
//           currentLocation: 'Makkah, Saudi Arabia',
//           nextActivity: {
//             name: 'Tawaf Al-Umrah',
//             time: '14:30',
//             location: 'Masjid Al-Haram',
//             type: 'ritual'
//           },
//           permits: {
//             haram: { status: 'active', validUntil: new Date('2024-03-20') },
//             nabawi: { status: 'pending' }
//           },
//           itinerary: [
//             {
//               day: 1,
//               date: new Date('2024-03-15'),
//               activities: [
//                 { time: '08:00', name: 'Departure from Airport', location: 'Jeddah Airport', type: 'transport', completed: true },
//                 { time: '12:00', name: 'Check-in Hotel', location: 'Hilton Makkah', type: 'rest', completed: true },
//                 { time: '14:30', name: 'Tawaf Al-Umrah', location: 'Masjid Al-Haram', type: 'ritual', completed: false },
//                 { time: '16:00', name: 'Sa\'i', location: 'Masjid Al-Haram', type: 'ritual', completed: false },
//                 { time: '19:00', name: 'Group Dinner', location: 'Hotel Restaurant', type: 'meal', completed: false }
//               ]
//             }
//           ]
//         });
//         setLoading(false);
//       }, 1000);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to load pilgrim data');
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadPilgrimData();
//     setRefreshing(false);
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'confirmed': return '#3B82F6';
//       case 'in_progress': return '#10B981';
//       case 'completed': return '#6B7280';
//       default: return '#6B7280';
//     }
//   };

//   const getActivityIcon = (type: string) => {
//     switch (type) {
//       case 'ritual': return 'place-of-worship';
//       case 'transport': return 'directions-bus';
//       case 'meal': return 'restaurant';
//       case 'rest': return 'hotel';
//       default: return 'event';
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (!pilgrimData) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>No pilgrim data found</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         style={styles.scrollView}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {/* Header */}
//         <LinearGradient
//           colors={['#10B981', '#059669']}
//           style={styles.header}
//         >
//           <View style={styles.headerContent}>
//             <View style={styles.pilgrimInfo}>
//               <Text style={styles.welcomeText}>Welcome</Text>
//               <Text style={styles.pilgrimName}>{pilgrimData.name}</Text>
//               <Text style={styles.groupName}>{pilgrimData.groupName}</Text>
//             </View>
//             <View style={styles.statusBadge}>
//               <Text style={[styles.statusText, { color: getStatusColor(pilgrimData.status) }]}>
//                 {pilgrimData.status.replace('_', ' ').toUpperCase()}
//               </Text>
//             </View>
//           </View>
//         </LinearGradient>

//         {/* Current Location */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="location-on" size={24} color="#10B981" />
//             <Text style={styles.cardTitle}>Current Location</Text>
//           </View>
//           <Text style={styles.locationText}>{pilgrimData.currentLocation}</Text>
//         </View>

//         {/* Next Activity */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="schedule" size={24} color="#F59E0B" />
//             <Text style={styles.cardTitle}>Next Activity</Text>
//           </View>
//           <View style={styles.activityCard}>
//             <View style={styles.activityIcon}>
//               <Icon 
//                 name={getActivityIcon(pilgrimData.nextActivity.type)} 
//                 size={24} 
//                 color="#10B981" 
//               />
//             </View>
//             <View style={styles.activityDetails}>
//               <Text style={styles.activityName}>{pilgrimData.nextActivity.name}</Text>
//               <Text style={styles.activityTime}>{pilgrimData.nextActivity.time}</Text>
//               <Text style={styles.activityLocation}>{pilgrimData.nextActivity.location}</Text>
//             </View>
//           </View>
//         </View>

//         {/* Permits */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="verified-user" size={24} color="#8B5CF6" />
//             <Text style={styles.cardTitle}>Permits</Text>
//           </View>
//           <View style={styles.permitsContainer}>
//             <View style={styles.permitCard}>
//               <Text style={styles.permitTitle}>Haram Permit</Text>
//               <View style={[styles.permitStatus, { 
//                 backgroundColor: pilgrimData.permits.haram.status === 'active' ? '#10B981' : '#F59E0B' 
//               }]}>
//                 <Text style={styles.permitStatusText}>
//                   {pilgrimData.permits.haram.status.toUpperCase()}
//                 </Text>
//               </View>
//               {pilgrimData.permits.haram.validUntil && (
//                 <Text style={styles.permitExpiry}>
//                   Valid until: {pilgrimData.permits.haram.validUntil.toLocaleDateString()}
//                 </Text>
//               )}
//             </View>
            
//             <View style={styles.permitCard}>
//               <Text style={styles.permitTitle}>Nabawi Permit</Text>
//               <View style={[styles.permitStatus, { 
//                 backgroundColor: pilgrimData.permits.nabawi.status === 'active' ? '#10B981' : '#F59E0B' 
//               }]}>
//                 <Text style={styles.permitStatusText}>
//                   {pilgrimData.permits.nabawi.status.toUpperCase()}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Today's Itinerary */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="today" size={24} color="#3B82F6" />
//             <Text style={styles.cardTitle}>Today's Schedule</Text>
//           </View>
//           {pilgrimData.itinerary[0]?.activities.map((activity, index) => (
//             <View key={index} style={styles.itineraryItem}>
//               <View style={styles.timeContainer}>
//                 <Text style={styles.activityTime}>{activity.time}</Text>
//               </View>
//               <View style={[styles.activityIndicator, { 
//                 backgroundColor: activity.completed ? '#10B981' : '#E5E7EB' 
//               }]}>
//                 <Icon 
//                   name={activity.completed ? 'check' : getActivityIcon(activity.type)} 
//                   size={16} 
//                   color={activity.completed ? '#FFFFFF' : '#6B7280'} 
//                 />
//               </View>
//               <View style={styles.activityContent}>
//                 <Text style={[styles.activityName, { 
//                   textDecorationLine: activity.completed ? 'line-through' : 'none',
//                   color: activity.completed ? '#6B7280' : '#111827'
//                 }]}>
//                   {activity.name}
//                 </Text>
//                 <Text style={styles.activityLocation}>{activity.location}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Quick Actions */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Quick Actions</Text>
//           <View style={styles.actionsGrid}>
//             <TouchableOpacity style={styles.actionButton}>
//               <Icon name="qr-code" size={32} color="#10B981" />
//               <Text style={styles.actionText}>QR Code</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity style={styles.actionButton}>
//               <Icon name="map" size={32} color="#3B82F6" />
//               <Text style={styles.actionText}>Map</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity style={styles.actionButton}>
//               <Icon name="phone" size={32} color="#F59E0B" />
//               <Text style={styles.actionText}>Emergency</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity style={styles.actionButton}>
//               <Icon name="help" size={32} color="#8B5CF6" />
//               <Text style={styles.actionText}>Help</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#6B7280',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     fontSize: 18,
//     color: '#EF4444',
//   },
//   header: {
//     padding: 20,
//     paddingTop: 10,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//   },
//   pilgrimInfo: {
//     flex: 1,
//   },
//   welcomeText: {
//     fontSize: 16,
//     color: '#FFFFFF',
//     opacity: 0.8,
//   },
//   pilgrimName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginTop: 4,
//   },
//   groupName: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     opacity: 0.9,
//     marginTop: 2,
//   },
//   statusBadge: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     margin: 16,
//     marginTop: 8,
//     padding: 16,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginLeft: 8,
//   },
//   locationText: {
//     fontSize: 16,
//     color: '#6B7280',
//   },
//   activityCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F9FAFB',
//     padding: 12,
//     borderRadius: 8,
//   },
//   activityIcon: {
//     width: 48,
//     height: 48,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   activityDetails: {
//     flex: 1,
//   },
//   activityName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   activityTime: {
//     fontSize: 14,
//     color: '#F59E0B',
//     fontWeight: '500',
//     marginTop: 2,
//   },
//   activityLocation: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   permitsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   permitCard: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//     padding: 12,
//     borderRadius: 8,
//     marginHorizontal: 4,
//   },
//   permitTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 8,
//   },
//   permitStatus: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     alignSelf: 'flex-start',
//   },
//   permitStatusText: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   permitExpiry: {
//     fontSize: 12,
//     color: '#6B7280',
//     marginTop: 4,
//   },
//   itineraryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   timeContainer: {
//     width: 60,
//     alignItems: 'center',
//   },
//   activityIndicator: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 12,
//   },
//   activityContent: {
//     flex: 1,
//   },
//   actionsGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginTop: 12,
//   },
//   actionButton: {
//     width: '48%',
//     backgroundColor: '#F9FAFB',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   actionText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#111827',
//     marginTop: 8,
//   },
// });