import { Action } from '@ngrx/store';
import { InterclubsActionTypes } from './interclubs.actions';

export class InterclubsLoadCategoriesAction implements Action {

    readonly type = InterclubsActionTypes.InterclubsLoadCategoriesAction;

    constructor( ) {}
}
