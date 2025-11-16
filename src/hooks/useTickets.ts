// src/hooks/useTickets.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// --- TYPE DEFINITIONS ---
type LocalTicketStatus = "Resolved" | "Pending" | "In-Progress"; 
type PrismaTicketStatus = 'Resolved' | 'Pending' | 'In_Progress';

interface ITicket {
    id: string; 
    serviceNumber: string; 
    zone: string;
    handler: string; 
    status: LocalTicketStatus; 
    tasksClassification: string;
    requestType: string;
    specificRequestType: string;
    priority: string;
    remarks: string; 
    createdAt: string; 
    pending_endAt: string | null;
    resolvedAt: string | null;
    duration: string;
    pendingDurationMs: number; 
    inProgressDurationMs: number; 
}

interface UpdateTicketVars {
    id: string;
    newStatus: PrismaTicketStatus;
}

interface CreateTicketVars {
    serviceNumber: string; 
    zone: string;
    handler: string; 
    tasksClassification: string;
    requestType: string;
    specificRequestType: string;
    priority: string;
    remarks: string; 
    initialStatus: PrismaTicketStatus; 
}

// Helper functions (kept outside of hooks)
const toPrismaStatus = (localStatus: LocalTicketStatus): PrismaTicketStatus => {
    return (localStatus === "In-Progress" ? "In_Progress" : (localStatus as PrismaTicketStatus));
};

const formatDate = (isoString: string | undefined | null): string => {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return 'Invalid Date';
    }
}

// --- QUERY KEYS ---
const TICKET_QUERY_KEY = ['tickets'];
// IMPORTANT: This key must match the prefix in useDataFetcher
const DASHBOARD_COMMON_KEY = ['dashboard', 'allData']; 

// --- API FUNCTIONS ---

const fetchTicketsAPI = async (): Promise<ITicket[]> => {
    const res = await fetch("/api/tickets");
    if (!res.ok) {
        throw new Error(`Failed to fetch tickets: ${res.status}`);
    }
    const data: any[] = await res.json();
    
    return data.map(t => ({
        ...t,
        status: t.status === 'In_Progress' ? 'In-Progress' : t.status,
        createdAt: formatDate(t.createdAt), 
    })) as ITicket[]; 
};

const updateTicketStatusAPI = async ({ id, newStatus }: UpdateTicketVars): Promise<ITicket> => {
    const res = await fetch(`/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
    }
    return res.json();
};

const createTicketAPI = async (ticketData: CreateTicketVars): Promise<ITicket> => {
    const res = await fetch(`/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
    }
    return res.json();
};


// --- CUSTOM HOOKS (QUERIES) ---

/**
 * Hook to fetch all tickets using useQuery.
 */
export const useTickets = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({ 
        queryKey: TICKET_QUERY_KEY,
        queryFn: fetchTicketsAPI,
        refetchInterval: 60000, 
    });
    
    return { 
        tickets: data || [], 
        isLoading, 
        isError, 
        error,
        refetch,
    };
};

// --- CUSTOM HOOKS (MUTATIONS) ---

/**
 * Hook to create a new ticket using useMutation.
 */
export const useCreateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ticketData: CreateTicketVars) => createTicketAPI(ticketData),
        onSuccess: () => {
            // Invalidate tickets and dashboard data
            queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: DASHBOARD_COMMON_KEY });
        },
    });
};

/**
 * Hook to handle single ticket status updates using useMutation.
 */
export const useUpdateTicketStatus = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, newStatus: localStatus }: { id: string, newStatus: LocalTicketStatus }) => {
            const prismaStatus = toPrismaStatus(localStatus);
            return updateTicketStatusAPI({ id, newStatus: prismaStatus });
        },
        onSuccess: () => {
            // Invalidate tickets and dashboard data
            queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: DASHBOARD_COMMON_KEY });
        },
    });
};

/**
 * Hook to handle batch ticket status updates using useMutation.
 */
export const useBatchUpdateTicketStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updates: { id: string, newStatus: LocalTicketStatus }[]) => {
            const updatePromises = updates.map(update => {
                const prismaStatus = toPrismaStatus(update.newStatus);
                return updateTicketStatusAPI({ id: update.id, newStatus: prismaStatus });
            });
            return Promise.all(updatePromises);
        },
        onSuccess: () => {
            // Invalidate tickets and dashboard data
            queryClient.invalidateQueries({ queryKey: TICKET_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: DASHBOARD_COMMON_KEY });
        },
    });
};