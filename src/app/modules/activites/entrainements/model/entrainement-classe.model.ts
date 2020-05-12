import { ClasseStatusType } from '../enums/classe-status.enum';

export class EntrainementClasseModel
{
    id: number;
    titre: string;
    presentation: string;
    updatedAt: Date;
    updatedBy: string;
    mimeType: string;
    imageFilename: string;
    status: ClasseStatusType;
    externalLink: string;
    showOrder: number;

}
