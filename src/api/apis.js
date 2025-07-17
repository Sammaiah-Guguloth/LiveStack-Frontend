// User
export const REGISTER_USER = "/user/register"; // POST
export const LOGIN_USER = "/user/login"; // POST
export const LOGOUT_USER = "/user/logout"; // GET
export const GOOGLE_AUTH_USER = "/user/google-auth"; // POST
export const GET_PROFILE = "/user/profile"; // GET
export const UPDATE_PROFILE = "/user/update-profile"; // PUT

// Room
export const CREATE_ROOM = "/room/create"; // POST
export const GET_ALL_MY_ROOMS = "/room/all-my-rooms"; // GET
export const GET_ALL_ROOMS = "/room/all-rooms"; // GET
export const GET_ROOM_BY_ID = "/room"; // /:id  and GET
export const UPDATE_CODE = "/room/update-code"; // PUT

export const GET_PAGINATED_ROOMS = "room/my/rooms"; // GET /api/v1/rooms/my?page=2&limit=6

export const UPDATE_CODE_ADMIN = "room/update-code-admin"; // PUT /api/v1/rooms/update-code-admin/

export const GET_ROOMS_BY_ROOM_NAME = "room/my/rooms-by-name"; // GET /api/v1/rooms/my/rooms-by-name/:roomName

// NOTE
export const CREATE_OR_UPDATE_NOTE = "/note"; // POST
export const GET_NOTES = "/note"; // GET note/:roomId
