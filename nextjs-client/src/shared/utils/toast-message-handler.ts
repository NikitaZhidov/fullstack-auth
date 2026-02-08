import { toast } from 'sonner';

export function toastMessageHandler(error: Pick<Error, 'message'>) {
  if (error.message) {
    const errorMessage = error.message;
    const firstDotIndex = errorMessage.indexOf('.');

    if (firstDotIndex !== -1) {
      const [title, description] = [
        errorMessage.slice(0, firstDotIndex),
        errorMessage.slice(firstDotIndex + 1),
      ];

      toast.error(title, { description });
    } else {
      toast.error(errorMessage);
    }
  } else {
    toast.error('Server error');
  }
}
