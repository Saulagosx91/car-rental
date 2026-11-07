import Swal from 'sweetalert2';

export const successModal = (title: string, text: string) => Swal.fire({
  title,
  text,
  icon: "success"
});

export const errorModal = (title: string, text: string) => Swal.fire({
  icon: "error",
  title,
  text,
});