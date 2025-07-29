import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '@/components/ui/passwordInput';
import { useState } from 'react';
function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleSignIn = () => {
    navigate('/sign-in');
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section className='h-screen flex flex-col items-center justify-center gap-4'>
      <div className='flex items-center gap-2'>
        logo
        <h1 className='text-3xl font-bold'>SkillSync</h1>
      </div>

      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold text-center'>Create your account</h1>
        <p className='text-center text-muted-foreground'>
          Join thousands of learners finding their perfect study partners
        </p>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            type='text'
            placeholder='Full Name'
            onChange={handleChangeInput}
            name='fullName'
          />
          <Input
            type='email'
            placeholder='Email Address'
            onChange={handleChangeInput}
            name='email'
          />
          <PasswordInput
            placeholder='Password'
            onChange={handleChangeInput}
            name='password'
          />
          <PasswordInput
            placeholder='Confirm Password'
            onChange={handleChangeInput}
            name='confirmPassword'
          />

          <div className='flex items-center gap-2'>
            <Checkbox />
            <p className='text-muted-foreground text-sm'>
              I agree to the{' '}
              <span className='text-primary underline cursor-pointer'>
                Terms of Service
              </span>{' '}
              and{' '}
              <span className='text-primary underline cursor-pointer'>
                Privacy Policy
              </span>
            </p>
          </div>

          <Button type='submit' className='w-full font-bold'>
            Create Account
          </Button>
        </form>

        <p className='text-center text-muted-foreground'>
          Already have an account?{' '}
          <span className='text-primary cursor-pointer' onClick={handleSignIn}>
            Sign In
          </span>
        </p>
      </div>
    </section>
  );
}

export default Signup;
