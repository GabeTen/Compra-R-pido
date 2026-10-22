import React, { useState } from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, radius, focusRing, MIN_TOUCH } from '../theme';

const BG = { solid: colors.navy, primary: colors.primary, danger: colors.danger, outline: '#fff', ghost: 'transparent' };
const HOVER = { solid: '#142C5E', primary: '#62B1EA', danger: '#8F1E18', outline: colors.tint, ghost: colors.tint };
const FG = { solid: '#fff', danger: '#fff', primary: colors.ink, outline: colors.navy, ghost: colors.navy };

export default function Button({ title, onPress, variant = 'solid', style, disabled, loading, loadingText = 'Aguarde…', hint }) {
  const [focused, setFocused] = useState(false);
  const inactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={hint}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed, hovered }) => [
        styles.base,
        { backgroundColor: BG[variant], borderColor: variant === 'outline' ? colors.navy : 'transparent' },
        hovered && !inactive && { backgroundColor: HOVER[variant] },
        pressed && !inactive && { transform: [{ scale: 0.98 }], opacity: 0.85 },
        disabled && { opacity: 0.5 },
        focused && focusRing,
        style,
      ]}
    >
      {loading && <ActivityIndicator color={FG[variant]} style={{ marginRight: 10 }} />}
      <Text style={[styles.text, { color: FG[variant] }]}>{loading ? loadingText : title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: Math.max(MIN_TOUCH, 50), flexDirection: 'row', borderWidth: 2, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  text: { fontSize: 16, fontWeight: '700' },
});
