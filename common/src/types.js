export const PROMISE_RESULT = 'PROMISE_RESULT';
export const APP_STARTED = 'APP_STARTED';
export const TAB_CLOSED = 'TAB_CLOSED';
export const TAB_FOCUSED = 'TAB_FOCUSED';
export const AUTH = 'AUTH';
export const REAUTH = 'REAUTH';
export const SUB_STATE_CHANGED = 'SUB_STATE_CHANGED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const AUTH_FAILED = 'AUTH_FAILED';
export const AUTH_BOOTSTRAP_COMPLETE = 'AUTH_BOOTSTRAP_COMPLETE';
export const WAVV_ACCOUNT_LOGGED_IN = 'WAVV_ACCOUNT_LOGGED_IN';
export const SIGN_OUT = 'SIGN_OUT';
// Server -> every tab of a user: the account was signed out (auth.signout). Not SIGN_OUT, which is the client's own
// redux action — a wire event and an internal action must not share a name.
export const SESSION_REVOKED = 'SESSION_REVOKED';
// Client -> server: sign this session out (auth.signout), carried as a server action that SESSION_REVOKED answers.
export const SIGN_OUT_REQUESTED = 'SIGN_OUT_REQUESTED';
export const WAVV_TOKEN_KEY = 'wavvToken';
// Chrome: set while a sign-out is in flight and cleared when SIGN_OUT lands, so an extension reload in between
// (1.7's Settings reloads 250ms after asking) finishes the sign-out on the next boot instead of losing it.
export const WAVV_SIGN_OUT_PENDING_KEY = 'wavvSignOutPending';
export const USER_AUTH_UPDATED = 'USER_AUTH_UPDATED';
export const GET_STORM_INFO = 'GET_STORM_INFO';
export const STORM_INFO = 'STORM_INFO';
export const STORM_VERSION_DRIFT_DETECTED = 'STORM_VERSION_DRIFT_DETECTED';
export const CHROME_RELOAD_OFFSCREEN = 'CHROME_RELOAD_OFFSCREEN';
export const CHROME_SHOW_NOTIFICATION = 'CHROME_SHOW_NOTIFICATION';
export const CHROME_DISMISS_NOTIFICATION = 'CHROME_DISMISS_NOTIFICATION';
export const CHROME_START_RINGTONE = 'CHROME_START_RINGTONE';
export const CHROME_STOP_RINGTONE = 'CHROME_STOP_RINGTONE';
export const CHROME_FOCUS_APP_SURFACE = 'CHROME_FOCUS_APP_SURFACE';
// Chrome's linked wavv-auth. Offscreen storm-js owns the sign-in and the seat question through a wavv-auth nobody can
// see; the side panel embeds a second one as the screen (sidepanel.html) and follows the `wavvAuth` slice these drive.
export const WAVV_AUTH_PERSON_NEEDED = 'WAVV_AUTH_PERSON_NEEDED'; // the offscreen fragment has a screen for a person
export const WAVV_AUTH_PERSON_SETTLED = 'WAVV_AUTH_PERSON_SETTLED'; // a session landed, or the question went away
export const WAVV_AUTH_PANEL_REQUESTED = 'WAVV_AUTH_PANEL_REQUESTED'; // a surface asks the panel back on screen
export const WAVV_AUTH_PANEL_DISMISSED = 'WAVV_AUTH_PANEL_DISMISSED'; // the person closed the side panel's wavv-auth with its screen still pending
export const WAVV_AUTH_SESSION_DELIVERED = 'WAVV_AUTH_SESSION_DELIVERED'; // a wavv-auth (either frame) handed a token over
export const WAVV_AUTH_UNAVAILABLE = 'WAVV_AUTH_UNAVAILABLE'; // wavv-auth could not take the sign-in, and storm has no remembered token
export const SET_CALLBACK = 'SET_CALLBACK';
export const REMOVE_CALLBACK = 'REMOVE_CALLBACK';
export const SIGN_TOS = 'SIGN_TOS';
export const SHOW_MINI_DIALER = 'SHOW_MINI_DIALER';
export const STORE_CLOSED = 'STORE_CLOSED';

// functions
export const F_AUTH = 'AUTH';
export const F_START_CAMPAIGN = 'START_CAMPAIGN';
export const F_START_CALLBOARD = 'START_CALLBOARD';
export const F_END_CAMPAIGN = 'END_CAMPAIGN';
export const F_CONTINUE = 'CONTINUE';
export const F_CALL_PHONE = 'CALL_PHONE';
export const F_ADD_PHONE = 'ADD_PHONE';
export const F_REMOVE_PHONE = 'REMOVE_PHONE';
export const F_REMOVE_CONTACT = 'REMOVE_CONTACT';
export const F_OPEN_MESSENGER = 'OPEN_MESSENGER';
export const F_OPEN_MESSENGER_THREAD = 'OPEN_MESSENGER_THREAD';
export const F_SET_THEME = 'SET_THEME';
export const F_ADD_DNC_NUMBER = 'ADD_DNC_NUMBER';
export const F_REMOVE_DNC_NUMBER = 'REMOVE_DNC_NUMBER';
export const F_SET_MERGE_FIELDS = 'SET_MERGE_FIELDS';
export const F_START_VIDEO = 'START_VIDEO';
export const F_OPEN_SPAM = 'OPEN_SPAM';
export const F_SELECT_VIDEO = 'SELECT_VIDEO';
export const F_PURCHASE_DIALER = 'PURCHASE_DIALER';
export const F_PURCHASE_MESSENGER = 'PURCHASE_MESSENGER';
export const F_RECORD_CALL = 'RECORD_CALL';
/**
 * Mask and unmask an in-progress recording — the PCI case, while a payment screen is open.
 *
 * Distinct from `F_RECORD_CALL`, which marks a recording to be *kept*. These two forward the same
 * `BUTTON_PAUSE_RECORDING` / `BUTTON_RESUME_RECORDING` the dialer's own buttons send; they exist
 * because those are internal actions with no host-callable entry point, so a host dispatching them
 * directly never had its promise settled.
 */
export const F_PAUSE_RECORDING = 'PAUSE_RECORDING';
export const F_RESUME_RECORDING = 'RESUME_RECORDING';
export const F_DROP_VOICEMAIL = 'DROP_VOICEMAIL';
export const F_LIST_VOICEMAILS = 'LIST_VOICEMAILS';
export const F_LOAD_DIALER = 'LOAD_DIALER';
export const F_OPEN_SETTINGS = 'OPEN_SETTINGS';
export const F_OPEN_CALL_HISTORY = 'OPEN_CALL_HISTORY';
/**
 * `@wavv/sdk`'s name for F_OPEN_CALL_HISTORY, whose every display function is `show*`.
 *
 * Both names stay: the old one ships in the wild already, and the new SDK is additive. They share a
 * handler, and the schema takes `type` or the original `inbound` boolean.
 */
export const F_SHOW_CALL_HISTORY = 'SHOW_CALL_HISTORY';
/**
 * Create a call list from contacts and hand back its id, without starting a dial session.
 *
 * `F_START_CAMPAIGN` already creates one implicitly, but only as a side effect of dialing and without
 * returning the id, so a platform had no way to build a list now and open it later.
 */
export const F_CREATE_CALL_LIST = 'CREATE_CALL_LIST';

/**
 * The `module` @wavv/sdk stamps on every action it dispatches.
 *
 * Lets core tell the new SDK from the old @wavv/dialer and @wavv/messenger modules, so behaviour can
 * change for one without changing for the other.
 */
export const SDK_MODULE = 'sdk';
/** Server-side counterpart of F_CREATE_CALL_LIST. */
export const CAMPAIGN_CREATE_LIST = 'CAMPAIGN_CREATE_LIST';

export const F_SHOW_SIDEPANEL = 'SHOW_SIDEPANEL';
export const F_HIDE_SIDEPANEL = 'HIDE_SIDEPANEL';
export const F_SET_SIDEPANEL_WIDTH = 'SET_SIDEPANEL_WIDTH';
export const SET_SIDEPANEL_WIDTH = 'SET_SIDEPANEL_WIDTH';
export const F_CLOSE_DIALER = 'CLOSE_DIALER';
export const F_SHOW_MINI = 'SHOW_MINI';
export const F_SHOW_CALLBOARDS = 'SHOW_CALLBOARDS';
export const F_SHOW_CALL_SCRIPTS_DOCK_LIST = 'SHOW_CALL_SCRIPTS_DOCK_LIST';
export const F_OPEN_ONBOARDING = 'OPEN_ONBOARDING';
export const F_GET_ONBOARDING_STATUS = 'GET_ONBOARDING_STATUS';
export const F_SHOW_CALL_RECORDING_MODAL = 'SHOW_CALL_RECORDING_MODAL';
export const F_HIDE_CALL_RECORDING_MODAL = 'HIDE_CALL_RECORDING_MODAL';
// Dispatched raw by the GHL integration (`window.WAVV.dispatch({ type })`) and handled beside the F_
// functions in dispatch.js; kept here so they can sit in the list below.
export const SHOW_GHL_SETTINGS = 'SHOW_GHL_SETTINGS';
export const OPEN_CONVERSATION = 'OPEN_CONVERSATION';
export const LOAD_CAMPAIGN = 'LOAD_CAMPAIGN';

/**
 * The host calls above that would put WAVV on screen — open core's UI or show one of storm's frames.
 *
 * These are the only calls that open wavv-auth's sign-in panel. An init never does, whatever started it:
 * `initWavv` is a CRM telling us who the user is, not asking to see WAVV, and one made on page load has
 * nobody looking. One of these arriving while sign-in is still wavv-auth's to finish IS the ask, and the
 * panel stands in for the surface it would have opened (`requestAuthPanel` in dispatch.js).
 *
 * A new function is either on this list or deliberately not. Configuration and queries stay off —
 * setTheme, setMergeFields, the sidepanel width, the listeners, `loadDialer` (which only warms the
 * dialer's frame, hidden): none of them shows anything, and a sign-in form popping on a theme change
 * would be the bug the list exists to stop. `DIALOG` stays off too, because the same type hides as well as
 * shows.
 */
export const SURFACE_FUNCTIONS = [
	F_START_CAMPAIGN,
	F_CALL_PHONE,
	F_OPEN_MESSENGER,
	F_OPEN_MESSENGER_THREAD,
	F_OPEN_SPAM,
	F_START_VIDEO,
	F_SELECT_VIDEO,
	F_OPEN_SETTINGS,
	F_OPEN_CALL_HISTORY,
	F_SHOW_CALL_HISTORY,
	F_SHOW_CALLBOARDS,
	F_SHOW_CALL_SCRIPTS_DOCK_LIST,
	F_SHOW_SIDEPANEL,
	F_SHOW_MINI,
	F_PURCHASE_DIALER,
	F_PURCHASE_MESSENGER,
	F_OPEN_ONBOARDING,
	F_SHOW_CALL_RECORDING_MODAL,
	SHOW_GHL_SETTINGS,
	OPEN_CONVERSATION,
	LOAD_CAMPAIGN,
];
export const INVALIDATE_CALLSCRIPTS_CACHE = 'INVALIDATE_CALLSCRIPTS_CACHE';
export const CURRENT_CALLSCRIPTS_CONTACT_UPDATED = 'CURRENT_DIALER_CONTACT_UPDATED';
export const SET_CURRENT_CALLSCRIPTS_CONTACT = 'SET_CURRENT_CALLSCRIPTS_CONTACT';
export const OPEN_SETTINGS_FROM_EXTERNAL = 'OPEN_SETTINGS_FROM_EXTERNAL';
export const SHOW_CALL_SCRIPTS_DOCK_LIST_FROM_EXTERNAL = 'SHOW_CALL_SCRIPTS_DOCK_LIST_FROM_EXTERNAL';
export const SET_CREATE_TEMPLATE = 'SET_CREATE_TEMPLATE';
export const SET_EDIT_SCRIPT_ID = 'SET_EDIT_SCRIPT_ID';

export const INIT_DIALER = 'INIT_DIALER';
export const INIT_MESSENGER = 'INIT_MESSENGER';
export const INIT_VIDEO = 'INIT_VIDEO';
export const INIT_SPAM = 'INIT_SPAM';

export const SKIP_SPAM_MONITORING_SETUP = 'SKIP_SPAM_MONITORING_SETUP';
export const SKIP_BUSINESS_PROFILE_SETUP = 'SKIP_BUSINESS_PROFILE_SETUP';
export const SKIP_NUMBER_PURCHASE_SETUP = 'SKIP_NUMBER_PURCHASE_SETUP';

// callboards types
export const SHOW_CALLBOARDS = 'SHOW_CALLBOARDS';
export const HIDE_CALLBOARDS = 'HIDE_CALLBOARDS';

export const GET_CALLBOARD = 'GET_CALLBOARD';
export const GET_CALLBOARDS = 'GET_CALLBOARDS';
export const GET_CALLBOARD_STAGE = 'GET_CALLBOARD_STAGE';
export const GET_CALLBOARD_LEADS_IN_STAGE_BUCKETS = 'GET_CALLBOARD_LEADS_IN_STAGE_BUCKETS';
export const SET_CALLBOARD_LEADS_IN_STAGE_BUCKETS = 'SET_CALLBOARD_LEADS_IN_STAGE_BUCKETS';
export const GET_GHL_TAGS = 'GET_GHL_TAGS';
export const GET_GHL_WORKFLOWS = 'GET_GHL_WORKFLOWS';
export const SET_CALLBOARD = 'SET_CALLBOARD';
export const CLEAR_SELECTED_TEMPLATE = 'CLEAR_SELECTED_TEMPLATE';
export const CALLBOARD_SETTINGS_OPENED = 'CALLBOARD_SETTINGS_OPENED';
export const SET_CALLBOARDS = 'SET_CALLBOARDS';
export const SET_CREATED_CALLBOARD = 'SET_CREATED_CALLBOARD';
export const SET_CREATED_CALLBOARD_FAILED = 'SET_CREATED_CALLBOARD_FAILED';
export const CLEAR_CREATE_CALLBOARD_RESULT = 'CLEAR_CREATE_CALLBOARD_RESULT';
export const SET_CALLBOARD_STAGE = 'SET_CALLBOARD_STAGE';
export const SET_CALLBOARD_STAGE_LEAD = 'SET_CALLBOARD_STAGE_LEAD';
export const SET_CALLBOARD_STAGE_LEADS = 'SET_CALLBOARD_STAGE_LEADS';
export const CALLBOARD_USER_SETTINGS_UPDATE = 'CALLBOARD_USER_SETTINGS_UPDATE';
export const CALLBOARD_USER_SETTINGS_UPDATE_ACTION = 'CALLBOARD_USER_SETTINGS_UPDATE_ACTION';
export const CALLBOARD_REMOVE_LEAD_FROM_STAGE_ACTION = 'CALLBOARD_REMOVE_LEAD_FROM_STAGE_ACTION';
export const REMOVE_ALL_CONTACTS_FROM_STAGE = 'REMOVE_ALL_CONTACTS_FROM_STAGE';
export const REMOVE_ALL_CONTACTS_FROM_STAGE_COMPLETE = 'REMOVE_ALL_CONTACTS_FROM_STAGE_COMPLETE';
export const REMOVE_ALL_CONTACTS_FROM_STAGE_FAILED = 'REMOVE_ALL_CONTACTS_FROM_STAGE_FAILED';
export const SET_GHL_TAGS = 'SET_GHL_TAGS';
export const SET_GHL_WORKFLOWS = 'SET_GHL_WORKFLOWS';
export const DELETE_CALLBOARD_STAGE = 'DELETE_CALLBOARD_STAGE';
export const UPDATE_CALLBOARD = 'UPDATE_CALLBOARD';
export const CALLBOARD_DELETED = 'CALLBOARD_DELETED';
export const DELETE_CALLBOARD_ACTION = 'DELETE_CALLBOARD_ACTION';
export const DELETE_CALLBOARD_FAILED = 'DELETE_CALLBOARD_FAILED';
export const CLEAR_DELETE_BOARD_ERROR = 'CLEAR_DELETE_BOARD_ERROR';
export const UPDATE_STAGE = 'UPDATE_STAGE';
export const CREATE_CALLBOARD_STAGE = 'CREATE_CALLBOARD_STAGE';
export const SUBSCRIBE_TO_CALLBOARD_EVENTS = 'SUBSCRIBE_TO_CALLBOARD_EVENTS';
export const UNSUBSCRIBE_FROM_CALLBOARD_EVENTS = 'UNSUBSCRIBE_FROM_CALLBOARD_EVENTS';
export const UPDATE_CALLBOARD_SETTINGS = 'UPDATE_CALLBOARD_SETTINGS';
export const QUEUE_CONTACTS_FOR_CALLBOARD = 'QUEUE_CONTACTS_FOR_CALLBOARD';
export const UNQUEUE_CONTACTS_FOR_CALLBOARD = 'UNQUEUE_CONTACTS_FOR_CALLBOARD';
export const MOVE_LEAD_TO_STAGE = 'MOVE_LEAD_TO_STAGE';
export const ASSIGN_LEAD_TO_TEAM_MEMBER = 'ASSIGN_LEAD_TO_TEAM_MEMBER';
export const CLEAR_ALL_CALLBOARD_STAGES = 'CLEAR_ALL_CALLBOARD_STAGES';
// Every stage's dispositions in one REST read. The dialer socket delivers the same rows one stage at a
// time (REFRESH_DISPOSITION_CONFIG), which needs a dialer session — this path doesn't, so it serves both
// the settings tree and hosts with no socket at all.
export const GET_CALLBOARD_DISPOSITIONS = 'GET_CALLBOARD_DISPOSITIONS';
export const SET_CALLBOARD_DISPOSITIONS = 'SET_CALLBOARD_DISPOSITIONS';
export const CREATE_CALLBOARD_DISPOSITION = 'CREATE_CALLBOARD_DISPOSITION';
export const UPDATE_CALLBOARD_DISPOSITION_ORDER = 'UPDATE_CALLBOARD_DISPOSITION_ORDER';
export const UPDATE_CALLBOARD_DISPOSITION = 'UPDATE_CALLBOARD_DISPOSITION';
export const DELETE_CALLBOARD_DISPOSITION = 'DELETE_CALLBOARD_DISPOSITION';
export const SET_CALLBOARD_AUTOMATION = 'SET_CALLBOARD_AUTOMATION';
export const SET_CALLBOARD_AUTOMATIONS = 'SET_CALLBOARD_AUTOMATIONS';
export const REMOVE_CALLBOARD_AUTOMATION = 'REMOVE_CALLBOARD_AUTOMATION';
export const CREATE_CALLBOARD_AUTOMATION = 'CREATE_CALLBOARD_AUTOMATION';
export const CREATE_CALLBOARD_AUTOMATION_FAILED = 'CREATE_CALLBOARD_AUTOMATION_FAILED';
export const UPDATE_CALLBOARD_AUTOMATION = 'UPDATE_CALLBOARD_AUTOMATION';
export const UPDATE_CALLBOARD_AUTOMATION_FAILED = 'UPDATE_CALLBOARD_AUTOMATION_FAILED';
export const UPDATE_CALLBOARD_AUTOMATION_ORDER = 'UPDATE_CALLBOARD_AUTOMATION_ORDER';
export const DELETE_CALLBOARD_AUTOMATION = 'DELETE_CALLBOARD_AUTOMATION';
export const DELETE_CALLBOARD_AUTOMATION_FAILED = 'DELETE_CALLBOARD_AUTOMATION_FAILED';

// Video types
export const SELECT_VIDEO = 'SELECT_VIDEO';
export const SELECT_VIDEO_DETAIL = 'SELECT_VIDEO_DETAIL';

export const ATTACH_VIDEO = 'ATTACH_VIDEO';
export const MESSENGER_VIDEO_CALLBACK = 'MESSENGER_VIDEO_CALLBACK';
export const ADD_SELECTED_VIDEO = 'ADD_SELECTED_VIDEO';
export const REMOVE_SELECTED_VIDEO = 'REMOVE_SELECTED_VIDEO';
export const SET_VIDEO_SIGNATURE = 'SET_VIDEO_SIGNATURE';
export const SET_VIDEO_SIGNATURE_AVATAR = 'SET_VIDEO_SIGNATURE_AVATAR';
export const UPDATE_VIDEO_SIGNATURE_AVATAR = 'UPDATE_VIDEO_SIGNATURE_AVATAR';
export const UPDATE_AVATAR_URL = 'UPDATE_AVATAR_URL';

export const GET_VIDEOS = 'GET_VIDEOS';
export const SET_VIDEOS = 'SET_VIDEOS';
export const GET_VIDEO = 'GET_VIDEO';
export const SET_VIDEO = 'SET_VIDEO';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const REMOVED_VIDEO = 'REMOVED_VIDEO';
export const RENAME_VIDEO = 'RENAME_VIDEO';

export const GET_VIDEO_LINKS = 'GET_VIDEO_LINKS';
export const SET_VIDEO_LINKS = 'SET_VIDEO_LINKS';

export const SET_UPLOAD_RESOURCE = 'SET_UPLOAD_RESOURCE';

export const UPDATE_VIDEO_UPLOAD_PROGRESS = 'UPDATE_VIDEO_UPLOAD_PROGRESS';
export const VIDEO_STATUS_UPLOADING = 'uninitialized';
export const VIDEO_STATUS_WAITING = 'waiting';
export const VIDEO_STATUS_PROCESSING = 'preparing';
export const VIDEO_STATUS_READY = 'ready';
export const VIDEO_STATUS_FAILED = 'errored';

// event when video data gets updated (usually during transcoding)
export const VIDEO_ASSET_UPDATED = 'VIDEO_ASSET_UPDATED';
export const VIDEO_ASSET_DELETED = 'VIDEO_ASSET_DELETED';
export const VIDEO_ASSET_AUTO_SEND_MESSAGES = 'VIDEO_ASSET_AUTO_SEND_MESSAGES'; // TODO: remove when new messenger comes out

// Dialer actions
export const CONNECT_DIALER = 'CONNECT_DIALER';
export const CONNECTION_PROMPT = 'CONNECTION_PROMPT';
export const DIAL_IN_MESSAGE = 'dial-in-message';

// User's custom dispositions
export const REFRESH_DISPOSITION_CONFIG = 'REFRESH_DISPOSITION_CONFIG';
export const SET_DISPOSITION_CONFIG = 'SET_DISPOSITION_CONFIG';
export const SAVE_DISPOSITION = 'SAVE_DISPOSITION';
export const DISPOSITION_SET = 'DISPOSITION_SET';
export const WAIT_FOR_DISPOSITION = 'WAIT_FOR_DISPOSITION';
export const CALL_COMPLETE = 'CALL_COMPLETE';
export const DISPOSITION_DEFINITIVE_TYPE_POSITIVE = 'POSITIVE';
export const DISPOSITION_DEFINITIVE_TYPE_NEUTRAL = 'NEUTRAL';
export const DISPOSITION_DEFINITIVE_TYPE_NEGATIVE = 'NEGATIVE';

// schedule call
export const SHOW_SCHEDULE_CALL = 'SHOW_SCHEDULE_CALL';
export const SCHEDULE_CALL_SOURCE_CALLBOARDS = 'callboards';
export const CLOSE_SCHEDULE_CALL = 'CLOSE_SCHEDULE_CALL';
export const SET_SCHEDULE_CALL_PENDING_ACTION = 'SET_SCHEDULE_CALL_PENDING_ACTION';
export const CALL_SCHEDULED = 'CALL_SCHEDULED';
export const SCHEDULED_CALLS_BECAME_READY = 'SCHEDULED_CALLS_BECAME_READY';
export const CONFIRM_SCHEDULED_CALL = 'CONFIRM_SCHEDULED_CALL';
export const CANCEL_SCHEDULED_CALL = 'CANCEL_SCHEDULED_CALL';
export const ADD_SCHEDULE_CALL = 'ADD_SCHEDULE_CALL';
export const REMOVE_SCHEDULE_CALL = 'REMOVE_SCHEDULE_CALL';

// callbacks
export const ON_DNC_CHANGED = 'DNC_CHANGED';
export const ON_CALL_STARTED = 'CALL_STARTED';
export const ON_CALL_ANSWERED = 'CALL_ANSWERED';
/**
 * An inbound call arrived. The counterpart to ON_CALL_STARTED for the other direction, and the one
 * call event the old modules never had — a platform could see every outbound call and none of the
 * inbound ones.
 */
export const ON_CALL_INCOMING = 'CALL_INCOMING';
export const ON_CALL_ENDED = 'CALL_ENDED';
export const ON_CALL_RECORDED = 'CALL_RECORDED';
export const ON_DIALER_IDLE = 'DIALER_IDLE';
export const ON_WAITING_FOR_CONTINUE = 'WAITING_FOR_CONTINUE';
export const ON_CAMPAIGN_ENDED = 'CAMPAIGN_ENDED';
export const ON_LINES_CHANGED = 'LINES_CHANGED';
export const ON_CLOSED = 'CLOSED';
export const ON_DIALER_VISIBLE = 'DIALER_VISIBLE';
export const ON_DIALER_MINI_VISIBLE = 'DIALER_MINI_VISIBLE';
export const ON_OVERLAY_VISIBLE = 'OVERLAY_VISIBLE';
export const ON_CONTACT_SEARCH = 'CONTACT_SEARCH';
export const ON_MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const ON_MESSAGE_SENT = 'MESSAGE_SENT';
export const ON_MESSAGE_FAILED = 'MESSAGE_FAILED';
export const ON_UNREAD_COUNT = 'UNREAD_COUNT';
export const ON_CONTACT_LINK = 'CONTACT_LINK';
/**
 * WAVV asking the host to put a contact on screen, with the reason it is asking.
 *
 * `ON_CONTACT_LINK` only ever meant "the user clicked a contact", and only callboards ever fired it, so
 * a host had no way to learn about the screen pop that matters most: the dialer moving to a contact.
 * Reasons are `DIALER_FOCUS`, `MESSENGER_OPEN` and `USER_CLICK`; a host honours the ones it cares about.
 */
export const ON_OPEN_CONTACT = 'OPEN_CONTACT';
export const OPEN_CONTACT_DIALER_FOCUS = 'DIALER_FOCUS';
export const OPEN_CONTACT_MESSENGER_OPEN = 'MESSENGER_OPEN';
export const OPEN_CONTACT_USER_CLICK = 'USER_CLICK';
export const ON_MANAGE_SUBSCRIPTION = 'MANAGE_SUBSCRIPTION';
export const ON_UPSELL_CLICK = 'UPSELL_CLICK';
export const ON_VIDEOS_SELECTED = 'VIDEOS_SELECTED';
export const ON_DISPOSITION_SET = 'DISPOSITION_SET';
export const ON_ONBOARDING_CLOSED = 'ONBOARDING_CLOSED';
export const ON_ONBOARDING_COMPLETE = 'ONBOARDING_COMPLETE';

// dialset disconnect reasons
export const ACK_LAYOUT = 'ACK_LAYOUT';
export const AMD_STATUS_EVENT = 'AMD_STATUS_EVENT';
export const AUDIO_UPLOADED = 'AUDIO_UPLOADED';
export const BAR_HEIGHT = 'BAR_HEIGHT';
export const MINI_BAR_HEIGHT = 'MINI_BAR_HEIGHT';

export const START_VIDEO = 'START_VIDEO';

export const DIALOG_CONFIRM = 'DIALOG_CONFIRM';

export const BUTTON_CLOSE = 'BUTTON_CLOSE';
export const BUTTON_DIAL = 'BUTTON_DIAL';
export const BUTTON_DROP_VM = 'BUTTON_DROP_VM';
export const BUTTON_HANGUP = 'BUTTON_HANGUP';
export const BUTTON_LEFT_DIALOG = 'BUTTON_LEFT_DIALOG';
export const BUTTON_PAUSE = 'BUTTON_PAUSE';
export const BUTTON_RECORD_MESSAGE = 'BUTTON_RECORD_MESSAGE';
export const BUTTON_PAUSE_RECORDING = 'BUTTON_PAUSE_RECORDING';
export const BUTTON_RESUME_RECORDING = 'BUTTON_RESUME_RECORDING';
export const BUTTON_REDIAL = 'BUTTON_REDIAL';
export const BUTTON_RESUME = 'BUTTON_RESUME';
export const BUTTON_RIGHT_DIALOG = 'BUTTON_CONFIRM';
export const BUTTON_SAVE_CALL = 'BUTTON_SAVE_CALL';
export const BUTTON_START = 'BUTTON_START';
export const BUTTON_STOP = 'BUTTON_STOP';
export const BUTTON_CLOSE_RECORD = 'BUTTON_CLOSE_RECORD';
export const BUTTON_TEXT_ME = 'BUTTON_TEXT_ME';
export const BUTTON_UPSELL_CLICK = 'BUTTON_UPSELL_CLICK';
export const BUTTON_COLD_TRANSFER = 'BUTTON_COLD_TRANSFER';
export const BUTTON_WARM_TRANSFER = 'BUTTON_WARM_TRANSFER';
export const BUTTON_CANCEL_TRANSFER = 'BUTTON_CANCEL_TRANSFER';
export const BUTTON_MERGE_TRANSFER = 'BUTTON_MERGE_TRANSFER';
export const BUTTON_LEAVE_TRANSFER = 'BUTTON_LEAVE_TRANSFER';
export const BUTTON_ANSWER = 'BUTTON_ANSWER';
export const BUTTON_DECLINE = 'BUTTON_DECLINE';
export const BUTTON_MONITOR_STATUS = 'BUTTON_MONITOR_STATUS';
export const BUTTON_MONITOR = 'BUTTON_MONITOR';

