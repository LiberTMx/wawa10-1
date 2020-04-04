
/*
  {"Position":1,"UniqueIndex":119894,"RankingIndex":1,
          "FirstName":"JULIEN","LastName":"INDEHERBERG","Ranking":"A20","Status":"A","Gender":"M",
          "Category":"SEN","MedicalAttestation":true},

*/
export class AfttMemberByCategoryEntity
{
    id: number;

    // tslint:disable-next-line:variable-name
    aftt_LastSyncId: number;
    divisionCategory: number;

    Position: number;
    UniqueIndex: number;
    RankingIndex: number;
    FirstName: string;
    LastName: string;
    Ranking: string;
    Status: string;
    Gender: string;
    Category: string;
    MedicalAttestation: boolean;

}
