import { Loader2 } from 'lucide-react';

const LoadingView = () => {
  return (
    <div className='flex items-center justify-center text-sm'>
      <Loader2 className='mr-2 size-5 animate-spin' />
      Loading...
    </div>
  );
};

export default LoadingView;
