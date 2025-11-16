import * as z from 'zod';

export const SpecificRequestTypeSchema = z.enum(['CentrexGroupHuntingPBX', 'IMSSIPGPONComboService', 'ISDNE1ActivationDeactivation', 'ISDNE1VoiceService', 'ISDNDMigrationOrLineShifting', 'OnlineSupportPSTNMigrationTroubleshoot', 'OtherDataManagementTasks', 'ProductChangeH248ISDNToSIP', 'ShortCode3Or4DigitConfiguration', 'ShortNumberTermination', 'GeneralTroubleTicket'])

export type SpecificRequestType = z.infer<typeof SpecificRequestTypeSchema>;