export const START_WEB_RTC = 'START_WEB_RTC';
export const STOP_WEB_RTC = 'STOP_WEB_RTC';
export const MUTE_CALL = 'MUTE_CALL';
export const SEND_DTMF = 'SEND_DTMF';
export const TRANSCRIPTION_MODE = 'TRANSCRIPTION_MODE';

export const CALL_RECORDING = 'CALL_RECORDING';
export const CALL_SAVED = 'CALL_SAVED';
export const CALLING_YOU_DIALOG = 'CALLING_YOU_DIALOG';
export const READY_CONNECTING_DIALOG = 'READY_CONNECTING_DIALOG';
export const CANCEL_RECORD_MESSAGE = 'CANCEL_RECORD_MESSAGE';

export const CALL_TYPE_USER = 'USER';
export const CALL_TYPE_TARGET = 'TARGET';
export const CALL_TYPE_SPAM_CHECK = 'SPAM_CHECK';
export const CALL_TYPE_MESSAGE = 'VM_RECORD';
export const CALL_TYPE_VERIFY = 'VERIFY';
export const CALL_TYPE_FORWARD = 'FORWARD';
export const CALL_TYPE_WHISPER = 'WHISPER';
export const CALL_TYPE_COLD_TRANSFER = 'COLD_TRANSFER';
export const CALL_TYPE_WARM_TRANSFER = 'WARM_TRANSFER';
export const CALL_TYPE_VOICEMAIL = 'VOICEMAIL';
export const CALL_TYPE_INBOUND = 'INBOUND';

export const CALL_POP = 'CALL_POP';
export const CALL_POP_END = 'CALL_POP_END';
export const PUSH_SUBSCRIBE = 'PUSH_SUBSCRIBE';

export const FOCUSED_TAB = 'FOCUSED_TAB';
export const MONITOR_CONNECT = 'MONITOR_CONNECT'; // begin connecting to monitor
export const MONITOR_CONNECTED = 'MONITOR_CONNECTED'; // someone connected to monitor you
export const MONITOR_DISCONNECTED = 'MONITOR_DISCONNECTED'; // disconnect from monitor
export const MONITOR_DISCONNECT = 'MONITOR_DISCONNECT'; // someone disconnected from monitoring you
export const MONITORING_STATUS = 'MONITORING_STATUS'; // status of monitoring changed, barge, whisper, etc
export const MONITOR_REJECTED = 'MONITOR_REJECTED'; // target could not be monitored

// reasons a monitor request was rejected (MONITOR_REJECTED payload)
export const MONITOR_REJECT_NOT_ON_CALL = 'not-on-call'; // target is not on an active call
export const MONITOR_REJECT_ALREADY_MONITORED = 'already-monitored'; // target is already being monitored
export const MONITOR_REJECT_BUSY_MONITORING = 'busy-monitoring'; // target is monitoring another call

export const USER_VALUE_CHANGED = 'USER_VALUE_CHANGED';

export const MONITOR_STATUS_CONNECTING = 'MONITOR_STATUS_CONNECTING';
export const MONITOR_STATUS_MONITOR = 'MONITOR_STATUS_MONITOR';
export const MONITOR_STATUS_WHISPER = 'MONITOR_STATUS_WHISPER';
export const MONITOR_STATUS_BARGE = 'MONITOR_STATUS_BARGE';

export const REQUEST_DIALER = 'REQUEST_DIALER';
export const USE_DIALER = 'USE_DIALER';
export const CAMPAIGN_ADD_PHONE_APPLY = 'CAMPAIGN_ADD_PHONE_APPLY';
export const CAMPAIGN_UPDATE_PHONE = 'CAMPAIGN_UPDATE_PHONE';
export const CAMPAIGN_ADD_PHONES_FROM_LAZY_LOAD = 'CAMPAIGN_ADD_PHONES_FROM_LAZY_LOAD';
export const CAMPAIGN_SET_LAZY_LOAD_WARNING_MESSAGE = 'CAMPAIGN_SET_LAZY_LOAD_WARNING_MESSAGE';
export const CAMPAIGN_SET_END_REASON = 'CAMPAIGN_SET_END_REASON';
export const CAMPAIGN_ADD_PHONE = 'CAMPAIGN_ADD_PHONE';
export const CAMPAIGN_CHANGE = 'CAMPAIGN_CHANGE';
export const CAMPAIGN_CALL_PHONE = 'CAMPAIGN_CALL_PHONE';
export const CAMPAIGN_COMPLETE = 'CAMPAIGN_COMPLETE';
export const CAMPAIGN_CONTINUE = 'CAMPAIGN_CONTINUE';
export const CAMPAIGN_DATA = 'CAMPAIGN_DATA';
export const CAMPAIGN_DIAL_PHONES = 'CAMPAIGN_DIAL_PHONES';
export const CAMPAIGN_SET_DIAL_PHONES_RUN_INFO = 'CAMPAIGN_SET_DIAL_PHONES_RUN_INFO';
export const CAMPAIGN_CALL_TARGETS = 'CAMPAIGN_CALL_TARGETS';
export const CAMPAIGN_DIALSET = 'CAMPAIGN_DIALSET';
export const CAMPAIGN_END = 'CAMPAIGN_END';
export const CAMPAIGN_FETCH_PHONES = 'CAMPAIGN_FETCH_PHONES';
export const CAMPAIGN_SET_PHONES_READY = 'CAMPAIGN_SET_PHONES_READY';
export const CAMPAIGN_LOAD = 'CAMPAIGN_LOAD';
export const CAMPAIGN_LOADING_RECORDS_COMPLETE = 'CAMPAIGN_LOADING_RECORDS_COMPLETE';
export const CAMPAIGN_PAUSE = 'CAMPAIGN_PAUSE';
export const CAMPAIGN_REMOVE_CONTACT = 'CAMPAIGN_REMOVE_CONTACT';
export const CAMPAIGN_REMOVE_PHONE = 'CAMPAIGN_REMOVE_PHONE';
export const CAMPAIGN_SKIP_PHONES_DNC = 'CAMPAIGN_SKIP_PHONES_DNC';
export const CAMPAIGN_SKIP_PHONES_NUISANCE = 'CAMPAIGN_SKIP_PHONES_NUISANCE';
export const CAMPAIGN_SKIP_PHONES_TZ = 'CAMPAIGN_SKIP_PHONES_TZ';
export const CAMPAIGN_SKIP_PHONES = 'CAMPAIGN_SKIP_PHONES';
export const CAMPAIGN_REQUEUE_TZ_SKIPPED = 'CAMPAIGN_REQUEUE_TZ_SKIPPED';
export const CAMPAIGN_START = 'CAMPAIGN_START';
export const CAMPAIGN_DOUBLE_DIAL = 'CAMPAIGN_DOUBLE_DIAL';
export const TEST_DATA = 'TEST_DATA';
export const CAMPAIGN_LAZY_LOAD = 'CAMPAIGN_LAZY_LOAD';
export const CAMPAIGN_LAZY_LOAD_START = 'CAMPAIGN_LAZY_LOAD_START';
export const CAMPAIGN_LAZY_LOAD_EPOCH = 'CAMPAIGN_LAZY_LOAD_EPOCH';
export const CAMPAIGN_LAZY_LOAD_COMPLETE = 'CAMPAIGN_LAZY_LOAD_COMPLETE';
export const CAMPAIGN_WAITING_ON_LAZY_LOAD = 'CAMPAIGN_WAITING_ON_LAZY_LOAD';
export const CAMPAIGN_DYNAMIC_FETCH_META = 'CAMPAIGN_DYNAMIC_FETCH_META';
export const CAMPAIGN_REFRESH_NUISANCE_PROTECTION = 'CAMPAIGN_REFRESH_NUISANCE_PROTECTION';
export const CALLBOARD_CAMPAIGN = 'CALLBOARD_CAMPAIGN';

export const DISPOSITION_NONE = 'NONE';
export const DISPOSITION_NO_ANSWER = 'NO_ANSWER';
export const DISPOSITION_BAD_NUMBER = 'BAD_NUMBER';
export const DISPOSITION_VOICEMAIL = 'LEFT_VOICEMAIL';
export const DISPOSITION_DNC = 'DO_NOT_CONTACT';

export const CLOSE_DIALER = 'CLOSE_DIALER';
export const UNSET_DIALER_TAB = 'UNSET_DIALER_TAB';
export const CANCEL_MESSAGE = 'CANCEL_MESSAGE';

export const TOGGLE_RINGING = 'TOGGLE_RINGING';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export const CS_ANSWERED = 'ANSWERED';
export const CS_BRIDGED = 'BRIDGED';
export const CS_ENDED = 'ENDED';
export const CS_ON_HOLD = 'ON_HOLD';
export const CS_TRANSFERRED = 'TRANSFERRED';
export const CS_INBOUND_ANSWERED = 'INBOUND_ANSWERED';
export const CS_INBOUND_HAS_PIN = 'INBOUND_HAS_PIN';
export const CS_LEAVING_CALLBACK = 'LEAVING_CALLBACK';
export const CS_LEAVING_VOICEMAIL = 'LEAVING_VOICEMAIL';
export const CS_ORIGINATING = 'ORIGINATING';
export const CS_PARKED_TARGET = 'PARKED_TARGET';
export const CS_PARKED_USER = 'PARKED_USER';
export const CS_RECORDING_MESSAGE = 'RECORDING_MESSAGE';
export const CS_RECORDING_MESSAGE_ACCEPT = 'RECORDING_MESSAGE_ACCEPT';
export const CS_RECORDING_MESSAGE_IVR = 'RECORDING_MESSAGE_IVR';
export const CS_RINGING = 'RINGING';
export const CS_VERIFY_USER = 'VERIFY_USER';

export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export const DISABLE_RIGHT_BUTTON = 'DISABLE_RIGHT_BUTTON';

export const OUTCOME_BUSY = 'BUSY';
export const OUTCOME_DISCONNECTED = 'DISCONNECTED';
export const OUTCOME_NO_ANSWER = 'NO_ANSWER';
export const OUTCOME_HUNG_UP = 'HUNG_UP';
export const OUTCOME_USER_HUNG_UP = 'USER_HUNG_UP';
export const OUTCOME_UNKNOWN = 'UNKNOWN';
export const OUTCOME_VOICEMAIL = 'VOICEMAIL';
export const OUTCOME_CALLBACK = 'CALLBACK';
export const OUTCOME_NO_VOICEMAIL = 'NO_VOICEMAIL';
export const OUTCOME_NO_CALLBACK = 'NO_CALLBACK';
export const OUTCOME_TRANSFERRED = 'TRANSFERRED';
export const OUTCOME_VOICEMAIL_RETRY = 'VOICEMAIL_RETRY';
export const OUTCOME_REJECTED = 'REJECTED';

// Smart Rotation
export const SMART_ROTATION_GROUP_INITIALIZATION_UPDATE = 'SMART_ROTATION_GROUP_INITIALIZATION_UPDATE';
export const SMART_ROTATION_GROUP_INITIALIZATION_COMPLETE = 'SMART_ROTATION_GROUP_INITIALIZATION_COMPLETE';

// outcomes that re-queue a second dial when double dial is enabled (see campaignDoubleDial)
export const DOUBLE_DIAL_OUTCOMES = [
	OUTCOME_BUSY,
	OUTCOME_NO_CALLBACK,
	OUTCOME_NO_VOICEMAIL,
	OUTCOME_UNKNOWN,
	OUTCOME_NO_ANSWER,
	OUTCOME_VOICEMAIL_RETRY,
];

/**
 * Shared predicate for whether a completed call leg will re-queue a second dial.
 * Click-to-call legs never double dial, so any caller deciding "is a redial coming?"
 * must use this same check to stay in sync with the redial itself (campaignDoubleDial).
 * @param {object} params
 * @param {boolean} params.enableDoubleDial - campaign setting
 * @param {boolean} params.clickToCall - session is in click-to-call mode
 * @param {boolean} params.doubleDialed - phone has already been double dialed
 * @param {string} params.outcome - call outcome
 * @returns {boolean} whether a second dial will be queued
 */
export const shouldDoubleDial = ({ enableDoubleDial, clickToCall, doubleDialed, outcome }) =>
	!!enableDoubleDial && !clickToCall && !doubleDialed && DOUBLE_DIAL_OUTCOMES.includes(outcome);

export const DS_BRIDGED = 'BRIDGED';
export const DS_ON_HOLD = 'ON_HOLD';
export const DS_ENDED = 'ENDED';
export const DS_ENDING = 'ENDING';
export const DS_LIVE_ANSWER = 'LIVE_ANSWER';
export const DS_LIVE_ANSWER_ENDED = 'LIVE_ANSWER_ENDED';
export const DS_READY = 'READY';
export const DS_PENDING = 'PENDING';
export const DS_RINGING = 'RINGING';
export const DS_INCOMING = 'INCOMING';
export const DS_UNKNOWN = 'UNKNOWN';

export const POS_TOP_RIGHT = 'TOP_RIGHT';
export const POS_BOTTOM_RIGHT = 'BOTTOM_RIGHT';
export const POS_TOP_CENTER = 'TOP_CENTER';
export const POS_BOTTOM_CENTER = 'BOTTOM_CENTER';
export const POS_TOP_LEFT = 'TOP_LEFT';
export const POS_BOTTOM_LEFT = 'BOTTOM_LEFT';

export const HIDE_DIALOG = 'HIDE_DIALOG';
export const HIDE_NOTIFY = 'HIDE_NOTIFY';
export const HIDE_SIDEPANEL = 'HIDE_SIDEPANEL';
export const SHOW_NOTIFY = 'SHOW_NOTIFY';
export const SHOW_SIDEPANEL = 'SHOW_SIDEPANEL';
export const NOTIFICATION_CLOSED = 'NOTIFICATION_CLOSED';
export const HIDE_OVERLAY = 'HIDE_OVERLAY';
export const HIDE_SETTINGS = 'HIDE_SETTINGS';
export const HIDE_IMAGE_VIEWER = 'HIDE_IMAGE_VIEWER';
export const HIDE_VIDEO = 'HIDE_VIDEO';
export const HIDE_ONLY_VIDEO = 'HIDE_ONLY_VIDEO';
export const HIDE_TOAST = 'HIDE_TOAST';
export const HIDE_VM_DROPDOWN = 'HIDE_VM_DROPDOWN';
export const HIDE_DIALPAD = 'HIDE_DIALPAD';
export const HIDE_BAR_OPTIONS = 'HIDE_BAR_OPTIONS';
export const HIDE_TEMPLATE_CENTER = 'HIDE_TEMPLATE_CENTER';
export const HIDE_RECORD = 'HIDE_RECORD';
export const HIDE_ONBOARDING = 'HIDE_ONBOARDING';
export const HIDE_PURCHASE = 'HIDE_PURCHASE';
export const HIDE_DISPOSITIONS = 'HIDE_DISPOSITIONS';
export const HIDE_CAMPAIGN_MODAL = 'HIDE_CAMPAIGN_MODAL';
export const HIDE_TRANSFER_MODAL = 'HIDE_TRANSFER_MODAL';
export const UPDATE_PERMISSIONS = 'UPDATE_PERMISSIONS';
export const UPDATE_PERMISSIONS_LIMITS = 'UPDATE_PERMISSIONS_LIMITS';

export const SHOW_CALL_RECORDING_MODAL = 'SHOW_CALL_RECORDING_MODAL';
export const HIDE_CALL_RECORDING_MODAL = 'HIDE_CALL_RECORDING_MODAL';

export const SHOW_GHL_POPUP = 'SHOW_GHL_POPUP';
export const HIDE_GHL_POPUP = 'HIDE_GHL_POPUP';
export const GHL_POPUP_VAR = 'wavv-mtk-popup';

export const HOST_SIZE = 'HOST_SIZE';

export const LAYOUT_CAMPAIGN_BRIDGED = 'LAYOUT_CAMPAIGN_BRIDGED';
export const LAYOUT_CAMPAIGN_DIALING = 'LAYOUT_CAMPAIGN_DIALING';
export const LAYOUT_CAMPAIGN_ENDED = 'LAYOUT_CAMPAIGN_ENDED';
export const LAYOUT_CAMPAIGN_PARKED = 'LAYOUT_CAMPAIGN_PARKED';
export const LAYOUT_COMPLETE = 'LAYOUT_COMPLETE';
export const LAYOUT_MESSAGE_BAR = 'LAYOUT_MESSAGE_BAR';
export const LAYOUT_READY = 'LAYOUT_READY';
export const LAYOUT_READY_CONNECTING = 'LAYOUT_READY_CONNECTING';
export const LAYOUT_TRANSFER_DIALING = 'LAYOUT_TRANSFER_DIALING';
export const LAYOUT_TRANSFER_BRIDGED = 'LAYOUT_TRANSFER_BRIDGED';
export const LAYOUT_TRANSFER_MERGED = 'LAYOUT_TRANSFER_MERGED';
export const LAYOUT_TRANSFER_ENDED = 'LAYOUT_TRANSFER_ENDED';
export const LAYOUT_INBOUND = 'LAYOUT_INBOUND';

export const REFRESH_SETTINGS = 'REFRESH_SETTINGS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const NEW_MESSAGE = 'NEW_MESSAGE';
export const PLAY_AUDIO = 'PLAY_AUDIO';
export const PLAY_HOLD_MUSIC = 'PLAY_HOLD_MUSIC';
export const PLAY_RINGING_TONE = 'PLAY_RINGING_TONE';
export const PRESS_ONE_DIALOG = 'PRESS_ONE_DIALOG';
export const PRIORITY_PHONE = 'PRIORITY_PHONE';

export const RECORD_CHANNEL = 'RECORD_CHANNEL';
export const PAUSE_RECORDING_CHANNEL = 'PAUSE_RECORDING_CHANNEL';
export const RESUME_RECORDING_CHANNEL = 'RESUME_RECORDING_CHANNEL';
export const RECORD_MESSAGE = 'RECORD_MESSAGE';
export const RECORD_MESSAGE_IVR = 'RECORD_MESSAGE_IVR';
export const RECORD_MESSAGE_DIALOG = 'RECORD_MESSAGE_DIALOG';
export const RECORDING_MESSAGE_DIALOG = 'RECORDING_MESSAGE_DIALOG';
export const RECORD_OPTION_NEVER = 'Never';
export const RECORD_OPTION_AFTER_CLICK = 'After Click';
export const RECORD_OPTION_IMMEDIATE = 'From Start';
export const RECORD_OPTION_ALWAYS = 'Always';

export const RENAME_MESSAGE = 'RENAME_MESSAGE';
export const RESTORE_STATE = 'RESTORE_STATE';

export const SESSION_CONNECT = 'SESSION_CONNECT';
export const SESSION_END = 'SESSION_END';
export const SESSION_PAUSE = 'SESSION_PAUSE';
export const SESSION_PENDING = 'SESSION_PENDING';
export const SESSION_READY = 'SESSION_READY';
export const SESSION_START = 'SESSION_START';
export const SESSION_VERIFY = 'SESSION_VERIFY';

export const APPEND_INBOUND_CALL = 'APPEND_INBOUND_CALL';
export const SET_DIALOG_INPUT = 'SET_DIALOG_INPUT';
export const SETTINGS_OPTIONS_UPDATED = 'SETTINGS_OPTIONS_UPDATED';
export const SETTINGS_UPDATED = 'SETTINGS_UPDATED';
export const SET_SETTINGS_ERROR = 'SET_SETTINGS_ERROR';
export const RESET_SETTINGS_ERROR = 'RESET_SETTINGS_ERROR';

export const SHOW_DIALOG = 'SHOW_DIALOG';
export const SHOW_DIALOG_V2 = 'SHOW_DIALOG_V2';
export const HIDE_DIALOG_V2 = 'HIDE_DIALOG_V2';
export const UPDATE_DIALOG_V2 = 'UPDATE_DIALOG_V2';
export const TRIGGER_CALLBACK = 'TRIGGER_CALLBACK';
export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const SHOW_SETTINGS = 'SHOW_SETTINGS';
export const SET_SUB_PAGE = 'SET_SUB_PAGE';
export const SHOW_IMAGE_VIEWER = 'SHOW_IMAGE_VIEWER';
export const SHOW_VIDEO = 'SHOW_VIDEO';
export const SHOW_TOAST = 'SHOW_TOAST';
export const TOS_SIGNED = 'TOS_SIGNED';
export const SHOW_VM_DROPDOWN = 'SHOW_VM_DROPDOWN';
export const SHOW_DIALPAD = 'SHOW_DIALPAD';
export const SHOW_BAR_OPTIONS = 'SHOW_BAR_OPTIONS';
export const SHOW_TEMPLATE_CENTER = 'SHOW_TEMPLATE_CENTER';
export const SHOW_ONBOARDING = 'SHOW_ONBOARDING';
export const SHOW_DISPOSITIONS = 'SHOW_DISPOSITIONS';
export const SHOW_CAMPAIGN_MODAL = 'SHOW_CAMPAIGN_MODAL';
export const SHOW_TRANSFER_MODAL = 'SHOW_TRANSFER_MODAL';
export const SHOW_WALLET_CONFIGURATION_MODAL = 'SHOW_WALLET_CONFIGURATION_MODAL';
export const HIDE_WALLET_CONFIGURATION_MODAL = 'HIDE_WALLET_CONFIGURATION_MODAL';
export const SET_MEMBER_REPORT_FILTER = 'SET_MEMBER_REPORT_FILTER';
export const FETCH_TEAM = 'FETCH_TEAM';
export const SET_TEAM = 'SET_TEAM';

export const CLEAR_SETTINGS_VISIBLE_META = 'CLEAR_SETTINGS_VISIBLE_META';
export const JUMP_TO_SETTING_VOICEMAIL = 'JUMP_TO_SETTING_VOICEMAIL';
export const JUMP_TO_SETTING_CALLBACK = 'JUMP_TO_SETTING_CALLBACK';

export const MINIMIZE_DIALER = 'MINIMIZE_DIALER';

export const SKIP_REASON_CALLED = 'SKIP_REASON_CALLED';
export const SKIP_REASON_TZ = 'SKIP_REASON_TZ';

export const RECONNECT_SOCKET = 'RECONNECT_SOCKET';
export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';
export const SOCKET_DISCONNECTED = 'SOCKET_DISCONNECTED';
export const SOCKET_RECONNECTED = 'SOCKET_RECONNECTED';
export const SOCKET_RECONNECTING = 'SOCKET_RECONNECTING';

export const IFRAME_READY = 'IFRAME_READY';
export const INIT_SOCKET = 'INIT_SOCKET';
export const SOCKET_INITIALIZED = 'SOCKET_INITIALIZED';

export const USER_CHANNEL_EVENT = 'USER_CHANNEL_EVENT';
export const TARGET_CHANNEL_EVENT = 'TARGET_CHANNEL_EVENT';
export const WARM_TRANSFER_CHANNEL_EVENT = 'WARM_TRANSFER_CHANNEL_EVENT';
export const WHISPER_LEGACY_CHANNEL_EVENT = 'WHISPER_CHANNEL_EVENT';

export const HIDE_CALL_SCRIPTS_DOCK_LIST = 'HIDE_CALL_SCRIPTS_DOCK_LIST';
export const SHOW_CALL_SCRIPTS_DOCK_LIST = 'SHOW_CALL_SCRIPTS_DOCK_LIST';
export const SHOW_CALL_SCRIPTS = 'SHOW_CALL_SCRIPTS';
export const SHOW_CALL_SCRIPTS_WINDOW = 'SHOW_CALL_SCRIPTS_WINDOW';
export const CALL_SCRIPTS_MINIMIZE = 'CALL_SCRIPTS_MINIMIZE';
export const DISCOVER_CURRENT_CALLSCRIPTS_CONTACT = 'DISCOVER_CURRENT_CALLSCRIPTS_CONTACT';
export const REQUEST_DISCOVER_CURRENT_CALLSCRIPTS_CONTACT = 'REQUEST_DISCOVER_CURRENT_CALLSCRIPTS_CONTACT';
export const SET_CALL_SCRIPTS_WINDOW_OPEN = 'SET_CALL_SCRIPTS_WINDOW_OPEN';
export const SET_CALLSCRIPT_CONFIG = 'SET_CALLSCRIPT_CONFIG';
export const REFRESH_CALLSCRIPT_CONFIG = 'REFRESH_CALLSCRIPT_CONFIG';

export const UPDATE_DIALOG_TEXT = 'UPDATE_DIALOG_TEXT';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_SETTINGS_TEAM_OVERRIDES = 'UPDATE_SETTINGS_TEAM_OVERRIDES';
export const UPDATE_THEME = 'UPDATE_THEME';
export const UPDATE_SETTINGS_TEMPORARY_MOBILE = 'UPDATE_SETTINGS_TEMPORARY_MOBILE';

export const UPLOAD_AUDIO = 'UPLOAD_AUDIO';
export const UPLOAD_STATUS = 'UPLOAD_STATUS';

export const USER_SUBS = 'USER_SUBS';
export const USER_OFFERS = 'USER_OFFERS';
export const WAITING_FOR_CONTINUE = 'WAITING_FOR_CONTINUE';
export const WAITING_FOR_CALLER_ID = 'WAITING_FOR_CALLER_ID';
export const CALL_DURATION = 'CALL_DURATION';
export const BILLABLE_SECONDS = 'BILLABLE_SECONDS';
export const REMAINING_MINUTES = 'REMAINING_MINUTES';
export const REMAINING_MESSAGES = 'REMAINING_MESSAGES';
export const REMAINING_VIDEOS = 'REMAINING_VIDEOS';

export const GHL_SETTINGS = 'GHL_SETTINGS';
export const GHL_LOCATIONS = 'GHL_LOCATIONS';

export const WIDGET_TYPE_DIALER = 'DIALER';
export const WIDGET_TYPE_SMS = 'SMS';
export const WIDGET_TYPE_VIDEO = 'VIDEO';
export const WIDGET_TYPE_SPAM = 'SPAM';
export const WIDGET_TYPE_SIDEPANEL = 'SIDEPANEL';
export const WAVV_WIDGET_TYPES = [WIDGET_TYPE_DIALER, WIDGET_TYPE_SMS, WIDGET_TYPE_VIDEO, WIDGET_TYPE_SPAM, WIDGET_TYPE_SIDEPANEL];

export const WIDGET_APP = 'app';
export const WIDGET_NOTIFY = 'notify';
export const WIDGET_DIALER = 'dialer';
export const WIDGET_DIALER_MINI = 'dialer-mini';
export const WIDGET_VIDEO = 'video';
export const WIDGET_SOCKET = 'socket';
export const WIDGET_MESSENGER = 'messenger';
export const WIDGET_MESSENGER_DOCK_LIST = 'messenger-dock-list';
export const WIDGET_MESSENGER_DOCK_THREAD = 'messenger-dock-thread';
export const WIDGET_MESSENGER_DOCK_CONVERSATION = 'messenger-dock-conversation';
export const WIDGET_CALL_SCRIPTS_DOCK_LIST = 'call-scripts-dock-list';
export const WIDGET_CALL_SCRIPTS_WINDOW = 'call-scripts-window';
export const WIDGET_SIDEPANEL = 'sidepanel';
export const FEATURE_SIDEPANEL_MESSENGER = 'sidepanelMessenger';
// Statsig gate `wavv_journey` for a GHL vendor, or an identity that has already entered the account through
// wavv-auth (the same answer GHL's /v2/auth gives as `wavvAccountsFeatureFlag`): the side panel's CRM seat is
// settled by wavv-auth (link / switch / transfer on the active tab's token) instead of storm-js's account switcher
// (middleware/crmDetection) and wavv-app's own screens.
//
// This one is who resolves IDENTITY. A completed journey purchase does not grant it. `setupJourney` below is the
// onboarding, a separate answer: an existing account can be on wavv-auth with legacy onboarding.
export const FEATURE_WAVV_AUTH_IDENTITY = 'wavvAuthIdentity';
// The setup journey is this account's onboarding. Granted when the door above is open on a new account (created
// on or after `SETUP_JOURNEY_NEW_ACCOUNTS_SINCE`), and also when a linked external-Stripe owner was stamped at a
// journey purchase (`billingOwners.metadata.setupJourney === true`). That stamp grants only this flag: it does not
// make wavv-auth resolve identity. The whole of `isSetupJourneyAvailable` — the account's answer, not a given
// session's.
export const FEATURE_SETUP_JOURNEY = 'setupJourney';
export const WIDGETS = [
	WIDGET_APP,
	WIDGET_NOTIFY,
	WIDGET_DIALER,
	WIDGET_DIALER_MINI,
	WIDGET_SOCKET,
	WIDGET_MESSENGER_DOCK_LIST,
	WIDGET_CALL_SCRIPTS_DOCK_LIST,
	WIDGET_VIDEO,
	WIDGET_MESSENGER,
	WIDGET_SIDEPANEL,
];

