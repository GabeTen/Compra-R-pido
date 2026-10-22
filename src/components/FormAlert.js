import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';

const TONES = {
  error: { bg: colors.dangerSoft, color: colors.danger, icon: 'alert-circle' },
  success: { bg: colors.successSoft, color: colors.success, icon: 'checkmark-circle' },
};

export default function FormAlert({ message, type = 'error' }) {
  if (!message) return null;
  const t = TONES[type];
  return (
    <View style={[styles.box, { backgroundColor: t.bg, borderColor: t.color }]} accessibilityRole="alert" accessibilityLiveRegion="assertive">
      <Ionicons name={t.icon} size={20} color={t.color} />
      <Text style={[styles.text, { color: t.color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 2, borderRadius: radius.md, padding: 12, marginBottom: 16 },
  text: { flex: 1, fontSize: 14, fontWeight: '600' },
});
