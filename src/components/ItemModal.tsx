import { AiOutlineClose } from "react-icons/ai";
import type { ModalDataType } from "../types/ModalType";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ModalDataType) => void;
}

const categories = ["Formal", "Casual", "Party", "Traditional"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const AddClothingModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ModalDataType>({
    name: "",
    brand: "",
    description: "",
    category: "",
    size: "",
    pricePerDay: 0,
    imageUrl: "",
    available: true,
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitModal = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Clothing Item</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitModal} className="space-y-4">
            {/* Name and Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="mt-1 w-full border rounded-sm border-black/40 px-3 py-2 focus:ring focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Brand *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand name"
                required
                className="mt-1 w-full border rounded-sm border-black/40 px-3 py-2 focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>

            {/* Category and Price per day and size */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 w-full border rounded-sm border-black/40 px-3 py-2"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Price per Day (₹) *
              </label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                min="0"
                required
                className="mt-1 w-full border rounded-sm border-black/40 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="mt-1 w-full border rounded-sm border-black/40 px-3 py-2"
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

            {/* description */}
          <div>
            <label className="block text-sm font-medium">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="mt-1 w-full border rounded-sm border-black/40 px-3 py-2"
            />
          </div>

            {/* image-url */}
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="image URL"
              className="mt-1 w-full border rounded-sm border-black/40 px-3 py-2"
            />
          </div>

            {/* Available */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={formData.available}
              name="available"
              onChange={handleChange}
              className="hover:cursor-pointer"
            />
            <label className="text-sm font-medium">Available for rent</label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-black/10 bg-black/5 hover:bg-black/10 rounded-md hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 hover:cursor-pointer"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClothingModal;
