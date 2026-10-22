import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/Input';
import Button from '../components/Button';
import FormAlert from '../components/FormAlert';
import { useApp } from '../context/AppContext';
import { rules, validate } from '../utils/validators';
import { colors, centered } from '../theme';

export default function LoginScreen({ navigation }) {
  const { login, showToast } = useApp();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const register = mode === 'register';

  const set = (field) => (value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const submit = () => {
    const schema = { email: rules.email, password: rules.password };
    if (register) {
      schema.name = rules.name;
      schema.confirm = (v, all) => (v === all.password ? '' : 'As senhas não conferem.');
    }
    const found = validate(form, schema);
    setErrors(found);
    if (Object.keys(found).length) {
      setFormError('Corrija os campos destacados para continuar.');
      return;
    }
    setFormError('');
    setLoading(true);
    setTimeout(() => {
      const name = register ? form.name.trim() : form.email.split('@')[0];
      navigation.goBack();
      login({ name, email: form.email.trim() });
      showToast(register ? 'Conta criada com sucesso!' : 'Login realizado com sucesso!', { type: 'success' });
    }, 900);
  };

  const toggle = () => {
    setMode(register ? 'login' : 'register');
    setErrors({});
    setFormError('');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.cream }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[styles.container, centered(480)]} keyboardShouldPersistTaps="handled">
        <View style={styles.brand}>
          <Ionicons name="bag-handle-outline" size={34} color={colors.navy} />
          <Text style={styles.brandText}>Compra Rápido</Text>
        </View>
        <Text accessibilityRole="header" style={styles.title}>{register ? 'Crie sua conta' : 'Entre na sua conta'}</Text>
        <Text style={styles.subtitle}>Compre de mais de 200 vendedores independentes.</Text>

        <FormAlert message={formError} />
        {register && <Input label="Nome completo" value={form.name} onChangeText={set('name')} error={errors.name} autoCapitalize="words" placeholder="Maria Silva" />}
        <Input label="E-mail" value={form.email} onChangeText={set('email')} error={errors.email} keyboardType="email-address" placeholder="voce@email.com" />
        <Input label="Senha" value={form.password} onChangeText={set('password')} error={errors.password} secureTextEntry hint="Mínimo de 6 caracteres" />
        {register && <Input label="Confirmar senha" value={form.confirm} onChangeText={set('confirm')} error={errors.confirm} secureTextEntry />}

        <Button title={register ? 'Criar conta' : 'Entrar'} onPress={submit} loading={loading} style={{ marginTop: 6 }} />
        <Button
          title={register ? 'Já tenho conta' : 'Criar uma conta'}
          variant="outline"
          onPress={toggle}
          disabled={loading}
          style={{ marginTop: 12 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingTop: 24 },
  brand: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  brandText: { color: colors.navy, fontSize: 26, fontWeight: '800', marginLeft: 8 },
  title: { color: colors.ink, fontSize: 28, fontWeight: '800' },
  subtitle: { color: colors.muted, marginTop: 4, marginBottom: 24, fontSize: 15 },
});
