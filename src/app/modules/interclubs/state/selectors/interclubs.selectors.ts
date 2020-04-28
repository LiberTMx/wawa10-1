import { InterclubsState } from '../insterclubs-state';
import { createFeatureSelector } from '@ngrx/store';

export const selectAuthState
// = state => state.profilesModule.data;
= createFeatureSelector<InterclubsState>('interclubsModule');


