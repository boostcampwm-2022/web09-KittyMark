import { useState, useCallback, ChangeEvent } from 'react';

const useInputs = <T>(
  initialForm: T,
): {
  form: T;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
} => {
  const [form, setForm] = useState<T>(initialForm);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initialForm), []);
  return { form, onChange, reset };
};

export default useInputs;
