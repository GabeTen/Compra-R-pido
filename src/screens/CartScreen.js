import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import ProductImage from '../components/ProductImage';
import { useApp } from '../context/AppContext';
import { FREE_SHIPPING_FROM, money } from '../utils/format';
import { colors, radius, centered } from '../theme';

export default function CartScreen({ navigation }) {
  const { items, subtotal, freight, total, changeQty, addToCart, showToast, requireAuth } = useApp();

  const decrease = (product, qty) => {
    changeQty(product.id, -1);
    if (qty === 1) {
      showToast(`${product.name} removido do carrinho.`, { actionLabel: 'Desfazer', onAction: () => addToCart(product.id, 1) });
    }
  };

  if (!items.length) {
    return (
      <View style={styles.empty}>
        <Ionicons name="cart-outline" size={64} color={colors.navy} />
        <Text accessibilityRole="header" style={styles.emptyTitle}>Seu carrinho está vazio</Text>
        <Text style={styles.emptyText}>Adicione produtos para finalizar sua compra.</Text>
        <Button title="Explorar produtos" onPress={() => navigation.navigate('Explorar')} style={{ marginTop: 16 }} />
      </View>
    );
  }

  const missing = FREE_SHIPPING_FROM - subtotal;

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={[{ padding: 16 }, centered(720)]}
        ListHeaderComponent={
          <Text style={styles.ship}>
            {missing > 0 ? `Faltam ${money(missing)} para o frete grátis.` : '🎉 Você ganhou frete grátis!'}
          </Text>
        }
        renderItem={({ item: { product, qty } }) => (
          <View style={styles.row}>
            <ProductImage product={product} style={styles.thumb} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.seller}>{product.seller}</Text>
              <Text style={styles.price}>{money(product.price * qty)}</Text>
              <View style={styles.qty}>
                <IconButton
                  icon={qty === 1 ? 'trash-outline' : 'remove'}
                  color={qty === 1 ? colors.danger : colors.navy}
                  label={qty === 1 ? `Remover ${product.name}` : `Diminuir quantidade de ${product.name}`}
                  onPress={() => decrease(product, qty)}
                />
                <Text style={styles.qtyText} accessibilityLabel={`Quantidade: ${qty}`}>{qty}</Text>
                <IconButton icon="add" label={`Aumentar quantidade de ${product.name}`} onPress={() => changeQty(product.id, 1)} />
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.summary}>
        <View style={centered(720)}>
          <Line label="Subtotal" value={money(subtotal)} />
          <Line label="Frete" value={freight ? money(freight) : 'Grátis'} />
          <Line label="Total" value={money(total)} bold />
          <Button title="Finalizar compra" onPress={() => requireAuth(navigation, () => navigation.navigate('Checkout'))} style={{ marginTop: 10 }} />
        </View>
      </View>
    </View>
  );
}

const Line = ({ label, value, bold }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
    <Text style={[styles.line, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.line, bold && styles.bold]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30, backgroundColor: colors.cream },
  emptyTitle: { color: colors.ink, fontSize: 22, fontWeight: '800', marginTop: 12 },
  emptyText: { color: colors.muted, marginTop: 4 },
  ship: { color: colors.navy, fontWeight: '600', marginBottom: 12 },
  row: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: radius.md, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  thumb: { width: 84, height: 84, borderRadius: radius.sm },
  name: { color: colors.ink, fontWeight: '700' },
  seller: { color: colors.muted, fontSize: 13 },
  price: { color: colors.navy, fontWeight: '800', marginTop: 2 },
  qty: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', marginTop: 6, borderWidth: 1.5, borderColor: colors.inputBorder, borderRadius: radius.pill },
  qtyText: { minWidth: 28, textAlign: 'center', fontWeight: '700', color: colors.ink },
  summary: { backgroundColor: '#fff', padding: 16, borderTopWidth: 1, borderColor: colors.border },
  line: { color: colors.muted, fontSize: 15 },
  bold: { color: colors.ink, fontWeight: '800', fontSize: 18 },
});
