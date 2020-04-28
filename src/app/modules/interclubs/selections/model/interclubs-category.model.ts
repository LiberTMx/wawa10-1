export class InterclubsCategory
{
    id: number;
    name: string;
    classementCategory: number;
    playerCategory: number;
    divisionNamePrefix: string;
    firstSeason: number;
    lastSeason: number;
    order: number;
}

export class InterclubsCategoryModel implements InterclubsCategory
{
    id: number;
    name: string;
    classementCategory: number;
    playerCategory: number;
    divisionNamePrefix: string;
    firstSeason: number;
    lastSeason: number;
    order: number;
}
