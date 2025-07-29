import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '@/components/ui/passwordInput';
import { useState } from 'react';
function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleSignUp = () => {
    navigate('/sign-up');
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
    <section className='h-screen flex flex-col items-center justify-center'>
      <div className='max-w-md w-full px-4 space-y-6'>
        <div className='flex items-center justify-center gap-x-4'>
          logo
          <h1 className='text-3xl font-bold'>SkillSync</h1>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold text-center'>Welcome back</h1>
          <p className='text-center text-muted-foreground'>
            Sign in to your account to continue learning
          </p>

          <form className='space-y-4' onSubmit={handleSubmit}>
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

            <Button type='submit' className='w-full font-bold'>
              Sign In
            </Button>
          </form>

          <p className='text-center text-muted-foreground'>
            Don't have an account?{' '}
            <span className='text-primary cursor-pointer' onClick={handleSignUp}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
