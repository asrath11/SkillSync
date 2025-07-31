import Icon from '@/components/AppIcon';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react';
function PersonalInfo() {
  const [image, setImage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setImage(result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setImage('');
  };
  return (
    <div className='space-y-2 px-4'>
      <h1 className='text-2xl font-semibold text-center'>
        Let's get to know you
      </h1>
      <p className='text-muted-foreground text-center'>
        Tell us about yourself to help us find your perfect learning partner
      </p>
      <h1 className='font-semibold'>Profile Picture</h1>
      <form action='' onSubmit={(e) => e.preventDefault()}>
        <div className='flex flex-col items-center justify-center gap-4'>
          <div
            className={`w-32 h-32 border-dashed relative border-2 rounded-full flex items-center justify-center cursor-pointer hover:border-primary ${
              image ? 'border-none' : ''
            }`}
          >
            {image ? (
              <div className=''>
                <img
                  src={image}
                  alt='Profile'
                  className='w-full h-full object-cover rounded-full absolute top-0 left-0'
                />
                <Icon
                  name='X'
                  size={24}
                  className='text-white bg-red-400 rounded-full absolute top-0 right-0 cursor-pointer'
                  onClick={removeImage}
                />
              </div>
            ) : (
              <div
                className='flex flex-col items-center justify-center gap-1 cursor-pointer'
                onClick={() => inputRef.current?.click()}
              >
                <Icon name='Camera' size={24} className='text-muted-foreground' />
                <p className='text-xs text-muted-foreground text-center'>
                  Click to Upload
                </p>
              </div>
            )}
          </div>
          <input
            type='file'
            ref={inputRef}
            onChange={handleImageChange}
            accept='image/*'
            className='hidden'
          />
          <Button
            variant='ghost'
            className='font-semibold'
            onClick={() => inputRef.current?.click()}
          >
            <Icon name='Upload' size={24} />
            Upload Photo
          </Button>
          <p className='text-sm text-muted-foreground'>
            Max file size: 5MB. Supported: JPG, PNG, GIF
          </p>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
