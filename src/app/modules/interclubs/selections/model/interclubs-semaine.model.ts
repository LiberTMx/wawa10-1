export class InterclubsSemaineModel
{
    id: number;
    afftDivisionCategoryId: number; // tinyint(2) unsigned NOT NULL,  -- FK
    weekName: string; // varchar(5),
    weekNumber: number; // int,
    year: number; // int,
    startOfWeek: Date; // date,
    endOfWeek: Date; // date,
}
