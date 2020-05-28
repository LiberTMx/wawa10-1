import { InterclubsTeamModel } from './interclubs-team.model';
import { InterclubsMatchModel } from './interclubs-match.model';
import { InterclubsSelectionModel } from './interclubs-selection.model';
import { InterclubsLDF } from './interclubs-ldf.model';

export class InterclubsTeamSelectionDataModel
{
  team: InterclubsTeamModel;
  match: InterclubsMatchModel;
  selections: Array<InterclubsLDF>=null;
  selectionsLoaded=false;
}