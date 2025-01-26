const DeleteConfirmationDialog = ({
  isOpen,
  dialogHeader,
  dialogText,
  onCancel,
  onConfirm,
}: DeleteConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black color rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-center">{ dialogHeader }</h2>
        <p className="text-sm text-center mt-2">{ dialogText }</p>

        <div className="flex justify-around mt-6">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