export const STATIC_FEATURE_PREFIX = 'STATIC:';
export const BUNDLE_DISCOUNT_FEATURE_PREFIX = 'bundleDiscount:';

export const SHOW_CALL_QUALITY_SURVEY = 'SHOW_CALL_QUALITY_SURVEY';
export const HIDE_CALL_QUALITY_SURVEY = 'HIDE_CALL_QUALITY_SURVEY';
export const SHOW_NPS_SURVEY = 'SHOW_NPS_SURVEY';
export const HIDE_NPS_SURVEY = 'HIDE_NPS_SURVEY';

export const FEATURE_DIAL_MINUTES = 'dialMinutes';
export const FEATURE_SMS_MESSAGES = 'messages';
export const FEATURE_VIDEOS = 'videos';
export const FEATURE_A2P_REG = 'smsBrandRegistration';
export const FEATURE_SPAM_PROTECTION = 'spamMonitoring';
export const FEATURE_NUMBERS = 'numbers';
export const FEATURE_SPAM_FLAG_REPORT = 'spamFlagReport';
export const FEATURE_MONTHLY_WALLET_GRANT = 'monthlyWalletGrant';

export const USER_AVATAR_URL_UPDATED = 'USER_AVATAR_URL_UPDATED';
export const USER_RELEVANT_PAYMENT_RETRY_FAILED_ERROR = 'PAYMENT_RETRY_FAILED_ERROR';
export const USER_RELEVANT_PROMO_CODE_ERROR = 'PROMO_CODE_ERROR';
export const USER_WEBHOOK_ADDED = 'USER_WEBHOOK_ADDED';
export const USER_WEBHOOK_REMOVED = 'USER_WEBHOOK_REMOVED';
export const USER_WEBHOOK_EVENTS = {
	CALL_STARTED: 'CALL_STARTED',
	CALL_ENDED: 'CALL_ENDED',
	CALL_RECORDED: 'CALL_RECORDED',
	SMS_RECEIVED: 'SMS_RECEIVED',
	SMS_SENT: 'SMS_SENT',
};
export const USER_GHL_TRIGGER_ADDED = 'USER_GHL_TRIGGER_ADDED';
export const USER_GHL_TRIGGER_REMOVED = 'USER_GHL_TRIGGER_REMOVED';
export const USER_RELEVANT_OVERDUE_CART_ERROR = 'OVERDUE_CART_ERROR';
export const PAUSE_BILLING_UNTIL_NEXT_AUTH = 'PAUSE_BILLING_UNTIL_NEXT_AUTH';

export const WALLET_BALANCE_UPDATED = 'WALLET_BALANCE_UPDATED';
export const WALLET_CONFIGURATION_CHANGED = 'WALLET_CONFIGURATION_CHANGED';
export const WALLET_RECHARGE_INITIATED = 'WALLET_RECHARGE_INITIATED';
export const WALLET_RECHARGE_FINISHED = 'WALLET_RECHARGE_FINISHED';

export const CALL_HISTORY_DOWNLOAD_COMPLETE = 'CALL_HISTORY_DOWNLOAD_COMPLETE';
export const CALL_HISTORY_DOWNLOAD_ERROR = 'CALL_HISTORY_DOWNLOAD_ERROR';

export const MAIN_WIDGET_FEATURES = [FEATURE_DIAL_MINUTES, FEATURE_SMS_MESSAGES, FEATURE_VIDEOS, FEATURE_SPAM_PROTECTION];

export const BOOTSTRAP_DIALER = 'BOOTSTRAP_DIALER';

// Board vs. template discriminator. Mirrors Prisma `CallboardType` — wire-format strings served on every
// board read. Keep in sync with prisma/core/schema.prisma.
export const CALLBOARD_TYPE = Object.freeze({
	BOARD: 'BOARD',
	TEMPLATE: 'TEMPLATE',
});

// Callboard data source discriminator. Mirrors Prisma `CallboardDataSourceType` exactly —
// values are wire-format strings sent to POST /api/v1/call-boards and stored in
// `callboards.data_source_type`. Keep in sync with prisma/core/schema.prisma.
export const CALLBOARD_DATA_SOURCE_TYPE = Object.freeze({
	GHL_TAGS: 'GHL_TAGS',
	CSV: 'CSV',
	HUBSPOT_SEGMENT: 'HUBSPOT_SEGMENT',
	GHL_PIPELINE: 'GHL_PIPELINE',
	HUBSPOT_CALL_TASKS: 'HUBSPOT_CALL_TASKS',
});

export const AUDIO_TYPE_MESSAGE = 'MESSAGE';
export const AUDIO_TYPE_RECORDING = 'RECORDING';
export const AUDIO_TYPE_VOICEMAIL = 'VOICEMAIL';
export const AUDIO_TYPE_VOICEMAIL_GREETING = 'VOICEMAIL_GREETING';
export const AUDIO_TYPE_CALLBACK = 'CALLBACK';

export const SETTINGS_MANAGE_VOICEMAIL = 'SETTINGS_MANAGE_VOICEMAIL';
export const SETTINGS_MANAGE_CALLBACK = 'SETTINGS_MANAGE_CALLBACK';
export const SETTINGS_MANAGE_VOICEMAIL_GREETING = 'SETTINGS_MANAGE_VOICEMAIL_GREETING';
export const SETTINGS_MANAGE_TEAM_VOICEMAIL_GREETING = 'SETTINGS_MANAGE_TEAM_VOICEMAIL_GREETING';

export const TAB_DASHBOARD = 'TAB_DASHBOARD';
export const TAB_LEADERBOARD = 'TAB_LEADERBOARD';
export const TAB_INVOICE = 'TAB_INVOICE';
export const TAB_NUMBERS = 'TAB_NUMBERS';
export const TAB_MESSENGER_INSIGHTS = 'TAB_MESSENGER_INSIGHTS';
export const TAB_MESSENGER_SETTINGS = 'TAB_MESSENGER_SETTINGS';
export const TAB_GENERAL = 'TAB_GENERAL';
export const TAB_AUDIO = 'TAB_AUDIO';
export const TAB_VIDEO_SIGNATURE = 'TAB_VIDEO_SIGNATURE';
export const TAB_VOICEMAILS = 'TAB_VOICEMAILS';
export const TAB_CALLBACKS = 'TAB_CALLBACKS';
export const TAB_MOBILE = 'TAB_MOBILE';
export const TAB_DNC_LIST = 'TAB_DNC_LIST';
export const TAB_INTEGRATIONS = 'TAB_INTEGRATIONS';
// Legacy Settings → Integrations (API keys + Zapier). Restored to the menu while the new
export const TAB_INTEGRATIONS_LEGACY = 'TAB_INTEGRATIONS_LEGACY';
export const TAB_CALL_LOGS = 'TAB_CALL_LOGS';
export const TAB_OUTBOUND_CALL_LOGS = 'TAB_OUTBOUND_CALL_LOGS';
export const TAB_INBOUND_CALL_LOGS = 'TAB_INBOUND_CALL_LOGS';
export const TAB_BETA = 'TAB_BETA';
export const TAB_SUBSCRIPTION = 'TAB_SUBSCRIPTION';
export const TAB_USAGE = 'TAB_USAGE';
export const TAB_LOCATIONS = 'TAB_LOCATIONS';
export const TAB_DISPOSITIONS = 'TAB_DISPOSITIONS';
export const TAB_AFFILIATES = 'TAB_AFFILIATES';
export const TAB_TEAM_MANAGEMENT = 'TAB_TEAM_MANAGEMENT';
export const TAB_TEAM_MONITORING = 'TAB_TEAM_MONITORING';
export const TAB_BUSINESS_PROFILE = 'TAB_BUSINESS_PROFILE';
export const TAB_A2P = 'TAB_A2P';
export const TAB_STIR_SHAKEN = 'TAB_STIR_SHAKEN';
export const TAB_ENVIRONMENT = 'TAB_ENVIRONMENT';
export const TAB_TEMPLATES = 'TAB_TEMPLATES';
export const TAB_WEBCART = 'TAB_WEBCART';
export const TAB_VOICEMAIL_INBOX = 'TAB_VOICEMAIL_INBOX';
export const TAB_VOICEMAIL_INBOX_TEAM = 'TAB_VOICEMAIL_INBOX_TEAM';
export const TAB_VOICEMAIL_INBOX_PERSONAL = 'TAB_VOICEMAIL_INBOX_PERSONAL';
export const TAB_ACCOUNT = 'TAB_ACCOUNT';
export const TAB_CALL_SCRIPTS = 'TAB_CALL_SCRIPTS';
export const TAB_WALLET = 'TAB_WALLET';
export const TAB_ASSISTANT = 'TAB_ASSISTANT';

export const WAVV_TAB_TYPES = [
	TAB_NUMBERS,
	TAB_MESSENGER_INSIGHTS,
	TAB_MESSENGER_SETTINGS,
	TAB_GENERAL,
	TAB_AUDIO,
	TAB_VIDEO_SIGNATURE,
	TAB_VOICEMAILS,
	TAB_CALLBACKS,
	TAB_MOBILE,
	TAB_DNC_LIST,
	TAB_CALL_LOGS,
	TAB_OUTBOUND_CALL_LOGS,
	TAB_INBOUND_CALL_LOGS,
	TAB_TEAM_MANAGEMENT,
	TAB_CALL_SCRIPTS,
	TAB_BETA,
	TAB_SUBSCRIPTION,
	TAB_USAGE,
	TAB_WEBCART,
	TAB_ACCOUNT,
];

export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';

export const THREAD_MEMBER_ACTION_REMOVE = 'REMOVE';
export const THREAD_MEMBER_ACTION_ADD = 'ADD';

export const VERIFY_NUMBER = 'VERIFY_NUMBER';
export const VERIFY_CODE = 'VERIFY_CODE';
export const VERIFY_FAIL = 'VERIFY_FAIL';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
export const VERIFY_CHANNEL_ID = 'VERIFY_CHANNEL_ID';
export const VERIFY_EXISTS = 'VERIFY_EXISTS';
export const VERIFY_CANCEL = 'VERIFY_CANCEL';
export const VERIFY_CONTINUE = 'VERIFY_CONTINUE';
export const VERIFY_SETUP = 'VERIFY_SETUP';

export const FETCH_NUMBERS = 'FETCH_NUMBERS';
export const FETCH_NUMBERS_SUCCESS = 'FETCH_NUMBERS_SUCCESS';
export const PURCHASE_ADD_CART = 'PURCHASE_ADD_CART';
export const PURCHASE_REMOVE_CART = 'PURCHASE_REMOVE_CART';
export const PURCHASE_SETUP_SHOW = 'PURCHASE_SETUP_SHOW';
export const PURCHASE_SETUP_HIDE = 'PURCHASE_SETUP_HIDE';
export const PURCHASE_SMS_NUMBER = 'PURCHASE_SMS_NUMBER';
export const SMS_MESSAGE_SENT = 'SMS_MESSAGE_SENT';
export const PURCHASE_SUCCESS_DISPLAY_TIME = 2000;
export const PURCHASE_SUCCESS_MIN_LOADING_DURATION = 3000;

export const SENTRY_DSN = 'https://2a239d6ce96dd9a1a27e10a5cb7d6bd2@o4508259050389504.ingest.us.sentry.io/4508259051765760';

export const CLAIM_PHONE = 'CLAIM_PHONE';
export const CLAIM_PHONE_CONFIRM = 'CLAIM_PHONE_CONFIRM';
export const PURCHASE_NUMBERS_REQUEST = 'PURCHASE_NUMBERS_REQUEST';
export const PURCHASE_NUMBERS = 'PURCHASE_NUMBERS';
export const PURCHASE_NUMBERS_SUCCESS = 'PURCHASE_NUMBERS_SUCCESS';
export const PURCHASE_NUMBERS_FAILED = 'PURCHASE_NUMBERS_FAILED';

export const PURCHASE_PROCESSING = 'PURCHASE_PROCESSING';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
export const PURCHASE_FAILED = 'PURCHASE_FAILED';
export const RENAME_NUMBER = 'RENAME_NUMBER';
export const DELETE_NUMBER = 'DELETE_NUMBER';
export const SET_CALL_FORWARDING = 'SET_CALL_FORWARDING';
export const REMOVE_DNC_NUMBER = 'REMOVE_DNC_NUMBER';
export const ADD_DNC_NUMBER = 'ADD_DNC_NUMBER';
export const DNC_NUMBER_ADDED = 'DNC_NUMBER_ADDED';
export const DNC_NUMBER_REMOVED = 'DNC_NUMBER_REMOVED';
export const TRUNK_SETUP_STATUS = 'TRUNK_SETUP_STATUS';
export const NUISANCE_PROTECTION_NUMBER = 'NUISANCE_PROTECTION_NUMBER';
export const REDIS_SETTINGS_UPDATE = 'REDIS_SETTINGS_UPDATE';

export const ADD_API_KEY = 'ADD_API_KEY';

export const USER_DATA_CHANGE = 'USER_DATA_CHANGE';
export const SET_VIEWING_TEAM_MANAGEMENT = 'SET_VIEWING_TEAM_MANAGEMENT';

export const SHOW_DETAIL_THREAD = 'SHOW_DETAIL_THREAD';

export const CC_AMEX = 'amex';
export const CC_VISA = 'visa';
export const CC_GENERIC_CARD = 'generic_card';

export const PERSONAL = 'PERSONAL';
export const PURCHASED = 'PURCHASED';
export const PERSONAL_NUMBER_TYPE = PERSONAL;
export const PURCHASED_NUMBER_TYPE = PURCHASED;

export const RECORD_MESSAGE_HOLD_MUSIC_DIALOG = 'RECORD_MESSAGE_HOLD_MUSIC_DIALOG';
export const CANT_RECORD_DIALOG = 'CANT_RECORD_DIALOG';
export const CANT_RECORD_WEBRTC_DIALOG = 'CANT_RECORD_WEBRTC_DIALOG';
export const SHOW_RECORD_PERM_GRANTED = 'SHOW_RECORD_PERM_GRANTED';
export const SET_RECORD_STATUS = 'SET_RECORD_STATUS';
export const SET_RECORD_MESSAGE_TYPE = 'SET_RECORD_MESSAGE_TYPE';
export const UPDATE_AUDIO_DEVICE_SELECTION = 'UPDATE_AUDIO_DEVICE_SELECTION';
export const AUDIO_DEVICES_REQUESTED = 'AUDIO_DEVICES_REQUESTED';
export const AUDIO_DEVICES_UPDATED = 'AUDIO_DEVICES_UPDATED';

export const SEND_SMS = 'SEND_SMS';
export const SEND_STATE = 'SEND_STATE';
export const LOADING_SURFACE_READY = 'LOADING_SURFACE_READY';
export const LOADING_SURFACE_FAILED = 'LOADING_SURFACE_FAILED';
export const CURRENT_STATE = 'CURRENT_STATE';
export const CHROME_APP_VISIBILITY_SYNC = 'CHROME_APP_VISIBILITY_SYNC';
export const SIDEPANEL_CLOSED = 'SIDEPANEL_CLOSED';

export const MESSENGER_SUBSCRIPTION = 'MESSENGER_SUBSCRIPTION';
export const MESSENGER_CLOSE = 'MESSENGER_CLOSE';
export const MESSENGER_CLOSE_CONVERSATION = 'MESSENGER_CLOSE_CONVERSATION';
export const MESSENGER_DELETE_THREAD = 'MESSENGER_DELETE_THREAD';
export const MESSENGER_MINIMIZE_CONVERSATION = 'MESSENGER_MINIMIZE_CONVERSATION';
export const MESSENGER_DATA = 'MESSENGER_DATA';
export const MESSENGER_DELETE_TEMPLATE = 'MESSENGER_DELETE_TEMPLATE';
export const MESSENGER_THREAD_SEARCH = 'MESSENGER_THREAD_SEARCH';
export const MESSENGER_CONTACT_SEARCH = 'MESSENGER_CONTACT_SEARCH';
export const MESSENGER_DELETE_MESSAGE = 'MESSENGER_DELETE_MESSAGE';
export const MESSENGER_DELETE_INTERNAL_NOTE = 'MESSENGER_DELETE_INTERNAL_NOTE';
export const MESSENGER_UPDATE_THREAD = 'MESSENGER_UPDATE_THREAD';
export const MESSENGER_DELETE_ATTACHMENT = 'MESSENGER_DELETE_ATTACHMENT';
export const SET_THREAD_TYPING_USERS = 'SET_THREAD_TYPING_USERS';
export const JOIN_MESSENGER_CONVERSATION_ROOM = 'JOIN_MESSENGER_CONVERSATION_ROOM';
export const LEAVE_MESSENGER_CONVERSATION_ROOM = 'LEAVE_MESSENGER_CONVERSATION_ROOM';
export const MESSENGER_TYPING_START = 'MESSENGER_TYPING_START';
export const MESSENGER_TYPING_STOP = 'MESSENGER_TYPING_STOP';
export const MESSENGER_USER_TYPING_START = 'MESSENGER_USER_TYPING_START';
export const MESSENGER_USER_TYPING_STOP = 'MESSENGER_USER_TYPING_STOP';

// ----------------------------------------------------------------------------

export const MESSENGER_FIND_CONVERSATION = 'MESSENGER_FIND_CONVERSATION';
export const MESSENGER_FOUND_CONVERSATION = 'MESSENGER_FOUND_CONVERSATION';

export const SET_USER_PHONES = 'SET_USER_PHONES';

export const SET_TEMPLATES = 'SET_TEMPLATES';

export const SET_CONVERSATION_DRAFT = 'SET_CONVERSATION_DRAFT';
/**
 * Text a host handed us for a conversation it has just opened, held until the composer mounts.
 *
 * A draft proper is a server-side message record, so it cannot be written before the conversation
 * exists. This is the gap: `compose({ contact, body })` resolves the conversation first, and the
 * composer picks the text up on mount. Consumed once, then cleared — never sent on its own.
 */
export const SET_CONVERSATION_PREFILL = 'SET_CONVERSATION_PREFILL';
export const CLEAR_CONVERSATION_PREFILL = 'CLEAR_CONVERSATION_PREFILL';
export const SET_CONVERSATION_PREVIEWS = 'SET_CONVERSATION_PREVIEWS';
export const SET_CONVERSATION_EVENTS = 'SET_CONVERSATION_EVENTS';

export const MESSENGER_MESSAGES_UPDATE = 'MESSENGER_MESSAGES_UPDATE';
export const MESSENGER_INTERNAL_NOTES_UPDATE = 'MESSENGER_INTERNAL_NOTES_UPDATE';
export const MESSENGER_TEMPLATES_UPDATE = 'MESSENGER_TEMPLATES_UPDATE';
export const MESSENGER_UNREAD_UPDATE = 'MESSENGER_UNREAD_UPDATE';
export const MESSENGER_MESSAGE_SENT = 'MESSENGER_MESSAGE_SENT';
export const MESSENGER_MESSAGE_RECEIVED = 'MESSENGER_MESSAGE_RECEIVED';
export const MESSENGER_MESSAGE_FAILED = 'MESSENGER_MESSAGE_FAILED';
export const MESSENGER_VENDOR_MESSAGE = 'MESSENGER_VENDOR_MESSAGE';
export const MESSENGER_CONVERSATIONS_UPDATE = 'MESSENGER_CONVERSATIONS_UPDATE';
export const MESSENGER_CONVERSATION_NOTES_UPDATE = 'MESSENGER_CONVERSATION_NOTES_UPDATE';
export const MESSENGER_CONVERSATION_DATA = 'MESSENGER_CONVERSATION_DATA';
export const WAVV_APP_MESSENGER_DOCK_LIST_OPENED = 'WAVV_APP_MESSENGER_DOCK_LIST_OPENED';
export const WAVV_APP_MESSENGER_DOCK_LIST_CLOSED = 'WAVV_APP_MESSENGER_DOCK_LIST_CLOSED';
export const WAVV_APP_MESSENGER_DOCK_LIST_MINIMIZED = 'WAVV_APP_MESSENGER_DOCK_LIST_MINIMIZED';
export const WAVV_APP_MESSENGER_DOCK_CONVERSATION_OPENED = 'WAVV_APP_MESSENGER_DOCK_CONVERSATION_OPENED';
export const WAVV_APP_MESSENGER_DOCK_CONVERSATION_CLOSED = 'WAVV_APP_MESSENGER_DOCK_CONVERSATION_CLOSED';
export const WAVV_APP_MESSENGER_DOCK_CONVERSATION_MINIMIZED = 'WAVV_APP_MESSENGER_DOCK_CONVERSATION_MINIMIZED';
export const MESSENGER_DELETE_CONVERSATION = 'MESSENGER_DELETE_CONVERSATION';
export const MESSENGER_DELETE_CONVERSATION_NOTE = 'MESSENGER_DELETE_CONVERSATION_NOTE';

export const MESSENGER_THREAD_DATA = 'MESSENGER_THREAD_DATA';
export const MESSENGER_MESSAGE_DATA = 'MESSENGER_MESSAGE_DATA';
export const MESSENGER_SELECT_THREAD = 'MESSENGER_SELECT_THREAD';

export const THREAD_TYPE_NORMAL = 'NORMAL';
export const THREAD_TYPE_GROUP = 'GROUP';
export const THREAD_TYPE_HIDDEN = 'HIDDEN'; // legacy

export const MEMBER_TYPE_NORMAL = 'NORMAL';
export const MEMBER_TYPE_USER = 'USER';
export const MEMBER_TYPE_PRIMARY = 'PRIMARY';

export const MESSAGE_TYPE_NORMAL = 'NORMAL';
export const MESSAGE_TYPE_INTERNAL_NOTE = 'INTERNAL_NOTE';

export const MESSAGE_STATUS_PENDING = 'PENDING';
export const MESSAGE_STATUS_SCHEDULED = 'SCHEDULED';
export const MESSAGE_STATUS_SENDING = 'SENDING';
export const MESSAGE_STATUS_SENT = 'SENT';
export const MESSAGE_STATUS_FAILED = 'FAILED';
export const MESSAGE_STATUS_RECEIVED = 'RECEIVED';

export const THREAD_EVENT_MEMBER_ADDED = 'MEMBER_ADDED';
export const THREAD_EVENT_MEMBER_REMOVED = 'MEMBER_REMOVED';

export const CHANNEL_TYPE_SMS = 'SMS';
export const CHANNEL_TYPE_INTERNAL = 'INTERNAL';

export const DEFAULT_MERGE_FIELDS = [
	{ id: 'first_name', label: 'First Name', map: 'firstName' },
	{ id: 'last_name', label: 'Last Name', map: 'lastName' },
	{ id: 'name', label: 'Full Name', map: 'displayName' },
	{ id: 'email', label: 'Email', map: 'email' },
	{ id: 'address', label: 'Address', map: 'address' },
	{ id: 'city', label: 'City', map: 'city' },
	{ id: 'state', label: 'State', map: 'state' },
	{ id: 'zip', label: 'Zip', map: 'zip' },
];

// ----------------------------------------------------------------------------

export const MESSAGE_STATUS_DELIVERED = 'DELIVERED';
export const MESSAGE_STATUS_UNKNOWN = 'UNKNOWN';
export const MESSAGE_STATUS_QUEUED = 'QUEUED';
export const MESSAGE_STATUS_UNQUEUED = 'UNQUEUED';
export const MESSAGE_STATUS_PREV_MASTER = 'PREV_MASTER';
export const MESSAGE_STATUS_PREV_VALID = 'PREV_VALID';
export const MESSAGE_STATUS_PREV_INVALID = 'PREV_INVALID';
export const MESSAGE_STATUS_PREV_DNS = 'PREV_DNS';

export const UPDATE_REMAINING_SMS = 'UPDATE_REMAINING_SMS';
export const UPDATE_REMAINING_DROPS = 'UPDATE_REMAINING_DROPS';

export const ONBOARDING_GET_NUMBERS = 'ONBOARDING_GET_NUMBERS';
export const ONBOARDING_NUMBERS_RESPONSE = 'ONBOARDING_NUMBERS_RESPONSE';
export const ONBOARDING_NUMBERS_SUCCESS = 'ONBOARDING_NUMBERS_SUCCESS';
export const ONBOARDING_NUMBERS_FAILED = 'ONBOARDING_NUMBERS_FAILED';

export const ONBOARDING_PURCHASE_NUMBER_REQUEST = 'ONBOARDING_PURCHASE_NUMBER_REQUEST';
export const ONBOARDING_PURCHASE_NUMBER_RESPONSE = 'ONBOARDING_PURCHASE_NUMBER_RESPONSE';
export const ONBOARDING_PURCHASE_NUMBER_FAILED = 'ONBOARDING_PURCHASE_NUMBER_FAILED';
export const ONBOARDING_PURCHASE_NUMBER_CLEAR_ERROR = 'ONBOARDING_PURCHASE_NUMBER_CLEAR_ERROR';

export const ONBOARDING_VERIFY_NUMBER = 'ONBOARDING_VERIFY_NUMBER';
export const ONBOARDING_VERIFY_EXISTS = 'ONBOARDING_VERIFY_EXISTS';
export const ONBOARDING_VERIFY_CONTINUE = 'ONBOARDING_VERIFY_CONTINUE';
export const ONBOARDING_VERIFY_SUCCESS = 'ONBOARDING_VERIFY_SUCCESS';
export const ONBOARDING_VERIFY_FAIL = 'ONBOARDING_VERIFY_FAIL';
export const ONBOARDING_VERIFY_NUMBER_RESET = 'ONBOARDING_VERIFY_NUMBER_RESET';

export const CONTACT_SEARCH = 'CONTACT_SEARCH';
export const CONTACT_SEARCH_RESULT = 'CONTACT_SEARCH_RESULT';

export const CONTACT_LINK = 'CONTACT_LINK';

export const GET_CALL_LOGS = 'GET_CALL_LOGS';
export const CALL_LOGS_DATA = 'CALL_LOGS_DATA';

export const DNC_TYPE_MANUAL = 'MANUAL';
export const DNC_TYPE_IVR = 'IVR OPT-OUT';
export const DNC_TYPE_SMS = 'SMS OPT-OUT';

export const SET_MERGE_FIELDS = 'SET_MERGE_FIELDS';

export const CANCEL_SUBSCRIPTION = 'CANCEL_SUBSCRIPTION';
export const MANAGE_SUBSCRIPTION = 'MANAGE_SUBSCRIPTION';
export const REGISTER_CALLBACK = 'REGISTER_CALLBACK';

export const CHECK_CLAIMED_PHONE = 'CHECK_CLAIMED_PHONE';

export const LOW_MIN_WARNING_SHOWN = 'LOW_MIN_WARNING_SHOWN';
export const LOW_MSG_WARNING_SHOWN = 'LOW_MSG_WARNING_SHOWN';

export const OFFER_TYPE_EDUCATIONAL = 'EDUCATIONAL';
export const OFFER_TYPE_TRIAL = 'TRIAL';
export const OFFER_TYPE_DISCOUNT = 'DISCOUNT';
export const OFFER_TYPE_SUBSIDIZED = 'SUBSIDIZED';
export const OFFER_TYPE_DEFAULT = 'DEFAULT';
export const BUNDLE_TYPE_CLAIM = 'CLAIM';

export const DRAG_START = 'DRAG_START';
export const DRAG_MOVE = 'DRAG_MOVE';
export const DRAG_END = 'DRAG_END';

export const TOAST_ERROR_TIMEOUT = 7000;

export const SPOTIFY_LINKED = 'SPOTIFY_LINKED';
export const SPOTIFY_TOKEN = 'SPOTIFY_TOKEN';

export const WAVV_BRAND_UPDATED = 'WAVV_BRAND_REGISTRATION_UPDATED';

// onboarding steps
export const STEP_NEEDS_ACCESS = 'STEP_NEEDS_ACCESS';
export const STEP_PURCHASE_SUBSCRIPTION = 'STEP_PURCHASE_SUBSCRIPTION';
export const STEP_REDEEM_TEAM_CODE = 'STEP_REDEEM_TEAM_CODE';
export const STEP_TOS = 'STEP_TOS';
export const STEP_PURCHASE_NUMBER = 'STEP_PURCHASE_NUMBER';
// The setup journey, as a step. Renders the journey for a session it is available to whose setup is unfinished, so
// any action that raises onboarding returns the user to it — see isSetupJourneyAvailable.
export const STEP_COMPLETE_SETUP = 'STEP_COMPLETE_SETUP';
export const STEP_SETUP_INITIAL_DIALER_SEAT = 'STEP_SETUP_INITIAL_DIALER_SEAT';
export const STEP_UPDATE_SPAM_PROTECTION = 'STEP_UPDATE_SPAM_PROTECTION';
export const STEP_IDENTITY_VERIFICATION = 'STEP_IDENTITY_VERIFICATION';
export const STEP_CONFIGURE_WALLET_RECHARGE = 'STEP_CONFIGURE_WALLET_RECHARGE';

