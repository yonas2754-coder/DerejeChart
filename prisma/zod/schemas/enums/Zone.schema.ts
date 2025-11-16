import * as z from 'zod';

export const ZoneSchema = z.enum(['EAAZ', 'CAAZ', 'SAAZ', 'NAAZ', 'SWAAZ', 'WAAZ', 'NR_Mekele', 'NWR_Bahirdar', 'ER_Dire_Dawa', 'CER_Harar', 'CNR_D_Birhan', 'WR_Nekempt', 'SER_Adama', 'SR_Hawassa', 'SWR_Jimma', 'CWR_Ambo', 'EER_Jigiiga', 'NEER_Semera', 'NNWR_Gonder', 'NER_Dessie', 'SWWR_Gambela', 'WWR_Assosa', 'SSWR_Wolyta', 'Bill_Section', 'Enterprise_office'])

export type Zone = z.infer<typeof ZoneSchema>;