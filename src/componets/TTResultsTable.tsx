'use client';

import * as React from "react";
// Assuming these imports correctly point to your custom hooks and utilities
import { useTickets, useUpdateTicketStatus, useBatchUpdateTicketStatus } from '@/hooks/useTickets'; 
import { SpecificRequestTypeMap } from '@/utils/specificRequestTypeMap'; 
import {
    Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell, TableCellLayout,
    SearchBox, Dropdown, Option, Title3, Badge, Button, Spinner, Subtitle2,
    makeStyles, tokens, shorthands, Checkbox, mergeClasses,
    Toolbar, ToolbarButton, Popover, PopoverTrigger, PopoverSurface,
} from "@fluentui/react-components";
import { 
    Info20Regular, Checkmark20Regular, ArrowRight20Regular, ArrowSortDownLines20Regular, 
    ArrowSortUpLines20Regular, ArrowSyncCheckmark20Regular, CheckmarkCircle20Regular, 
    Filter20Regular, DataArea20Regular, ArrowClockwise20Regular,
    DocumentData20Regular, // CORRECTED IMPORT for the Excel icon
} from "@fluentui/react-icons";

// --- TYPE & CONSTANTS ---
type PriorityType = string;
type LocalTicketStatus = "Resolved" | "Pending" | "In-Progress"; 
type SortableColumn = 
    | 'id' | 'zone' | 'serviceNumber' | 'tasksClassification' | 'requestType' 
    | 'specificRequestType' | 'priority' | 'status' | 'duration' 
    | 'pendingDurationMs' | 'inProgressDurationMs' | 'handler' | 'createdAt'; 

export interface ITicket { 
    id: string; serviceNumber: string; zone: string; handler: string; status: LocalTicketStatus; 
    tasksClassification: string; requestType: string; specificRequestType: string; priority: PriorityType;
    remarks: string | null; // Changed to allow null/undefined based on runtime error
    createdAt: string; pending_endAt: string | null; resolvedAt: string | null;
    duration: string; pendingDurationMs: number; inProgressDurationMs: number; 
}

// Fixed Input Type (as per previous discussion)
interface UpdateTicketInput {
    id: string;
    newStatus: LocalTicketStatus;
    remarks?: string; 
}

const MOCK_CURRENT_USER = { name: "Clicker User", id: "user_clicker_id" }; 
const allZones: string[] = [
    "All", "EAAZ", "CAAZ", "SAAZ", "NAAZ", "SWAAZ", "WAAZ", "NR Mekele", 
    "NWR Bahirdar", "ER Dire Dawa", "CER Harar", "CNR D Birhan", 
    "WR Nekempt", "SER Adama", "SR Hawassa", "SWR Jimma", "CWR Ambo", 
    "EER Jigiiga", "NEER Semera", "NNWR Gonder", "NER Dessie", 
    "SWWR Gambela", "WWR Assosa", "SSWR Wolyta", "Bill Section", "Enterprise office"
].sort();
const PAGE_SIZE = 15;