// NOTE personal number steps - combine them? dumb that we split them and then use a bool to differentiate on top of that
export const STEP_SEND_CODE = 'STEP_SEND_CODE';
export const STEP_VERIFY_CODE = 'STEP_VERIFY_CODE';
export const STEP_VERIFY_PERSONAL_NUMBER = 'STEP_VERIFY_PERSONAL_NUMBER';
export const STEP_VERIFY_AUTH_NUMBER = 'STEP_VERIFY_AUTH_NUMBER';

// email verification steps
export const STEP_VERIFY_EMAIL = 'STEP_VERIFY_EMAIL';

// team subscription overflow step
export const STEP_FIX_TEAM_SUB_OVERFLOW = 'STEP_FIX_TEAM_SUB_OVERFLOW';

// team subscription base sub or wallet failed payment step
export const STEP_ACCOUNT_PAUSED_BILLING_OVERDUE = 'STEP_ACCOUNT_PAUSED_BILLING_OVERDUE';

// account deactivated step - shown when team was recently archived due to payment failure
export const STEP_ACCOUNT_DEACTIVATED = 'STEP_ACCOUNT_DEACTIVATED';

// account collection paused step - shown when the subscription has invoice collection paused
export const STEP_ACCOUNT_COLLECTION_PAUSED = 'STEP_ACCOUNT_COLLECTION_PAUSED';

// shown to EXTERNAL_STRIPE owners whose email or payment method was detected on another account's trial
export const STEP_TRIAL_ABUSE = 'STEP_TRIAL_ABUSE';

// subscription paused reasons
export const SUB_PAUSED_REASON_SEAT_OVERFLOW = 'SUB_PAUSED_REASON_SEAT_OVERFLOW';
export const SUB_PAUSED_REASON_WALLET_SUB_OVERDUE = 'SUB_PAUSED_REASON_WALLET_SUB_OVERDUE';
export const SUB_PAUSED_REASON_BASE_SUB_OVERDUE = 'SUB_PAUSED_REASON_BASE_SUB_OVERDUE';
export const SUB_PAUSED_REASON_SUB_ARCHIVED = 'SUB_PAUSED_REASON_SUB_ARCHIVED';
export const SUB_PAUSED_REASON_STRIPE_SUB_PAUSED = 'SUB_PAUSED_REASON_STRIPE_SUB_PAUSED';

// NOTE brand reg steps - make these more concise maybe?
export const STEP_SPAM_PROTECTION = 'STEP_SPAM_PROTECTION';
export const STEP_SPAM_PROTECTION_INTRODUCTION = 'STEP_SPAM_PROTECTION_INTRODUCTION';
export const STEP_WAVV_BRAND = 'STEP_WAVV_BRAND';
export const STEP_TRUST_HUB_INTRODUCTION = 'STEP_TRUST_HUB_INTRODUCTION';
export const STEP_A2P_REGISTRATION_PAYMENT = 'STEP_A2P_REGISTRATION_PAYMENT';

export const STEP_ADD_VIDEO_SIGNATURE = 'STEP_ADD_VIDEO_SIGNATURE';

export const STEP_MIGRATE_TO_WALLET = 'STEP_MIGRATE_TO_WALLET';

export const RINGTONE_WAVV_DEFAULT = 'Ring';
export const RINGTONE_DIGITAL_PULSE = 'Digital Pulse';
export const RINGTONE_OCEAN_WAVES = 'Ocean Waves';
export const RINGTONE_RELAXED = 'Relaxed';
export const RINGTONE_SPACE_WAVE = 'Space Wave';

export const SESSION_UPDATED = 'SESSION_UPDATED';
export const REFRESH_SESSION = 'REFRESH_SESSION';

export const PURCHASE_NUMBER_FAILED_NO_FUNDS = 'PURCHASE_NUMBER_FAILED_NO_FUNDS';
export const PURCHASE_NUMBER_FAILED_UNAVAILABLE = 'PURCHASE_NUMBER_FAILED_UNAVAILABLE';
export const PURCHASE_NUMBER_FAILED_UNKNOWN = 'PURCHASE_NUMBER_FAILED_UNKNOWN';
export const PURCHASE_NUMBER_FAILED_SUSPENDED = 'PURCHASE_NUMBER_FAILED_SUSPENDED';
// Never attempted: buying it would take the account past the numbers its onboarding allows.
export const PURCHASE_NUMBER_FAILED_LIMIT_REACHED = 'PURCHASE_NUMBER_FAILED_LIMIT_REACHED';

export const IDENTITY_VERIFICATION_OPEN = 'IDENTITY_VERIFICATION_OPEN';

// Identity Verification statuses
export const IDENTITY_VERIFICATION_STATUS_PROCESSING = 'PROCESSING';
export const IDENTITY_VERIFICATION_STATUS_VERIFIED = 'VERIFIED';
export const IDENTITY_VERIFICATION_STATUS_FAILED = 'FAILED';

// actions mobile needs to intercept from the store
export const MOBILE_STORE_INTERCEPT = [REMAINING_MESSAGES, REMAINING_MINUTES, REMAINING_VIDEOS];

// actions mobile cares about
export const MOBILE_ACTIONS = [
	VIDEO_ASSET_UPDATED,
	MESSENGER_DATA,
	MESSENGER_MESSAGES_UPDATE,
	MESSENGER_UNREAD_UPDATE,
	...MOBILE_STORE_INTERCEPT,
];

export const authenticate = (payload) => {
	return {
		type: AUTH,
		payload,
		server: {
			method: 'post',
			url: '/api/v1/auth',
			data: payload,
			type: AUTHENTICATED,
			errorType: AUTH_FAILED,
		},
	};
};

export const reauthenticate = (payload) => {
	const action = authenticate(payload);
	action.type = REAUTH;
	return action;
};

export const chromeReloadOffscreen = () => ({ type: CHROME_RELOAD_OFFSCREEN });
export const wavvAuthPersonNeeded = (resolve) => ({ type: WAVV_AUTH_PERSON_NEEDED, payload: { resolve } });
export const wavvAuthPersonSettled = () => ({ type: WAVV_AUTH_PERSON_SETTLED });
export const wavvAuthPanelRequested = () => ({ type: WAVV_AUTH_PANEL_REQUESTED });
export const wavvAuthPanelDismissed = () => ({ type: WAVV_AUTH_PANEL_DISMISSED });
export const wavvAuthSessionDelivered = (token) => ({ type: WAVV_AUTH_SESSION_DELIVERED, payload: { token } });
export const wavvAuthUnavailable = () => ({ type: WAVV_AUTH_UNAVAILABLE });

export const sendFunctionLog = (payload) => {
	return {
		type: 'FUNC_LOG',
		server: {
			method: 'post',
			url: '/api/v1/func-log',
			data: payload,
		},
	};
};

export const fetchNumbers = (payload) => {
	const { state, areaCode } = payload;
	return {
		type: FETCH_NUMBERS,
		payload,
		server: {
			method: 'post',
			url: '/api/messenger/numbers/search',
			data: { state, areaCode },
			type: FETCH_NUMBERS_SUCCESS,
			key: 'numbers',
		},
	};
};

export const getSmsNumbers = (payload, test = false) => {
	const { state, areaCode } = payload;
	const requestData = {
		method: 'post',
		url: `/api/messenger/numbers/search${test === true ? '?test=true' : ''}`,
		data: { state, areaCode },
		type: ONBOARDING_NUMBERS_RESPONSE,
		key: 'numbers',
	};
	return {
		type: ONBOARDING_GET_NUMBERS,
		payload,
		server: requestData,
	};
};

export const wavvBrandUpdated = (payload) => ({
	type: WAVV_BRAND_UPDATED,
	payload: { wavvBrand: payload },
});

export const failedGetNumbers = (payload) => ({
	type: ONBOARDING_NUMBERS_FAILED,
	payload,
});

export const successGetNumbers = (payload) => ({
	type: ONBOARDING_NUMBERS_SUCCESS,
	payload,
});

export const getCallLogs = (payload) => {
	const { search } = payload || {};
	return {
		type: GET_CALL_LOGS,
		payload,
		server: {
			method: 'get',
			url: `/api/v1/call-logs${search ? `?search=${search}` : ''}`,
			type: CALL_LOGS_DATA,
		},
	};
};

// deprecates getCallLogs? atleast for CallHistory.tsx
export const getCallHistory = (payload) => {
	const { search } = payload || {};
	return {
		type: GET_CALL_LOGS,
		payload,
		server: {
			method: 'get',
			url: `/api/v1/call-history${search ? `?search=${search}` : ''}`,
			type: CALL_LOGS_DATA,
		},
	};
};

export const callPhone = ({ contact, number, mini = true }) => {
	return {
		type: INIT_DIALER,
		payload: {
			type: F_CALL_PHONE,
			payload: {
				contact,
				number,
				mini,
			},
		},
	};
};

export const purchaseNumbersRequest = (payload) => {
	const number = payload.cart[0];
	const { assignCallerId } = payload;
	return {
		type: PURCHASE_NUMBERS_REQUEST,
		payload,
		server: {
			method: 'post',
			url: '/api/numbers/purchase',
			data: { number, assignCallerId },
			type: PURCHASE_NUMBERS_SUCCESS,
		},
	};
};

export const purchaseNumber = (number, assignCallerId) => ({
	type: ONBOARDING_PURCHASE_NUMBER_REQUEST,
	payload: { number, assignCallerId },
	server: {
		method: 'post',
		url: '/api/numbers/purchase',
		data: { number, assignCallerId },
		type: ONBOARDING_PURCHASE_NUMBER_RESPONSE,
	},
});

export const failedPurchaseNumber = (payload) => ({
	type: ONBOARDING_PURCHASE_NUMBER_FAILED,
	payload,
});

export const verifyNumber = (payload) => ({
	type: ONBOARDING_VERIFY_NUMBER,
	payload,
	server: true,
});

export const resetVerifyNumber = () => ({
	type: ONBOARDING_VERIFY_NUMBER_RESET,
});

export const verifyCode = (payload) => ({
	type: VERIFY_CODE,
	payload,
	server: true,
});

export const messengerFindConversation = (payload) => {
	const { contact, phone } = payload.members[0];
	return {
		type: MESSENGER_FIND_CONVERSATION,
		payload,
		server: {
			method: 'post',
			data: {
				...contact,
				vendorContactId: contact?.contactId ?? phone.destination,
				displayName: contact?.name || phone.destination,
				phoneNumbers: contact?.numbers?.length ? contact.numbers : [phone.destination],
			},
			url: '/api/messenger/conversations',
			type: MESSENGER_FOUND_CONVERSATION,
			responsePayload: payload,
		},
	};
};

export const notificationClosed = (id) => ({
	type: NOTIFICATION_CLOSED,
	payload: { id },
});

export const messengerClose = (dock) => ({
	type: MESSENGER_CLOSE,
	payload: { dock },
});

export const messengerMinimize = (payload) => ({
	type: MESSENGER_MINIMIZE_CONVERSATION,
	payload,
});

export const contactSearch = (payload) => ({
	type: CONTACT_SEARCH,
	payload,
});

export const contactSearchResult = (payload) => ({
	type: CONTACT_SEARCH_RESULT,
	payload,
});

export const contactLink = (payload) => ({
	type: CONTACT_LINK,
	payload,
});

export const signTos = (payload) => ({
	type: SIGN_TOS,
	payload,
	server: {
		method: 'post',
		url: '/api/v1/sign-tos',
		data: payload,
		type: TOS_SIGNED,
	},
});

export const identityVerificationOpen = (payload) => ({ type: IDENTITY_VERIFICATION_OPEN, payload });

export const setViewingTeamManagement = (payload) => ({ type: SET_VIEWING_TEAM_MANAGEMENT, payload, server: true });

export const minimizeDialer = (payload) => ({ type: MINIMIZE_DIALER, payload });

export const DISPOSITION_CATEGORY_INTERESTED = 'INTERESTED';
export const DISPOSITION_CATEGORY_NOT_INTERESTED = 'NOT_INTERESTED';
export const DISPOSITION_CATEGORY_APPOINTMENT_SET = 'APPOINTMENT_SET';
export const DISPOSITION_CATEGORY_CALLBACK = 'CALLBACK';
export const DISPOSITION_CATEGORY_GOOD_NUMBER = 'GOOD_NUMBER';
export const DISPOSITION_CATEGORY_WRONG_NUMBER = 'WRONG_NUMBER';
export const DISPOSITION_CATEGORY_NO_ANSWER = 'NO_ANSWER';
export const DISPOSITION_CATEGORY_DO_NOT_CONTACT = 'DO_NOT_CONTACT';
export const DISPOSITION_CATEGORY_LEFT_VOICEMAIL = 'LEFT_VOICEMAIL';
export const DISPOSITION_CATEGORY_BAD_NUMBER = 'BAD_NUMBER';
export const DISPOSITION_CATEGORY_NONE = 'NONE';
export const DISPOSITION_CATEGORY_OTHER = 'OTHER';
export const DISPOSITION_CATEGORY_CANCELLED = 'CANCELLED';
export const DISPOSITION_CATEGORY_SYSTEM_CALLBACK = 'SYSTEM_CALLBACK';
export const DISPOSITION_CATEGORY_CUSTOM = 'CUSTOM';
export const DISPOSITION_CATEGORY_CALL_REJECTED = 'CALL_REJECTED';
export const DISPOSITION_CATEGORY_LEFT_CALLBACK = 'LEFT_CALLBACK';
export const DISPOSITION_CATEGORY_BUSY = 'BUSY';

export const HIDDEN_FOR_USER_DISPOSITION_CATEGORIES = [
	DISPOSITION_CATEGORY_CANCELLED,
	DISPOSITION_CATEGORY_SYSTEM_CALLBACK,
	DISPOSITION_CATEGORY_CALL_REJECTED,
];

// When the dialer leaves each system disposition. Shown beside a system disposition wherever it's edited, so a
// renamed one still says what it is.
export const SYSTEM_DISPOSITION_HINTS = {
	[DISPOSITION_CATEGORY_NONE]: 'Call ended with no disposition chosen',
	[DISPOSITION_CATEGORY_NO_ANSWER]: "Call wasn't answered or the line was busy",
	[DISPOSITION_CATEGORY_LEFT_VOICEMAIL]: 'System dropped a voicemail',
	[DISPOSITION_CATEGORY_BAD_NUMBER]: 'Number was disconnected',
	[DISPOSITION_CATEGORY_CANCELLED]: 'Agent canceled the call',
	[DISPOSITION_CATEGORY_SYSTEM_CALLBACK]: 'Dialer scheduled a callback',
	[DISPOSITION_CATEGORY_CALL_REJECTED]: 'Carrier rejected the call',
};

export const DISPOSITIONS = [
	{ category: DISPOSITION_CATEGORY_INTERESTED, tag: 'wavv-interested', name: 'Interested', default: true },
	{ category: DISPOSITION_CATEGORY_NOT_INTERESTED, tag: 'wavv-not-interested', name: 'Not Interested', default: true },
	{
		category: DISPOSITION_CATEGORY_APPOINTMENT_SET,
		tag: 'wavv-appointment-set',
		name: 'Appointment Set',
		default: true,
	},
	{ category: DISPOSITION_CATEGORY_CALLBACK, tag: 'wavv-callback', name: 'Callback', default: true },
	{ category: DISPOSITION_CATEGORY_GOOD_NUMBER, tag: 'wavv-good-number', name: 'Good Number' },
	{ category: DISPOSITION_CATEGORY_WRONG_NUMBER, tag: 'wavv-wrong-number', name: 'Wrong Number' },
	{ category: DISPOSITION_CATEGORY_NO_ANSWER, tag: 'wavv-no-answer', name: 'No Answer', default: true, required: true },
	{ category: DISPOSITION_CATEGORY_DO_NOT_CONTACT, tag: 'wavv-do-not-contact', name: 'Do Not Contact', default: true },
	{
		category: DISPOSITION_CATEGORY_LEFT_VOICEMAIL,
		tag: 'wavv-left-voicemail',
		name: 'Voice Message',
		default: true,
		required: true,
	},
	{
		category: DISPOSITION_CATEGORY_BAD_NUMBER,
		tag: 'wavv-bad-number',
		name: 'Bad Number',
		default: true,
		required: true,
	}, // disconnected
	{ category: DISPOSITION_CATEGORY_NONE, tag: 'wavv-none', name: 'None', default: true, required: true },
	{ category: DISPOSITION_CATEGORY_CANCELLED, tag: 'wavv-canceled', name: 'Agent Canceled', default: true, required: true },
	{ category: DISPOSITION_CATEGORY_SYSTEM_CALLBACK, tag: 'wavv-system-callback', name: 'System Callback', default: true, required: true },
	{ category: DISPOSITION_CATEGORY_CALL_REJECTED, tag: 'wavv-call-blocked', name: 'Call Blocked', default: true, required: true },
	{ category: DISPOSITION_CATEGORY_OTHER, tag: '', name: 'Other' },
];

/*
 * Two dimensions, easily confused:
 *   category  - system-controlled outcome identity, never user-authored. Auto-dispositioning resolves a row
 *               by it, DNC keys off DO_NOT_CONTACT, and callboard automations match on it because a rename
 *               cannot change it.
 *   sentiment - user-authored POSITIVE|NEUTRAL|NEGATIVE, stored in the column named `type`.
 * Calls store category only, so a past call's sentiment is this lookup.
 */
export const DISPOSITION_CATEGORY_SENTIMENT = {
	[DISPOSITION_CATEGORY_INTERESTED]: DISPOSITION_DEFINITIVE_TYPE_POSITIVE,
	[DISPOSITION_CATEGORY_APPOINTMENT_SET]: DISPOSITION_DEFINITIVE_TYPE_POSITIVE,

	// Neutral rather than positive/negative: sentiment is definitive, and a callback or a wrong number must not
	// stop the dialer from trying the contact's other numbers.
	[DISPOSITION_CATEGORY_CALLBACK]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_GOOD_NUMBER]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_LEFT_CALLBACK]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_BAD_NUMBER]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_WRONG_NUMBER]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_NONE]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_NO_ANSWER]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_BUSY]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_LEFT_VOICEMAIL]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_CANCELLED]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_SYSTEM_CALLBACK]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_CALL_REJECTED]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_OTHER]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	[DISPOSITION_CATEGORY_CUSTOM]: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,

	[DISPOSITION_CATEGORY_NOT_INTERESTED]: DISPOSITION_DEFINITIVE_TYPE_NEGATIVE,
	[DISPOSITION_CATEGORY_DO_NOT_CONTACT]: DISPOSITION_DEFINITIVE_TYPE_NEGATIVE,
};

/*
 * A Positive or Negative disposition is definitive: the attempt on that contact is over, so the dialer skips the
 * contact's remaining numbers. Call Boards and the regular dialer share this rule.
 */
export const isDefinitiveSentiment = (type) =>
	type === DISPOSITION_DEFINITIVE_TYPE_POSITIVE || type === DISPOSITION_DEFINITIVE_TYPE_NEGATIVE;

/**
 * The sentiment of a disposition a call was just given. The regular dialer's disposition modal sends only the
 * picked row's id, so the configured row is the source of truth; the built-in defaults have no stored sentiment
 * and fall back to their category's.
 * @param {{ id?: string, type?: string, category?: string }} disposition - the disposition saved on the call
 * @param {{ id: string, type?: string }[]} configuredDispositions - the dispositions in scope for the dialer
 * @returns {string} POSITIVE, NEUTRAL or NEGATIVE
 */
export const resolveDispositionSentiment = (disposition, configuredDispositions = []) =>
	configuredDispositions.find((configured) => configured.id === disposition?.id)?.type ||
	disposition?.type ||
	DISPOSITION_CATEGORY_SENTIMENT[disposition?.category] ||
	DISPOSITION_DEFINITIVE_TYPE_NEUTRAL;

/*
 * The categories the Disposition Heatmap reports on, in display order and grouped positive -> neutral
 * -> negative, which the report's dropdown relies on for its grouping. Deliberately narrower than
 * DISPOSITION_CATEGORY_SENTIMENT: CUSTOM carries no identity on a historical call (every custom
 * disposition stores that one category), and the hidden system outcomes - Agent Canceled, System
 * Callback, Call Blocked - along with None/Busy/Other are not outcomes a rep chose.
 *
 * Both sides of the report read this: the filter builds its options from it, and the server builds a
 * sentiment class's membership from it. Deriving either one from DISPOSITION_CATEGORY_SENTIMENT
 * instead would silently widen that class past what the filter offers - which is how Neutral came to
 * count seven categories it never listed.
 */
export const REPORTED_DISPOSITION_CATEGORIES = [
	DISPOSITION_CATEGORY_INTERESTED,
	DISPOSITION_CATEGORY_APPOINTMENT_SET,
	DISPOSITION_CATEGORY_CALLBACK,
	DISPOSITION_CATEGORY_GOOD_NUMBER,
	DISPOSITION_CATEGORY_LEFT_CALLBACK,
	DISPOSITION_CATEGORY_LEFT_VOICEMAIL,
	DISPOSITION_CATEGORY_NO_ANSWER,
	DISPOSITION_CATEGORY_BAD_NUMBER,
	DISPOSITION_CATEGORY_WRONG_NUMBER,
	DISPOSITION_CATEGORY_NOT_INTERESTED,
	DISPOSITION_CATEGORY_DO_NOT_CONTACT,
];

// Default callboard disposition display names (used by DEFAULT_CALLBOARD_DISPOSITIONS and automation builders)
export const DEFAULT_DISPOSITION_NAME_FOLLOW_UP = 'Follow Up';
export const DEFAULT_DISPOSITION_NAME_APPOINTMENT_SET = 'Appointment Set';
export const DEFAULT_DISPOSITION_NAME_NOT_INTERESTED = 'Not Interested';
export const DEFAULT_DISPOSITION_NAME_WRONG_NUMBER = 'Wrong Number';
export const DEFAULT_DISPOSITION_NAME_DO_NOT_CONTACT = 'Do Not Contact';
export const DEFAULT_DISPOSITION_NAME_NO_ANSWER = 'No Answer';
export const DEFAULT_DISPOSITION_NAME_VOICE_MESSAGE = 'Voice Message';
export const DEFAULT_DISPOSITION_NAME_DISCONNECTED = 'Disconnected';
export const DEFAULT_DISPOSITION_NAME_AGENT_CANCELLED = 'Agent Canceled';
export const DEFAULT_DISPOSITION_NAME_SYSTEM_CALLBACK = 'System Callback';
export const DEFAULT_DISPOSITION_NAME_CALL_BLOCKED = 'Call Blocked';
export const DEFAULT_DISPOSITION_NAME_WON = 'Won';

export const DEFAULT_CALLBOARD_DISPOSITIONS = [
	// custom dispositions
	{
		category: DISPOSITION_CATEGORY_CUSTOM,
		name: DEFAULT_DISPOSITION_NAME_FOLLOW_UP,
		required: false,
		type: DISPOSITION_DEFINITIVE_TYPE_POSITIVE,
	},
	{
		category: DISPOSITION_CATEGORY_CUSTOM,
		name: DEFAULT_DISPOSITION_NAME_APPOINTMENT_SET,
		required: false,
		type: DISPOSITION_DEFINITIVE_TYPE_POSITIVE,
	},
	{
		category: DISPOSITION_CATEGORY_CUSTOM,
		name: DEFAULT_DISPOSITION_NAME_NOT_INTERESTED,
		required: false,
		type: DISPOSITION_DEFINITIVE_TYPE_NEGATIVE,
	},
	{
		category: DISPOSITION_CATEGORY_CUSTOM,
		name: DEFAULT_DISPOSITION_NAME_WRONG_NUMBER,
		required: false,
		type: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	},
	{
		category: DISPOSITION_CATEGORY_DO_NOT_CONTACT,
		name: DEFAULT_DISPOSITION_NAME_DO_NOT_CONTACT,
		required: false,
		type: DISPOSITION_DEFINITIVE_TYPE_NEGATIVE,
	},
	{
		category: DISPOSITION_CATEGORY_CUSTOM,
		name: DEFAULT_DISPOSITION_NAME_WON,
		required: false,
		type: DISPOSITION_DEFINITIVE_TYPE_POSITIVE,
	},
	// auto dispositions
	{
		category: DISPOSITION_CATEGORY_NO_ANSWER,
		name: DEFAULT_DISPOSITION_NAME_NO_ANSWER,
		required: true,
		type: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	},
	{
		category: DISPOSITION_CATEGORY_LEFT_VOICEMAIL,
		name: DEFAULT_DISPOSITION_NAME_VOICE_MESSAGE,
		required: true,
		type: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	},
	{
		category: DISPOSITION_CATEGORY_BAD_NUMBER,
		name: DEFAULT_DISPOSITION_NAME_DISCONNECTED,
		required: true,
		type: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	},
	{
		category: DISPOSITION_CATEGORY_CANCELLED,
		name: DEFAULT_DISPOSITION_NAME_AGENT_CANCELLED,
		required: true,
		type: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	},
	{
		category: DISPOSITION_CATEGORY_SYSTEM_CALLBACK,
		name: DEFAULT_DISPOSITION_NAME_SYSTEM_CALLBACK,
		required: true,
		type: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	},
	{
		category: DISPOSITION_CATEGORY_CALL_REJECTED,
		name: DEFAULT_DISPOSITION_NAME_CALL_BLOCKED,
		required: true,
		type: DISPOSITION_DEFINITIVE_TYPE_NEUTRAL,
	},
];

export const TRACK_ENGAGEMENT_REQUEST = 'TRACK_ENGAGEMENT_REQUEST';
export const TRACK_ENGAGEMENT_RESPONSE = 'TRACK_ENGAGEMENT_RESPONSE';

export const ENGAGEMENT_POPPED_ONBOARDING = 'poppedOnboarding';
export const ENGAGEMENT_VIEWED_PRODUCTS = 'viewedProducts';
export const ENGAGEMENT_PAYMENT_PREVIEW = 'paymentPreview';
export const ENGAGEMENT_PRODUCT_PURCHASE = 'productPurchase';
export const ENGAGEMENT_TEAM_CODE_REDEEMED = 'teamCodeRedeemed';

export const engagementTracking = {
	trackEngagement: (widgetType, step) => ({
		type: TRACK_ENGAGEMENT_REQUEST,
		server: {
			method: 'post',
			url: '/api/v1/engagement/track',
			type: TRACK_ENGAGEMENT_RESPONSE,
			data: {
				widgetType,
				step,
			},
		},
	}),
};

export const CONNECTION_TYPE_COMPUTER = 'COMPUTER';
export const CONNECTION_TYPE_DIAL_IN = 'DIAL_IN';
export const CONNECTION_TYPE_DIAL_OUT = 'DIAL_OUT';

export const BILLING_MY_INFO_REQUEST = 'BILLING_MY_INFO_REQUEST';
export const BILLING_MY_INFO_RESPONSE = 'BILLING_MY_INFO_RESPONSE';
export const BILLING_MY_INFO_CHANGED = 'BILLING_MY_INFO_CHANGED';

export const BILLING_ONBOARDING_INIT_ME_REQUEST = 'BILLING_ONBOARDING_INIT_ME_REQUEST';
export const BILLING_ONBOARDING_INIT_ME_RESPONSE = 'BILLING_ONBOARDING_INIT_ME_RESPONSE';

export const BILLING_INIT_ME_REQUEST = 'BILLING_INIT_ME_REQUEST';
export const BILLING_INIT_ME_RESPONSE = 'BILLING_INIT_ME_RESPONSE';

export const BILLING_UPSERT_ME_REQUEST = 'BILLING_UPSERT_ME_REQUEST';
export const BILLING_UPSERT_ME_RESPONSE = 'BILLING_UPSERT_ME_RESPONSE';

export const BILLING_CANCEL_SUB_REQUEST = 'BILLING_CANCEL_SUB_REQUEST';
export const BILLING_CANCEL_SUB_RESPONSE = 'BILLING_CANCEL_SUB_RESPONSE';

export const BILLING_REACTIVATE_SUB_REQUEST = 'BILLING_REACTIVATE_SUB_REQUEST';
export const BILLING_REACTIVATE_SUB_RESPONSE = 'BILLING_REACTIVATE_SUB_RESPONSE';

export const BILLING_GET_SUB_QUOTE_REQUEST = 'BILLING_GET_SUB_QUOTE_REQUEST';
export const BILLING_GET_SUB_QUOTE_RESPONSE = 'BILLING_GET_SUB_QUOTE_RESPONSE';
export const BILLING_CLEAR_SUB_QUOTE = 'BILLING_CLEAR_SUB_QUOTE';

