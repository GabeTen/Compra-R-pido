import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { SELLERS } from '../data/products';
import { distanceKm } from '../utils/format';
import { colors, radius, centered } from '../theme';

const MESSAGES = {
  idle: 'Use sua localização para ver os vendedores mais perto de você. Ela só é usada nesta tela.',
  denied: 'Sem permissão de localização. Libere o acesso nas configurações do aparelho e tente novamente.',
  error: 'Não foi possível obter sua localização. Verifique se o GPS está ligado e tente novamente.',
};

export default function NearbyScreen() {
  const [sellers, setSellers] = useState([]);
  const [status, setStatus] = useState('idle');

  const locate = async () => {
    setStatus('loading');
    try {
      const { status: perm } = await Location.requestForegroundPermissionsAsync();
      if (perm !== 'granted') return setStatus('denied');
      const { coords } = await Location.getCurrentPositionAsync({});
      const list = SELLERS.map((s) => ({
        ...s,
        km: distanceKm(coords, { latitude: coords.latitude + s.dLat, longitude: coords.longitude + s.dLng }),
      })).sort((a, b) => a.km - b.km);
      setSellers(list);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const failed = status === 'denied' || status === 'error';
  const buttonTitle = status === 'done' ? 'Atualizar localização' : failed ? 'Tentar novamente' : 'Usar minha localização';

  const empty =
    status === 'loading' ? (
      <View style={styles.state} accessibilityLiveRegion="polite">
        <ActivityIndicator color={colors.navy} size="large" />
        <Text style={styles.stateText}>Buscando vendedores próximos…</Text>
      </View>
    ) : (
      <View style={styles.state} accessibilityLiveRegion="polite">
        <Ionicons name={failed ? 'alert-circle-outline' : 'location-outline'} size={48} color={failed ? colors.danger : colors.navy} />
        <Text style={[styles.stateText, failed && { color: colors.danger }]}>{MESSAGES[status] ?? MESSAGES.idle}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={sellers}
        keyExtractor={(s) => s.id}
        contentContainerStyle={[{ padding: 16 }, centered(720)]}
        ListHeaderComponent={<Button title={buttonTitle} onPress={locate} loading={status === 'loading'} style={{ marginBottom: 16 }} />}
        ListEmptyComponent={empty}
        renderItem={({ item }) => (
          <View style={styles.row} accessible accessibilityLabel={`${item.name}, ${item.category}, a ${item.km.toFixed(1).replace('.', ',')} quilômetros`}>
            <View style={styles.icon}><Ionicons name="storefront-outline" size={22} color={colors.navy} /></View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.cat}>{item.category}</Text>
            </View>
            <Text style={styles.km}>{item.km.toFixed(1).replace('.', ',')} km</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  state: { alignItems: 'center', marginTop: 30, paddingHorizontal: 20, gap: 12 },
  stateText: { color: colors.muted, textAlign: 'center', fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: radius.md, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  icon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center' },
  name: { color: colors.ink, fontWeight: '700', fontSize: 16 },
  cat: { color: colors.muted, fontSize: 13 },
  km: { color: colors.navy, fontWeight: '800' },
});
