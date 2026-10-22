import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function ProductImage({ product, style }) {
  const [failed, setFailed] = useState(false);
  const source = typeof product.image === 'string' ? { uri: product.image } : product.image;

  return (
    <View accessible accessibilityRole="image" accessibilityLabel={product.name} style={[styles.box, style]}>
      {source && !failed ? (
        <Image source={source} style={styles.img} onError={() => setFailed(true)} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="image-outline" size={32} color={colors.muted} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { backgroundColor: '#fff', overflow: 'hidden' },
  img: { width: '100%', height: '100%', resizeMode: 'contain', objectFit: 'contain' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tint },
});
