export default function Notification({ message }: { message: string }) {
  return (
<div className="bg-green-100 text-green-800 p-3 rounded mt-4 shadow">
      🔔 {message}
</div>
  );
}