// --- UTILITY FUNCTIONS ---
const msToHhMm = (diffMs: number): string => { 
    if (diffMs < 0 || isNaN(diffMs) || diffMs === Infinity) return "00:00"; 
    const totalSeconds = Math.floor(diffMs / 1000); 
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

const getDisplayDuration = (t: ITicket) => { 
    const nowMs = Date.now();
    let pendingDisplayMs = t.pendingDurationMs;
    let inProgressDisplayMs = t.inProgressDurationMs;
    
    if (t.status === "Pending") {
        const createdMs = new Date(t.createdAt).getTime(); 
        pendingDisplayMs = Math.max(0, nowMs - createdMs);
        inProgressDisplayMs = 0; 
    } else if (t.status === "In-Progress") {
        const pendingEndMs = t.pending_endAt ? new Date(t.pending_endAt).getTime() : new Date(t.createdAt).getTime();
        inProgressDisplayMs = t.inProgressDurationMs + Math.max(0, nowMs - pendingEndMs); 
    } 
    
    return {
        pending: msToHhMm(pendingDisplayMs),
        inProgress: msToHhMm(inProgressDisplayMs),
        total: msToHhMm(pendingDisplayMs + inProgressDisplayMs),
    };
};

const getStatusBadge = (status: LocalTicketStatus) => {
    type BadgeAppearance = "filled" | "tint" | "outline" | "ghost"; 
    type BadgeColor = 'success' | 'warning' | 'brand' | 'subtle'; 
    type StatusKeys = LocalTicketStatus | "DEFAULT";
    
    const config: Record<StatusKeys, {
        appearance: BadgeAppearance; color: BadgeColor; icon: React.JSX.Element;
    }> = {
        Resolved: { appearance: "filled", color: "success", icon: <Checkmark20Regular /> },
        Pending: { appearance: "tint", color: "warning", icon: <Info20Regular /> },
        "In-Progress": { appearance: "outline", color: "brand", icon: <ArrowRight20Regular /> },
        DEFAULT: { appearance: "ghost", color: "subtle", icon: <Info20Regular /> },
    };

    const itemConfig = config[status as keyof typeof config] || config.DEFAULT;
    
    return <Badge 
        size="medium" color={itemConfig.color} appearance={itemConfig.appearance} icon={itemConfig.icon}
    >{status}</Badge>;
};

const getPriorityBadge = (priority: PriorityType) => {
    let color: 'brand' | 'warning' | 'danger' | 'success' | 'subtle' = 'subtle';
    let appearance: 'outline' | 'tint' = 'outline';
    
    if (priority.toLowerCase().includes('high')) { color = 'danger'; appearance = 'tint'; } 
    else if (priority.toLowerCase().includes('medium')) { color = 'warning'; appearance = 'tint'; } 
    else if (priority.toLowerCase().includes('low')) { color = 'success'; appearance = 'outline'; }
    
    return <Badge size="extra-small" color={color} appearance={appearance}>{priority}</Badge>;
};

const getSpecificRequestDescription = (key: string): string => {
    return (SpecificRequestTypeMap as any)[key]?.description || key;
};

// --- COLUMN DEFINITIONS (moved up for use in exportToCSV) ---
const columnDefinitions = (styles: ReturnType<typeof useStyles>) => [
    { label: 'Created Date', key: 'createdAt' as const, style: styles.colDate, isSortable: true },
    { label: 'Service No.', key: 'serviceNumber' as const, style: styles.colService, isSortable: true },
    { label: 'Task Class', key: 'tasksClassification' as const, style: styles.colTask, isSortable: true },
    { label: 'Request Type', key: 'requestType' as const, style: styles.colRequest, isSortable: true },
    { label: 'Specific Request', key: 'specificRequestType' as const, style: styles.colSpecific, isSortable: true },
    { label: 'Zone', key: 'zone' as const, style: styles.colZone, isSortable: true },
    { label: 'Handler', key: 'handler' as const, style: styles.colHandler, isSortable: true },
    
    { label: 'Pending Time (hh:mm)', key: 'pendingDurationMs' as const, style: styles.colDuration, isSortable: true },
    { label: 'In-Progress Time (hh:mm)', key: 'inProgressDurationMs' as const, style: styles.colDuration, isSortable: true },
    
    { label: 'Total Time (hh:mm)', key: 'duration' as const, style: styles.colDuration, isSortable: false },
    { label: 'Priority / Status', key: 'priority' as const, style: styles.colPriorityStatus, isSortable: true },
];

// --- NEW EXPORT FUNCTION ---
const exportToCSV = (data: ITicket[], filename: string, columnDefs: ReturnType<typeof columnDefinitions>) => {
    if (data.length === 0) {
        alert("No data to export.");
        return;
    }

    // Define the columns we want in the CSV, using the table's labels plus hidden fields
    const csvColumns = [
        ...columnDefs.map(col => col.label),
        "Ticket ID",
        "Remarks",
        "Pending End Date",
        "Resolution Date",
    ];

    // Map the ticket data to CSV rows
    const csvRows = data.map(t => {
        const durations = getDisplayDuration(t);
        
        // This array must match the order of csvColumns
        const row = [
            t.createdAt,
            t.serviceNumber,
            t.tasksClassification,
            t.requestType,
            getSpecificRequestDescription(t.specificRequestType),
            t.zone,
            t.handler,
            durations.pending,
            durations.inProgress,
            durations.total,
            `${t.priority} / ${t.status}`, // Combined Priority/Status
            // Additional technical fields
            t.id, 
            (t.remarks || '').replace(/(\r\n|\n|\r)/gm, " "), // FIX: Safely replace newlines, defaulting to empty string
            t.pending_endAt || 'N/A',
            t.resolvedAt || 'N/A',
        ].map(value => {
            // Simple CSV escape for strings (double quotes)
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        });
        return row.join(',');
    });

    // Combine headers and rows
    const csvContent = [
        csvColumns.join(','),
        ...csvRows
    ].join('\n');

    // Create a Blob and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
// --- END NEW EXPORT FUNCTION ---


// --- STYLING ---
const useStyles = makeStyles({
    pageWrapper: { 
        ...shorthands.padding("24px", "40px"), 
        backgroundColor: tokens.colorNeutralBackground2, 
        minHeight: "100vh", 
        boxSizing: 'border-box', 
        display: 'flex', 
        flexDirection: 'column', 
    },
    
    // --- UPDATED TOOLBAR STYLING FOR MOBILE ---
    toolbar: { 
        display: "flex", 
        gap: "12px", 
        marginBottom: "20px", 
        alignItems: "center", 
        // Apply vertical stacking and full width below 768px (Mobile View)
        '@media (max-width: 768px)': {
            flexDirection: 'column', // Stack children vertically
            alignItems: 'stretch',   // Make children take full width
            gap: '8px',              // Slightly smaller gap for mobile
        },
    },
    
    // New class for elements within the toolbar to ensure they go full width on mobile
    toolbarChild: {
        '@media (max-width: 768px)': {
            width: '100% !important',
            minWidth: 'unset !important',
            // Also ensure toolbar buttons and dropdowns look good when stretched:
            justifyContent: 'center', 
        },
    },
    // --- END UPDATED TOOLBAR STYLING ---

    tableCard: { 
        ...shorthands.padding("0px"), 
        backgroundColor: tokens.colorNeutralBackground1, 
        borderRadius: tokens.borderRadiusLarge, 
        boxShadow: tokens.shadow8, 
        overflowX: 'auto', 
        flexGrow: 1, 
    },
    tableElement: { 
        minWidth: '1800px',
        tableLayout: 'fixed', 
    }, 
    sortableHeader: { 
        cursor: 'pointer', 
        '&:hover': { backgroundColor: tokens.colorNeutralBackground4Hover, } 
    },
    batchActionBar: { 
        display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', 
        marginBottom: '15px', marginTop: '5px', ...shorthands.padding("8px", "0px"), 
        borderBottom: `1px solid ${tokens.colorNeutralStroke2}`, 
    },
    
    checkboxCell: { verticalAlign: 'middle', width: '40px', minWidth: '40px' },
    tableHeaderRow: { backgroundColor: tokens.colorNeutralBackground4, },
    actionCell: { width: '150px', minWidth: '150px', },
    colDate: { width: '130px', minWidth: '130px', },
    colService: { width: '100px', minWidth: '100px', fontWeight: tokens.fontWeightSemibold, },
    colTask: { width: '150px', minWidth: '150px', },
    colRequest: { width: '150px', minWidth: '150px', },
    colSpecific: { width: '220px', minWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, 
    colZone: { width: '100px', minWidth: '100px', },
    colHandler: { width: '140px', minWidth: '140px', },
    colDuration: { width: '90px', minWidth: '90px', fontWeight: tokens.fontWeightBold, color: tokens.colorBrandForeground1 }, 
    colPriorityStatus: { width: '140px', minWidth: '140px', }, 
    
    dataCell: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '4px 8px !important' },
    tableCellLayout: { width: '100%', display: 'flex', alignItems: 'center' },

    zeroState: { ...shorthands.padding("40px"), textAlign: 'center', color: tokens.colorNeutralForeground2, },
    pagination: { display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap', },
    headerArea: { marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '6px', },
});


// --- SUB-COMPONENTS for better modularity ---

interface TTTableProps {
    pageData: ITicket[];
    columns: ReturnType<typeof columnDefinitions>;
    styles: ReturnType<typeof useStyles>;
    selectedTicketIds: Set<string>;
    isUpdating: boolean;
    isAllSelected: boolean;
    isIndeterminate: boolean;
    sortColumn: SortableColumn;
    sortDirection: "ascending" | "descending";
    handleSort: (column: SortableColumn) => void;
    handleSelectAll: (checked: boolean) => void;
    handleSelectTicket: (id: string, checked: boolean) => void; 
    handleStatusChange: (ticketId: string, currentStatus: LocalTicketStatus) => void;
    singleTicketMutation: ReturnType<typeof useUpdateTicketStatus>;
}

const TTResultsTable: React.FC<TTTableProps> = ({
    pageData, columns, styles, selectedTicketIds, isUpdating, isAllSelected, isIndeterminate,
    sortColumn, sortDirection, handleSort, handleSelectAll, handleSelectTicket, handleStatusChange,
    singleTicketMutation
}) => {
    const getSortIcon = (column: SortableColumn) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'ascending' ? <ArrowSortDownLines20Regular /> : <ArrowSortUpLines20Regular />;
    };

    if (pageData.length === 0) {
        return (
            <div className={styles.zeroState}>
                <DataArea20Regular style={{ fontSize: '48px', marginBottom: '12px' }}/>
                <Title3>No Tickets Found</Title3>
                <Subtitle2>Adjust your filters or search terms and try again.</Subtitle2>
            </div>
        );
    }

    return (
        <Table className={styles.tableElement}> 
            <TableHeader>
                <TableRow className={styles.tableHeaderRow}>
                    <TableHeaderCell className={styles.checkboxCell}>
                        <Checkbox
                            checked={isIndeterminate ? ("mixed" as const) : isAllSelected}
                            onChange={(_, data) => handleSelectAll(!!data.checked)}
                            title="Select all visible"
                            disabled={isUpdating}
                        />
                    </TableHeaderCell>
                    {columns.map(col => (
                        <TableHeaderCell 
                            key={col.key} 
                            className={mergeClasses(col.style, col.isSortable ? styles.sortableHeader : undefined)}
                            onClick={() => col.isSortable && handleSort(col.key)}
                        >
                            <TableCellLayout media={col.isSortable ? getSortIcon(col.key as SortableColumn) : undefined}>{col.label}</TableCellLayout>
                        </TableHeaderCell>
                    ))}
                    <TableHeaderCell className={styles.actionCell}>Actions</TableHeaderCell>
                </TableRow>
            </TableHeader>

            <TableBody>
                {pageData.map((t) => {
                    const durations = getDisplayDuration(t); 
                    const isTicketUpdating = (singleTicketMutation as any).isPending && ((singleTicketMutation as any).variables as UpdateTicketInput)?.id === t.id;
                    const canPerformAction = t.status !== "Resolved";

                    return (
                        <TableRow key={t.id} style={{height: '48px'}}>
                            <TableCell className={styles.checkboxCell}>
                                <Checkbox
                                    checked={selectedTicketIds.has(t.id)}
                                    onChange={(_, data) => handleSelectTicket(t.id, !!data.checked)} 
                                    disabled={isUpdating || isTicketUpdating || !canPerformAction}
                                />
                            </TableCell>
                            <TableCell className={mergeClasses(styles.colDate, styles.dataCell)} title={t.createdAt}>{t.createdAt}</TableCell>
                            <TableCell className={mergeClasses(styles.colService, styles.dataCell)} title={t.serviceNumber}><b>{t.serviceNumber}</b></TableCell>
                            <TableCell className={mergeClasses(styles.colTask, styles.dataCell)} title={t.tasksClassification}>{t.tasksClassification}</TableCell>
                            <TableCell className={mergeClasses(styles.colRequest, styles.dataCell)} title={t.requestType}>{t.requestType}</TableCell>
                            <TableCell className={mergeClasses(styles.colSpecific, styles.dataCell)} title={getSpecificRequestDescription(t.specificRequestType)}>{t.specificRequestType}</TableCell>
                            <TableCell className={mergeClasses(styles.colZone, styles.dataCell)} title={t.zone}>{t.zone}</TableCell>
                            <TableCell className={mergeClasses(styles.colHandler, styles.dataCell)} title={t.handler}>
                                <TableCellLayout className={styles.tableCellLayout}>
                                    {t.handler}
                                    {t.handler === MOCK_CURRENT_USER.name && (<Badge size="extra-small" color="brand" appearance="tint" style={{ marginLeft: '4px' }}>Me</Badge>)}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell className={mergeClasses(styles.colDuration, styles.dataCell)} title={`Pending: ${durations.pending}`}>{durations.pending}</TableCell>
                            <TableCell className={mergeClasses(styles.colDuration, styles.dataCell)} title={`In-Progress: ${durations.inProgress}`}>{durations.inProgress}</TableCell>
                            <TableCell className={mergeClasses(styles.colDuration, styles.dataCell)} title={`Total Time: ${durations.total}`}>{durations.total}</TableCell>
                            <TableCell className={mergeClasses(styles.colPriorityStatus, styles.dataCell)}>
                                <TableCellLayout style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                                    {getStatusBadge(t.status)}
                                    {getPriorityBadge(t.priority)}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell className={styles.actionCell}>
                                <TableCellLayout style={{ gap: '8px' }}>
                                    {canPerformAction ? (
                                        <Button
                                            appearance="primary"
                                            size="small"
                                            disabled={isUpdating || isTicketUpdating} 
                                            icon={isTicketUpdating ? <Spinner size="tiny" /> : undefined} 
                                            onClick={() => handleStatusChange(t.id, t.status)}
                                            aria-label={t.status === "Pending" ? `Start work on ticket ${t.serviceNumber}` : `Resolve ticket ${t.serviceNumber}`}
                                        >
                                            {t.status === "Pending" ? "Start Work" : "Resolve"}
                                        </Button>
                                    ) : (
                                        <Button size="small" appearance="subtle" disabled>Completed</Button>
                                    )}
                                    {/* The 'View' button code was removed here */}
                                </TableCellLayout>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

// --- MAIN COMPONENT ---
export default function TTResultsPage() {
    const styles = useStyles();
    const columns = columnDefinitions(styles); 

    const [searchText, setSearchText] = React.useState("");
    const [filterZone, setFilterZone] = React.useState<string>("All"); 
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortColumn, setSortColumn] = React.useState<SortableColumn>("createdAt"); 
    const [sortDirection, setSortDirection] = React.useState<"ascending" | "descending">("descending");
    const [selectedTicketIds, setSelectedTicketIds] = React.useState<Set<string>>(new Set());

    // NOTE: 'refetch' is now correctly destructured from useTickets in the updated useTickets.ts
    const { tickets, isLoading, isError, error, refetch } = useTickets();
    const singleTicketMutation = useUpdateTicketStatus();
    const batchMutation = useBatchUpdateTicketStatus();
    
    const filtered = React.useMemo(() => {
        return tickets.filter((t: ITicket) => 
            (filterZone !== "All" ? t.zone === filterZone : true) &&
            (t.serviceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
             t.handler.toLowerCase().includes(searchText.toLowerCase()) ||
             t.tasksClassification.toLowerCase().includes(searchText.toLowerCase()) ||
             t.specificRequestType.toLowerCase().includes(searchText.toLowerCase()) ||
             t.serviceNumber.includes(searchText)) 
        );
    }, [tickets, filterZone, searchText]);

    const sorted = React.useMemo(() => {
        let currentData = filtered;
        if (sortColumn) {
            currentData = [...currentData].sort((a, b) => {
                const aValue = (a as any)[sortColumn];
                const bValue = (b as any)[sortColumn];
                
                if (aValue === null || aValue === undefined) return sortDirection === "ascending" ? 1 : -1;
                if (bValue === null || bValue === undefined) return sortDirection === "ascending" ? -1 : 1;
                
                if (sortColumn === 'handler') {
                    const aHandler = a.handler === 'Unassigned' || !a.handler ? 'ZZZ_Unassigned' : a.handler;
                    const bHandler = b.handler === 'Unassigned' || !b.handler ? 'ZZZ_Unassigned' : b.handler;
                    if (aHandler < bHandler) return sortDirection === "ascending" ? -1 : 1;
                    if (aHandler > bHandler) return sortDirection === "ascending" ? 1 : -1;
                    return 0;
                }

                if (aValue < bValue) return sortDirection === "ascending" ? -1 : 1;
                if (aValue > bValue) return sortDirection === "ascending" ? 1 : -1;
                return 0;
            });
        }
        return currentData;
    }, [filtered, sortColumn, sortDirection]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
    const pageData = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const actionableTickets = React.useMemo(() => {
        const pendingToStart: string[] = []; 
        const inProgressToResolve: string[] = []; 
        
        tickets.forEach(t => { 
            if (selectedTicketIds.has(t.id)) {
                if (t.status === "Pending") pendingToStart.push(t.id);
                else if (t.status === "In-Progress") inProgressToResolve.push(t.id);
            }
        });
        return { pendingToStart, inProgressToResolve };
    }, [tickets, selectedTicketIds]);


    const handleBatchAction = (targetStatus: LocalTicketStatus) => {
        let idsToUpdate: string[];
        if (targetStatus === "In-Progress") idsToUpdate = actionableTickets.pendingToStart;
        else if (targetStatus === "Resolved") idsToUpdate = actionableTickets.inProgressToResolve;
        else return;

        if (idsToUpdate.length === 0) {
            alert(`No eligible tickets selected to change status to ${targetStatus}.`); 
            return;
        }
        
        const mutationVars: UpdateTicketInput[] = idsToUpdate.map(id => ({ 
            id, 
            newStatus: targetStatus, 
            remarks: `Batch updated by ${MOCK_CURRENT_USER.name}` 
        }));

        (batchMutation as any).mutate(mutationVars, { 
            onSuccess: () => {
                setSelectedTicketIds(new Set());
            },
            onError: (err: Error) => {
                console.error("Batch update failed:", err);
                alert(`Batch update failed. Check console for details.`); 
            }
        });
    };
    
    const handleStatusChange = (ticketId: string, currentStatus: LocalTicketStatus) => {
        let newStatus: LocalTicketStatus;
        if (currentStatus === "Pending") newStatus = "In-Progress";
        else if (currentStatus === "In-Progress") newStatus = "Resolved";
        else return;
        
        const mutationVars: UpdateTicketInput = { 
            id: ticketId, 
            newStatus: newStatus,
            remarks: `${newStatus} via results table quick action by ${MOCK_CURRENT_USER.name}`
        };

        (singleTicketMutation as any).mutate(mutationVars); 
    };
    
    // Handler for the CSV export button
    const handleExport = () => {
        const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
        const filename = `ServiceTickets_Export_${timestamp}.csv`;
        exportToCSV(sorted, filename, columns); // Use the filtered and sorted data
    };

    const isUpdating = (singleTicketMutation as any).isPending || (batchMutation as any).isPending;
    const nonResolvedTickets = filtered.filter(t => t.status !== "Resolved");
    const isAllSelected = nonResolvedTickets.length > 0 && selectedTicketIds.size === nonResolvedTickets.length;
    const isIndeterminate = selectedTicketIds.size > 0 && selectedTicketIds.size < nonResolvedTickets.length;

    const goToPage = (page: number) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); };
    
    const handleSort = (column: SortableColumn) => {
        if (sortColumn === column) setSortDirection(prev => (prev === "ascending" ? "descending" : "ascending"));
        else { setSortColumn(column); setSortDirection("ascending"); }
    };
    
    const handleSelectTicket = (id: string, checked: boolean) => { 
        setSelectedTicketIds(prev => {
            const newSet = new Set(prev);
            checked ? newSet.add(id) : newSet.delete(id);
            return newSet;
        });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) setSelectedTicketIds(new Set(nonResolvedTickets.map(t => t.id)));
        else setSelectedTicketIds(new Set());
    };
    
    React.useEffect(() => { setCurrentPage(1); }, [filterZone, searchText, sortColumn, sortDirection]);


    // --- RENDERING ---
    if (isLoading) {
        return <div className={styles.pageWrapper}><Spinner size="large" label="Loading data from the server..." /></div>;
    }

    if (isError) {
        return <div className={styles.pageWrapper}>
            <Title3 style={{color: tokens.colorPaletteRedForeground1}}>🛑 Error Loading Tickets</Title3>
            <Subtitle2>A critical error occurred while fetching ticket data. Please try again.</Subtitle2>
            <blockquote style={{marginTop: '10px', color: tokens.colorNeutralForeground2}}>{error?.message || 'Unknown network error.'}</blockquote>
            <Button onClick={() => refetch()} icon={<ArrowClockwise20Regular />} style={{marginTop: '10px'}}>Retry Load</Button>
        </div>;
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.headerArea}>
                <Title3>🎫 FSASS Section Ticket Management</Title3>
                <Subtitle2>Real-time operational insight & service completion details. Total Active Tickets: **{tickets.filter(t => t.status !== 'Resolved').length}**</Subtitle2>
            </div>

            <Toolbar className={styles.toolbar} role="toolbar" aria-label="Ticket filters and actions">
                <SearchBox
                    placeholder="Filter service number, handler, or task..."
                    onChange={(_, data) => setSearchText(data.value)}
                    className={styles.toolbarChild} // Added class for mobile full width
                    style={{ width: "300px" }}
                    aria-label="Search tickets"
                />
                
                <Dropdown
                    placeholder="Filter by Zone"
                    value={filterZone}
                    onOptionSelect={(_, data) => setFilterZone(data.optionText || "All")}
                    className={styles.toolbarChild} // Added class for mobile full width
                    style={{ minWidth: "180px" }}
                    aria-label="Filter by Zone"
                >
                    {allZones.map((z) => (<Option key={z} value={z} text={z}>{z}</Option>))}
                </Dropdown>

                <Popover openOnHover>
                    <PopoverTrigger disableButtonEnhancement>
                        <ToolbarButton icon={<Filter20Regular />} aria-label="More Filters" className={styles.toolbarChild}> {/* Added class */}
                            More Filters
                        </ToolbarButton>
                    </PopoverTrigger>
                    <PopoverSurface>
                        <p style={{ padding: '8px' }}>*Advanced filters coming soon*</p>
                    </PopoverSurface>
                </Popover>

                <ToolbarButton 
                    icon={<ArrowClockwise20Regular />} 
                    onClick={() => refetch()} 
                    disabled={isLoading}
                    aria-label="Refresh Data"
                    className={styles.toolbarChild} // Added class for mobile full width
                >
                    Refresh
                </ToolbarButton>

                {/* EXPORT BUTTON with corrected icon */}
                <ToolbarButton 
                    icon={<DocumentData20Regular />} 
                    onClick={handleExport}
                    disabled={sorted.length === 0}
                    aria-label="Export filtered data to CSV"
                    className={styles.toolbarChild} // Added class for mobile full width
                >
                    Export to CSV ({sorted.length})
                </ToolbarButton>
            </Toolbar>

                      {/* --- BATCH ACTION BAR --- */}
            {selectedTicketIds.size > 0 && (
                <div className={styles.batchActionBar}>
                    <span style={{ fontSize: tokens.fontSizeBase300, opacity: 0.9, fontWeight: tokens.fontWeightSemibold }}>
                        **{selectedTicketIds.size} tickets selected:**
                    </span>
                    {isUpdating && <Spinner size="extra-tiny" />}
                    
                    {actionableTickets.pendingToStart.length > 0 && (
                        <Button 
                            appearance="primary" icon={<ArrowSyncCheckmark20Regular />}
                            onClick={() => handleBatchAction("In-Progress")} disabled={isUpdating}
                        >
                            Start Work ({actionableTickets.pendingToStart.length})
                        </Button>
                    )}
                    
                    {actionableTickets.inProgressToResolve.length > 0 && (
                        <Button 
                            appearance="secondary" icon={<CheckmarkCircle20Regular />}
                            onClick={() => handleBatchAction("Resolved")} disabled={isUpdating}
                        >
                            Mark Resolve ({actionableTickets.inProgressToResolve.length})
                        </Button>
                    )}
                    <Button 
                        appearance="subtle" 
                        onClick={() => setSelectedTicketIds(new Set())}
                        disabled={isUpdating}
                    >
                        Clear Selection
                    </Button>
                </div>
            )}
            
            {/* --- TABLE CONTAINER --- */}
            <div className={styles.tableCard}>
                <TTResultsTable 
                    pageData={pageData}
                    columns={columns}
                    styles={styles}
                    selectedTicketIds={selectedTicketIds}
                    isUpdating={isUpdating}
                    isAllSelected={isAllSelected}
                    isIndeterminate={isIndeterminate}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                    handleSelectAll={handleSelectAll}
                    handleSelectTicket={handleSelectTicket} 
                    handleStatusChange={handleStatusChange}
                    singleTicketMutation={singleTicketMutation}
                />
            </div>

            {/* --- PAGINATION SECTION --- */}
            {sorted.length > 0 && (
                <div className={styles.pagination}>
                    <Subtitle2 style={{ marginRight: '20px' }}>
                        Showing **{(currentPage - 1) * PAGE_SIZE + 1}** - **{Math.min(currentPage * PAGE_SIZE, sorted.length)}** of **{sorted.length}** results
                    </Subtitle2>
                    <Button disabled={currentPage === 1 || isUpdating} onClick={() => goToPage(currentPage - 1)}>Previous</Button>
                    {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                        Math.max(0, currentPage - 3), 
                        Math.min(totalPages, currentPage + 2)
                    ).map((page) => (
                        <Button
                            key={page}
                            appearance={page === currentPage ? "primary" : "secondary"}
                            onClick={() => goToPage(page)}
                            disabled={isUpdating}
                        >
                            {page}
                        </Button>
                    ))}
                    {totalPages > 5 && currentPage < totalPages - 2 && <span>...</span>}
                    <Button disabled={currentPage === totalPages || isUpdating} onClick={() => goToPage(currentPage + 1)}>Next</Button>
                </div>
            )}
        </div>
    );
}