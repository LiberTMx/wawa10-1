import { NewsStatusType } from '../types/news-status.enum';
import { AuthUserModel } from '../../../auth/model/auth-user.model';

export class NewsModel
{
    id: number;
    title: string;
    presentation: string;
    auteurId: number;
    createdAt: Date;
    updatedAt: Date;
    status: NewsStatusType;
    externalLink: string;
    showOrder: number;

    // image
    image: NewsImageModel;

    // document
    document: NewsDocumentModel;

    auteur?: AuthUserModel;
}

export class NewsImageModel
{
    id: number;

    newsId: number;

    imageFilename: string;

    mimeType: string;

}

export class NewsDocumentModel
{
    id: number;

    newsId: number;

    docFilename: string;
    
    mimeType: string;
}
