import { InterclubsLdfParticipantModel } from './interclubs-ldf-participant.model';
import { InterclubsLdfByCategoryModel } from './interclubs-ldf-by-category.model';

export class InterclubsLDF
{
    constructor(
        public participant: InterclubsLdfParticipantModel,
        public listeDeForce: InterclubsLdfByCategoryModel,
        public allowed: boolean,
    ) {}
   
}
