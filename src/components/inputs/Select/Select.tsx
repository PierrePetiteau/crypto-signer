import { capitalize } from "@/helpers/text/text";
import { FC } from "react";
import { Field, useField } from "react-final-form";

type SelectProps = {
  id: string;
  label: string;
  labelRight?: string;
  options: { title: string; disabled?: boolean }[];
  defaultValue?: string;
};

export const Select: FC<SelectProps> = ({ id, label, labelRight, defaultValue, options }) => {
  const { meta } = useField(id);

  const required = (value: string) => (value ? undefined : "Required");

  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
        {labelRight ? <span className="label-text-alt">{labelRight}</span> : null}
      </label>

      <Field
        name={id}
        component={"select"}
        validate={required}
        className="select input-bordered w-full"
        defaultValue={defaultValue}
      >
        {options.map((v) => (
          <option key={v.title} disabled={v.disabled} value={v.title}>
            {capitalize(v.title)}
          </option>
        ))}
      </Field>
      {meta.touched && meta.error ? (
        <label className="label">
          <span className="label-text-alt text-error h-4 w-1">{meta.error}</span>
        </label>
      ) : null}
    </div>
  );
};