export const BILLING_CHANGE_SUB_REQUEST = 'BILLING_CHANGE_SUB_REQUEST';
export const BILLING_CHANGE_SUB_RESPONSE = 'BILLING_CHANGE_SUB_RESPONSE';

export const BILLING_CARD_CHANGE_REQUEST = 'BILLING_CARD_CHANGE_REQUEST';
export const BILLING_CARD_CHANGE_RESPONSE = 'BILLING_CARD_CHANGE_RESPONSE';

export const BILLING_OPEN_PAYMENT_MODAL = 'BILLING_OPEN_PAYMENT_MODAL';
export const BILLING_CLOSE_PAYMENT_MODAL = 'BILLING_CLOSE_PAYMENT_MODAL';

export const BILLING_CLEAR_PAYMENT_ERRORS = 'BILLING_CLEAR_PAYMENT_ERRORS';

export const BILLING_SET_TOKEN_ERROR = 'BILLING_SET_TOKEN_ERROR';
export const BILLING_CLEAR_TOKEN_ERROR = 'BILLING_CLEAR_TOKEN_ERROR';

export const BILLING_CLEAR_OPTIONS = 'BILLING_CLEAR_OPTIONS';

export const BILLING_RESET_PAYMENT_DATA = 'BILLING_RESET_PAYMENT_DATA';

// Canonical wallet action types. Each value is exactly what is stored in wallet_spend.action_type
// and is the key into WALLET_ACTIONS (back-end) which holds the display metadata. Debit types
// describe what the user spent on; credit types describe how the balance was added to.
export const WALLET_ACTION_TYPES = {
	// Debits
	SEND_SMS_MESSAGE_SEGMENT: 'SEND_SMS_MESSAGE_SEGMENT',
	SEND_MMS_MESSAGE_SEGMENT: 'SEND_MMS_MESSAGE_SEGMENT',
	PURCHASE_OR_RENEW_NUMBER: 'PURCHASE_OR_RENEW_NUMBER',
	INCLUDED_NUMBER: 'INCLUDED_NUMBER',
	PURCHASE_SMART_ROTATION_NUMBER: 'PURCHASE_SMART_ROTATION_NUMBER',
	CARRIER_FEE_SMS_DAILY: 'CARRIER_FEE_SMS_DAILY',
	CARRIER_FEE_MMS_DAILY: 'CARRIER_FEE_MMS_DAILY',
	GRANDFATHERED_A2P_REG: 'A2P_REG',
	A2P_BRAND_REGISTRATION_FEE: 'A2P_BRAND_REGISTRATION_FEE',
	A2P_CAMPAIGN_VETTING_FEE: 'A2P_CAMPAIGN_VETTING_FEE',
	A2P_OTHER_FEES: 'A2P_OTHER_FEES',
	TRIAL_GRANT_REVOKED: 'TRIAL_GRANT_REVOKED',
	// Credits (recharges & grants). WALLET_RECHARGED / WALLET_SHORTFALL_RECHARGE keep their historical
	// values so pre-existing ledger rows are already canonical; the grant credit types are new and are
	// applied to grant-funded rows so complementary balance shows as "on us", not a card charge.
	WALLET_RECHARGED: 'WALLET_RECHARGED',
	WALLET_SHORTFALL_RECHARGE: 'WALLET_SHORTFALL_RECHARGE',
	WALLET_REFUND: 'WALLET_REFUND',
	MONTHLY_INCLUDED_CREDIT: 'MONTHLY_INCLUDED_CREDIT',
	TRIAL_STARTER_CREDIT: 'TRIAL_STARTER_CREDIT',
	PROMO_CREDIT: 'PROMO_CREDIT',
};

export const BILLING_TYPE_NUMBERS = 'NUMBERS';
export const BILLING_TYPE_MESSAGE_SEGMENT_SENT_SMS = 'MESSAGE_SEGMENT_SENT_SMS';
export const BILLING_TYPE_MESSAGE_SENT_MMS = 'MESSAGE_SENT_MMS';
export const BILLING_TYPE_CARRIER_FEE_SMS = 'CARRIER_FEE_SMS';
export const BILLING_TYPE_CARRIER_FEE_MMS = 'CARRIER_FEE_MMS';
export const BILLING_TYPE_GRANDFATHERED_A2P_REG = 'A2P_REG';
export const BILLING_TYPE_A2P_BRAND_REGISTRATION_FEE = 'A2P_BRAND_REGISTRATION_FEE';
export const BILLING_TYPE_A2P_CAMPAIGN_VETTING_FEE = 'A2P_CAMPAIGN_VETTING_FEE';
export const BILLING_TYPE_A2P_OTHER_FEES = 'A2P_OTHER_FEES';
export const BILLING_TYPE_SPAM_PROTECTION = 'SPAM_PROTECTION';
export const BILLING_TYPE_SPAM_ADDON = 'SPAM_PROTECTION_ADDON_SUBSCRIPTION';
export const BILLING_TYPE_WALLET_RECHARGED = 'WALLET_RECHARGED';
export const BILLING_TYPE_WALLET_SHORTFALL_RECHARGE = 'WALLET_SHORTFALL_RECHARGE';

export const SUBSCRIPTION_TYPE_COMMISSIONED = 'COMMISSIONED';
export const SUBSCRIPTION_TYPE_INVOICED = 'INVOICED';

export const SUBSCRIPTION_STATUS_CREATED = 'CREATED';
export const SUBSCRIPTION_STATUS_TRIALING = 'TRIALING';
export const SUBSCRIPTION_STATUS_ACTIVATION_FAILED = 'ACTIVATION_FAILED';
export const SUBSCRIPTION_STATUS_ACTIVE = 'ACTIVE';
export const SUBSCRIPTION_STATUS_ACTIVE_RETRYING = 'ACTIVE_RETRYING';
export const SUBSCRIPTION_STATUS_PENDING_CANCELLATION = 'PENDING_CANCELLATION';
export const SUBSCRIPTION_STATUS_CANCELED = 'CANCELED';

export const REFRESH_HOST = 'REFRESH_HOST';

export const SET_GHL_V1_SERVICE_HEADERS = 'SET_GHL_V1_SERVICE_HEADERS';
export const SET_SUBSCRIPTION_STATE = 'SET_SUBSCRIPTION_STATE';
export const MANAGER_MANAGE_SUB = 'sub-manage';
export const MANAGER_SELECT_SUBSCRIPTION = 'sub-select';
export const MANAGER_SUBSCRIBE_TO_PRODUCT = 'product-subscribe';
export const MANAGER_MODIFY_SUB_PRODUCT = 'sub-modify-product';
export const MANAGER_INCREASE_SUB_QTY = 'increase-sub-qty';
export const MANAGER_DECREASE_SUB_QTY = 'decrease-sub-qty';
export const MANAGER_ADD_NEW_RESOURCE = 'manager-add-new-resource';

export const CANCELLATION_REASON_OTHER = 'OTHER';
export const CANCELLATION_REASON_TOO_EXPENSIVE = 'TOO_EXPENSIVE';
export const CANCELLATION_REASON_TOO_MANY_BUGS = 'TOO_MANY_BUGS';
export const CANCELLATION_REASON_DIDNT_USE_ENOUGH = 'DIDNT_USE_ENOUGH';
export const CANCELLATION_REASON_MISSING_FEATURES = 'MISSING_FEATURES';
export const CANCELLATION_REASON_BETTER_ALTERNATIVE = 'BETTER_ALTERNATIVE';
export const CANCELLATION_REASON_DIALING_CONSISTENCY_DIFFICULTY = 'DIALING_CONSISTENCY_DIFFICULTY';

export const MTK_VENDOR_ID = 'nWvWbBolep18tO9tFynFtR3JzcRjLpDq';
export const WAVV_GHL_VENDOR_ID = 'JFBl699AeWvjUt6PM4Ni1qPFf4fCeuiA';
export const STORM_VENDOR_ID = 'b5121e629b5f483a96b9eb48540f748a';
export const TESTING_VENDOR_ID = '00000000000000000000000000000000';
export const WAVV_VENDOR_ID = 'Wm3rGdVnQpKxLb7tZyHcF4sJaUe9Px2N';
export const EVOLVE_VENDOR_ID = 'i9IanqFYUFpdIhSzLJNcUHPimKvTQF3h';
export const BAMBOO_VENDOR_ID = 'U8uDEY1SaeJONeo2cswVVgjcnuZ6VFsK';
/**
 * Every `@wavv/sdk` platform is its own vendor, and its vendor id starts with this. The vendor is the
 * tenant — users, teams, numbers and billing are all keyed on it — so platforms sharing one would share
 * those too.
 *
 * The prefix is what lets a new platform through the vendor allowlists (frozen, modern) without a deploy
 * per partner. A vendor id is validated as exactly 32 characters, so the prefix eats into that.
 */
export const PLATFORM_VENDOR_PREFIX = 'sdk_';

/** Whether a vendor is an `@wavv/sdk` platform. */
export const isPlatformVendor = (vendorId) =>
	typeof vendorId === 'string' && vendorId.length === 32 && vendorId.startsWith(PLATFORM_VENDOR_PREFIX);

export const billingActions = {
	getMyBillingInfo: (origin) => ({
		type: BILLING_MY_INFO_REQUEST,
		server: {
			method: 'get',
			url: `/api/billing/client/me?origin=${origin}`,
			type: BILLING_MY_INFO_RESPONSE,
		},
	}),
	getQuote: (offeringId, priceId, trial = 0, qty = 1) => ({
		type: BILLING_GET_SUB_QUOTE_REQUEST,
		server: {
			method: 'post',
			url: 'api/billing/client/me/purchase/quote',
			type: BILLING_GET_SUB_QUOTE_RESPONSE,
			data: {
				offeringId,
				priceId,
				trial,
				qty,
			},
		},
	}),
	onboardingInitBilling: (customerInfo, cardToken, purchase) => ({
		type: BILLING_ONBOARDING_INIT_ME_REQUEST,
		server: {
			method: 'post',
			url: '/api/billing/client/me/purchase',
			type: BILLING_ONBOARDING_INIT_ME_RESPONSE,
			data: {
				customerInfo,
				cardToken,
				purchase,
			},
		},
	}),
	initBilling: (customerInfo, cardToken, purchase) => ({
		type: BILLING_INIT_ME_REQUEST,
		server: {
			method: 'post',
			url: '/api/billing/client/me/purchase',
			type: BILLING_INIT_ME_RESPONSE,
			data: {
				customerInfo,
				cardToken,
				purchase,
			},
		},
	}),
	upsertMyBillingInfo: (customerInfo, cardToken) => ({
		type: BILLING_UPSERT_ME_REQUEST,
		server: {
			method: 'post',
			url: '/api/billing/client/me',
			type: BILLING_UPSERT_ME_RESPONSE,
			data: {
				customerInfo,
				cardToken,
			},
		},
	}),
	cancelSub: (subscriptionId, immediate = false) => {
		const scheduleCancellationUrl = `/api/billing/client/me/subscriptions/${subscriptionId}`;
		const immediateCancellationUrl = `/api/billing/client/me/subscriptions/${subscriptionId}?immediate=true`;
		return {
			type: BILLING_CANCEL_SUB_REQUEST,
			server: {
				method: 'delete',
				url: immediate ? immediateCancellationUrl : scheduleCancellationUrl,
				type: BILLING_CANCEL_SUB_RESPONSE,
			},
		};
	},
	reactivateSub: (subscriptionId) => ({
		type: BILLING_REACTIVATE_SUB_REQUEST,
		server: {
			method: 'post',
			url: `/api/billing/client/me/subscriptions/${subscriptionId}/unschedule-cancellation`,
			type: BILLING_REACTIVATE_SUB_RESPONSE,
		},
	}),
	openPaymentModal: (payload) => ({
		type: BILLING_OPEN_PAYMENT_MODAL,
		payload,
	}),
	setTokenError: (message) => ({
		type: BILLING_SET_TOKEN_ERROR,
		payload: {
			message,
		},
	}),
	clearTokenError: () => ({
		type: BILLING_CLEAR_TOKEN_ERROR,
	}),
	closePaymentModal: () => ({
		type: BILLING_CLOSE_PAYMENT_MODAL,
		payload: {},
	}),
	clearPaymentErrors: () => ({
		type: BILLING_CLEAR_PAYMENT_ERRORS,
	}),
	myInfoChanged: (payload) => ({
		type: BILLING_MY_INFO_CHANGED,
		payload,
	}),
};

export const UPDATE_LAST_LOGIN_REQUEST = 'UPDATE_LAST_LOGIN_REQUEST';
export const UPDATE_LAST_LOGIN_RESPONSE = 'UPDATE_LAST_LOGIN_RESPONSE';

export const updateLastLogin = () => ({
	type: UPDATE_LAST_LOGIN_REQUEST,
	server: {
		method: 'post',
		url: '/api/v1/event/login',
	},
});

// Dialer

// Messenger actions

export const attachVideo = (payload) => ({
	type: ATTACH_VIDEO,
	payload,
});

// Video
export const setVideoSignature = (payload) => ({
	type: SET_VIDEO_SIGNATURE,
	payload,
	server: {
		method: 'put',
		url: '/api/v1/settings',
		data: { signatureMetadata: payload },
	},
});

const popLimitDialog = ({ remaining, type, id, outText, lowText, wavvHandlesBilling, additionalConfig }) => {
	const unlimited = additionalConfig.unlimited || false;
	const isNonOwnerMember = additionalConfig.isNonOwnerMember || false;
	const teamOwnerContact = additionalConfig.teamOwnerContact || '';

	const notOut = remaining && remaining > 0;

	let title = notOut ? lowText : outText;

	if (unlimited) title = 'Your account is overdue';

	if (isNonOwnerMember) {
		title = `${title}. Please contact your team owner`;
		if (teamOwnerContact) title = `${title} (${teamOwnerContact})`;
	}

	const client = additionalConfig.sendToClient || false;

	const payload = {
		id,
		type,
		title,
		visible: true,
		usageLeft: true,
		minWidth: 300,
	};

	payload.disableRightButton = false;
	if (wavvHandlesBilling && !isNonOwnerMember) {
		payload.actionRightButton = SHOW_SETTINGS;
		payload.payload = { tab: TAB_SUBSCRIPTION, type, ...additionalConfig };
		payload.textRightButton = 'View Subscription';
	} else if (notOut) {
		payload.textRightButton = 'Continue';
	} else if (type === WIDGET_TYPE_DIALER) {
		payload.actionRightButton = SHOW_SETTINGS;
		payload.payload = { tab: TAB_USAGE, type };
		payload.textRightButton = 'View Usage';
	}

	return {
		type: SHOW_DIALOG,
		payload,
		client,
	};
};

export const limitReachedDialogs = {
	dialMinutes: (remaining, wavvHandlesBilling, additionalConfig = {}) => {
		return popLimitDialog({
			remaining: remaining || 0,
			type: WIDGET_TYPE_DIALER,
			id: 'minutes-out-dialog',
			lowText: "You're low on minutes",
			outText: "You're out of minutes",
			wavvHandlesBilling,
			additionalConfig,
		});
	},
	messages: (remaining, wavvHandlesBilling, additionalConfig = {}) => {
		return popLimitDialog({
			remaining: remaining || 0,
			type: WIDGET_TYPE_SMS,
			id: 'messages-out-dialog',
			lowText: "You're low on messages",
			outText: "You're out of messages",
			wavvHandlesBilling,
			additionalConfig,
		});
	},
	videos: (remaining, wavvHandlesBilling, additionalConfig = {}) => {
		return popLimitDialog({
			remaining: remaining || 0,
			type: WIDGET_TYPE_VIDEO,
			id: 'videos-out-dialog',
			lowText: "You're low on videos",
			outText: "You're out of videos",
			wavvHandlesBilling,
			additionalConfig,
		});
	},
};

export const TWILIO_CUSTOMER_PROFILE_A2P_SOLE_PROP_POLICY_SID = 'RN806dd6cd175f314e1f96a9727ee271f4'; // this policy only works with a2p sole prop brands
export const TWILIO_CUSTOMER_PROFILE_OTHER_POLICY_SID = 'RNdfbf3fae0e1107f8aded0e7cead80bf5'; // this policy works with all brands besides a2p sole proprietors

// statuses for trust product
export const TRUST_PRODUCT_STATUS_FAILED = 'FAILED';
export const TRUST_PRODUCT_STATUS_PENDING = 'PENDING';
export const TRUST_PRODUCT_STATUS_APPROVED = 'APPROVED';
export const TRUST_PRODUCT_STATUS_NONE = 'NONE';

export const BUSINESS_TYPE_SOLE_PROPRIETOR = 'Sole Proprietorship';

export const a2pBrandCombinedStatus = (a2pRegistration) => {
	let combinedStatus;
	if (a2pRegistration) {
		if (
			[TRUST_PRODUCT_STATUS_APPROVED, TRUST_PRODUCT_STATUS_PENDING, TRUST_PRODUCT_STATUS_FAILED].includes(a2pRegistration.campaignStatus)
		) {
			combinedStatus = a2pRegistration.campaignStatus;
		} else if ([TRUST_PRODUCT_STATUS_APPROVED, TRUST_PRODUCT_STATUS_PENDING].includes(a2pRegistration.brandStatus)) {
			combinedStatus = TRUST_PRODUCT_STATUS_PENDING;
		} else if (a2pRegistration.brandStatus === TRUST_PRODUCT_STATUS_FAILED) {
			combinedStatus = TRUST_PRODUCT_STATUS_FAILED;
		} else {
			combinedStatus = TRUST_PRODUCT_STATUS_NONE;
		}
	} else {
		combinedStatus = TRUST_PRODUCT_STATUS_NONE;
	}
	const reasons = [];
	let failureCode;
	if (combinedStatus === TRUST_PRODUCT_STATUS_FAILED && a2pRegistration) {
		if (a2pRegistration.campaignStatus === TRUST_PRODUCT_STATUS_FAILED && a2pRegistration.campaignFailureCode) {
			failureCode = a2pRegistration.campaignFailureCode;
			reasons.push(a2pCampaignFailureCodeReason(failureCode));
		}
		if (a2pRegistration.brandStatus === TRUST_PRODUCT_STATUS_FAILED && a2pRegistration.brandFailureReason)
			reasons.push(a2pRegistration.brandFailureReason);
		else if (a2pRegistration.trustProductStatus === TRUST_PRODUCT_STATUS_FAILED && a2pRegistration.trustProductFailureReason)
			reasons.push(a2pRegistration.trustProductFailureReason);
	}
	const failureReason = reasons.length ? reasons.join(', ') : null;
	return { status: combinedStatus, failureReason, failureCode };
};

export const a2pCampaignFailureCodeReason = (failureCode) =>
	({
		// 30880: '', // same as unknown
		30881: 'Your application for A2P 10DLC SMS registration has been rejected because of an invalid brand support email.',
		30882:
			'Your application for A2P 10DLC SMS registration has been rejected due to issues with your Terms & Conditions, specifically identifying your business as affiliate marketing.',
		30883: 'Your application for A2P 10DLC SMS registration has been rejected due to content violation.',
		30884:
			'Your application for A2P 10DLC SMS registration has been rejected because it was found to be a a known Spam or Phishing campaign.',
		30885: 'Your application for A2P 10DLC SMS registration has been rejected because it considered High Risk.',
		30886: 'Your application for A2P 10DLC SMS registration has been rejected due to invalid campaign description.',
		30887: 'Your application for A2P 10DLC SMS registration has been rejected because of the provided opt-out information.',
		30888: 'Your application for A2P 10DLC SMS registration has been rejected due to Age Gate issues.',
		30889: 'Your application for A2P 10DLC SMS registration has been rejected because of an embedded phone number selection.',
		30890: 'Your application for A2P 10DLC SMS registration has been rejected because of issues with the provided subscriber help.',
		30891: 'Your application for A2P 10DLC SMS registration has been rejected because the provided website is unverifiable.',
		30892: 'Your application for A2P 10DLC SMS registration has been rejected due to using a URL shortener in your sample message.',
		30893:
			'Your application for A2P 10DLC SMS registration has been rejected due to inconsistencies between the sample message and the intended use-case of the campaign.',
		30895:
			'Your application for A2P 10DLC SMS registration has been rejected because your campaign is associated with direct lending or loan arrangement.',
		30896:
			'Your application for A2P 10DLC SMS registration has been rejected because of the provided opt-in information. Opt-In flow should describe the process in which the customer gives consent before receiving any messages.',
		30897: 'Your application for A2P 10DLC SMS registration has been rejected due to disallowed content.',
		30898: 'Your application for A2P 10DLC SMS registration has been rejected because of repeated use of the same EIN for multiple brands.',
		30901: 'Your application for A2P 10DLC SMS registration has been rejected because the campaign registration request timed out.',
		30903:
			'Your application for A2P 10DLC SMS registration has been rejected due to incorrect registration and failure to meet the small business Sole Proprietor criteria set by TCR and mobile carriers.',
		30907:
			'Your application for A2P 10DLC SMS registration has been rejected because of an issue validating the website URL provided for the campaign.',
		30908: 'Your application for A2P 10DLC SMS registration has been rejected because a compliant privacy policy could not be verified.',
		30909:
			'Your application for A2P 10DLC SMS registration has been rejected due to issues verifying the Call to Action for your opt-in flow provided for the campaign.',
		30923:
			'Your application for A2P 10DLC SMS registration has been rejected because message consent cannot be required as a condition of using your service.',
		30925:
			'Your application for A2P 10DLC SMS registration has been rejected because the opt-in must be unchecked by default and require active consent.',
		30927:
			'Your application for A2P 10DLC SMS registration has been rejected because the opt-in evidence identifies a different company than the registered brand.',
		30951:
			'Your application for A2P 10DLC SMS registration has been rejected because third-party lead generation or multi-level marketing (MLM) content was detected.',
	})[failureCode] ?? 'Your application for A2P 10DLC SMS registration has been rejected for an unknown reason.';

export const refreshDispositionConfig = ({ callboardId, callStageId } = {}) => {
	if (callboardId && !callStageId) throw new Error('callStageId is required when callboardId is provided');
	return {
		type: REFRESH_DISPOSITION_CONFIG,
		server: true,
		payload: { callboardId, callStageId },
	};
};

export const setDispositionConfig = (payload) => ({
	type: SET_DISPOSITION_CONFIG,
	payload,
	client: true,
});

// Populates the client-side stage->callscript map for a single stage (mirrors setDispositionConfig).
export const setCallscriptConfig = (payload) => ({
	type: SET_CALLSCRIPT_CONFIG,
	payload,
	client: true,
});

// Asks the dialer server to resolve a stage's call script id, e.g. on a cache miss for an inbound call.
export const refreshCallscriptConfig = ({ callboardId, callStageId } = {}) => ({
	type: REFRESH_CALLSCRIPT_CONFIG,
	server: true,
	payload: { callboardId, callStageId },
});

export const saveDisposition = (payload) => ({
	type: SAVE_DISPOSITION,
	payload,
	server: true,
});

export const userHasWidget = (permissions, widget) => permissions.enabledWidgets.includes(widget);

export const LION_DESK_VENDOR_ID = 'n2xvwg9dd4a45wik6fbp7oe2sse4dyk3';

export const MARK_ONBOARDING_STEP_COMPLETE = 'MARK_ONBOARDING_STEP_COMPLETE';
export const MARK_WIDGET_ONBOARDING_COMPLETE = 'MARK_WIDGET_ONBOARDING_COMPLETE';

export const markOnboardingStepCompleteAction = (productType, stepName) => ({
	type: MARK_ONBOARDING_STEP_COMPLETE,
	payload: {
		productType,
		stepName,
	},
});

export const markOnboardingCompleteAction = (productType) => ({
	type: MARK_WIDGET_ONBOARDING_COMPLETE,
	payload: {
		productType,
	},
});

export const SKIP_WIDGET_ONBOARDING_STEP = 'SKIP_WIDGET_ONBOARDING_STEP';

export const skipWidgetOnboardingStepAction = (
	productType,
	stepName,
	options = { autoSkipDependencies: true, permaSkip: false, neverPermaSkip: false }
) => ({
	type: SKIP_WIDGET_ONBOARDING_STEP,
	payload: {
		productType,
		stepName,
		options,
	},
});

export const SETUP_JOURNEY_PROGRESS_UPDATED = 'SETUP_JOURNEY_PROGRESS_UPDATED';

export const setupJourneyProgressUpdatedAction = (userId, progress) => ({
	type: SETUP_JOURNEY_PROGRESS_UPDATED,
	payload: {
		userId,
		...progress,
	},
});

/**
 * The agency admin journey reached a Review exit. Its own wire-level name rather than a reuse of the
 * setup journey's: the two are different products, and only this one is a prefix to the other.
 *
 * Raised by the frame and handled by storm, which records it on the HOST page's localStorage
 * (`setupJourneyGate.js`) — the frame and the host are different origins, so the frame cannot write the
 * copy that storm's entry resolver reads.
 */
export const AGENCY_JOURNEY_FINISHED = 'AGENCY_JOURNEY_FINISHED';

export const agencyJourneyFinishedAction = (userId) => ({
	type: AGENCY_JOURNEY_FINISHED,
	payload: { userId },
});

/**
 * Verifies a business profile is compatible with Twilio A2P registration
 */
export const businessProfileIsCompatibleWithA2P = (profile) => {
	const needsSolePropPolicy = profile?.businessType === 'Sole Proprietorship' && !profile?.businessRegistrationNumber;
	const expectedPolicySid = needsSolePropPolicy
		? TWILIO_CUSTOMER_PROFILE_A2P_SOLE_PROP_POLICY_SID
		: TWILIO_CUSTOMER_PROFILE_OTHER_POLICY_SID;
	return profile?.twilioPolicySid === expectedPolicySid;
};

/**
 * Verifies a business profile is compatible with Twilio Stir/Shaken registration
 */
export const businessProfileIsCompatibleWithStirShaken = (profile) => profile?.twilioPolicySid === TWILIO_CUSTOMER_PROFILE_OTHER_POLICY_SID;

export const SPAM_MONITORING_STATUS_REGISTERING = 'REGISTERING';
export const SPAM_MONITORING_STATUS_PROTECTED = 'PROTECTED';
export const SPAM_MONITORING_STATUS_CANCELLING = 'CANCELLING';
export const SPAM_MONITORING_STATUS_REMEDIATING = 'REMEDIATING';
export const SPAM_MONITORING_STATUS_REMEDIATION_FAILED = 'REMEDIATION_FAILED';
export const SPAM_MONITORING_STATUS_CUSTOMER_INPUT_NEEDED = 'CUSTOMER_INPUT_NEEDED';
export const SPAM_MONITORING_STATUS_UNPROTECTED = 'UNPROTECTED';

export const NUMBER_STATUS_ACTIVE = 'ACTIVE';
export const NUMBER_STATUS_DELETED = 'DELETED';
export const NUMBER_STATUS_CANCELLING = 'CANCELLING';

export const NUMBER_CALL_FORWARDING_MOBILE = 'MOBILE';
export const NUMBER_CALL_FORWARDING_NUMBER = 'NUMBER';
export const NUMBER_CALL_FORWARDING_ROUTEBACK = 'ROUTEBACK';
export const NUMBER_CALL_FORWARDING_VOICEMAIL = 'VOICEMAIL';
export const NUMBER_CALL_FORWARDING_TEAM_MEMBER = 'TEAM_MEMBER';
export const NUMBER_CALL_FORWARDING_TEAM_MEMBER_GROUP = 'TEAM_MEMBER_GROUP';
export const NUMBER_CALL_FORWARDING_WEB = 'WEB';

export const PURCHASE_ACTION_BUY = 'buy';
export const PURCHASE_ACTION_SUBSCRIBE = 'subscribe';
export const PURCHASE_ACTION_DOWNGRADE = 'downgrade';
export const PURCHASE_ACTION_UPGRADE = 'upgrade';
export const PURCHASE_ACTION_INCREASE_QTY = 'increase_qty';
export const PURCHASE_ACTION_DECREASE_QTY = 'decrease_qty';
export const PURCHASE_ACTION_MIGRATE_OWNER_CREATE_TEAM = 'migrate_owner_create_team';

export const KEYBOARD_KEY_ARROW_RIGHT = 'ArrowRight';
export const KEYBOARD_KEY_ARROW_LEFT = 'ArrowLeft';
export const KEYBOARD_KEY_SPACE_BAR = ' ';

export const NUISANCE_PROTECTION_INTERVAL_DAYS = 'Days';
export const NUISANCE_PROTECTION_INTERVAL_HOURS = 'Hours';

export const FEATURE_FLAG_INBOUND = 'inbound';

export const MEMBER_ROLE = 'MEMBER';
export const MANAGER_ROLE = 'MANAGER';
export const ADMIN_ROLE = 'ADMIN';
export const COACH_ROLE = 'COACH';
export const OWNER_ROLE = 'OWNER';
export const OWNER_MANAGER_ROLE = 'OWNER_MANAGER'; // Virtual role for UI display only (owner with paid role)

