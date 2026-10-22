import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import Chip from '../components/Chip';
import FormAlert from '../components/FormAlert';
import { useApp } from '../context/AppContext';
import { rules, validate, maskCep, maskPhone } from '../utils/validators';
import { money } from '../utils/format';
import { colors, centered } from '../theme';

const PAYMENTS = ['Pix', 'Cartão de crédito', 'Boleto'];

export default function CheckoutScreen({ navigation }) {
  const { user, total, clearCart } = useApp();
  const [form, setForm] = useState({ name: user?.name ?? '', phone: '', cep: '', address: '', number: '' });
  const [payment, setPayment] = useState('Pix');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field, mask = (v) => v) => (value) => {
    setForm((f) => ({ ...f, [field]: mask(value) }));
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const confirm = () => {
    const found = validate(form, {
      name: rules.name, phone: rules.phone, cep: rules.cep,
      address: rules.required, number: rules.required,
    });
    setErrors(found);
    if (Object.keys(found).length) {
      setFormError('Corrija os campos destacados para confirmar o pedido.');
      return;
    }
    setFormError('');
    setLoading(true);
    setTimeout(() => {
      const order = { paid: money(total), payment, number: `CR-${Math.floor(100000 + Math.random() * 900000)}` };
      clearCart();
      navigation.replace('OrderSuccess', order);
    }, 1200);
  };

  return (
    <ScrollView style={{ backgroundColor: colors.cream }} contentContainerStyle={[{ padding: 20 }, centered(560)]} keyboardShouldPersistTaps="handled">
      <FormAlert message={formError} />
      <Text accessibilityRole="header" style={styles.title}>Entrega</Text>
      <Input label="Nome completo" value={form.name} onChangeText={set('name')} error={errors.name} autoCapitalize="words" />
      <Input label="Telefone com DDD" value={form.phone} onChangeText={set('phone', maskPhone)} error={errors.phone} keyboardType="phone-pad" placeholder="(82) 99999-9999" />
      <Input label="CEP" value={form.cep} onChangeText={set('cep', maskCep)} error={errors.cep} keyboardType="number-pad" placeholder="00000-000" />
      <Input label="Endereço" value={form.address} onChangeText={set('address')} error={errors.address} autoCapitalize="words" />
      <Input label="Número" value={form.number} onChangeText={set('number')} error={errors.number} keyboardType="number-pad" />

      <Text accessibilityRole="header" style={[styles.title, { marginTop: 10 }]}>Pagamento</Text>
      <View style={styles.payRow} accessibilityRole="radiogroup">
        {PAYMENTS.map((p) => (
          <Chip key={p} label={p} role="radio" selected={payment === p} onPress={() => setPayment(p)} />
        ))}
      </View>

      <Text style={styles.total}>Total: {money(total)}</Text>
      <Button title="Confirmar pedido" onPress={confirm} loading={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.ink, fontSize: 20, fontWeight: '800', marginBottom: 12 },
  payRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  total: { color: colors.ink, fontSize: 22, fontWeight: '800', marginBottom: 14 },
});
