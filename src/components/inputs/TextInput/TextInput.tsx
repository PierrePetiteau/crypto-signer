import { FC } from "react";
import { Field } from "react-final-form";

type TextInputProps = {
  id: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  validate?: (value: string) => string | undefined;
};

export const TextInput: FC<TextInputProps> = ({ id, label, placeholder, defaultValue, validate }) => {
  const required = (value: string) => (value ? undefined : "Required");

  const handleValidate = (value: string) => {
    let error: string | undefined;

    if ((error = required(value))) {
      return error;
    }
    if (validate && (error = validate(value))) {
      return error;
    }
    return undefined;
  };

  return (
    <Field name={id} validate={handleValidate} defaultValue={defaultValue}>
      {({ input, meta }) => (
        <div>
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
          <input id={id} type="text" {...input} placeholder={placeholder} className="input input-bordered w-full" />
          {meta.touched && meta.error ? (
            <label className="label">
              <span className="label-text-alt text-error h-4 min-w-1">{meta.error}</span>
            </label>
          ) : null}
        </div>
      )}
    </Field>
  );
};
