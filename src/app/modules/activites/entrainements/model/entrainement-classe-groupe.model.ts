import { ClasseStatusType } from '../enums/classe-status.enum';
import { GroupeStatusType } from '../enums/groupe-status.enum';

export class EntrainementClasseGroupeModel
{
    id: number;
    periodeId: number;
    classeId: number;
    titre: string;
    presentation: string;
    updatedAt: Date;
    updatedBy: string;
    mimeType: string;
    imageFilename: string;
    status: GroupeStatusType;
    showOrder: number;
    limiteAge: string;
    limiteClassement: string;
}
