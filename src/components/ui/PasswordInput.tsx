import { useState, forwardRef } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Input from './Input';

interface PasswordInputProps extends Omit<React.ComponentProps<typeof Input>, 'type' | 'icon'> { }

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          icon={<Lock size={18} />}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[44px] text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;