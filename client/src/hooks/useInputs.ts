import React, { useState, useCallback, ChangeEvent } from 'react';

const useInputs = <T>(
  initialForm: T,
): {
  form: T;
  onChangeForm: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  reset: () => void;
} => {
  const [form, setForm] = useState<T>(initialForm);

  const onChangeForm = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const { name, value } = event.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const reset = useCallback(() => setForm(initialForm), []);

  return { form, onChangeForm, setForm, reset };
};

export default useInputs;
