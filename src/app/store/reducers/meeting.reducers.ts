import {
  EUserActions,
  GetSignInRequestsSuccessAction,
  GetSignInSessionSuccessAction,
  GetUserSuccessAction,
  SignInSuccessAction,
  UserActions
} from "../actions/user.actions";
import { initialUserState, IUserState } from "../state/user.state";
import { MeetingsActions, EMeetingsActions, GetMeetingsSuccessAction, 
  GetMeetingsFailureAction, GetMeetingSessionsSuccessAction, 
  GetMeetingSessionFailureAction, UpdateCurrentMeetingSuccessAction, UpdateCurrentMeetingFailureAction, 
  UpdateCurrentSessionSuccessAction, UpdateCurrentSessionFailureAction, 
  UpdateCurrentMeetingRequestAction, UpdateCurrentSessionRequestAction, 
  UpdateSessionQrCodeRequestAction, GetSessionQrCodeImageSuccessAction, GetSessionQrCodeImageFailureAction } from '../actions';
import { IMeetingState, initialMeetingState } from '../state';

export function meetingsReducers(
  state: IMeetingState = initialMeetingState,
  action: MeetingsActions
): IMeetingState {
  switch (action.type) {
    case EMeetingsActions.GetMeetingsSuccess: {
      const meetings = ((action as GetMeetingsSuccessAction).payload);
      return {
        ...state,
        meetings: meetings        
      };
    }
    case EMeetingsActions.GetMeetingsFailure: {
      return {
        ...state,
        error: (action as GetMeetingsFailureAction).payload
      };
    }
    case EMeetingsActions.UpdateCurrentMeetingRequest: {
      const meeting = ((action as UpdateCurrentMeetingRequestAction).payload);
      return {
        ...state,
       currentMeeting: meeting      
      };
    }
    case EMeetingsActions.UpdateCurrentMeetingFailure: {
      return {
        ...state,
        error: (action as UpdateCurrentMeetingFailureAction).payload
      };
    }
    case EMeetingsActions.GetMeetingSessionsSuccess: {
      const meetingSessions = ((action as GetMeetingSessionsSuccessAction).payload);
      return {
        ...state,
        meetingSessions: meetingSessions        
      };
    }
    case EMeetingsActions.GetMeetingSessionsFailure: {
      return {
        ...state,
        error: (action as GetMeetingSessionFailureAction).payload
      };
    }
    case EMeetingsActions.UpdateCurrentSessionRequest: {
      const session = ((action as UpdateCurrentSessionRequestAction).payload);
      return {
        ...state,
       currentSession: session     
      };
    }
    case EMeetingsActions.UpdateCurrentSessionFailure: {
      return {
        ...state,
        error: (action as UpdateCurrentSessionFailureAction).payload
      };
    }
    case EMeetingsActions.UpdateSessionQrCodeRequest: {
      const qrCode = ((action as UpdateSessionQrCodeRequestAction).payload);
      return {
        ...state,
       currentQrCode: qrCode     
      };
    }
    case EMeetingsActions.UpdateCurrentSessionFailure: {
      return {
        ...state,
        error: (action as UpdateCurrentSessionFailureAction).payload
      };
    }
    case EMeetingsActions.GetSessionsQrCodeImageSuccess: {
      const qrCodeImage = ((action as GetSessionQrCodeImageSuccessAction).payload);
      console.log('blog image:' + qrCodeImage);
      return {
        ...state,
        currentQrCodeImage: qrCodeImage        
      };
    }
    case EMeetingsActions.GetSessionsQrCodeImageFailure: {
      return {
        ...state,
        error: (action as GetSessionQrCodeImageFailureAction).payload
      };
    }


    default: {
      return state;
    }
  }
}
