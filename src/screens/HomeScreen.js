import React from 'react';
import { View, Text, FlatList, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import Chip from '../components/Chip';
import SkeletonCard from '../components/SkeletonCard';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useLayout, fillRows } from '../utils/layout';
import { useLoading, SKELETONS } from '../utils/useLoading';
import { colors, radius, centered } from '../theme';

const TOP = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 8);
const MOSAIC = PRODUCTS.slice(0, 6);
const PERKS = [
  { icon: 'cube-outline', title: 'Frete grátis', text: 'Em compras acima de R$ 300' },
  { icon: 'shield-checkmark-outline', title: 'Compra segura', text: 'Pagamento protegido' },
  { icon: 'refresh-outline', title: 'Troca fácil', text: 'Até 7 dias após o recebimento' },
];

export default function HomeScreen({ navigation }) {
  const { user, addWithFeedback } = useApp();
  const loading = useLoading();
  const { columns, isWide } = useLayout();

  const header = (
    <View>
      <Text style={styles.hello}>{user ? `Olá, ${user.name.split(' ')[0]} 👋` : 'Bem-vindo ao Compra Rápido 👋'}</Text>
      <View style={[styles.banner, isWide && styles.bannerWide]}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTag}>Semana de ofertas</Text>
          <Text style={[styles.bannerTitle, isWide && styles.bannerTitleWide]}>Tudo que você precisa, de quem faz com cuidado.</Text>
          <Text style={styles.bannerSub}>Mais de 200 vendedores independentes em um só lugar.</Text>
          <Button title="Explorar produtos" onPress={() => navigation.navigate('Explorar')} style={{ alignSelf: 'flex-start', height: 44 }} />
        </View>
        {isWide && (
          <View style={styles.mosaic}>
            {MOSAIC.map((p) => <ProductImage key={p.id} product={p} style={styles.mosaicItem} />)}
          </View>
        )}
      </View>

      <Text accessibilityRole="header" style={styles.section}>Categorias</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 6 }}>
        {CATEGORIES.map((c) => (
          <Chip key={c} label={c} onPress={() => navigation.navigate('Explorar', { categoria: c })} style={{ marginRight: 8 }} />
        ))}
      </ScrollView>

      <View style={styles.sectionRow}>
        <Text accessibilityRole="header" style={styles.section}>Mais bem avaliados</Text>
        <Pressable accessibilityRole="link" onPress={() => navigation.navigate('Explorar', { categoria: 'Todos' })} style={styles.linkBox}>
          <Text style={styles.link}>Ver todos</Text>
        </Pressable>
      </View>
    </View>
  );

  const footer = (
    <View style={[styles.perks, isWide && { flexDirection: 'row' }]}>
      {PERKS.map((p) => (
        <View key={p.title} style={styles.perk}>
          <Ionicons name={p.icon} size={28} color={colors.navy} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.perkTitle}>{p.title}</Text>
            <Text style={styles.perkText}>{p.text}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <FlatList
      key={columns}
      style={{ backgroundColor: colors.cream }}
      data={fillRows(loading ? SKELETONS : TOP, columns)}
      keyExtractor={(p) => String(p.id)}
      numColumns={columns}
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      contentContainerStyle={[{ paddingHorizontal: 10, paddingBottom: 24 }, centered(1120)]}
      renderItem={({ item }) =>
        item.skeleton ? (
          <SkeletonCard />
        ) : item.empty ? (
          <View style={{ flex: 1, margin: 6 }} />
        ) : (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
            onAdd={() => addWithFeedback(navigation, item)}
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  hello: { color: colors.ink, fontSize: 20, fontWeight: '700', marginHorizontal: 6, marginTop: 12, marginBottom: 10 },
  banner: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: 20, margin: 6 },
  bannerWide: { flexDirection: 'row', alignItems: 'center', padding: 32 },
  bannerTag: { color: colors.ink, fontWeight: '600', marginBottom: 6 },
  bannerTitle: { color: colors.ink, fontSize: 26, fontWeight: '800', lineHeight: 31 },
  bannerTitleWide: { fontSize: 40, lineHeight: 46 },
  bannerSub: { color: colors.ink, marginVertical: 14 },
  mosaic: { width: 342, flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginLeft: 24 },
  mosaicItem: { width: 108, height: 108, borderRadius: 14 },
  section: { color: colors.ink, fontSize: 20, fontWeight: '800', marginHorizontal: 6, marginTop: 18, marginBottom: 10 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: 8 },
  linkBox: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 6 },
  link: { color: colors.navy, fontWeight: '700', textDecorationLine: 'underline' },
  chip: { borderWidth: 2, borderColor: colors.navy, borderRadius: radius.pill, paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, backgroundColor: '#fff' },
  chipText: { color: colors.navy, fontWeight: '600' },
  perks: { gap: 10, margin: 6, marginTop: 18 },
  perk: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: 16 },
  perkTitle: { color: colors.ink, fontWeight: '700', fontSize: 16 },
  perkText: { color: colors.muted, fontSize: 13, marginTop: 2 },
});
