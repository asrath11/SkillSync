import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from '@/components/ui/passwordInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signup } from '@/api/auth';
import { useAuth } from '@/context/authProvider';
import { useProfile } from '@/context/profileProvider';
import { getUserProfile } from '@/api/profile';
function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setProfile } = useProfile();
  const schema = z
    .object({
      email: z.email(),
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const profile = await getUserProfile();
      const response = await signup(data);
      console.log(response);
      setUser(response);
      setProfile(profile);
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
    <section className='h-screen flex flex-col items-center justify-center gap-4'>
      <div className='max-w-md w-full px-4 space-y-6'>
        <Button
          onClick={() => navigate('/')}
          variant='ghost'
          size='lg'
          className='self-start cursor-pointer'
        >
          Go Home
        </Button>
        <div className='flex items-center justify-center gap-2'>
          logo
          <h1 className='text-3xl font-bold'>SkillSync</h1>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold text-center'>Create your account</h1>
          <p className='text-center text-muted-foreground'>
            Join thousands of learners finding their perfect study partners
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
            <PasswordInput
              placeholder='Confirm Password'
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className='text-red-500'>{errors.confirmPassword.message}</p>
            )}
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
      </div>
    </section>
  );
}

export default Signup;
