import supabase from '@/lib/supabaseClient';
import React, { useEffect, useState } from 'react'
import UserTypes from '@/types/UserTypes';



const useFetchUsers = () => {
    const [fetchUsers, setFetchUsers] = useState<UserTypes[] | null>(null)
    
    useEffect(() => {
        const fetchUsers = async () => {
            const { data: Profiles, error } = await supabase
                .from('profiles')
                .select('*');
            if (error) {
                console.error('Error fetching profiles:', error.message);
                return;
            }
            else {
                setFetchUsers(Profiles)
                console.log("Profiles", Profiles);
            }
        }
        fetchUsers();
    }, []);

    return fetchUsers;
}

export default useFetchUsers