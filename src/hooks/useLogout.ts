import supabase from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react'

const useLogout = () => {
    const router = useRouter();
    
    const logout = useCallback(async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout failed:", error.message);
            return;
        }

        console.log("Logout successful");
        router.push('/');
    }, [router]);

    return logout
}

export default useLogout