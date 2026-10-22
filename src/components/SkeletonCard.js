import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { colors, radius } from '../theme';

export default function SkeletonCard() {
  const o = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(o, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(o, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [o]);

  return (
    <Animated.View style={[styles.card, { opacity: o }]} accessibilityLabel="Carregando produto">
      <View style={styles.image} />
      <View style={{ padding: 10, gap: 8 }}>
        <View style={[styles.line, { width: '40%' }]} />
        <View style={[styles.line, { width: '90%', height: 16 }]} />
        <View style={[styles.line, { width: '60%' }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, margin: 6, backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden', minHeight: 250 },
  image: { width: '100%', aspectRatio: 1, backgroundColor: colors.skeleton },
  line: { height: 12, borderRadius: 6, backgroundColor: colors.skeleton },
});
