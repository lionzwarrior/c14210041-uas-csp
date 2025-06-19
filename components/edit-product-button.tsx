export default function EditProductButton({ id, editToggle, text }: {
  id: string;
  editToggle: (id: string) => void; text: string;
}) {
  return (
    <button
      type="button"
      onClick={() => editToggle(id)}
      className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors shadow"
    >
      {text}
    </button>
  );

}
