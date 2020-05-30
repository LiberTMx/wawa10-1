import { AuthUserModel } from 'src/app/modules/auth/model/auth-user.model';
import { InterclubsSelectionModel } from './interclubs-selection.model';

export class InterclubsEnrichedSelectionModel
{
    selection: InterclubsSelectionModel;
    user: AuthUserModel;
}
