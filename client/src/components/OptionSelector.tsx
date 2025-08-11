import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import Icon from '@/components/AppIcon';

interface OptionSelectorProps {
  options: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  selectedOptions: string[] | string;
  toggleOption: (label: string) => void;
  type: 'checkbox' | 'radio';
  className?: string;
  error?: string;
}

function OptionSelector({
  options,
  selectedOptions,
  toggleOption,
  type,
  className,
  error,
}: OptionSelectorProps) {
  return (
    <div className={className}>
      {options.map(({ id, title, description, icon }) => {
        const lowerCaseTitle = title.toLowerCase();
        const isSelected = Array.isArray(selectedOptions)
          ? selectedOptions
              .map((option) => option.toLowerCase().includes(lowerCaseTitle))
              .includes(true)
          : selectedOptions.toLowerCase() === lowerCaseTitle;
        return (
          <div
            key={id}
            className={`flex items-center gap-4 bg-card p-4 border rounded-md cursor-pointer transition-all ${
              isSelected
                ? 'border-primary bg-primary/10'
                : 'border-gray-100 dark:border-black/25'
            }`}
            onClick={() => toggleOption(lowerCaseTitle)}
          >
            {icon && (
              <Icon
                name={icon}
                size={isSelected ? 35 : 25}
                className={`${
                  isSelected
                    ? 'bg-primary text-primary-foreground py-2 rounded-lg'
                    : ''
                }`}
              />
            )}
            <div className='flex-1 space-y-2'>
              <Label className='font-semibold'>{title}</Label>
              <p className='text-muted-foreground text-sm'>{description}</p>
            </div>

            {type === 'checkbox' && (
              <Checkbox
                id={id}
                className='w-5 h-5 cursor-pointer'
                checked={isSelected}
                onCheckedChange={() => toggleOption(lowerCaseTitle)}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            {type === 'radio' && (
              <div>
                <Input
                  id={id}
                  type='radio'
                  className='w-5 h-5 cursor-pointer peer hidden'
                  checked={isSelected}
                  onChange={() => toggleOption(lowerCaseTitle)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className='w-5 h-5 cursor-pointer rounded-full peer-checked:bg-primary'></div>
              </div>
            )}
          </div>
        );
      })}
      {error && <p className='text-sm text-destructive'>{error}</p>}
    </div>
  );
}

export default OptionSelector;
