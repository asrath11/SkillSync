import { Input } from '@/components/ui/input';
import { useState } from 'react';
import AppIcon from './AppIcon';

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: Option[];
  variant?: 'default' | 'search';
  onChange?: (value: string) => void;
}

function Select({
  options,
  onChange,
  variant = 'default',
  ...props
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const selectedLabel =
    options.find((option) => option.value === selected)?.label || '';

  return (
    <div className='relative' {...props}>
      <Input
        readOnly
        type='text'
        onClick={() => setOpen((prev) => !prev)}
        value={selectedLabel}
        placeholder='Select an option'
        className='cursor-pointer'
      />
      <AppIcon
        name={`${open ? 'ChevronUp' : 'ChevronDown'}`}
        size={20}
        className='absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none'
      />
      {open && (
        <div className='absolute top-full mt-1 w-full bg-card shadow-lg z-10 rounded-md border space-y-4 p-2'>
          {variant === 'search' && (
            <div className='relative'>
              <AppIcon
                name='Search'
                size={18}
                className='absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground'
              />
              <Input
                type='text'
                placeholder='Search'
                className='w-full pl-8'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          )}
          {variant === 'search' && <div className='border'></div>}
          <ul>
            {options
              .filter((option) =>
                option.label.toLowerCase().includes(search.toLowerCase())
              )
              .map((option) => (
                <li
                  key={option.value}
                  className={`p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded ${
                    selected === option.value
                      ? 'bg-primary text-primary-foreground'
                      : ''
                  }`}
                  onClick={() => {
                    setSelected(option.value);
                    setSearch('');
                    setOpen(false);
                    onChange?.(option.value); // 🔥 Notify parent
                  }}
                >
                  {option.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Select;
