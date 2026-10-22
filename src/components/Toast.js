import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './IconButton';
import { colors, radius, MIN_TOUCH } from '../theme';

const ICONS = { success: 'checkmark-circle', error: 'alert-circle', info: 'information-circle' };
const TINTS = { success: '#7FD6A8', error: '#FF9C94', info: colors.primary };

export default function Toast({ toast, onClose }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (toast) {
      anim.setValue(0);
      Animated.timing(anim, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    }
  }, [toast?.id]);

  if (!toast) return null;
  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.wrap, { opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }]}
    >
      <View style={styles.toast} accessibilityRole="alert" accessibilityLiveRegion="polite">
        <Ionicons name={ICONS[toast.type]} size={22} color={TINTS[toast.type]} />
        <Text style={styles.msg}>{toast.message}</Text>
        {!!toast.actionLabel && (
          <Pressable accessibilityRole="button" onPress={() => { onClose(); toast.onAction?.(); }} style={styles.action}>
            <Text style={styles.actionText}>{toast.actionLabel}</Text>
          </Pressable>
        )}
        <IconButton icon="close" label="Fechar aviso" onPress={onClose} color="#fff" iconSize={20} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 12, right: 12, bottom: 96, alignItems: 'center', zIndex: 100, elevation: 10 },
  toast: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.ink, borderRadius: radius.md, paddingLeft: 14, paddingRight: 4, minHeight: 56, maxWidth: 560, width: '100%' },
  msg: { flex: 1, color: '#fff', fontSize: 14, lineHeight: 20, paddingVertical: 8 },
  action: { minHeight: MIN_TOUCH, justifyContent: 'center', paddingHorizontal: 8 },
  actionText: { color: colors.primary, fontWeight: '800', fontSize: 14 },
});
