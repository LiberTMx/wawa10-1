
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { AppState } from '../../../state/app.state';
import { InterclubsCategoryModel } from '../selections/model/interclubs-category.model';

export function getInteclubsCategoryId(cat: InterclubsCategoryModel): number
{
    return cat.id;
}

export function sortInterclubsCategoryByOrder(cat1: InterclubsCategoryModel, cat2: InterclubsCategoryModel): number
{
    if(cat1.order < cat2.order) return -1;
    if(cat1.order > cat2.order) return +1;
    return 0;
}

export const InterclubCategoryAdapter: EntityAdapter<InterclubsCategoryModel> =
    createEntityAdapter<InterclubsCategoryModel>(
        {
            selectId: getInteclubsCategoryId,
            sortComparer: sortInterclubsCategoryByOrder
        }
    );

export interface InterclubsCategoryState extends EntityState<InterclubsCategoryModel>
{
    allInterclubsCategoriesLoaded: boolean;
}


export interface InterclubsState
{
    interclubsCategories: InterclubsCategoryState;
}

export const initialInterclubsState: InterclubsState = {
    interclubsCategories: InterclubCategoryAdapter.getInitialState({
            allInterclubsCategoriesLoaded: false
        }
    )
};