export const TEAM_WRITE_PERMISSIONS = [OWNER_ROLE, MANAGER_ROLE, ADMIN_ROLE];
/** Whether a user may change team-owned things: anyone without a team, else only the team's write roles. */
export const userHasWritePermissions = (teamInfo) => !teamInfo || TEAM_WRITE_PERMISSIONS.includes(teamInfo.role);
export const TEAM_USE_WALLET_PERMISSIONS = [OWNER_ROLE, MANAGER_ROLE, ADMIN_ROLE];
export const TEAM_DIALER_SEAT_ROLES = [MANAGER_ROLE, MEMBER_ROLE, OWNER_MANAGER_ROLE];
export const TEAM_MONITOR_ROLES = [OWNER_ROLE, MANAGER_ROLE, ADMIN_ROLE, COACH_ROLE];

// Role option metadata for dropdowns
export const ROLE_OPTION_DATA = {
	[MANAGER_ROLE]: {
		value: 'Manager',
		header: 'Manager',
		description: 'Full access + dialer seat (paid)',
		subDescription: 'Can place calls and manage team settings.',
	},
	[MEMBER_ROLE]: {
		value: 'Agent',
		header: 'Agent',
		description: 'Dialer access only (paid)',
		subDescription: "Can place calls, but can't manage team settings.",
	},
	[ADMIN_ROLE]: {
		value: 'Admin',
		header: 'Admin',
		description: 'Manage the team without calling (free)',
		subDescription: "Can manage users and settings, but can't place calls.",
	},
	[COACH_ROLE]: {
		value: 'View Only',
		header: 'View Only',
		description: 'View-only access (free)',
		subDescription: 'Can view activity and reports.',
	},
	[OWNER_ROLE]: {
		value: 'Owner',
		header: 'Owner',
		description: 'Owner access only (free)',
		subDescription: "Can manage subscription, but can't place calls.",
	},
	[OWNER_MANAGER_ROLE]: {
		value: 'Owner + Manager',
		header: 'Owner + Manager',
		description: 'Owner and manager access (paid)',
		subDescription: 'Can manage subscription and make calls.',
	},
};

export const WHISPER_LEGACY_MODE = 'WHISPER_LEGACY_MODE';
// Dialer server -> client: someone dialed in with the whisper PIN (connected) or hung up (not)
export const WHISPER_LEGACY_GUEST = 'WHISPER_LEGACY_GUEST';

// Callboards
export const CALLBOARD_SESSION_PHONE_UPDATED = 'CALLBOARD_SESSION_PHONE_UPDATED'; // SessionPhone updated for call board
export const SET_CAMPAIGN_CALLBOARD = 'SET_CAMPAIGN_CALLBOARD';

// Callboard filter constants
export const CALLBOARDS_FILTER_ASSIGNMENT_ALL = 'ALL';
export const CALLBOARDS_FILTER_ASSIGNMENT_ASSIGNED_AND_UNASSIGNED = 'ASSIGNED_AND_UNASSIGNED_USER';
export const CALLBOARDS_FILTER_ASSIGNMENT_ASSIGNED_TO_USER = 'ASSIGNED_TO_USER';
export const CALLBOARDS_FILTER_SORT_BY_NEWEST = 'NEWEST';
export const CALLBOARDS_FILTER_SORT_BY_CALL_COUNT = 'CALL_COUNT';
export const CALLBOARDS_FILTER_STATUS_ALL = 'ALL';
export const CALLBOARDS_FILTER_STATUS_HOT = 'HOT';
export const CALLBOARDS_FILTER_STATUS_SCHEDULED = 'SCHEDULED';
export const CALLBOARDS_FILTER_STATUS_OVERDUE = 'OVERDUE';
export const CALLBOARDS_FILTER_STATUS_SNOOZED = 'SNOOZED';

// Priority Stack Management
export const CREATE_CALLBOARD_PRIORITY_STACK = 'CREATE_CALLBOARD_PRIORITY_STACK';
export const UPDATE_CALLBOARD_PRIORITY_STACK = 'UPDATE_CALLBOARD_PRIORITY_STACK';
export const DELETE_CALLBOARD_PRIORITY_STACK = 'DELETE_CALLBOARD_PRIORITY_STACK';
export const REORDER_CALLBOARD_PRIORITY_STACKS = 'REORDER_CALLBOARD_PRIORITY_STACKS';

// temporary system names for priority stacks while we arent using criteria table
export const CALLBOARD_PRIORITY_STACK_SYSTEM_NAME_HOT = 'hot';
export const CALLBOARD_PRIORITY_STACK_SYSTEM_NAME_SCHEDULED_NOW = 'scheduled-now';
export const CALLBOARD_PRIORITY_STACK_SYSTEM_NAME_SCHEDULED = 'scheduled';
export const CALLBOARD_PRIORITY_STACK_SYSTEM_NAME_OVERDUE = 'overdue';
export const CALLBOARD_PRIORITY_STACK_SYSTEM_NAME_SNOOZED = 'snoozed';

export const INTEGRATION_TYPE_GHL = 'GHL';

export const SET_CALL_HISTORY_DOWNLOAD_STATUS = 'SET_CALL_HISTORY_DOWNLOAD_STATUS';

export const WAVV_NOTIFICATION_REDIS_ACTION = 'REDIS_WAVV_NOTIFICATION';
export const WAVV_NOTIFICATION_ACTION = 'WAVV_NOTIFICATION';
export const FETCH_WAVV_NOTIFICATIONS = 'FETCH_WAVV_NOTIFICATIONS';
export const FETCH_WAVV_NOTIFICATIONS_RESPONSE = 'FETCH_WAVV_NOTIFICATIONS_RESPONSE'; // TODO: RENAME THESE
export const MARK_WAVV_NOTIFICATIONS_AS_READ = 'MARK_WAVV_NOTIFICATIONS_AS_READ';
export const WAVV_NOTIFICATION_SET_HEIGHT = 'WAVV_NOTIFICATION_SET_HEIGHT';
export const WAVV_NOTIFICATION_SHOW_TIME_SECONDS = 5;

export const wavvNotificationAction = (notification) => ({
	type: WAVV_NOTIFICATION_ACTION,
	payload: notification,
	client: true,
});

export const wavvNotificationSetHeightAction = (height) => ({
	type: WAVV_NOTIFICATION_SET_HEIGHT,
	payload: height,
});

export const fetchWavvNotificationsAction = (page = 1) => ({
	type: FETCH_WAVV_NOTIFICATIONS,
	server: {
		method: 'get',
		url: `/api/v1/notifications?page=${page}`,
		type: FETCH_WAVV_NOTIFICATIONS_RESPONSE,
	},
});

export const markWavvNotificationsAsReadAction = () => ({
	type: MARK_WAVV_NOTIFICATIONS_AS_READ,
	server: {
		method: 'put',
		url: '/api/v1/notifications/mark-read',
	},
});

// Generic, transient OS notification dispatched to a user. Not a WAVV_NOTIFICATION (no toast,
// history, or DB). Payload: { tag, title, body, onClickAction?, sound? }
export const OS_NOTIFICATION = 'OS_NOTIFICATION';

export const osNotificationAction = (payload) => ({
	type: OS_NOTIFICATION,
	payload,
	client: true,
});

export const isGHLVendor = (vendorId, isTestLayer = false) =>
	[WAVV_GHL_VENDOR_ID, MTK_VENDOR_ID, ...(isTestLayer ? [STORM_VENDOR_ID, TESTING_VENDOR_ID] : [])].includes(vendorId);

// "Modern" vendors get full self-service onboarding parity with GHL: the new welcome page, plan
// purchasing, activation-code redemption, and teams. Superset of the GHL vendors plus partner
// vendors (Evolve, Bamboo, …). Mirror of isModernVendor in back-end/src/constants.ts — keep in
// sync, along with the add-vendor skill.
export const MODERN_VENDOR_IDS = [WAVV_GHL_VENDOR_ID, MTK_VENDOR_ID, EVOLVE_VENDOR_ID, BAMBOO_VENDOR_ID];

export const isModernVendor = (vendorId, isTestLayer = false) =>
	isPlatformVendor(vendorId) || [...MODERN_VENDOR_IDS, ...(isTestLayer ? [STORM_VENDOR_ID, TESTING_VENDOR_ID] : [])].includes(vendorId);

// Vendors whose users may redeem activation codes (webcart purchase codes + team invites) from the onboarding
// screen: modern vendors plus HubSpot, whose users live under WAVV_VENDOR_ID. Mirror of canRedeemActivationCode in
// back-end/src/constants.ts — keep in sync.
export const canRedeemActivationCode = (vendorId, isTestLayer = false) =>
	isModernVendor(vendorId, isTestLayer) || vendorId === WAVV_VENDOR_ID;

// vendorUserId is the one slot naming the CRM seat an account holds, so the flows that take a seat
// away overwrite it with a sentinel. These three all leave a LIVE account behind — it keeps its
// user_auth, billing, teams and history, and only lost the seat — so each one needs the LINK flow,
// not the transfer one:
//
//   unlinked:<userId>            created before any CRM (internalCreateAccount), and written again
//                                when a transfer releases the previous holder
//   signout-<old>-<uuid>         the user detached their own seat (POST /api/v1/auth/signout)
//   TRANSFERRED-<iso>-<old>      the legacy login transfer stranding the seat's previous holder
//
// `merged:<conflictId>` is deliberately absent: that row is a soft-deleted POINTER at the row which
// took it over, not an account waiting to be linked — resolveLinkedUser follows it instead.
export const UNLINKED_VENDOR_USER_ID_PREFIXES = ['unlinked:', 'signout-', 'TRANSFERRED-'];

// Read the prefix alone, never the vendorId. `signout-` and `TRANSFERRED-` rewrite only
// vendorUserId, so those rows keep the CRM's vendorId and any vendor comparison here reads a
// signed-out GHL user as still linked. `unlinked:` is only ever written alongside
// `vendorId: WAVV_VENDOR_ID`, so dropping that half costs nothing and removes the failure mode
// wavv-auth's crmUserMatch already warns about: one wrong vendor constant silently reclassifying
// every unlinked account as somebody else's.
/**
 * @param {{ vendorId?: string | null, vendorUserId?: string | null }} [user] `vendorId` is accepted
 *   so callers can pass a users row (or a JWT's claims) straight through, and deliberately ignored.
 * @returns {boolean} true when the account holds no CRM seat.
 */
export const isUnlinkedUser = ({ vendorUserId } = {}) =>
	UNLINKED_VENDOR_USER_ID_PREFIXES.some((prefix) => !!vendorUserId?.startsWith(prefix));

export const CRM_TYPE = Object.freeze({
	GHL: 'GHL',
	HUBSPOT: 'HUBSPOT',
	OTHER: 'OTHER',
});

/**
 * @typedef {Object} WavvContactProperty
 * @property {string} key WAVV property key; the only name used past the CRM adapter (vendor_properties, stack criteria, UI)
 * @property {string} label
 * @property {'text' | 'number' | 'datetime' | 'single_select'} type a `FIELD_TYPES` value (common-schemas fieldCatalog.ts)
 * @property {readonly string[]} operators the `MATCH_OPERATORS` this property accepts in stack criteria
 * @property {Readonly<Partial<Record<'GHL' | 'HUBSPOT', string>>>} crmFields the CRM's internal field name, per CRM that maps it
 */

/**
 * CRM contact properties WAVV syncs into `mv2_contacts.vendor_properties` for stack priority criteria.
 * Adapters normalize values at ingest: numbers as JSON numbers, datetimes as epoch ms, selects as the
 * CRM's internal value, text trimmed. A CRM that isn't listed in `crmFields` doesn't sync that property.
 * Mirrored as typed constants in common-schemas `callboards/contactProperties.ts` (kept in sync by a test).
 * @type {readonly WavvContactProperty[]}
 */
export const WAVV_CONTACT_PROPERTIES = Object.freeze(
	[
		{
			key: 'lifecycle_stage',
			label: 'Lifecycle Stage',
			type: 'single_select',
			operators: ['any_of'],
			crmFields: { HUBSPOT: 'lifecyclestage' },
		},
		{
			key: 'lead_status',
			label: 'Lead Status',
			type: 'single_select',
			operators: ['any_of'],
			crmFields: { HUBSPOT: 'hs_lead_status' },
		},
		// Free text in HubSpot (no options), so matched case-insensitively.
		{
			key: 'industry',
			label: 'Industry',
			type: 'text',
			operators: ['any_of'],
			crmFields: { HUBSPOT: 'industry' },
		},
		// A text property in HubSpot, parsed to a number at ingest.
		{
			key: 'annual_revenue',
			label: 'Annual Revenue',
			type: 'number',
			operators: ['gt', 'lt'],
			crmFields: { HUBSPOT: 'annualrevenue' },
		},
		// HubSpot's read-only activity rollup; `last_activity_date` isn't a HubSpot property.
		{
			key: 'last_activity_date',
			label: 'Last Activity Date',
			type: 'datetime',
			operators: ['in_last'],
			crmFields: { HUBSPOT: 'notes_last_updated' },
		},
	].map((property) =>
		Object.freeze({ ...property, operators: Object.freeze(property.operators), crmFields: Object.freeze(property.crmFields) })
	)
);

/** Stack criteria item type matching a contact's `vendor_properties`. Mirrors common-schemas `criteriaSchemas.ts`. */
export const CALLBOARD_CRITERIA_CONTACT_PROPERTY = 'CONTACT_PROPERTY';

/** Stack criteria bounds. Mirrors `STACK_CRITERIA_LIMITS` in common-schemas `criteriaSchemas.ts`. */
export const STACK_CRITERIA_LIMITS = Object.freeze({
	MAX_ITEMS: 10,
	MAX_VALUES: 100,
	MAX_VALUE_LENGTH: 255,
	MAX_DAYS: 3650,
});

/**
 * The WAVV contact properties a CRM maps, e.g. to build that CRM's fetch list or a property picker.
 * @param {'GHL' | 'HUBSPOT'} crmType a `CRM_TYPE` value
 * @returns {WavvContactProperty[]}
 */
export const getWavvContactPropertiesForCrm = (crmType) => WAVV_CONTACT_PROPERTIES.filter((property) => !!property.crmFields[crmType]);

/**
 * Resolve a CRM field name to the WAVV contact property it maps to.
 * @param {'GHL' | 'HUBSPOT'} crmType a `CRM_TYPE` value
 * @param {string} crmField the CRM's internal field name
 * @returns {WavvContactProperty | undefined}
 */
export const getWavvContactPropertyByCrmField = (crmType, crmField) =>
	WAVV_CONTACT_PROPERTIES.find((property) => property.crmFields[crmType] === crmField);

// Coarse classifier consumed by callback payloads (e.g. LINES_CHANGED) that need to tell chrome
// which CRM-specific navigation to run. GHL is identified strictly by vendorId. HubSpot has no
// dedicated vendor — users live under WAVV_VENDOR_ID and are only HubSpot once linked. Anything
// else is CRM_TYPE.OTHER and callers should omit crmType entirely.
/**
 * @param {{ vendorId?: string | null, vendorUserId?: string | null, isTestLayer?: boolean }} [opts]
 * @returns {(typeof CRM_TYPE)[keyof typeof CRM_TYPE]} one of CRM_TYPE — narrower than `string` so TS
 *   consumers that take a CRM_TYPE-typed param accept the result without a cast.
 */
export const getCrmType = ({ vendorId, vendorUserId, isTestLayer = false } = {}) => {
	if (isGHLVendor(vendorId, isTestLayer)) return CRM_TYPE.GHL;
	if (vendorId === WAVV_VENDOR_ID && !isUnlinkedUser({ vendorId, vendorUserId })) return CRM_TYPE.HUBSPOT;
	return CRM_TYPE.OTHER;
};

/**
 * The `authVia` claim a session carries when wavv-auth signed the person in. Core puts it on the vendor
 * JWT it mints for wavv-auth (`mintVendorJwt`) and copies it into the WAVV session JWT at `/api/v1/auth`,
 * so the server sees the same fact for the life of the session, reauths included. One leg of
 * `isSetupJourneyAvailable`, and on its own what lets the server skip the TOS step: wavv-auth collected
 * the Terms before it minted the token. A legacy vendor token has no such claim.
 */
export const AUTH_VIA_WAVV_AUTH = 'wavv-auth';

/**
 * Whether this session may take the setup journey: the account holds the `setupJourney` feature flag, which
 * `getUserFeatureFlags` grants when the wavv-auth door is open on a new account, or when a journey purchase
 * stamped the billing owner. The stamp keeps the journey
 * after the gate turns off and does not grant `wavvAuthIdentity`. The journey is that account's wherever it
 * signs in next, including a legacy vendor token on a host that never offers the door.
 * Whether an available journey actually OPENS is then the team's state (`teamConfigured`, the role, personal
 * setup), not availability: an established team's artifacts are already there, so it is met once and left through
 * Review rather than walked.
 *
 * The chrome extension takes it too: the side panel hands a new account to the journey in core's app popout
 * (`SetupJourneyLauncher`), so the same account reads the same answer on a CRM page and in the extension.
 *
 * Decided on the server: `getUserData` ships the answer as `session.setupJourneyAvailable` and computes the
 * onboarding step list from the same answer, so the client never renders a journey the server did not gate, or
 * the reverse. Clients read that boolean rather than calling this. The onboarding-state route derives it again
 * from the flag supplied by the client (`?setupJourney=true`), which holds the flag list auth shipped.
 *
 * @param {{ setupJourney?: boolean | null }} [opts] whether the account's feature flags include FEATURE_SETUP_JOURNEY
 * @returns {boolean} True when this session may get the setup journey
 */
export const isSetupJourneyAvailable = ({ setupJourney } = {}) => !!setupJourney;

/**
 * A CRM role, as the session carries it: one opaque token per CRM, whose shape is that CRM's own business
 * (`readCrmRole`). GoHighLevel builds it from its user record's `roles.type` and `roles.role` joined —
 * `agency:admin`, `agency:user`, `account:admin`, `account:user` — because a level and a role together are
 * what GHL means by who somebody is, and splitting them into two claims gave the first one a name
 * (`crmType`) that collided with `getCrmType`'s answer about WHICH CRM.
 *
 * Compared against per-CRM constants like the one below, never parsed: a reader that split on `:` would be
 * assuming every CRM shares GoHighLevel's shape, which is the assumption this format exists to avoid.
 */
export const GHL_CRM_ROLE_AGENCY_ADMIN = 'agency:admin';
/** A GHL location (sub-account) admin: `roles.type` 'account' joined to `roles.role` 'admin', as `crmRoleOf` builds it. */
export const GHL_CRM_ROLE_ACCOUNT_ADMIN = 'account:admin';

/**
 * Whether this session may be given the agency admin journey: the setup journey's own answer, and one
 * more fact.
 *
 * Keyed exactly as `isSetupJourneyAvailable` — this journey is a PRECURSOR to that one, not a separate
 * product with a rollout of its own, so whatever opens the setup journey for a session opens this in
 * front of it. Which also makes Review's Get Subscription hand-off valid by construction: a session this
 * is available to is necessarily one the setup journey is available to. It takes that answer rather than
 * re-deriving it, so the two cannot drift.
 *
 * The one extra fact is the CRM's own: `session.crmRole`, put there by `/api/v1/auth` (`readCrmRole`). Only
 * a GoHighLevel agency admin qualifies — and that IS the narrowing, since nobody else is ever asked.
 * Unknown fails CLOSED: a session with no resolvable role — a CRM with no level above the account, an
 * agency whose token is dead, a GHL user whose row has never synced — is not an agency admin. A missed pop
 * is invisible and comes back on the next load; a wrong one puts an agency setup modal in front of
 * somebody's work.
 *
 * Availability is not the whole rule, and this is the half the server holds. Whether an available journey is
 * still OWED is storm's: it is shipped `session.agencyAdminJourneyAvailable` and answers the journey one
 * branch ahead of the setup journey in `resolveSetupProductEntry`, which is where the rest is spelled out.
 *
 * Never for a chrome extension session, unlike the setup journey: this one sets the agency up on the GoHighLevel
 * page, with WAVV Admin in front of it, and the extension has no such page to run it over. `isChrome` is the
 * session JWT's claim, so the same admin gets it on the agency's page and not in the extension's popout.
 *
 * @param {{ setupJourneyAvailable?: boolean | null, crmRole?: string | null, isChrome?: boolean | null }} [opts]
 *   `setupJourneyAvailable` is `isSetupJourneyAvailable`'s answer for this same session, `isChrome` whether the
 *   session is the chrome extension's
 * @returns {boolean} True when this session may get the agency admin journey
 */
export const isAgencyAdminJourneyAvailable = ({ setupJourneyAvailable, crmRole, isChrome } = {}) =>
	!!setupJourneyAvailable && crmRole === GHL_CRM_ROLE_AGENCY_ADMIN && !isChrome;

// campaignSkipPhonesCallboard moved to back-end/src/servers/dialer/store/actions/callboards.ts

// Audio Actions
// Audio device ids are only meaningful in the frame that enumerated them (Chrome hashes them per
// storage partition), so the socket frame — the one that actually opens the mic for a call — owns
// enumeration, selection and persistence. These three actions are the wire between it and the UI;
// the socket middleware hands them straight to that frame rather than to the server.
export const updateAudioDeviceSelection = ({ inputDeviceId, outputDeviceId }) => ({
	type: UPDATE_AUDIO_DEVICE_SELECTION,
	payload: {
		inputDeviceId,
		outputDeviceId,
	},
});

// Asks the socket frame to enumerate and answer with AUDIO_DEVICES_UPDATED.
export const requestAudioDevices = () => ({
	type: AUDIO_DEVICES_REQUESTED,
});

// Sent up from the socket frame: the device lists as that frame sees them, plus the stored
// preference and the device the live call is actually using.
export const audioDevicesUpdated = ({
	inputDevices,
	outputDevices,
	selectedInputDeviceId,
	selectedOutputDeviceId,
	activeInputDeviceId,
}) => ({
	type: AUDIO_DEVICES_UPDATED,
	payload: {
		inputDevices,
		outputDevices,
		selectedInputDeviceId,
		selectedOutputDeviceId,
		activeInputDeviceId,
	},
});

/**
 * One action for when a group of scheduled calls become ready
 * Each dialer server will handle emitting into the users store in separate actions
 * @param {Object} payload - The payload for the action
 * @param {Record<string, Array<SessionPhone>>} payload.userIdToSessionPhones - The session phones that are ready to be called
 */
export const scheduledCallsBecameReadyAction = ({ userIdToSessionPhones }) => ({
	type: SCHEDULED_CALLS_BECAME_READY,
	payload: { userIdToSessionPhones },
});

export const CONTACTS_CALLBOARDS_IMPORT_TYPE_BULK_SELECT = 'BULK_SELECT';

