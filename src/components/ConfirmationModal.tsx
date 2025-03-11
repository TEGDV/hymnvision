import { createSignal, Show } from "solid-js";

function ConfirmModal(props: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="container-secondary p-6 rounded-lg shadow-lg w-80">
        <p class="text-lg">{props.message}</p>
        <div class="flex justify-end gap-4 mt-4">
          <button class="px-4 py-2 bg-red-300 text-white rounded" onClick={props.onCancel}>
            Cancel
          </button>
          <button class="px-4 py-2 bg-green-500 text-white rounded" onClick={props.onConfirm}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
