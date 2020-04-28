
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { InterclubsCategory } from '../selections/model/interclubs-category.model';
import { AppState } from '../../../state/app.state';

export function getInteclubsCategoryId(cat: InterclubsCategory): number
{
    return cat.id;
}

export function sortInterclubsCategoryByOrder(cat1: InterclubsCategory, cat2: InterclubsCategory): number
{
    if(cat1.order < cat2.order) return -1;
    if(cat1.order > cat2.order) return +1;
    return 0;
}

export const InterclubCategoryAdapter: EntityAdapter<InterclubsCategory> =
    createEntityAdapter<InterclubsCategory>(
        {
            selectId: getInteclubsCategoryId,
            sortComparer: sortInterclubsCategoryByOrder
        }
    );

export interface InterclubsCategoryState extends EntityState<InterclubsCategory>
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

