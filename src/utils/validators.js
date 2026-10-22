const onlyDigits = (v) => v.replace(/\D/g, '');

export const maskCep = (v) => {
  const d = onlyDigits(v).slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};
export const maskPhone = (v) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export const rules = {
  name: (v) => (v.trim().split(' ').length >= 2 && v.trim().length >= 5 ? '' : 'Informe nome e sobrenome.'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Digite um e-mail válido.'),
  password: (v) => (v.length >= 6 ? '' : 'A senha precisa ter pelo menos 6 caracteres.'),
  phone: (v) => (/^\d{10,11}$/.test(onlyDigits(v)) ? '' : 'Digite o telefone com DDD.'),
  cep: (v) => (onlyDigits(v).length === 8 ? '' : 'O CEP tem 8 números.'),
  required: (v) => (v.trim() ? '' : 'Campo obrigatório.'),
};

export function validate(values, schema) {
  const errors = {};
  Object.keys(schema).forEach((field) => {
    const msg = schema[field](values[field] ?? '', values);
    if (msg) errors[field] = msg;
  });
  return errors;
}
