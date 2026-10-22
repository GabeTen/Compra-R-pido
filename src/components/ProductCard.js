import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductImage from './ProductImage';
import IconButton from './IconButton';
import { colors, radius } from '../theme';
import { money } from '../utils/format';

function ProductCard({ product, onPress, onAdd }) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${product.name}, ${money(product.price)}, nota ${product.rating.toFixed(1)}, vendido por ${product.seller}`}
        accessibilityHint="Abre os detalhes do produto"
        style={({ hovered }) => hovered && { backgroundColor: colors.tint }}
      >
        <ProductImage product={product} style={styles.image} />
        <View style={styles.body}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          <View style={styles.row}>
            <Ionicons name="star" size={13} color={colors.star} />
            <Text style={styles.meta}> {product.rating.toFixed(1)} · {product.seller}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{money(product.price)}</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.addWrap}>
        <IconButton variant="solid" icon="add" label={`Adicionar ${product.name} ao carrinho`} onPress={onAdd} />
      </View>
    </View>
  );
}

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  card: { flex: 1, margin: 6, backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  image: { width: '100%', aspectRatio: 1 },
  body: { padding: 10, paddingBottom: 8 },
  category: { color: colors.muted, fontSize: 13 },
  name: { color: colors.ink, fontWeight: '700', fontSize: 15, marginVertical: 2, minHeight: 38 },
  row: { flexDirection: 'row', alignItems: 'center' },
  meta: { color: colors.muted, fontSize: 13 },
  priceRow: { minHeight: 44, justifyContent: 'center', paddingRight: 52 },
  price: { color: colors.navy, fontWeight: '800', fontSize: 16 },
  addWrap: { position: 'absolute', right: 8, bottom: 8 },
});