export const AREA_CODES = {
	100: {
		code: '100',
		offset: -5,
		state: 'XX',
		country: 'US',
	},
	101: {
		code: '101',
		offset: -5,
		state: 'XX',
		country: 'US',
	},
	201: {
		code: '201',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 40.867801,
		lng: -74.43778,
	},
	202: {
		code: '202',
		offset: -5,
		state: 'DC',
		country: 'US',
		lat: 38.900001,
		lng: -77.033322,
	},
	203: {
		code: '203',
		offset: -5,
		state: 'CT',
		country: 'US',
		lat: 41.349849,
		lng: -72.899716,
	},
	204: {
		code: '204',
		offset: -6,
		state: 'MB',
		country: 'CA',
		lat: 54.872818,
		lng: -95.49675,
	},
	205: {
		code: '205',
		offset: -6,
		state: 'AL',
		country: 'US',
		lat: 33.565965,
		lng: -87.300088,
	},
	206: {
		code: '206',
		offset: -8,
		state: 'WA',
		country: 'US',
		lat: 47.619847,
		lng: -122.341433,
	},
	207: {
		code: '207',
		offset: -5,
		state: 'ME',
		country: 'US',
		lat: 43.679688,
		lng: -70.216042,
	},
	208: {
		code: '208',
		offset: -7,
		state: 'ID',
		country: 'US',
		lat: 45.607644,
		lng: -114.138302,
	},
	209: {
		code: '209',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.963188,
		lng: -121.301891,
	},
	210: {
		code: '210',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 29.424909,
		lng: -98.494062,
	},
	212: {
		code: '212',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.750638,
		lng: -73.984165,
	},
	213: {
		code: '213',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.055403,
		lng: -118.241455,
	},
	214: {
		code: '214',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 32.778994,
		lng: -96.808562,
	},
	215: {
		code: '215',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 39.989994,
		lng: -75.153952,
	},
	216: {
		code: '216',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 41.495041,
		lng: -81.705868,
	},
	217: {
		code: '217',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 39.764008,
		lng: -89.670795,
	},
	218: {
		code: '218',
		offset: -6,
		state: 'MN',
		country: 'US',
		lat: 46.765038,
		lng: -92.110741,
	},
	219: {
		code: '219',
		offset: -5,
		state: 'IN',
		country: 'US',
		lat: 41.148995,
		lng: -87.241166,
	},
	220: {
		code: '220',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 40.077592,
		lng: -82.418461,
	},
	223: {
		code: '223',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.03986,
		lng: -76.299973,
	},
	224: {
		code: '224',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 42.037619,
		lng: -88.338993,
	},
	225: {
		code: '225',
		offset: -6,
		state: 'LA',
		country: 'US',
		lat: 30.460256,
		lng: -91.107796,
	},
	226: {
		code: '226',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 42.750006,
		lng: -81.816709,
	},
	227: {
		code: '227',
		offset: -5,
		state: 'MD',
		country: 'US',
		lat: 39.17132,
		lng: -77.264317,
	},
	228: {
		code: '228',
		offset: -6,
		state: 'MS',
		country: 'US',
		lat: 30.456461,
		lng: -88.89802,
	},
	229: {
		code: '229',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 31.576598,
		lng: -84.175658,
	},
	231: {
		code: '231',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 44.50024,
		lng: -85.502021,
	},
	234: {
		code: '234',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 41.084431,
		lng: -81.512981,
	},
	235: {
		code: '235',
		offset: -6,
		state: 'MO',
		country: 'US',
		lat: 38.946555,
		lng: -92.3307,
	},
	236: {
		code: '236',
		offset: -8,
		state: 'BC',
		country: 'CA',
		lat: 49.284477,
		lng: -123.125404,
	},
	239: {
		code: '239',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 26.647676,
		lng: -81.995808,
	},
	240: {
		code: '240',
		offset: -5,
		state: 'MD',
		country: 'US',
		lat: 39.17132,
		lng: -77.264317,
	},
	242: {
		code: '242',
		offset: -5,
		state: 'BAHAMAS',
		country: 'BS',
		lat: 24.249997,
		lng: -76.000006,
	},
	246: {
		code: '246',
		offset: -4,
		state: 'BARBADOS',
		country: 'BB',
		lat: 13.170005,
		lng: -59.552507,
	},
	248: {
		code: '248',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 42.597229,
		lng: -83.297203,
	},
	249: {
		code: '249',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 46.586011,
		lng: -81.077534,
	},
	250: {
		code: '250',
		offset: -8,
		state: 'BC',
		country: 'CA',
		lat: 54.000088,
		lng: -123.995583,
	},
	251: {
		code: '251',
		offset: -6,
		state: 'AL',
		country: 'US',
		lat: 30.694538,
		lng: -88.043382,
	},
	252: {
		code: '252',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 35.605863,
		lng: -77.376503,
	},
	253: {
		code: '253',
		offset: -8,
		state: 'WA',
		country: 'US',
		lat: 47.242724,
		lng: -122.454975,
	},
	254: {
		code: '254',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 31.047586,
		lng: -97.708042,
	},
	256: {
		code: '256',
		offset: -6,
		state: 'AL',
		country: 'US',
		lat: 34.132872,
		lng: -85.964863,
	},
	257: {
		code: '257',
		offset: -8,
		state: 'BC',
		country: 'CA',
		lat: 49.284477,
		lng: -123.125404,
	},
	260: {
		code: '260',
		offset: -5,
		state: 'IN',
		country: 'US',
		lat: 41.080904,
		lng: -85.139301,
	},
	262: {
		code: '262',
		offset: -6,
		state: 'WI',
		country: 'US',
		lat: 43.000912,
		lng: -88.250234,
	},
	263: {
		code: '263',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 45.514475,
		lng: -73.560661,
	},
	264: {
		code: '264',
		offset: -4,
		state: 'ANGUILLA',
		country: 'AI',
		lat: 18.2206,
		lng: -63.0686,
	},
	267: {
		code: '267',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 39.949943,
		lng: -75.160591,
	},
	268: {
		code: '268',
		offset: -4,
		state: 'ANTIGUA/BARBUDA',
		country: 'AG',
		lat: 17.049994,
		lng: -61.800005,
	},
	269: {
		code: '269',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 42.249074,
		lng: -85.499146,
	},
	270: {
		code: '270',
		offset: -5,
		state: 'KY',
		country: 'US',
		lat: 36.971802,
		lng: -86.420013,
	},
	272: {
		code: '272',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 41.404297,
		lng: -75.662231,
	},
	274: {
		code: '274',
		offset: -6,
		state: 'WI',
		country: 'US',
		lat: 44.522972,
		lng: -87.99057,
	},
	276: {
		code: '276',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 36.635774,
		lng: -82.173229,
	},
	279: {
		code: '279',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 38.600069,
		lng: -121.499434,
	},
	281: {
		code: '281',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 29.816578,
		lng: -95.463707,
	},
	283: {
		code: '283',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 39.13638,
		lng: -84.540462,
	},
	284: {
		code: '284',
		offset: -4,
		state: 'BRITISH VIRGIN ISLANDS',
		country: 'VG',
		lat: 18.528477,
		lng: -64.507847,
	},
	289: {
		code: '289',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 43.260973,
		lng: -79.935394,
	},
	301: {
		code: '301',
		offset: -5,
		state: 'MD',
		country: 'US',
		lat: 39.17132,
		lng: -77.264317,
	},
	302: {
		code: '302',
		offset: -5,
		state: 'DE',
		country: 'US',
		lat: 39.14216,
		lng: -75.418495,
	},
	303: {
		code: '303',
		offset: -7,
		state: 'CO',
		country: 'US',
		lat: 40.000942,
		lng: -105.000994,
	},
	304: {
		code: '304',
		offset: -5,
		state: 'WV',
		country: 'US',
		lat: 38.448884,
		lng: -80.960548,
	},
	305: {
		code: '305',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 25.779041,
		lng: -80.2164,
	},
	306: {
		code: '306',
		offset: -6,
		state: 'SK',
		country: 'CA',
		lat: 54.872793,
		lng: -105.679775,
	},
	307: {
		code: '307',
		offset: -7,
		state: 'WY',
		country: 'US',
		lat: 43.039397,
		lng: -107.555592,
	},
	308: {
		code: '308',
		offset: -6,
		state: 'NE',
		country: 'US',
		lat: 41.001861,
		lng: -100.991607,
	},
	309: {
		code: '309',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 40.748088,
		lng: -89.623829,
	},
	310: {
		code: '310',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.055403,
		lng: -118.241455,
	},
	312: {
		code: '312',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 41.879914,
		lng: -87.631717,
	},
	313: {
		code: '313',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 42.333107,
		lng: -83.04673,
	},
	314: {
		code: '314',
		offset: -6,
		state: 'MO',
		country: 'US',
		lat: 38.62014,
		lng: -90.219941,
	},
	315: {
		code: '315',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 43.499865,
		lng: -76.166861,
	},
	316: {
		code: '316',
		offset: -6,
		state: 'KS',
		country: 'US',
		lat: 37.66488,
		lng: -97.443596,
	},
	317: {
		code: '317',
		offset: -5,
		state: 'IN',
		country: 'US',
		lat: 39.76781,
		lng: -86.157682,
	},
	318: {
		code: '318',
		offset: -6,
		state: 'LA',
		country: 'US',
		lat: 32.461409,
		lng: -93.81213,
	},
	319: {
		code: '319',
		offset: -6,
		state: 'IA',
		country: 'US',
		lat: 41.965231,
		lng: -91.662685,
	},
	320: {
		code: '320',
		offset: -6,
		state: 'MN',
		country: 'US',
		lat: 45.521822,
		lng: -94.148975,
	},
	321: {
		code: '321',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 28.564052,
		lng: -81.372391,
	},
	323: {
		code: '323',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.055403,
		lng: -118.241455,
	},
	324: {
		code: '324',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 30.345294,
		lng: -81.721447,
	},
	325: {
		code: '325',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 32.484002,
		lng: -99.745411,
	},
	326: {
		code: '326',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 39.921964,
		lng: -83.82607,
	},
	327: {
		code: '327',
		offset: -6,
		state: 'AR',
		country: 'US',
		lat: 35.821028,
		lng: -90.669277,
	},
	329: {
		code: '329',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 41.149987,
		lng: -73.984581,
	},
	330: {
		code: '330',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 41.000338,
		lng: -80.999343,
	},
	331: {
		code: '331',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 41.833183,
		lng: -88.099966,
	},
	332: {
		code: '332',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.711049,
		lng: -74.006573,
	},
	334: {
		code: '334',
		offset: -6,
		state: 'AL',
		country: 'US',
		lat: 32.344262,
		lng: -86.234329,
	},
	336: {
		code: '336',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 36.100477,
		lng: -79.827751,
	},
	337: {
		code: '337',
		offset: -6,
		state: 'LA',
		country: 'US',
		lat: 30.211877,
		lng: -92.039581,
	},
	339: {
		code: '339',
		offset: -5,
		state: 'MA',
		country: 'US',
		lat: 42.348946,
		lng: -71.064442,
	},
	340: {
		code: '340',
		offset: -4,
		state: 'USVI',
		country: 'US',
		lat: 18.350004,
		lng: -64.933341,
	},
	341: {
		code: '341',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.700002,
		lng: -122.099969,
	},
	343: {
		code: '343',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 45.426653,
		lng: -75.701073,
	},
	345: {
		code: '345',
		offset: -5,
		state: 'CAYMAN ISLANDS',
		country: 'KY',
		lat: 19.510339,
		lng: -80.571236,
	},
	346: {
		code: '346',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 29.816578,
		lng: -95.463707,
	},
	347: {
		code: '347',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.720038,
		lng: -73.870032,
	},
	350: {
		code: '350',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.963188,
		lng: -121.301891,
	},
	351: {
		code: '351',
		offset: -5,
		state: 'MA',
		country: 'US',
		lat: 42.636518,
		lng: -71.326881,
	},
	352: {
		code: '352',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 29.688164,
		lng: -82.322453,
	},
	353: {
		code: '353',
		offset: -6,
		state: 'WI',
		country: 'US',
		lat: 43.085063,
		lng: -89.406765,
	},
	354: {
		code: '354',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 45.397779,
		lng: -72.754616,
	},
	357: {
		code: '357',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 36.998645,
		lng: -120.000465,
	},
	360: {
		code: '360',
		offset: -8,
		state: 'WA',
		country: 'US',
		lat: 45.638567,
		lng: -122.616787,
	},
	361: {
		code: '361',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 27.734385,
		lng: -97.365036,
	},
	363: {
		code: '363',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.702944,
		lng: -73.620831,
	},
	364: {
		code: '364',
		offset: -5,
		state: 'KY',
		country: 'US',
		lat: 36.971802,
		lng: -86.420013,
	},
	365: {
		code: '365',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 43.260973,
		lng: -79.935394,
	},
	367: {
		code: '367',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 46.783343,
		lng: -71.271183,
	},
	368: {
		code: '368',
		offset: -7,
		state: 'AB',
		country: 'CA',
		lat: 51.041734,
		lng: -114.058941,
	},
	369: {
		code: '369',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 38.436273,
		lng: -122.702251,
	},
	380: {
		code: '380',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 39.999972,
		lng: -83.000014,
	},
	382: {
		code: '382',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 42.750006,
		lng: -81.816709,
	},
	385: {
		code: '385',
		offset: -7,
		state: 'UT',
		country: 'US',
		lat: 40.776482,
		lng: -111.920555,
	},
	386: {
		code: '386',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 29.531841,
		lng: -81.258614,
	},
	401: {
		code: '401',
		offset: -5,
		state: 'RI',
		country: 'US',
		lat: 41.831275,
		lng: -71.410896,
	},
	402: {
		code: '402',
		offset: -6,
		state: 'NE',
		country: 'US',
		lat: 42.002015,
		lng: -98.059051,
	},
	403: {
		code: '403',
		offset: -7,
		state: 'AB',
		country: 'CA',
		lat: 50.348185,
		lng: -112.638938,
	},
	404: {
		code: '404',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 33.754388,
		lng: -84.389548,
	},
	405: {
		code: '405',
		offset: -6,
		state: 'OK',
		country: 'US',
		lat: 35.499758,
		lng: -97.500014,
	},
	406: {
		code: '406',
		offset: -7,
		state: 'MT',
		country: 'US',
		lat: 46.732544,
		lng: -110.037426,
	},
	407: {
		code: '407',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 28.539969,
		lng: -81.380217,
	},
	408: {
		code: '408',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.297542,
		lng: -121.817425,
	},
	409: {
		code: '409',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 30.081205,
		lng: -94.131077,
	},
	410: {
		code: '410',
		offset: -5,
		state: 'MD',
		country: 'US',
		lat: 39.284768,
		lng: -76.620487,
	},
	412: {
		code: '412',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.431347,
		lng: -79.980652,
	},
	413: {
		code: '413',
		offset: -5,
		state: 'MA',
		country: 'US',
		lat: 42.112324,
		lng: -72.601032,
	},
	414: {
		code: '414',
		offset: -6,
		state: 'WI',
		country: 'US',
		lat: 43.058053,
		lng: -87.967239,
	},
	415: {
		code: '415',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.99995,
		lng: -122.600684,
	},
	416: {
		code: '416',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 43.687038,
		lng: -79.393151,
	},
	417: {
		code: '417',
		offset: -6,
		state: 'MO',
		country: 'US',
		lat: 37.182821,
		lng: -93.295876,
	},
	418: {
		code: '418',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 46.783343,
		lng: -71.271183,
	},
	419: {
		code: '419',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 41.657254,
		lng: -83.574318,
	},
	423: {
		code: '423',
		offset: -5,
		state: 'TN',
		country: 'US',
		lat: 35.098702,
		lng: -85.25959,
	},
	424: {
		code: '424',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.055403,
		lng: -118.241455,
	},
	425: {
		code: '425',
		offset: -8,
		state: 'WA',
		country: 'US',
		lat: 47.597944,
		lng: -122.154877,
	},
	428: {
		code: '428',
		offset: -4,
		state: 'NB',
		country: 'CA',
		lat: 46.308692,
		lng: -66.232067,
	},
	430: {
		code: '430',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 31.431831,
		lng: -99.167812,
	},
	431: {
		code: '431',
		offset: -6,
		state: 'MB',
		country: 'CA',
		lat: 54.872818,
		lng: -95.49675,
	},
	432: {
		code: '432',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 32.025126,
		lng: -102.141621,
	},
	434: {
		code: '434',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 37.400981,
		lng: -79.178722,
	},
	435: {
		code: '435',
		offset: -7,
		state: 'UT',
		country: 'US',
		lat: 39.508378,
		lng: -111.507132,
	},
	436: {
		code: '436',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 41.384914,
		lng: -81.734821,
	},
	437: {
		code: '437',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 43.65417,
		lng: -79.382698,
	},
	438: {
		code: '438',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 45.514475,
		lng: -73.560661,
	},
	440: {
		code: '440',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 41.384914,
		lng: -81.734821,
	},
	441: {
		code: '441',
		offset: -4,
		state: 'BERMUDA',
		country: 'BM',
		lat: 32.300229,
		lng: -64.767108,
	},
	442: {
		code: '442',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 33.226426,
		lng: -117.318329,
	},
	443: {
		code: '443',
		offset: -5,
		state: 'MD',
		country: 'US',
		lat: 39.284768,
		lng: -76.620487,
	},
	445: {
		code: '445',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 39.949943,
		lng: -75.160591,
	},
	447: {
		code: '447',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 39.764008,
		lng: -89.670795,
	},
	448: {
		code: '448',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 30.467137,
		lng: -84.253922,
	},
	450: {
		code: '450',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 45.397779,
		lng: -72.754616,
	},
	457: {
		code: '457',
		offset: -6,
		state: 'LA',
		country: 'US',
		lat: 32.461409,
		lng: -93.81213,
	},
	458: {
		code: '458',
		offset: -7,
		state: 'OR',
		country: 'US',
		lat: 44.059971,
		lng: -123.122208,
	},
	463: {
		code: '463',
		offset: -5,
		state: 'IN',
		country: 'US',
		lat: 39.76781,
		lng: -86.157682,
	},
	464: {
		code: '464',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 41.843754,
		lng: -87.758854,
	},
	468: {
		code: '468',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 45.412196,
		lng: -71.955688,
	},
	469: {
		code: '469',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 32.778994,
		lng: -96.808562,
	},
	470: {
		code: '470',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 33.754388,
		lng: -84.389548,
	},
	471: {
		code: '471',
		offset: -6,
		state: 'MS',
		country: 'US',
		lat: 34.942261,
		lng: -90.007843,
	},
	472: {
		code: '472',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 35.078048,
		lng: -78.943249,
	},
	473: {
		code: '473',
		offset: -4,
		state: 'GRENADA',
		country: 'GD',
		lat: 12.193143,
		lng: -61.608385,
	},
	474: {
		code: '474',
		offset: -6,
		state: 'SK',
		country: 'CA',
		lat: 54.872793,
		lng: -105.679775,
	},
	475: {
		code: '475',
		offset: -5,
		state: 'CT',
		country: 'US',
		lat: 41.185543,
		lng: -73.198971,
	},
	478: {
		code: '478',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 32.840582,
		lng: -83.6481,
	},
	479: {
		code: '479',
		offset: -6,
		state: 'AR',
		country: 'US',
		lat: 35.500561,
		lng: -93.998959,
	},
	480: {
		code: '480',
		offset: -7,
		state: 'AZ',
		country: 'US',
		lat: 33.598468,
		lng: -112.084648,
	},
	483: {
		code: '483',
		offset: -6,
		state: 'AL',
		country: 'US',
		lat: 32.344262,
		lng: -86.234329,
	},
	484: {
		code: '484',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.593113,
		lng: -75.483841,
	},
	500: {
		code: '500',
		offset: -5,
		state: 'NANP',
		country: 'AREA',
	},
	501: {
		code: '501',
		offset: -6,
		state: 'AR',
		country: 'US',
		lat: 34.800325,
		lng: -92.300413,
	},
	502: {
		code: '502',
		offset: -5,
		state: 'KY',
		country: 'US',
		lat: 38.188123,
		lng: -85.674976,
	},
	503: {
		code: '503',
		offset: -8,
		state: 'OR',
		country: 'US',
		lat: 45.540824,
		lng: -122.655411,
	},
	504: {
		code: '504',
		offset: -6,
		state: 'LA',
		country: 'US',
		lat: 30.030585,
		lng: -89.932735,
	},
	505: {
		code: '505',
		offset: -7,
		state: 'NM',
		country: 'US',
		lat: 35.082529,
		lng: -106.676487,
	},
	506: {
		code: '506',
		offset: -4,
		state: 'NB',
		country: 'CA',
		lat: 46.308692,
		lng: -66.232067,
	},
	507: {
		code: '507',
		offset: -6,
		state: 'MN',
		country: 'US',
		lat: 43.996434,
		lng: -92.481148,
	},
	508: {
		code: '508',
		offset: -5,
		state: 'MA',
		country: 'US',
		lat: 42.275621,
		lng: -71.80867,
	},
	509: {
		code: '509',
		offset: -8,
		state: 'WA',
		country: 'US',
		lat: 47.673025,
		lng: -117.453979,
	},
	510: {
		code: '510',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.700002,
		lng: -122.099969,
	},
	512: {
		code: '512',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 30.307989,
		lng: -97.749943,
	},
	513: {
		code: '513',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 39.13638,
		lng: -84.540462,
	},
	514: {
		code: '514',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 45.514475,
		lng: -73.560661,
	},
	515: {
		code: '515',
		offset: -6,
		state: 'IA',
		country: 'US',
		lat: 41.569179,
		lng: -93.601677,
	},
	516: {
		code: '516',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.702944,
		lng: -73.620831,
	},
	517: {
		code: '517',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 42.721254,
		lng: -84.559433,
	},
	518: {
		code: '518',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 43.203268,
		lng: -73.899429,
	},
	519: {
		code: '519',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 42.750006,
		lng: -81.816709,
	},
	520: {
		code: '520',
		offset: -7,
		state: 'AZ',
		country: 'US',
		lat: 32.000615,
		lng: -111.089115,
	},
	521: {
		code: '521',
		offset: -5,
		state: 'NANP',
		country: 'AREA',
	},
	522: {
		code: '522',
		offset: -5,
		state: 'NANP',
		country: 'AREA',
	},
	530: {
		code: '530',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 40.574296,
		lng: -122.36108,
	},
	531: {
		code: '531',
		offset: -6,
		state: 'NE',
		country: 'US',
		lat: 42.002015,
		lng: -98.059051,
	},
	533: {
		code: '533',
		offset: -5,
		state: 'NANP',
		country: 'AREA',
	},
	534: {
		code: '534',
		offset: -6,
		state: 'WI',
		country: 'US',
		lat: 45.246627,
		lng: -89.988606,
	},
	539: {
		code: '539',
		offset: -6,
		state: 'OK',
		country: 'US',
		lat: 36.152524,
		lng: -95.878044,
	},
	540: {
		code: '540',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 37.274484,
		lng: -79.958076,
	},
	541: {
		code: '541',
		offset: -7,
		state: 'OR',
		country: 'US',
		lat: 44.059971,
		lng: -123.122208,
	},
	544: {
		code: '544',
		offset: -5,
		state: 'NANP',
		country: 'AREA',
	},
	548: {
		code: '548',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 42.750006,
		lng: -81.816709,
	},
	551: {
		code: '551',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 40.867801,
		lng: -74.43778,
	},
	557: {
		code: '557',
		offset: -6,
		state: 'MO',
		country: 'US',
		lat: 38.62014,
		lng: -90.219941,
	},
	559: {
		code: '559',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 36.998645,
		lng: -120.000465,
	},
	561: {
		code: '561',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 26.741368,
		lng: -80.129387,
	},
	562: {
		code: '562',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 33.899968,
		lng: -118.099701,
	},
	563: {
		code: '563',
		offset: -6,
		state: 'IA',
		country: 'US',
		lat: 41.542485,
		lng: -90.588985,
	},
	564: {
		code: '564',
		offset: -8,
		state: 'WA',
		country: 'US',
		lat: 47.609664,
		lng: -122.33285,
	},
	566: {
		code: '566',
		offset: -5,
		state: 'NANP',
		country: 'AREA',
	},
	567: {
		code: '567',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 41.657254,
		lng: -83.574318,
	},
	570: {
		code: '570',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 41.404297,
		lng: -75.662231,
	},
	571: {
		code: '571',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 38.880878,
		lng: -77.102211,
	},
	572: {
		code: '572',
		offset: -6,
		state: 'OK',
		country: 'US',
		lat: 35.499758,
		lng: -97.500014,
	},
	573: {
		code: '573',
		offset: -6,
		state: 'MO',
		country: 'US',
		lat: 38.946555,
		lng: -92.3307,
	},
	574: {
		code: '574',
		offset: -5,
		state: 'IN',
		country: 'US',
		lat: 41.281064,
		lng: -86.421654,
	},
	575: {
		code: '575',
		offset: -7,
		state: 'NM',
		country: 'US',
		lat: 32.337132,
		lng: -106.819462,
	},
	577: {
		code: '577',
		offset: -5,
		state: 'NANP',
		country: 'AREA',
	},
	579: {
		code: '579',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 45.397779,
		lng: -72.754616,
	},
	580: {
		code: '580',
		offset: -6,
		state: 'OK',
		country: 'US',
		lat: 34.602817,
		lng: -98.425426,
	},
	581: {
		code: '581',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 46.783343,
		lng: -71.271183,
	},
	582: {
		code: '582',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.91969,
		lng: -78.758776,
	},
	584: {
		code: '584',
		offset: -5,
		state: 'MB',
		country: 'CA',
		lat: 54.872818,
		lng: -95.49675,
	},
	585: {
		code: '585',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 43.185604,
		lng: -77.616402,
	},
	586: {
		code: '586',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 42.60004,
		lng: -83.000121,
	},
	587: {
		code: '587',
		offset: -7,
		state: 'AB',
		country: 'CA',
		lat: 51.041734,
		lng: -114.058941,
	},
	588: {
		code: '588',
		offset: -5,
		state: 'NANP',
		country: 'AREA',
	},
	600: {
		code: '600',
		offset: -5,
		state: 'N/A',
		country: 'CA',
	},
	601: {
		code: '601',
		offset: -6,
		state: 'MS',
		country: 'US',
		lat: 32.304043,
		lng: -90.192787,
	},
	602: {
		code: '602',
		offset: -7,
		state: 'AZ',
		country: 'US',
		lat: 33.598468,
		lng: -112.084648,
	},
	603: {
		code: '603',
		offset: -5,
		state: 'NH',
		country: 'US',
		lat: 44.015336,
		lng: -71.585232,
	},
	604: {
		code: '604',
		offset: -8,
		state: 'BC',
		country: 'CA',
		lat: 49.284477,
		lng: -123.125404,
	},
	605: {
		code: '605',
		offset: -6,
		state: 'SD',
		country: 'US',
		lat: 44.240089,
		lng: -100.256504,
	},
	606: {
		code: '606',
		offset: -5,
		state: 'KY',
		country: 'US',
		lat: 38.466476,
		lng: -82.644104,
	},
	607: {
		code: '607',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 42.098891,
		lng: -75.91085,
	},
	608: {
		code: '608',
		offset: -6,
		state: 'WI',
		country: 'US',
		lat: 43.085063,
		lng: -89.406765,
	},
	609: {
		code: '609',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 40.216246,
		lng: -74.774208,
	},
	610: {
		code: '610',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.593113,
		lng: -75.483841,
	},
	612: {
		code: '612',
		offset: -6,
		state: 'MN',
		country: 'US',
		lat: 44.950054,
		lng: -93.282959,
	},
	613: {
		code: '613',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 45.426653,
		lng: -75.701073,
	},
	614: {
		code: '614',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 39.999972,
		lng: -83.000014,
	},
	615: {
		code: '615',
		offset: -6,
		state: 'TN',
		country: 'US',
		lat: 36.186953,
		lng: -86.785183,
	},
	616: {
		code: '616',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 42.750179,
		lng: -85.749793,
	},
	617: {
		code: '617',
		offset: -5,
		state: 'MA',
		country: 'US',
		lat: 42.348946,
		lng: -71.064442,
	},
	618: {
		code: '618',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 38.5201,
		lng: -89.995903,
	},
	619: {
		code: '619',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 32.600446,
		lng: -117.000082,
	},
	620: {
		code: '620',
		offset: -6,
		state: 'KS',
		country: 'US',
		lat: 38.063594,
		lng: -97.906235,
	},
	621: {
		code: '621',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 29.816578,
		lng: -95.463707,
	},
	622: {
		code: '622',
		offset: -5,
		state: 'N/A',
		country: 'CA',
		lat: 36.7783,
		lng: -119.4179,
	},
	623: {
		code: '623',
		offset: -7,
		state: 'AZ',
		country: 'US',
		lat: 33.598468,
		lng: -112.084648,
	},
	624: {
		code: '624',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 42.896288,
		lng: -78.854706,
	},
	626: {
		code: '626',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.184448,
		lng: -118.131935,
	},
	628: {
		code: '628',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.99995,
		lng: -122.600684,
	},
	629: {
		code: '629',
		offset: -6,
		state: 'TN',
		country: 'US',
		lat: 36.186953,
		lng: -86.785183,
	},
	630: {
		code: '630',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 41.833183,
		lng: -88.099966,
	},
	631: {
		code: '631',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.83995,
		lng: -73.000052,
	},
	636: {
		code: '636',
		offset: -6,
		state: 'MO',
		country: 'US',
		lat: 38.599868,
		lng: -90.599484,
	},
	639: {
		code: '639',
		offset: -6,
		state: 'SK',
		country: 'CA',
		lat: 54.872793,
		lng: -105.679775,
	},
	640: {
		code: '640',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 40.216246,
		lng: -74.774208,
	},
	641: {
		code: '641',
		offset: -6,
		state: 'IA',
		country: 'US',
		lat: 43.144277,
		lng: -93.196461,
	},
	645: {
		code: '645',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 25.779041,
		lng: -80.2164,
	},
	646: {
		code: '646',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.711049,
		lng: -74.006573,
	},
	647: {
		code: '647',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 43.65417,
		lng: -79.382698,
	},
	649: {
		code: '649',
		offset: -5,
		state: 'TURKS & CAICOS ISLANDS',
		country: 'TC',
		lat: 21.560478,
		lng: -71.772133,
	},
	650: {
		code: '650',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.499053,
		lng: -122.301371,
	},
	651: {
		code: '651',
		offset: -6,
		state: 'MN',
		country: 'US',
		lat: 44.950069,
		lng: -92.999954,
	},
	656: {
		code: '656',
		offset: -6,
		state: 'FL',
		country: 'US',
		lat: 27.996519,
		lng: -82.447449,
	},
	657: {
		code: '657',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 33.799941,
		lng: -117.900102,
	},
	658: {
		code: '658',
		offset: -5,
		state: 'JAMAICA',
		country: 'JM',
		lat: 18.11975,
		lng: -77.270966,
	},
	659: {
		code: '659',
		offset: -6,
		state: 'AL',
		country: 'US',
		lat: 33.531351,
		lng: -86.850143,
	},
	660: {
		code: '660',
		offset: -6,
		state: 'MO',
		country: 'US',
		lat: 38.702913,
		lng: -93.232113,
	},
	661: {
		code: '661',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 35.321082,
		lng: -119.018997,
	},
	662: {
		code: '662',
		offset: -6,
		state: 'MS',
		country: 'US',
		lat: 34.942261,
		lng: -90.007843,
	},
	664: {
		code: '664',
		offset: -4,
		state: 'MONTSERRAT',
		country: 'MS',
		lat: 16.68124,
		lng: -62.19311,
	},
	667: {
		code: '667',
		offset: -5,
		state: 'MD',
		country: 'US',
		lat: 39.284768,
		lng: -76.620487,
	},
	669: {
		code: '669',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.297542,
		lng: -121.817425,
	},
	670: {
		code: '670',
		offset: -6,
		state: 'CNMI',
		country: 'US',
		lat: 15.183545,
		lng: 145.751281,
	},
	671: {
		code: '671',
		offset: 10,
		state: 'GU',
		country: 'US',
		lat: 13.442697,
		lng: 144.793196,
	},
	672: {
		code: '672',
		offset: -8,
		state: 'BC',
		country: 'CA',
		lat: 49.284477,
		lng: -123.125404,
	},
	678: {
		code: '678',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 33.766584,
		lng: -84.390526,
	},
	679: {
		code: '679',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 42.333107,
		lng: -83.04673,
	},
	680: {
		code: '680',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 43.499865,
		lng: -76.166861,
	},
	681: {
		code: '681',
		offset: -5,
		state: 'WV',
		country: 'US',
		lat: 38.448884,
		lng: -80.960548,
	},
	682: {
		code: '682',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 32.752104,
		lng: -97.329521,
	},
	683: {
		code: '683',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 46.586011,
		lng: -81.077534,
	},
	684: {
		code: '684',
		offset: 10,
		state: 'SAMOA',
		country: 'US',
		lat: -14.300004,
		lng: -170.699987,
	},
	686: {
		code: '686',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 37.524722,
		lng: -77.493168,
	},
	689: {
		code: '689',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 28.539969,
		lng: -81.380217,
	},
	700: {
		code: '700',
		offset: -5,
		state: 'NANP',
		country: 'AREA',
	},
	701: {
		code: '701',
		offset: -6,
		state: 'ND',
		country: 'US',
		lat: 47.488287,
		lng: -100.305428,
	},
	702: {
		code: '702',
		offset: -8,
		state: 'NV',
		country: 'US',
		lat: 36.16854,
		lng: -115.157101,
	},
	703: {
		code: '703',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 38.880878,
		lng: -77.102211,
	},
	704: {
		code: '704',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 35.205611,
		lng: -80.83054,
	},
	705: {
		code: '705',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 46.586011,
		lng: -81.077534,
	},
	706: {
		code: '706',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 33.3862,
		lng: -82.090919,
	},
	707: {
		code: '707',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 38.436273,
		lng: -122.702251,
	},
	708: {
		code: '708',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 41.843754,
		lng: -87.758854,
	},
	709: {
		code: '709',
		offset: -3,
		state: 'NL',
		country: 'CA',
		lat: 53.96423,
		lng: -60.22016,
	},
	710: {
		code: '710',
		offset: -5,
		state: 'N/A',
		country: 'US',
	},
	712: {
		code: '712',
		offset: -6,
		state: 'IA',
		country: 'US',
		lat: 42.467949,
		lng: -96.399208,
	},
	713: {
		code: '713',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 29.816578,
		lng: -95.463707,
	},
	714: {
		code: '714',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 33.799941,
		lng: -117.900102,
	},
	715: {
		code: '715',
		offset: -6,
		state: 'WI',
		country: 'US',
		lat: 44.817673,
		lng: -91.481358,
	},
	716: {
		code: '716',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 42.896288,
		lng: -78.854706,
	},
	717: {
		code: '717',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.03986,
		lng: -76.299973,
	},
	718: {
		code: '718',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.720038,
		lng: -73.870032,
	},
	719: {
		code: '719',
		offset: -7,
		state: 'CO',
		country: 'US',
		lat: 38.013882,
		lng: -103.99008,
	},
	720: {
		code: '720',
		offset: -7,
		state: 'CO',
		country: 'US',
		lat: 39.741975,
		lng: -104.98423,
	},
	721: {
		code: '721',
		offset: -4,
		state: 'SINT MAARTEN',
		country: 'SX',
		lat: 18.026323,
		lng: -63.044379,
	},
	724: {
		code: '724',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.992815,
		lng: -80.356358,
	},
	725: {
		code: '725',
		offset: -8,
		state: 'NV',
		country: 'US',
		lat: 36.16854,
		lng: -115.157101,
	},
	726: {
		code: '726',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 29.424909,
		lng: -98.494062,
	},
	727: {
		code: '727',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 27.789107,
		lng: -82.639339,
	},
	728: {
		code: '728',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 26.741368,
		lng: -80.129387,
	},
	729: {
		code: '729',
		offset: -5,
		state: 'TN',
		country: 'US',
		lat: 35.098702,
		lng: -85.25959,
	},
	730: {
		code: '730',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 38.518671,
		lng: -89.995903,
	},
	731: {
		code: '731',
		offset: -6,
		state: 'TN',
		country: 'US',
		lat: 35.648357,
		lng: -88.830502,
	},
	732: {
		code: '732',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 40.000702,
		lng: -74.181728,
	},
	734: {
		code: '734',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 42.000214,
		lng: -83.501329,
	},
	737: {
		code: '737',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 30.307989,
		lng: -97.749943,
	},
	738: {
		code: '738',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.055403,
		lng: -118.241455,
	},
	740: {
		code: '740',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 40.077592,
		lng: -82.418461,
	},
	742: {
		code: '742',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 43.260973,
		lng: -79.935394,
	},
	743: {
		code: '743',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 36.100477,
		lng: -79.827751,
	},
	747: {
		code: '747',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.055403,
		lng: -118.241455,
	},
	748: {
		code: '748',
		offset: -7,
		state: 'CO',
		country: 'US',
		lat: 39.225089,
		lng: -106.000965,
	},
	753: {
		code: '753',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 45.426653,
		lng: -75.701073,
	},
	754: {
		code: '754',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 26.141308,
		lng: -80.149857,
	},
	757: {
		code: '757',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 36.767765,
		lng: -76.047405,
	},
	758: {
		code: '758',
		offset: -4,
		state: 'ST. LUCIA',
		country: 'LC',
		lat: 13.883329,
		lng: -60.966675,
	},
	760: {
		code: '760',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 33.226426,
		lng: -117.318329,
	},
	762: {
		code: '762',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 33.957511,
		lng: -83.37666,
	},
	763: {
		code: '763',
		offset: -6,
		state: 'MN',
		country: 'US',
		lat: 45.265237,
		lng: -93.534551,
	},
	765: {
		code: '765',
		offset: -5,
		state: 'IN',
		country: 'US',
		lat: 40.194952,
		lng: -85.395885,
	},
	767: {
		code: '767',
		offset: -4,
		state: 'DOMINICA',
		country: 'DM',
		lat: 15.45368,
		lng: -61.347656,
	},
	769: {
		code: '769',
		offset: -6,
		state: 'MS',
		country: 'US',
		lat: 31.815584,
		lng: -89.751091,
	},
	770: {
		code: '770',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 34.038916,
		lng: -84.344466,
	},
	771: {
		code: '771',
		offset: -5,
		state: 'DC',
		country: 'US',
		lat: 38.900001,
		lng: -77.033322,
	},
	772: {
		code: '772',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 27.290179,
		lng: -80.362679,
	},
	773: {
		code: '773',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 41.834108,
		lng: -87.732357,
	},
	774: {
		code: '774',
		offset: -5,
		state: 'MA',
		country: 'US',
		lat: 42.275621,
		lng: -71.80867,
	},
	775: {
		code: '775',
		offset: -8,
		state: 'NV',
		country: 'US',
		lat: 39.551415,
		lng: -119.851406,
	},
	778: {
		code: '778',
		offset: -8,
		state: 'BC',
		country: 'CA',
		lat: 49.284477,
		lng: -123.125404,
	},
	779: {
		code: '779',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 42.241021,
		lng: -89.068066,
	},
	780: {
		code: '780',
		offset: -7,
		state: 'AB',
		country: 'CA',
		lat: 53.546343,
		lng: -113.504929,
	},
	781: {
		code: '781',
		offset: -5,
		state: 'MA',
		country: 'US',
		lat: 42.348946,
		lng: -71.064442,
	},
	782: {
		code: '782',
		offset: -3,
		state: 'NS',
		country: 'CA',
		lat: 45.425459,
		lng: -63.130767,
	},
	785: {
		code: '785',
		offset: -6,
		state: 'KS',
		country: 'US',
		lat: 39.013302,
		lng: -95.708038,
	},
	786: {
		code: '786',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 25.779041,
		lng: -80.2164,
	},
	787: {
		code: '787',
		offset: -4,
		state: 'PR',
		country: 'US',
		lat: 18.463653,
		lng: -66.113899,
	},
	801: {
		code: '801',
		offset: -7,
		state: 'UT',
		country: 'US',
		lat: 40.776482,
		lng: -111.920555,
	},
	802: {
		code: '802',
		offset: -5,
		state: 'VT',
		country: 'US',
		lat: 43.883788,
		lng: -72.454052,
	},
	803: {
		code: '803',
		offset: -5,
		state: 'SC',
		country: 'US',
		lat: 34.03447,
		lng: -80.937588,
	},
	804: {
		code: '804',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 37.524722,
		lng: -77.493168,
	},
	805: {
		code: '805',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.603683,
		lng: -120.210836,
	},
	806: {
		code: '806',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 33.588756,
		lng: -101.890518,
	},
	807: {
		code: '807',
		offset: -6,
		state: 'ON',
		country: 'CA',
		lat: 49.823584,
		lng: -94.467411,
	},
	808: {
		code: '808',
		offset: -10,
		state: 'HI',
		country: 'US',
		lat: 20.582572,
		lng: -157.05999,
	},
	810: {
		code: '810',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 43.012427,
		lng: -83.696419,
	},
	812: {
		code: '812',
		offset: -5,
		state: 'IN',
		country: 'US',
		lat: 37.996483,
		lng: -87.543484,
	},
	813: {
		code: '813',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 27.996519,
		lng: -82.447449,
	},
	814: {
		code: '814',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.91969,
		lng: -78.758776,
	},
	815: {
		code: '815',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 40.194643,
		lng: -89.51467,
	},
	816: {
		code: '816',
		offset: -6,
		state: 'MO',
		country: 'US',
		lat: 39.102967,
		lng: -94.576202,
	},
	817: {
		code: '817',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 32.752104,
		lng: -97.329521,
	},
	818: {
		code: '818',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.055403,
		lng: -118.241455,
	},
	819: {
		code: '819',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 45.412196,
		lng: -71.955688,
	},
	820: {
		code: '820',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.190006,
		lng: -119.191437,
	},
	821: {
		code: '821',
		offset: -5,
		state: 'SC',
		country: 'US',
		lat: 34.833346,
		lng: -82.362835,
	},
	825: {
		code: '825',
		offset: -7,
		state: 'AB',
		country: 'CA',
		lat: 51.041734,
		lng: -114.058941,
	},
	826: {
		code: '826',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 37.274484,
		lng: -79.958076,
	},
	828: {
		code: '828',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 35.536417,
		lng: -82.565418,
	},
	830: {
		code: '830',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 29.702932,
		lng: -98.137875,
	},
	831: {
		code: '831',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 36.686407,
		lng: -121.630444,
	},
	832: {
		code: '832',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 29.816578,
		lng: -95.463707,
	},
	835: {
		code: '835',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.593113,
		lng: -75.483841,
	},
	837: {
		code: '837',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 40.574296,
		lng: -122.36108,
	},
	838: {
		code: '838',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 42.668162,
		lng: -73.811287,
	},
	839: {
		code: '839',
		offset: -5,
		state: 'SC',
		country: 'US',
		lat: 34.03447,
		lng: -80.937588,
	},
	840: {
		code: '840',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.099741,
		lng: -117.499959,
	},
	843: {
		code: '843',
		offset: -5,
		state: 'SC',
		country: 'US',
		lat: 32.821251,
		lng: -79.971043,
	},
	845: {
		code: '845',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 41.149987,
		lng: -73.984581,
	},
	847: {
		code: '847',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 42.037619,
		lng: -88.338993,
	},
	848: {
		code: '848',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 40.000702,
		lng: -74.181728,
	},
	850: {
		code: '850',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 30.467137,
		lng: -84.253922,
	},
	854: {
		code: '854',
		offset: -5,
		state: 'SC',
		country: 'US',
		lat: 32.821251,
		lng: -79.971043,
	},
	856: {
		code: '856',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 39.930883,
		lng: -75.03926,
	},
	857: {
		code: '857',
		offset: -5,
		state: 'MA',
		country: 'US',
		lat: 42.348946,
		lng: -71.064442,
	},
	858: {
		code: '858',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 32.600446,
		lng: -117.000082,
	},
	859: {
		code: '859',
		offset: -5,
		state: 'KY',
		country: 'US',
		lat: 38.028591,
		lng: -84.471386,
	},
	860: {
		code: '860',
		offset: -5,
		state: 'CT',
		country: 'US',
		lat: 41.753693,
		lng: -72.695518,
	},
	861: {
		code: '861',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 40.748088,
		lng: -89.623829,
	},
	862: {
		code: '862',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 40.734162,
		lng: -74.184738,
	},
	863: {
		code: '863',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 28.062497,
		lng: -81.947475,
	},
	864: {
		code: '864',
		offset: -5,
		state: 'SC',
		country: 'US',
		lat: 34.833346,
		lng: -82.362835,
	},
	865: {
		code: '865',
		offset: -5,
		state: 'TN',
		country: 'US',
		lat: 35.958531,
		lng: -83.925087,
	},
	867: {
		code: '867',
		offset: -7,
		state: 'YT',
		country: 'CA',
		lat: 62.4536,
		lng: -114.37,
	},
	870: {
		code: '870',
		offset: -6,
		state: 'AR',
		country: 'US',
		lat: 35.821028,
		lng: -90.669277,
	},
	872: {
		code: '872',
		offset: -6,
		state: 'IL',
		country: 'US',
		lat: 41.834108,
		lng: -87.732357,
	},
	873: {
		code: '873',
		offset: -5,
		state: 'QC',
		country: 'CA',
		lat: 45.412196,
		lng: -71.955688,
	},
	878: {
		code: '878',
		offset: -5,
		state: 'PA',
		country: 'US',
		lat: 40.027401,
		lng: -79.913006,
	},
	879: {
		code: '879',
		offset: -3,
		state: 'NL',
		country: 'CA',
		lat: 53.96423,
		lng: -60.22016,
	},
	901: {
		code: '901',
		offset: -6,
		state: 'TN',
		country: 'US',
		lat: 35.129201,
		lng: -89.965332,
	},
	902: {
		code: '902',
		offset: -3,
		state: 'NS',
		country: 'CA',
		lat: 45.425459,
		lng: -63.130767,
	},
	903: {
		code: '903',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 31.431831,
		lng: -99.167812,
	},
	904: {
		code: '904',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 30.345294,
		lng: -81.721447,
	},
	905: {
		code: '905',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 43.260973,
		lng: -79.935394,
	},
	906: {
		code: '906',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 46.550482,
		lng: -87.412476,
	},
	907: {
		code: '907',
		offset: -9,
		state: 'AK',
		country: 'US',
		lat: 63.158252,
		lng: -154.71283,
	},
	908: {
		code: '908',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 40.470539,
		lng: -74.426708,
	},
	909: {
		code: '909',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 34.099741,
		lng: -117.499959,
	},
	910: {
		code: '910',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 35.078048,
		lng: -78.943249,
	},
	912: {
		code: '912',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 32.082665,
		lng: -81.097877,
	},
	913: {
		code: '913',
		offset: -6,
		state: 'KS',
		country: 'US',
		lat: 38.902205,
		lng: -94.684368,
	},
	914: {
		code: '914',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.807703,
		lng: -73.924062,
	},
	915: {
		code: '915',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 31.811619,
		lng: -106.417961,
	},
	916: {
		code: '916',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 38.561701,
		lng: -121.461441,
	},
	917: {
		code: '917',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.728186,
		lng: -73.994722,
	},
	918: {
		code: '918',
		offset: -6,
		state: 'OK',
		country: 'US',
		lat: 36.152524,
		lng: -95.878044,
	},
	919: {
		code: '919',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 35.839634,
		lng: -78.64492,
	},
	920: {
		code: '920',
		offset: -6,
		state: 'WI',
		country: 'US',
		lat: 44.522972,
		lng: -87.99057,
	},
	924: {
		code: '924',
		offset: -6,
		state: 'MN',
		country: 'US',
		lat: 43.996434,
		lng: -92.481148,
	},
	925: {
		code: '925',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 37.899832,
		lng: -122.000384,
	},
	928: {
		code: '928',
		offset: -7,
		state: 'AZ',
		country: 'US',
		lat: 32.605675,
		lng: -114.571949,
	},
	929: {
		code: '929',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.720038,
		lng: -73.870032,
	},
	930: {
		code: '930',
		offset: -5,
		state: 'IN',
		country: 'US',
		lat: 38.920588,
		lng: -86.077108,
	},
	931: {
		code: '931',
		offset: -5,
		state: 'TN',
		country: 'US',
		lat: 36.56038,
		lng: -87.34647,
	},
	934: {
		code: '934',
		offset: -5,
		state: 'NY',
		country: 'US',
		lat: 40.83995,
		lng: -73.000052,
	},
	936: {
		code: '936',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 30.303588,
		lng: -95.52359,
	},
	937: {
		code: '937',
		offset: -5,
		state: 'OH',
		country: 'US',
		lat: 39.921964,
		lng: -83.82607,
	},
	938: {
		code: '938',
		offset: -6,
		state: 'AL',
		country: 'US',
		lat: 34.132872,
		lng: -85.964863,
	},
	939: {
		code: '939',
		offset: -4,
		state: 'PR',
		country: 'US',
		lat: 18.463653,
		lng: -66.113899,
	},
	940: {
		code: '940',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 33.237918,
		lng: -97.14521,
	},
	941: {
		code: '941',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 27.033602,
		lng: -82.204975,
	},
	942: {
		code: '942',
		offset: -5,
		state: 'ON',
		country: 'CA',
		lat: 43.687038,
		lng: -79.393151,
	},
	943: {
		code: '943',
		offset: -5,
		state: 'GA',
		country: 'US',
		lat: 33.754388,
		lng: -84.389548,
	},
	945: {
		code: '945',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 32.821162,
		lng: -96.729385,
	},
	947: {
		code: '947',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 42.597229,
		lng: -83.297203,
	},
	948: {
		code: '948',
		offset: -5,
		state: 'VA',
		country: 'US',
		lat: 36.767765,
		lng: -76.047405,
	},
	949: {
		code: '949',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 33.600215,
		lng: -117.700181,
	},
	951: {
		code: '951',
		offset: -8,
		state: 'CA',
		country: 'US',
		lat: 33.733602,
		lng: -117.015402,
	},
	952: {
		code: '952',
		offset: -6,
		state: 'MN',
		country: 'US',
		lat: 44.824394,
		lng: -93.298107,
	},
	954: {
		code: '954',
		offset: -5,
		state: 'FL',
		country: 'US',
		lat: 26.141308,
		lng: -80.149857,
	},
	956: {
		code: '956',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 27.555569,
		lng: -99.54068,
	},
	959: {
		code: '959',
		offset: -5,
		state: 'CT',
		country: 'US',
		lat: 41.753693,
		lng: -72.695518,
	},
	970: {
		code: '970',
		offset: -7,
		state: 'CO',
		country: 'US',
		lat: 39.225089,
		lng: -106.000965,
	},
	971: {
		code: '971',
		offset: -8,
		state: 'OR',
		country: 'US',
		lat: 45.540824,
		lng: -122.655411,
	},
	972: {
		code: '972',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 32.821162,
		lng: -96.729385,
	},
	973: {
		code: '973',
		offset: -5,
		state: 'NJ',
		country: 'US',
		lat: 40.734162,
		lng: -74.184738,
	},
	975: {
		code: '975',
		offset: -6,
		state: 'MO',
		country: 'US',
		lat: 39.102967,
		lng: -94.576202,
	},
	978: {
		code: '978',
		offset: -5,
		state: 'MA',
		country: 'US',
		lat: 42.636518,
		lng: -71.326881,
	},
	979: {
		code: '979',
		offset: -6,
		state: 'TX',
		country: 'US',
		lat: 30.587826,
		lng: -96.292088,
	},
	980: {
		code: '980',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 35.205611,
		lng: -80.83054,
	},
	983: {
		code: '983',
		offset: -7,
		state: 'CO',
		country: 'US',
		lat: 40.000942,
		lng: -105.000994,
	},
	984: {
		code: '984',
		offset: -5,
		state: 'NC',
		country: 'US',
		lat: 35.839634,
		lng: -78.64492,
	},
	985: {
		code: '985',
		offset: -6,
		state: 'LA',
		country: 'US',
		lat: 29.578127,
		lng: -90.701328,
	},
	986: {
		code: '986',
		offset: -8,
		state: 'ID',
		country: 'US',
		lat: 45.607644,
		lng: -114.138302,
	},
	989: {
		code: '989',
		offset: -5,
		state: 'MI',
		country: 'US',
		lat: 43.424869,
		lng: -83.948376,
	},
	958: {
		code: '958',
		offset: -7,
		state: 'NA',
		country: 'US',
		lat: 0,
		lng: 0,
	},
};

