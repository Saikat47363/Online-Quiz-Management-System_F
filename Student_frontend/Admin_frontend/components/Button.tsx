
type Props = {
  text: string;
  type?: "button" | "submit" | "reset"; // ✅ support type prop
};
 
export default function Button({ text, type = "button" }: Props) {
  return (
<button
      type={type}
      className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
>
      {text}
</button>
  );
}