import { useEffect } from 'react';
import supabase from '@/lib/supabaseClient';

const useCheckOnlineStatus = () => {
    useEffect(() => {
        let subscription: ReturnType<typeof supabase['channel']>;
        let userId: string | null = null;

        const updateStatus = async (status: boolean) => {
            if (!userId) return;
            const { error } = await supabase
                .from('profiles')
                .update({ status })
                .eq('id', userId);
            if (error) console.error(`Error setting status ${status ? 'online' : 'offline'}:`, error);
        };

        const hydrateUserStatus = async () => {
            try {
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError || !user) {
                    console.error('Error getting user:', userError);
                    return;
                }

                userId = user.id;

                await updateStatus(true);

                subscription = supabase
                    .channel('public:profiles')
                    .on(
                        'postgres_changes',
                        {
                            event: 'UPDATE',
                            schema: 'public',
                            table: 'profiles',
                            filter: `id=eq.${userId}`,
                        },
                        (payload) => {
                            console.log('Realtime profile update:', payload.new);
                        }
                    )
                    .subscribe();
            } catch (err) {
                console.error('Unexpected error hydrating user status:', err);
            }
        };

        hydrateUserStatus();

        const handleUnload = () => {
            updateStatus(false);
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            updateStatus(false);
            if (subscription) supabase.removeChannel(subscription);
        };
    }, []);
};

export default useCheckOnlineStatus;
