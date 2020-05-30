import { InterclubsDivisionModel } from './interclubs-division.model';

export class InterclubsMatchModel
{
    id: number;
    MatchId: string;
    WeekName: string;
    matchDate: Date;
    Time: string;
    Venue: number;
    HomeClub: string;
    HomeTeam: string;
    AwayClub: string;
    AwayTeam: string;
    Score: string;
    MatchUniqueId: number;
    IsHomeForfeited: boolean;
    IsAwayForfeited: boolean;
    DivisionId: number;
    DivisionCategory: string;
    IsHomeWithdrawn: string;
    IsAwayWithdrawn: string;
    venueName: string;
    venueStreet: string;
    venueTown: string;
    venuePhone: string;
    venueComment: string;
    IsValidated: boolean;
    IsLocked: boolean;
    homeTeamId: string;
    awayTeamId: string;

    division: InterclubsDivisionModel;
}
