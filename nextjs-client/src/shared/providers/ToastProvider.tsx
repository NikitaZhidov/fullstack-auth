import { Toaster } from '../components/ui';

const ToastProvider = () => {
  return <Toaster position='bottom-right' duration={6000} />;
};

export default ToastProvider;
