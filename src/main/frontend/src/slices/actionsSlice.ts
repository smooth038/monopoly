import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UiAction } from 'models/uiAction';

export interface ActionsState {
  actions: UiAction[];
}

const initialState: ActionsState = { actions: [] };

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    addActions: (state, action: PayloadAction<UiAction[]>) => {
      return { ...state, actions: [...state.actions, ...action.payload] };
    },
    nextAction: (state) => {
      const actions = state.actions.slice(1);
      return { ...state, actions: actions };
    },
  },
});

export const { addActions, nextAction } = actionsSlice.actions;

export default actionsSlice.reducer;
