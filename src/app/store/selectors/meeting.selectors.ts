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

export const selectCurrentSession = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.currentSession
);

export const selectCurrentQrCode = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.currentQrCode
);

export const selectCycleSessionCode = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.cycleSessionCode
);

export const selectCurrentQrCodeImage = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.currentQrCodeImage
);

export const selectMeetingError = createSelector(
  selectMeetingState,
  (state: IMeetingState) => state.error
);