// Dialog IDs
export const USE_DIALER_DIALOG = 'USE_DIALER_DIALOG';
export const WEB_RTC_PROMPT_DIALOG = 'WEB_RTC_PROMPT_DIALOG';
export const VERIFY_SETUP_DIALOG_ID = 'verify-setup-dialog';
export const OUTSIDE_TZ_DIALOG_ID = 'outside-tz-settings';
export const DNC_NUMBER_DIALOG_ID = 'dnc-number';
export const NO_DIALER_SEAT_DIALOG_ID = 'no-dialer-seat';
export const HUBSPOT_DISCONNECTED_DIALOG_ID = 'hubspot-disconnected-dialog';
export const GHL_DISCONNECTED_DIALOG_ID = 'ghl-disconnected-dialog';
// Host-page callback fired by the GHL-disconnected dialog's button; the GHL script opens the marketplace.
export const GHL_REINSTALL_CALLBACK = 'GHL_REINSTALL';
export const V1_UPGRADE_DIALOG_ID = 'v1-upgrade-dialog';
export const WAVV_APP_DIALOG_V2_ID = 'dialog-v2'; // id assigned by the interception middleware to DialogV2 dialogs re-routed into wavvAppDialog

// ========== WAVV APP CONSTANTS ========== //
/**
 * WAVV APP NAMING CONVENTIONS
 *
 * 1. INTERCEPTED ACTIONS (core → wavv-app):
 *    Actions that exist in core but wavv-app "hijacks" via middleware.
 *    These are TRANSFORMED by storm-js middleware when routing to wavv-app.
 *    → Prefixed with WAVV_APP_
 *    Example: SHOW_DIALOG gets transformed to WAVV_APP_SHOW_DIALOG
 *
 * 2. WAVV-APP EXCLUSIVE ACTIONS:
 *    Actions that only exist in wavv-app (drafts, navigation, post-call overlay, etc.).
 *    These never exist in core and are not intercepted.
 *    → NO prefix
 *    Example: SET_DIALER_DRAFT, SET_ACTIVE_TAB
 *
 * 3. CONSTANTS (enum values, not action types):
 *    Values used as data in payloads or state, not Redux action types.
 *    → NO prefix
 *    Example: TAB_DIALER, TAB_MESSENGER (these are tab identifiers, not actions)
 */

// Dialogs (INTERCEPTED - transformed from core SHOW_DIALOG/HIDE_DIALOG to WAVV_APP_ versions)
export const WAVV_APP_SHOW_DIALOG = 'WAVV_APP_SHOW_DIALOG';
export const WAVV_APP_DIALOG_CONFIRM = 'WAVV_APP_DIALOG_CONFIRM';
export const WAVV_APP_DISABLE_RIGHT_BUTTON = 'WAVV_APP_DISABLE_RIGHT_BUTTON';
export const WAVV_APP_HIDE_DIALOG = 'WAVV_APP_HIDE_DIALOG';
export const WAVV_APP_SET_DIALOG_INPUT = 'WAVV_APP_SET_DIALOG_INPUT';
export const WAVV_APP_UPDATE_DIALOG = 'WAVV_APP_UPDATE_DIALOG';
export const WAVV_APP_UPDATE_DIALOG_TEXT = 'WAVV_APP_UPDATE_DIALOG_TEXT';
export const WAVV_APP_SHOW_TRANSFER_MODAL = 'WAVV_APP_SHOW_TRANSFER_MODAL';
export const WAVV_APP_HIDE_TRANSFER_MODAL = 'WAVV_APP_HIDE_TRANSFER_MODAL';

// Dialer Drafts (WAVV-APP EXCLUSIVE)
export const SET_DRAFT = 'SET_DRAFT';
export const PATCH_DRAFT = 'PATCH_DRAFT';
export const CLEAR_DRAFT_BY_KEY = 'CLEAR_DRAFT_BY_KEY';
export const CLEAR_ALL_DRAFTS = 'CLEAR_ALL_DRAFTS';
export const SET_ACTIVE_DIALING_LINE_DRAFT_KEY = 'SET_ACTIVE_DIALING_LINE_DRAFT_KEY';

// Navigation (WAVV-APP EXCLUSIVE)
export const TAB_DIALER = 'TAB_DIALER';
export const TAB_MESSENGER = 'TAB_MESSENGER';
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

// ----------- Callboard Events V2 ----------- //
// Contact Events
export const CALLBOARD_EVENT_CONTACTS_LEFT_STAGE = 'CALLBOARD_EVENT_CONTACTS_LEFT_STAGE';
export const CALLBOARD_EVENT_CONTACTS_ENTERED_STAGE = 'CALLBOARD_EVENT_CONTACTS_ENTERED_STAGE';
export const CALLBOARD_EVENT_CONTACTS_LEFT_BOARD = 'CALLBOARD_EVENT_CONTACTS_LEFT_BOARD';
export const CALLBOARD_EVENT_CONTACTS_ENTERED_BOARD = 'CALLBOARD_EVENT_CONTACTS_ENTERED_BOARD';
export const CALLBOARD_EVENT_CONTACTS_CHANGED = 'CALLBOARD_EVENT_CONTACTS_CHANGED';
export const CALLBOARD_EVENT_CONTACT_TAG_ADDED = 'CALLBOARD_EVENT_CONTACT_TAG_ADDED';
export const CALLBOARD_HOT_LEAD_NOTIFICATION = 'CALLBOARD_HOT_LEAD_NOTIFICATION';
// Dial Outcome Events
export const CALLBOARD_EVENT_CONTACT_ATTEMPT_COMPLETE = 'CALLBOARD_EVENT_CONTACT_ATTEMPT_COMPLETE'; // call complete event for callboard
export const CALLBOARD_EVENT_CONTACT_CALL_SCHEDULED = 'CALLBOARD_EVENT_CONTACT_CALL_SCHEDULED';
// Board & Stage config events — these split the legacy CALLBOARD_SETTINGS_UPDATE grab-bag into intent-named
// events (publishers in back-end/src/utils/callboards/redisEvents/{stages,board}.ts). Consumed by the
// back-end dialer store (reducers/callboard.ts) and the StormJS store (reducers/callboards.js, callscripts.js).
export const CALLBOARD_EVENT_STAGE_CREATED = 'CALLBOARD_EVENT_STAGE_CREATED';
export const CALLBOARD_EVENT_STAGE_UPDATED = 'CALLBOARD_EVENT_STAGE_UPDATED';
export const CALLBOARD_EVENT_STAGE_DELETED = 'CALLBOARD_EVENT_STAGE_DELETED';
export const CALLBOARD_EVENT_STAGES_REORDERED = 'CALLBOARD_EVENT_STAGES_REORDERED';
export const CALLBOARD_EVENT_BOARD_DELETED = 'CALLBOARD_EVENT_BOARD_DELETED';
// Who can see a board changed. Routed to the affected users rather than by boardId: the users who just
// gained it were never in the board's room, which is the whole reason the board never appeared for them.
export const CALLBOARD_EVENT_BOARD_ACCESS_CHANGED = 'CALLBOARD_EVENT_BOARD_ACCESS_CHANGED';
export const CALLBOARD_EVENT_DETAILS_UPDATED = 'CALLBOARD_EVENT_DETAILS_UPDATED';
export const CALLBOARD_EVENT_DIALER_SETTINGS_UPDATED = 'CALLBOARD_EVENT_DIALER_SETTINGS_UPDATED';
export const CALLBOARD_EVENT_ASSIGNMENTS_UPDATED = 'CALLBOARD_EVENT_ASSIGNMENTS_UPDATED';
// Priority Stack Events
export const CALLBOARD_EVENT_PRIORITY_STACK_UPDATED = 'CALLBOARD_EVENT_PRIORITY_STACK_UPDATED';
export const CALLBOARD_EVENT_PRIORITY_STACKS_UPDATED = 'CALLBOARD_EVENT_PRIORITY_STACKS_UPDATED';
export const CALLBOARD_EVENT_PRIORITY_STACK_DELETED = 'CALLBOARD_EVENT_PRIORITY_STACK_DELETED';
// Disposition Events
export const CALLBOARD_DISPOSITIONS_UPDATED = 'CALLBOARD_DISPOSITIONS_UPDATED';
// Source (data-source / import) events — payloads carry the board's full array in the board-read
// shape, keyed by boardId (publisher: back-end/src/utils/callboards/redisEvents/sources.ts).
// These own MEMBERSHIP: a create or delete republishes the whole array so rows can appear/disappear.
export const CALLBOARD_EVENT_DATA_SOURCES_UPDATED = 'CALLBOARD_EVENT_DATA_SOURCES_UPDATED';
export const CALLBOARD_EVENT_IMPORTS_UPDATED = 'CALLBOARD_EVENT_IMPORTS_UPDATED';
// Progress counterparts: same row shape, but only the rows a write actually touched. Clients UPSERT
// them by id (replace-if-present, never append — an unknown id means the create event hasn't landed
// yet, and that event carries the row anyway). Emitted on every progress change, so they are the hot
// path; the array events above stay rare.
export const CALLBOARD_EVENT_DATA_SOURCES_PROGRESS = 'CALLBOARD_EVENT_DATA_SOURCES_PROGRESS';
export const CALLBOARD_EVENT_IMPORTS_PROGRESS = 'CALLBOARD_EVENT_IMPORTS_PROGRESS';
// --------------------------------------------- //

// ----------- CRM Detection ----------- //
// The extension relays a CRM tab's host token under this name; storm-js records the decoded user onto the tab.
// Without FEATURE_WAVV_AUTH_IDENTITY it is also the account switcher's enrichment request (→ result → error).
export const ENRICH_CRM_USER = 'ENRICH_CRM_DETECTED_USER'; // constant renamed, string value stays for backwards compatibility
export const CRM_USER_ENRICHED = 'CRM_USER_DETECTED'; // constant renamed, string value stays for backwards compatibility
export const CRM_USER_ENRICH_FAILED = 'CRM_DETECTION_FAILED'; // constant renamed, string value stays for backwards compatibility
// CRM portal presence (keyed by {type, origin}; collapses across tabs).
export const CRM_DETECTED = 'CRM_DETECTED';
export const CRM_REMOVED = 'CRM_REMOVED';
export const CRM_LIST_SYNC = 'CRM_LIST_SYNC';
export const GET_DETECTED_CRMS = 'GET_DETECTED_CRMS';
export const CRM_USER_REJECTED = 'CRM_USER_REJECTED';
// Tab-scoped CRM tracking: which CRM user each tab runs as, and which tab the side panel gates on.
export const CHROME_TAB_ACTIVATED = 'CHROME_TAB_ACTIVATED';
export const CHROME_TAB_CLEARED = 'CHROME_TAB_CLEARED';
export const CHROME_TABS_SNAPSHOT = 'CHROME_TABS_SNAPSHOT';
export const CRM_TAB_USER_SET = 'CRM_TAB_USER_SET';
// Account switcher's mismatch signal (storm-js computes it; always null under FEATURE_WAVV_AUTH_IDENTITY).
export const CRM_MISMATCH_DISMISSED = 'CRM_MISMATCH_DISMISSED';
// Banner "Learn More" re-opens the modal — clears the dismissed flag.
export const CRM_MISMATCH_REOPENED = 'CRM_MISMATCH_REOPENED';
export const CRM_MISMATCH_UPDATED = 'CRM_MISMATCH_UPDATED';
// Token-less, tab-scoped vendor detection (URL/DOM only) — drives the cross-vendor mismatch.
export const CRM_TAB_DETECTED = 'CRM_TAB_DETECTED';
// -------------------------------------- //
