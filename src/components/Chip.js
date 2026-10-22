import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius, focusRing, MIN_TOUCH } from '../theme';

export default function Chip({ label, selected, onPress, role = 'button', style }) {
  const [focused, setFocused] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={role}
      accessibilityLabel={label}
      accessibilityState={role === 'radio' ? { checked: !!selected } : { selected: !!selected }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed, hovered }) => [
        styles.base,
        selected && styles.selected,
        hovered && !selected && { backgroundColor: colors.tint },
        pressed && { opacity: 0.7 },
        focused && focusRing,
        style,
      ]}
    >
      <Text style={[styles.text, selected && { color: '#fff' }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: MIN_TOUCH, paddingHorizontal: 18, borderWidth: 2, borderColor: colors.navy, borderRadius: radius.pill, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  selected: { backgroundColor: colors.navy },
  text: { color: colors.navy, fontWeight: '600', fontSize: 15 },
});
