import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Navigate } from "react-router-dom";
import type { Cloth } from "../types/Cloth";

export type ClothingItemModalProps = {
  id?: string;
  heading: string;
  openModal: boolean;
  setOpenModal: (action: boolean) => void;
  editFormData?: Cloth;
};

export default function ClothingItemModal({
  id,
  heading,
  openModal,
  setOpenModal,
  editFormData,
}: ClothingItemModalProps) {
  console.log("editFormData: ", editFormData);
  const [fileName, setFileName] = useState<string>("");
  const totalSize = ["XS", "S", "M", "L", "XL", "XXL"];
  const [formData, setFormData] = useState<Cloth>(
    editFormData || {
      name: "",
      description: "",
      brand: "",
      category: "",
      size: "",
      pricePerDay: 0,
      image: "",
      available: true,
    }
  );

  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Invalid token, please login or make account");
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (editFormData) {
      setFormData(editFormData);
      
    }
  }, []);

  useEffect(() => {
    if (editFormData) {
      setFormData(editFormData);
      if (editFormData.image) {
        setFileName(editFormData.image);
      }
    } else {
      // Reset form for "Add New Cloth"
      setFormData({
        name: "",
        description: "",
        brand: "",
        category: "",
        size: "",
        pricePerDay: 0,
        image: "",
        available: true,
      });
      setFileName("");
    }
  }, [editFormData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((pre) => ({
        ...pre,
        image: file.name,
      }));
      setFileName(file.name);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((pre) => ({
  //     ...pre,
  //     size: e.target.value,
  //   }));
  // };

  const handleSubmitForm = async () => {
    try {
      if (heading === "Add New Cloth") {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setOpenModal(false);
        if (response.data.success) toast.success("Cloth is added successfully");
      } else {
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/${id}`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setOpenModal(false);
        if (response.data.success)
          toast.success("Cloth details updated successfully");
      }
    } catch (err) {
      toast.error("Error in the Submitting Form");
    }
  };

  return (
    openModal && (
      <>
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div
            className="bg-white rounded-xl w-full max-w-lg px-5 py-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{heading}</h2>
              <button
                onClick={() => setOpenModal(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitForm();
              }}
            >
              {/* Title & Brand */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black/60">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter item title"
                    className="mt-1 w-full border border-black/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-black/60">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter brand name"
                    className="mt-1 w-full border border-black/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-black/60">
                    Category
                  </label>
                  <select
                    name="category"
                    className="mt-1 w-full border border-black/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    value={formData.category}
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Formal</option>
                    <option>Traditional</option>
                    <option>Party</option>
                    <option>Casual</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-black/60">
                    Price per Day (₹) *
                  </label>
                  <input
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={(e) => handleChange(e)}
                    placeholder="0"
                    className="mt-1 w-full border border-black/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Rating */}
              {/* <div>
                <label className="text-sm font-medium">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  placeholder="4.5"
                  className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div> */}

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-black/60">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter item description"
                  className="mt-1 w-full border border-black/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Image Uploader */}
              <div>
                <label className="text-sm font-medium text-black/60">
                  Upload Image
                </label>
                <div className="mt-2 border-2 border-dashed border-black/20 rounded-md p-4 flex flex-col items-center justify-center gap-2">
                  <Upload className="w-6 h-6 text-gray-500" />
                  <input
                    id="fileUpload"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer text-sm text-black/40 hover:underline"
                  >
                    {fileName ? "Change Image" : "Select an Image"}
                  </label>
                </div>
              </div>

              {/* Image uploaded  */}
              <div>
                <label className="text-sm font-medium text-black/60">
                  Image Uploaded *
                </label>
                <input
                  name="image"
                  value={fileName}
                  disabled={true}
                  className="mt-1 w-full border border-black/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Size and Availability */}
              <div className="grid grid-cols-2 gap-4 items-center">
                {/* Size Select */}
                <div>
                  <label className="text-sm font-medium text-black/60">
                    Size
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={(e)=> handleChange(e)}
                    className="mt-1 w-full border border-black/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {totalSize.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability Checkbox */}
                <div className="flex items-center space-x-2 mt-6">
                  <label htmlFor="available" className="text-sm text-black/60">
                    Available for rent
                  </label>
                  <input
                    id="available"
                    type="checkbox"
                    name="available"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        available: e.target.checked,
                      }))
                    }
                    checked={formData.available}
                    className="w-4 h-4 border-black/20 rounded"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 hover:cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(false)
                  }}
                  className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100 hover:cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
}
