"use client";

import Modal from "@/components/admin/Modal";

type ConfirmDeleteModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmDeleteModal({
  open,
  title = "Confirm Delete",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  isLoading,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="space-y-4">
        <p className="text-muted">
          {description}
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-main hover:bg-soft"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
