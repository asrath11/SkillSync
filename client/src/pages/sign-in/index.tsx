import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '@/components/ui/passwordInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signin } from '@/api/auth';
import { useAuth } from '@/context/authProvider';
import { getUserProfile } from '@/api/profile';
import { useProfile } from '@/context/profileProvider';
function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setProfile } = useProfile();
  const schema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const response = await signin(data);
      const profile = await getUserProfile();
      setProfile(profile);
      setUser(response);
      navigate('/');
    } catch (error: any) {
      if (error.response?.data?.message) {
        console.error(error.response.data.message);
      } else {
        console.error('Something went wrong');
      }
    }
  };

  return (
    <section className='h-screen flex flex-col items-center justify-center'>
      <div className='max-w-md w-full px-4 space-y-6'>
        <Button
          onClick={() => navigate('/')}
          variant='ghost'
          size='lg'
          className='self-start cursor-pointer'
        >
          Go Home
        </Button>
        <div className='flex items-center justify-center gap-x-4'>
          logo
          <h1 className='text-3xl font-bold'>SkillSync</h1>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold text-center'>Welcome back</h1>
          <p className='text-center text-muted-foreground'>
            Sign in to your account to continue learning
          </p>

          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Input
              type='email'
              placeholder='Email Address'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
            <PasswordInput placeholder='Password' {...register('password')} />
            {errors.password && (
              <p className='text-red-500'>{errors.password.message}</p>
            )}

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
