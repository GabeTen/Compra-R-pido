import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import ProductImage from '../components/ProductImage';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { money } from '../utils/format';
import { useLayout } from '../utils/layout';
import { colors, radius, centered } from '../theme';

export default function ProductDetailScreen({ route, navigation }) {
  const product = PRODUCTS.find((p) => p.id === route.params.id);
  const { addWithFeedback } = useApp();
  const { isWide } = useLayout();
  const [qty, setQty] = useState(1);

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={[centered(1000), isWide && { flexDirection: 'row', padding: 24, gap: 32 }]}>
          <View style={{ width: isWide ? '45%' : '100%' }}>
            <ProductImage product={product} style={[styles.image, isWide && { borderRadius: radius.lg }]} />
          </View>
          <View style={[styles.body, isWide && { flex: 1, padding: 0 }]}>
            <Text style={styles.category}>{product.category}</Text>
            <Text accessibilityRole="header" style={styles.name}>{product.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <Ionicons name="star" size={16} color={colors.star} />
              <Text style={styles.meta}> {product.rating.toFixed(1)} · Vendido por {product.seller}</Text>
            </View>
            <Text style={styles.price}>{money(product.price)}</Text>
            <Text style={styles.desc}>{product.description}</Text>
            <View style={styles.perks}>
              <Text style={styles.perk}>🚚 Frete grátis acima de R$ 300</Text>
              <Text style={styles.perk}>🔒 Pagamento protegido</Text>
              <Text style={styles.perk}>↩️ Troca em até 7 dias após o recebimento</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={[centered(720), { flexDirection: 'row', alignItems: 'center' }]}>
          <View style={styles.qty}>
            <IconButton icon="remove" label="Diminuir quantidade" onPress={() => setQty((q) => Math.max(1, q - 1))} disabled={qty === 1} />
            <Text style={styles.qtyText} accessibilityLabel={`Quantidade: ${qty}`}>{qty}</Text>
            <IconButton icon="add" label="Aumentar quantidade" onPress={() => setQty((q) => q + 1)} />
          </View>
          <Button title="Adicionar ao carrinho" onPress={() => addWithFeedback(navigation, product, qty)} style={{ flex: 1, marginLeft: 12 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', aspectRatio: 1 },
  body: { padding: 20 },
  category: { color: colors.muted },
  name: { color: colors.ink, fontSize: 26, fontWeight: '800' },
  meta: { color: colors.muted },
  price: { color: colors.navy, fontSize: 30, fontWeight: '800', marginVertical: 14 },
  desc: { color: colors.ink, fontSize: 16, lineHeight: 24 },
  perks: { marginTop: 20, backgroundColor: '#fff', borderRadius: radius.md, padding: 14, gap: 8, borderWidth: 1, borderColor: colors.border },
  perk: { color: colors.ink },
  footer: { padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: colors.border },
  qty: { flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: colors.navy, borderRadius: radius.md, minHeight: 50, paddingHorizontal: 2 },
  qtyText: { minWidth: 28, textAlign: 'center', fontWeight: '700', fontSize: 16, color: colors.ink },
});
