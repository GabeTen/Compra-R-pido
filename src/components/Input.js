import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './IconButton';
import { colors, radius, MIN_TOUCH } from '../theme';

export default function Input({ label, error, hint, required, secureTextEntry, ...props }) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={{ color: colors.danger }}> *</Text>}
      </Text>
      <View style={[styles.field, focused && styles.focused, !!error && styles.errorBorder]}>
        <TextInput
          accessibilityLabel={required ? `${label} (obrigatório)` : label}
          accessibilityHint={hint}
          placeholderTextColor={colors.placeholder}
          autoCapitalize="none"
          style={styles.input}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {secureTextEntry && (
          <IconButton icon={hidden ? 'eye-outline' : 'eye-off-outline'} label={hidden ? 'Mostrar senha' : 'Ocultar senha'} onPress={() => setHidden((h) => !h)} />
        )}
      </View>
      {!!hint && !error && <Text style={styles.hint}>{hint}</Text>}
      {!!error && (
        <View style={styles.errRow} accessibilityLiveRegion="polite">
          <Ionicons name="alert-circle" size={16} color={colors.danger} />
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { color: colors.ink, fontWeight: '600', fontSize: 15, marginBottom: 6 },
  field: { flexDirection: 'row', alignItems: 'center', minHeight: 50, borderRadius: radius.md, borderWidth: 2, borderColor: colors.inputBorder, backgroundColor: '#fff', paddingLeft: 14, paddingRight: 4 },
  focused: { borderColor: colors.navy },
  errorBorder: { borderColor: colors.danger },
  input: { flex: 1, minHeight: MIN_TOUCH, fontSize: 16, color: colors.ink, outlineWidth: 0 },
  hint: { color: colors.muted, fontSize: 13, marginTop: 4 },
  errRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  error: { color: colors.danger, fontSize: 13, flex: 1 },
});
