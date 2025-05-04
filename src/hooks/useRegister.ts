import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';

const useRegister = () => {
    const router = useRouter();

    const registerUser = async (
        userData: { email: string;  password: string },
        setError: (msg: string) => void,
        setSuccess: (msg: string) => void
    ): Promise<void> => {
        const { email, password } = userData;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        console.log(data);
        

        if (error) {
            setError(`Sign up failed: ${error.message}`);
            setSuccess('');
            return;
        }

        setSuccess('Registered successfully! Please check your email to verify.');
        setError('');
        router.push('/');
    };

    return registerUser;
};

export default useRegister;
