import { useEffect, useState } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  baseemail: string;
};

type InputFormProps = {
  onFormChange?: (form: FormData) => void;
};

export function InputForm({ onFormChange }: InputFormProps) {
  const [form, setForm] = useState<FormData>({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    baseemail: '@sculpture.com',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Передаём родителю, если нужно
  useEffect(() => {
    if (onFormChange) {
      onFormChange(form);
    }
  }, [form, onFormChange]);

  const fullEmail = `${form.firstName}.${form.lastName}${form.baseemail}`;

  return (
    <form style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.75rem', 
        }}>
      <label style={labelStyle}>
        First name:
        <input
          style={inputStyle}
          value={form.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
      </label>

      <label style={labelStyle}>
        Last name:
        <input
          style={inputStyle}
          value={form.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
      </label>

      <label style={labelStyle}>
        Email:
        <input
          style={inputStyle}
          value={fullEmail}
          onChange={(e) => {
            const localPart = `${form.firstName}.${form.lastName}`;
            const newEmail = e.target.value.startsWith(localPart)
              ? e.target.value.slice(localPart.length)
              : e.target.value;
            handleChange('baseemail', newEmail);
          }}
        />
      </label>
    </form>
  );
}

const inputStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  backgroundColor: 'var(--input-box-color)',
  marginTop: '0.25rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  fontSize: '0.9rem',
  backgroundColor: 'var(--input-label-background-color)',
};
