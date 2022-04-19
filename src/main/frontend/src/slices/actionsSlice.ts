import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UiAction } from "models/uiAction";

export interface ActionsState {
  actions: UiAction[],
  isAdvancing: boolean,
}

const initialState: ActionsState = {actions: [], isAdvancing: false};

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    addActions: (state, action: PayloadAction<UiAction[]>) => {
      return {...state, actions: [...state.actions, ...action.payload]};
    },
    nextAction: (state) => {
      const actions = state.actions.slice(1);
      return {...state, actions: actions};
    },
    setAdvancing: (state, action: PayloadAction<boolean>) => {
      return {...state, isAdvancing: action.payload};
    }
  },
});

export const { addActions, nextAction, setAdvancing } = actionsSlice.actions;

export default actionsSlice.reducer;