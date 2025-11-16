// src/hooks/useHandlers.ts

import { useQuery } from '@tanstack/react-query';

export interface IHandler {
    id: string;
    name: string;
}

export const useHandlers = () => {
    return useQuery<IHandler[], Error>({
        queryKey: ['handlers'],
        queryFn: async () => {
            const res = await fetch('/api/handlers');
            if (!res.ok) throw new Error('Failed to fetch handlers');
            return res.json();
        },
    });
};