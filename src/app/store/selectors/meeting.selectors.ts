import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IUserState } from "../state/user.state";
import { IMeetingState } from '../state';

export const selectMeetingState = (state: IAppState): IMeetingState=> state.meetings;

export const selectMeetings = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.meetings
);

export const selectCurrentMeeting = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.currentMeeting
);

export const selectMeetingSessions = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.meetingSessions
);

export const selectCurrentSessions = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.currentSession
);

export const selectMeetingError = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.error
);
