interface InputProps {
  placeholder: string;
  label: string;
  type?: string;
  register: {};
  errorMsg?: string;
}
export function Input({
  label,
  placeholder,
  type,
  register,
  errorMsg,
}: InputProps) {
  return (
    <fieldset className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        {...register}
        type={type ? type : "text"}
        placeholder={placeholder}
      />
      {errorMsg && <span className="text-red-500 lowercase">{errorMsg}</span>}
    </fieldset>
  );
}
