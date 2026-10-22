import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { colors, centered } from '../theme';

export default function OrderSuccessScreen({ route, navigation }) {
  const { number, paid, payment } = route.params;
  return (
    <View style={styles.container}>
      <View style={[centered(420), { alignItems: 'center' }]}>
        <Ionicons name="checkmark-circle" size={96} color={colors.success} />
        <Text accessibilityRole="header" style={styles.title}>Pedido confirmado!</Text>
        <Text style={styles.text}>Pedido {number}</Text>
        <Text style={styles.text}>Pagamento via {payment} · {paid}</Text>
        <Text style={[styles.text, { marginTop: 12, textAlign: 'center' }]}>Os vendedores já foram avisados e vão preparar o envio.</Text>
        <Button title="Continuar comprando" onPress={() => navigation.popToTop()} style={{ marginTop: 28, alignSelf: 'stretch' }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: colors.ink, fontSize: 28, fontWeight: '800', marginTop: 12, marginBottom: 8 },
  text: { color: colors.muted, fontSize: 16 },
});
