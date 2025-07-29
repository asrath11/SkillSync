import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState, type InputHTMLAttributes } from 'react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export function PasswordInput({ placeholder, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className='relative'>
      <Input
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        {...props}
      />
      {visible ? (
        <Eye
          className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
          onClick={() => setVisible(false)}
        />
      ) : (
        <EyeOff
          className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
          onClick={() => setVisible(true)}
        />
      )}
    </div>
  );
}
