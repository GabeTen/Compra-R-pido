import { useWindowDimensions } from 'react-native';

export function useLayout() {
  const { width } = useWindowDimensions();
  const columns = width >= 1000 ? 4 : width >= 640 ? 3 : 2;
  return { width, columns, isWide: width >= 640 };
}

export function fillRows(data, columns) {
  const rest = data.length % columns;
  if (!data.length || rest === 0) return data;
  return [...data, ...Array.from({ length: columns - rest }, (_, i) => ({ id: `empty-${i}`, empty: true }))];
}
