import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';
import { useLayout } from '../utils/layout';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import NearbyScreen from '../screens/NearbyScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import DesignSystemScreen from '../screens/DesignSystemScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TAB_ICONS = { Início: 'home', Explorar: 'search', Carrinho: 'cart', Perfil: 'person' };

function Tabs() {
  const { count } = useApp();
  const { isWide } = useLayout();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: colors.muted,
        tabBarPosition: isWide ? 'top' : 'bottom',
        tabBarActiveBackgroundColor: colors.tint,
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: colors.border, borderBottomColor: colors.border, height: isWide ? 64 : 68, paddingHorizontal: 8 },
        tabBarItemStyle: { borderRadius: 14, marginHorizontal: 6, marginVertical: 6 },
        tabBarLabelStyle: { fontSize: 14, fontWeight: '700' },
        tabBarIcon: ({ color }) => <Ionicons name={TAB_ICONS[route.name]} size={26} color={color} />,
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Explorar" component={ExploreScreen} />
      <Tab.Screen name="Carrinho" component={CartScreen} options={{ tabBarBadge: count || undefined, tabBarBadgeStyle: { backgroundColor: colors.navy } }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function DrawerContent(props) {
  const { user, logout, openLogin } = useApp();
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20, paddingBottom: 12 }}>
        <Text style={{ color: colors.navy, fontSize: 22, fontWeight: '800' }}>Compra Rápido</Text>
        <Text style={{ color: colors.muted, marginTop: 4 }}>{user ? user.email : 'Você está navegando como visitante'}</Text>
      </View>
      <DrawerItemList {...props} />
      {user ? (
        <DrawerItem label="Sair da conta" labelStyle={{ color: colors.danger }} icon={({ size }) => <Ionicons name="log-out-outline" size={size} color={colors.danger} />} onPress={logout} />
      ) : (
        <DrawerItem label="Entrar ou criar conta" icon={({ size }) => <Ionicons name="log-in-outline" size={size} color={colors.navy} />} onPress={() => openLogin(props.navigation)} />
      )}
    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(p) => <DrawerContent {...p} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.cream },
        headerTintColor: colors.navy,
        headerTitleStyle: { fontWeight: '800' },
        drawerActiveTintColor: colors.navy,
        drawerActiveBackgroundColor: '#E3EEF9',
      }}
    >
      <Drawer.Screen name="Loja" component={Tabs} options={{ title: 'Compra Rápido', drawerLabel: 'Loja', drawerIcon: ({ color, size }) => <Ionicons name="bag-handle-outline" size={size} color={color} /> }} />
      <Drawer.Screen name="Vendedores" component={NearbyScreen} options={{ title: 'Vendedores próximos', drawerIcon: ({ color, size }) => <Ionicons name="location-outline" size={size} color={color} /> }} />
      <Drawer.Screen name="DesignSystem" component={DesignSystemScreen} options={{ title: 'Design System', drawerIcon: ({ color, size }) => <Ionicons name="color-palette-outline" size={size} color={color} /> }} />
    </Drawer.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.navy, headerStyle: { backgroundColor: colors.cream }, headerTitleStyle: { fontWeight: '800' } }}>
      <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Produto' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Finalizar compra' }} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar', presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
