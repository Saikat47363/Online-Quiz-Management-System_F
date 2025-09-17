interface Props {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
 
export default function FormInput({ label, name, type = "text", value, onChange }: Props) {
  return (
<div className="mb-3">
<label className="block mb-1">{label}</label>
<input
        className="border p-2 w-full rounded"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
</div>
  );
}