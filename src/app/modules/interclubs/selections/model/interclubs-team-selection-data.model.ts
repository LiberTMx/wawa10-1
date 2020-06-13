import { InterclubsTeamModel } from './interclubs-team.model';
import { InterclubsMatchModel } from './interclubs-match.model';
import { InterclubsSelectionModel } from './interclubs-selection.model';
import { InterclubsLDF } from './interclubs-ldf.model';
import { AuthUserModel } from '../../../auth/model/auth-user.model';

export class InterclubsTeamSelectionDataModel
{
  team: InterclubsTeamModel;
  match: InterclubsMatchModel;
  // selections: Array<InterclubsLDF>=null;
  selections: Array<{sel: InterclubsSelectionModel, ldf: InterclubsLDF, user: AuthUserModel}> ;
  selectionsLoaded=false;
}
