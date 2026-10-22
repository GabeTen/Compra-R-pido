import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

export default function ProfileScreen({ navigation }) {
  const { user, setAvatar, logout, openLogin, showToast } = useApp();

  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      showToast('Sem acesso à câmera. Libere a permissão nas configurações para tirar a foto.', { type: 'error' });
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      showToast('Foto de perfil atualizada.', { type: 'success' });
    }
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      showToast('Foto de perfil atualizada.', { type: 'success' });
    }
  };

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Ionicons name="person-circle-outline" size={80} color={colors.navy} />
        <Text accessibilityRole="header" style={styles.name}>Entre na sua conta</Text>
        <Text style={[styles.email, { textAlign: 'center', marginBottom: 24 }]}>Crie uma conta para comprar e personalizar seu perfil.</Text>
        <Button title="Entrar ou criar conta" onPress={() => openLogin(navigation)} style={{ width: '100%', maxWidth: 400 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={takePhoto} style={styles.avatarWrap} accessibilityRole="button" accessibilityLabel="Tirar foto de perfil">
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.initial}>{user.name[0].toUpperCase()}</Text>
          </View>
        )}
        <View style={styles.camBadge}><Ionicons name="camera" size={18} color="#fff" /></View>
      </Pressable>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.actions}>
        <Button title="Tirar foto de perfil" onPress={takePhoto} />
        <Button title="Escolher da galeria" variant="outline" onPress={pickPhoto} />
        <Button title="Sair da conta" variant="outline" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, paddingTop: 40, backgroundColor: colors.cream },
  avatarWrap: { marginBottom: 14 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  placeholder: { backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  initial: { color: colors.navy, fontSize: 48, fontWeight: '800' },
  camBadge: { position: 'absolute', right: 0, bottom: 0, backgroundColor: colors.navy, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.cream },
  name: { color: colors.ink, fontSize: 24, fontWeight: '800' },
  email: { color: colors.muted, marginTop: 2 },
  actions: { width: '100%', maxWidth: 400, gap: 12, marginTop: 32 },
});
