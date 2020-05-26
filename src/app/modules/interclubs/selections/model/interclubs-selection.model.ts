export class InterclubsSelectionModel
{
    /*
    id: number;
    TeamId: string;
    Team: string;
    DivisionId: number;
    DivisionName: string;
    DivisionCategory: number;
    MatchType: number;
    */


   id: number;
   interclubs_match_id :  string;
   auth_user_id: number; 
   interclubs_semaine_version_id: number;
   position: number;
   classement: string;
   ranking_index: number;
   joueur_confirmation: string;
   joueur_commentaire: string;
   updated_at: Date;
   updated_by: number;
}
