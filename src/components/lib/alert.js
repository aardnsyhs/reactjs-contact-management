import Swal from "sweetalert2";

const swalDarkConfig = {
  background: "#1f2937",
  color: "#f9fafb",
  customClass: {
    confirmButton: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded",
    cancelButton: "bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded",
  },
  buttonsStyling: false,
};

export const alertSuccess = async (message) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    ...swalDarkConfig,
  });
};

export const alertError = async (message) => {
  return Swal.fire({
    icon: "error",
    title: "Ups",
    text: message,
    ...swalDarkConfig,
  });
};

export const alertConfirm = async (message) => {
  const result = await Swal.fire({
    icon: "question",
    title: "Confirm",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    ...swalDarkConfig,
  });

  return result.isConfirmed;
};
