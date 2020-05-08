import { ClasseStatusType } from '../enums/classe-status.enum';
import { GroupeStatusType } from '../enums/groupe-status.enum';

export class EntrainementGroupeSeanceModel
{
    id: number;
    classeId: number;
    groupeId: number;
    periodeId: number;
    
    titre: string;
    presentation: string;
    jourIndex: number;
    heureDebut: string;
    heureFin: string;

    updatedAt: Date;
    updatedBy: string;
}
