// src/utils/specificRequestTypeMap.ts

/**
 * Interface defining the user-facing data for a specific request type.
 * This allows us to separate the internal (Prisma) enum value from the 
 * display name and full description.
 */
export interface RequestTypeMapping {
    /** Short, readable label for use in dropdowns. (e.g., '01: Centrex/PBX Config') */
    label: string;
    /** Full, non-shortable description. */
    description: string;
}

/**
 * Mapping object where keys are the long, non-shortable Prisma enum values,
 * and the values contain the user-friendly label and description.
 */
export const SpecificRequestTypeMap: Record<string, RequestTypeMapping> = {
    CentrexGroupHuntingPBX: {
        label: '01: Centrex/PBX Config',
        description: 'Centrex group configuration (Hunting as PBX)',
    },
    IMSSIPGPONComboService: {
        label: '02: IMS/SIP/GPON Combo',
        description: 'IMS, SIP, GPON Combo service configuration',
    },
    ISDNE1ActivationDeactivation: {
        label: '03: ISDN/E1 A/D',
        description: 'ISDN E1 Activation and Deactivation',
    },
    ISDNE1VoiceService: {
        label: '04: ISDN/E1 Voice Config',
        description: 'ISDN E1 voice service configured',
    },
    ISDNDMigrationOrLineShifting: {
        label: '05: ISDN Migration/Shift',
        description: 'ISDN migration or Line shifting',
    },
    OnlineSupportPSTNMigrationTroubleshoot: {
        label: '06: Online Support / TT',
        description: 'Online Support, PSTN Migration, In/Out call solution, Caller ID Display, Routing',
    },
    OtherDataManagementTasks: {
        label: '07: Data Management Tasks',
        description: 'Other tasks (Data collection, data checking, hundred group config)',
    },
    ProductChangeH248ISDNToSIP: {
        label: '08: Product Change (SIP)',
        description: 'Configuration change from H248/ISDN fixed service to SIP',
    },
    ShortCode3Or4DigitConfiguration: {
        label: '09: Short Code Config (3/4 Digits)',
        description: 'Short code 3 and 4 Digits configuration',
    },
    ShortNumberTermination: {
        label: '10: Short No. Termination',
        description: 'Short number terminate from Fixed Number ISDN/SIP',
    },
    GeneralTroubleTicket: {
        label: '11: General Trouble Ticket (TT)',
        description: 'Catch-all for general Trouble Ticket types',
    },
};

/**
 * Helper array to generate dropdown options based on the map.
 * This is efficient for mapping and iterating in the component.
 */
export const mappedSpecificRequestOptions = Object.entries(SpecificRequestTypeMap).map(
    ([prismaValue, data]) => ({
        value: prismaValue, // The long Prisma enum value
        label: data.label,   // The short, display label
        description: data.description, // The full description
    })
);

/**
 * Utility function to get the display label for a given Prisma enum value.
 * @param key The long Prisma enum string.
 * @returns The short label or the original key if not found.
 */
export const getRequestTypeLabel = (key: string): string => {
    return SpecificRequestTypeMap[key]?.label || key;
};