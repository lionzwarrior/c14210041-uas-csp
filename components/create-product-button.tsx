export default function CreateProductButton({ createToggle, text }: {
    createToggle: () => void;
    text: string;
}) {
    return (
        <button
            onClick={createToggle}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow"
        >
            {text}
        </button>
    );
}
