export default function Notification({ message }: { message: string }) {
 
  return (
<div className="p-4 bg-green-100 border border-green-500 rounded mt-4">
<p>{message}</p>
</div>
 
  );
 
}