import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import UserTypes from '@/types/UserTypes';

const useFetchUsers = () => {
    const [users, setUsers] = useState<UserTypes[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);

            try {
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError) throw userError;
                const { data: profiles, error: profilesError } = await supabase
                    .from('profiles')
                    .select('*');

                if (profilesError) throw profilesError;

                const filtered = profiles?.filter((profile) => profile.id !== user?.id) || [];
                setUsers(filtered);
            } catch (err: any) {
                console.error('Error fetching users:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useFetchUsers;
