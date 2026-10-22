import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, focusRing, MIN_TOUCH } from '../theme';

export default function IconButton({ icon, label, onPress, variant = 'plain', color, iconSize = 22, style, disabled }) {
  const [focused, setFocused] = useState(false);
  const solid = variant === 'solid';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed, hovered }) => [
        styles.base,
        solid && styles.solid,
        hovered && { backgroundColor: solid ? '#142C5E' : colors.tint },
        pressed && { opacity: 0.6 },
        focused && focusRing,
        style,
      ]}
    >
      <Ionicons name={icon} size={iconSize} color={color ?? (solid ? '#fff' : colors.navy)} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { width: MIN_TOUCH, height: MIN_TOUCH, borderRadius: MIN_TOUCH / 2, alignItems: 'center', justifyContent: 'center' },
  solid: { backgroundColor: colors.navy },
});
