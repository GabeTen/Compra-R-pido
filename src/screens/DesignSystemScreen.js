import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import Chip from '../components/Chip';
import Input from '../components/Input';
import FormAlert from '../components/FormAlert';
import SkeletonCard from '../components/SkeletonCard';
import { useApp } from '../context/AppContext';
import { useLayout } from '../utils/layout';
import { contrast, fmt } from '../utils/contrast';
import { colors, spacing, type, radius, centered } from '../theme';

const SWATCHES = [
  { name: 'Primary', label: colors.primary, bg: colors.primary, fg: colors.ink },
  { name: 'Accent', label: colors.navy, bg: colors.navy, fg: '#FFFFFF' },
  { name: 'Foreground / Background', label: `${colors.ink} / ${colors.cream}`, bg: colors.cream, fg: colors.ink },
  { name: 'Muted text / Background', label: `${colors.muted} / ${colors.cream}`, bg: colors.cream, fg: colors.muted },
  { name: 'Destructive', label: colors.danger, bg: colors.danger, fg: '#FFFFFF' },
  { name: 'Success / Soft', label: `${colors.success} / ${colors.successSoft}`, bg: colors.successSoft, fg: colors.success },
];

const TYPE_ROWS = [
  ['Display', 'display', '40px / 800'],
  ['Título H1', 'h1', '28px / 800'],
  ['Título H2', 'h2', '22px / 800'],
  ['Subtítulo H3', 'h3', '18px / 700'],
  ['Corpo', 'body', '16px / 400'],
  ['Legenda', 'small', '14px / 400'],
  ['Detalhe', 'caption', '13px / 400'],
];

const Section = ({ title, children }) => (
  <View style={{ marginTop: 32 }}>
    <Text accessibilityRole="header" style={styles.h2}>{title}</Text>
    {children}
  </View>
);

export default function DesignSystemScreen() {
  const { showToast } = useApp();
  const { isWide } = useLayout();
  const half = { width: isWide ? '48.5%' : '100%' };

  return (
    <ScrollView style={{ backgroundColor: colors.cream }} contentContainerStyle={[{ padding: 16, paddingBottom: 48 }, centered(1120)]}>
      <Text accessibilityRole="header" style={styles.h1}>Design System</Text>
      <Text style={styles.lead}>Base visual e de acessibilidade (WCAG 2.0 AA) usada em todas as telas.</Text>

      <Section title="Cores e contraste">
        <View style={styles.wrap}>
          {SWATCHES.map((s) => (
            <View key={s.name} style={[styles.swatch, { backgroundColor: s.bg, width: isWide ? '32%' : '48.5%' }]}>
              <Text style={[styles.swName, { color: s.fg }]}>{s.name}</Text>
              <Text style={[styles.swText, { color: s.fg }]}>{s.label}</Text>
              <Text style={[styles.swText, { color: s.fg, fontWeight: '700' }]}>Contraste {fmt(contrast(s.fg, s.bg))}:1 · AA ✓</Text>
            </View>
          ))}
        </View>
        <Text style={styles.note}>Todos os pares de texto atingem ao menos 4,5:1. Bordas de campos usam 3:1 (componentes não textuais).</Text>
      </Section>

      <Section title="Tipografia — sans-serif (fonte do sistema)">
        <View style={styles.card}>
          {TYPE_ROWS.map(([label, key, spec], i) => (
            <View key={key} style={[styles.typeRow, i > 0 && styles.divider]}>
              <Text style={[type[key], { color: colors.ink, flexShrink: 1 }]}>{label}</Text>
              <Text style={styles.spec}>{spec}</Text>
            </View>
          ))}
        </View>
      </Section>

      <Section title="Grid e espaçamento (base 4px)">
        <View style={styles.spacing}>
          {[spacing.xs, spacing.sm, spacing.md, spacing.lg, spacing.xl, spacing.xxl, spacing.xxxl].map((n) => (
            <View key={n} style={{ alignItems: 'center' }}>
              <View style={{ width: n, height: n, backgroundColor: colors.navy, borderRadius: n > 8 ? 4 : 2 }} />
              <Text style={styles.spec}>{n}px</Text>
            </View>
          ))}
        </View>
        <Text style={styles.note}>Container máx. 1120px, 16px de margem lateral. Grid de 2 colunas (celular), 3 (tablet) e 4 (computador).</Text>
      </Section>

      <Section title="Botões (alvo mínimo 44×44px)">
        <View style={styles.wrap}>
          <Button title="Primário" variant="primary" onPress={() => {}} />
          <Button title="Destaque" onPress={() => {}} />
          <Button title="Secundário" variant="outline" onPress={() => {}} />
          <Button title="Terciário" variant="ghost" onPress={() => {}} />
          <Button title="Perigo" variant="danger" onPress={() => {}} />
          <Button title="Carregando" loading loadingText="Carregando" variant="primary" />
          <Button title="Desabilitado" variant="primary" disabled />
        </View>
        <Text style={styles.note}>Estados: padrão, hover (escurece), foco (contorno de 3px), pressionado (escala 98%), carregando e desabilitado. Use Tab para ver o foco.</Text>
        <View style={[styles.wrap, { marginTop: 16, alignItems: 'center' }]}>
          <Chip label="Chip selecionado" selected onPress={() => {}} />
          <Chip label="Chip padrão" onPress={() => {}} />
          <IconButton variant="solid" icon="add" label="Botão de ícone (44×44px)" onPress={() => {}} />
          <IconButton icon="heart-outline" label="Botão de ícone simples" onPress={() => {}} />
        </View>
      </Section>

      <Section title="Campos de formulário (label sempre visível)">
        <View style={styles.wrap}>
          <View style={half}><Input label="Campo padrão" placeholder="Digite aqui" /></View>
          <View style={half}><Input label="Com dica" hint="Texto de apoio abaixo do campo." /></View>
          <View style={half}><Input label="Com erro" defaultValue="abc" error="Mensagem de erro clara e com ícone." /></View>
          <View style={half}><Input label="Obrigatório" required /></View>
        </View>
      </Section>

      <Section title="Feedback">
        <FormAlert type="success" message="Ação concluída com sucesso." />
        <FormAlert type="error" message="Algo deu errado. Explique o que fazer em seguida." />
        <View style={[styles.wrap, { marginBottom: 16 }]}>
          <Button title="Mostrar aviso de sucesso" variant="outline" onPress={() => showToast('Ação concluída com sucesso.', { type: 'success' })} />
          <Button title="Mostrar aviso de erro" variant="outline" onPress={() => showToast('Algo deu errado. Tente novamente.', { type: 'error', actionLabel: 'Tentar de novo' })} />
        </View>
        <Text style={styles.note}>Estado de carregamento (esqueleto):</Text>
        <View style={{ width: 190, marginTop: 8 }}><SkeletonCard /></View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: { ...type.h1, color: colors.ink, marginTop: 8 },
  h2: { ...type.h2, color: colors.ink, marginBottom: 14 },
  lead: { ...type.body, color: colors.muted, marginTop: 4 },
  note: { ...type.small, color: colors.muted, marginTop: 12 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  swatch: { borderRadius: radius.md, padding: 16, borderWidth: 1, borderColor: colors.border, gap: 2 },
  swName: { fontSize: 16, fontWeight: '700' },
  swText: { fontSize: 13 },
  card: { backgroundColor: '#fff', borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  typeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  spec: { fontSize: 13, color: colors.muted, marginTop: 4 },
  spacing: { flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 },
});
