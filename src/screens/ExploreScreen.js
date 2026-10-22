import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import Chip from '../components/Chip';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useLayout, fillRows } from '../utils/layout';
import { useLoading, SKELETONS } from '../utils/useLoading';
import { colors, radius, centered } from '../theme';

const FILTERS = ['Todos', ...CATEGORIES];

export default function ExploreScreen({ navigation, route }) {
  const { addWithFeedback } = useApp();
  const { columns } = useLayout();
  const loading = useLoading(600);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');

  useEffect(() => {
    if (route.params?.categoria) setCategory(route.params.categoria);
  }, [route.params?.categoria]);

  const data = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === 'Todos' || p.category === category) &&
          p.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query, category]
  );

  const clear = () => {
    setQuery('');
    setCategory('Todos');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <View style={[centered(1120), { paddingHorizontal: 16 }]}>
        <View style={styles.search}>
          <Ionicons name="search" size={20} color={colors.muted} />
          <TextInput
            accessibilityLabel="Buscar produtos"
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar produtos"
            placeholderTextColor={colors.placeholder}
            returnKeyType="search"
            style={styles.input}
          />
          {!!query && <IconButton icon="close-circle" label="Limpar busca" onPress={() => setQuery('')} color={colors.muted} />}
        </View>
      </View>

      <FlatList
        horizontal
        data={FILTERS}
        keyExtractor={(f) => f}
        showsHorizontalScrollIndicator={false}
        style={[{ flexGrow: 0, flexShrink: 0 }, centered(1120)]}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 8 }}
        renderItem={({ item }) => (
          <Chip label={item} selected={item === category} onPress={() => setCategory(item)} style={{ marginRight: 8 }} />
        )}
      />

      <Text style={[styles.count, centered(1120)]} accessibilityLiveRegion="polite">
        {loading ? 'Carregando produtos…' : `${data.length} ${data.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`}
      </Text>

      <FlatList
        key={columns}
        data={loading ? fillRows(SKELETONS, columns) : fillRows(data, columns)}
        keyExtractor={(p) => String(p.id)}
        numColumns={columns}
        initialNumToRender={6}
        windowSize={7}
        contentContainerStyle={[{ paddingHorizontal: 10, paddingBottom: 24 }, centered(1120)]}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color={colors.navy} />
            <Text accessibilityRole="header" style={styles.emptyTitle}>Nada encontrado</Text>
            <Text style={styles.emptyText}>Tente outra palavra ou escolha outra categoria.</Text>
            <Button title="Limpar busca e filtros" onPress={clear} style={{ marginTop: 16 }} />
          </View>
        }
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
    </View>
  );
}

const styles = StyleSheet.create({
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginTop: 16, marginBottom: 10, paddingLeft: 14, paddingRight: 2, minHeight: 50, borderRadius: radius.pill, borderWidth: 2, borderColor: colors.inputBorder },
  input: { flex: 1, marginLeft: 8, fontSize: 16, color: colors.ink, minHeight: 44, outlineWidth: 0 },
  count: { color: colors.muted, fontSize: 14, paddingHorizontal: 16, marginBottom: 6 },
  empty: { alignItems: 'center', marginTop: 40, paddingHorizontal: 30 },
  emptyTitle: { color: colors.ink, fontSize: 22, fontWeight: '800', marginTop: 12 },
  emptyText: { color: colors.muted, textAlign: 'center', marginTop: 4 },
});
