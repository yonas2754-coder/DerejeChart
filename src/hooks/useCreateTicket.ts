// useCreateTicket.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ITicketPayload {
    serviceNumber: string;
    tasksClassification: string;
    requestType: string;
    specificRequestType: string;
    zone: string;
    handlerId: string;
    remarks: string;
    priority: string;
}

// --- Query Keys (MUST match keys defined in useTickets.ts and useDataFetcher.ts) ---
const TICKET_QUERY_KEY = ['tickets'];
const DASHBOARD_COMMON_KEY = ['dashboard', 'allData']; // Key used by useDataFetcher

export const useCreateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (ticket: ITicketPayload) => {
            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ticket),
            });
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to create ticket');
            }
            return res.json();
        },
        onSuccess: () => {
            // 1. Invalidate the tickets list
            queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEY }); 
            
            // 2. Invalidate the dashboard's consolidated data query group
            // This forces the useDataFetcher hook to re-run and update the charts.
            queryClient.invalidateQueries({ queryKey: DASHBOARD_COMMON_KEY }); 
        },
    });
};