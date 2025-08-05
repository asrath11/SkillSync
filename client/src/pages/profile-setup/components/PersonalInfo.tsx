import { useRef, useState } from 'react';
import Icon from '@/components/AppIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ProfileData } from '@/types/profile';
interface PersonalInfoProps {
  data: ProfileData;
  errors: Record<string, string>;
  onUpdate: (stepData: ProfileData) => void;
}

function PersonalInfo({ data, errors, onUpdate }: PersonalInfoProps) {
  const [bio, setBio] = useState(data.bio || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    onUpdate({ ...data, [name]: value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          onUpdate({ ...data, image: result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    onUpdate({ ...data, image: '' });
  };
  const handleBioInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setBio(value);
      onUpdate({ ...data, bio: value });
    }
  };
  return (
    <div className='space-y-5 px-4 py-2'>
      <h1 className='text-2xl font-semibold text-center'>
        Let's get to know you
      </h1>
      <p className='text-muted-foreground text-center'>
        Tell us about yourself to help us find your perfect learning partner
      </p>
      <h1 className='font-semibold'>Profile Picture</h1>
      <div className='flex flex-col items-center justify-center gap-4'>
        <div
          className={`w-32 h-32 border-dashed relative border-2 rounded-full flex items-center justify-center cursor-pointer hover:border-primary ${
            data.image ? 'border-none' : ''
          }`}
        >
          {data.image ? (
            <div className=''>
              <img
                src={data.image}
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
      <Input
        name='name'
        label='Full Name'
        required={true}
        value={data.name || ''}
        onChange={handleInputChange}
        error={errors.name}
        placeholder='Enter your full name'
      />
      <Textarea
        placeholder='Please Tell us about yourself and what you are learning for'
        label='Bio'
        error={errors.bio}
        className={`h-20 ${errors.bio ? 'border-destructive' : ''}`}
        value={data.bio}
        onChange={(e) => {
          handleBioInputChange(e);
        }}
      />
      <p className='text-right text-sm text-muted-foreground'>{bio.length}/300</p>
      <div className='xl:flex gap-4 space-y-4 xl:space-y-0'>
        <div className='flex flex-col gap-2 flex-1'>
          <h1>City</h1>
          <Input
            placeholder='City'
            name='city'
            value={data.city}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex flex-col justify-center gap-2 flex-1'>
          <h1>Country</h1>
          <Input
            placeholder='Country'
            value={data.country}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
