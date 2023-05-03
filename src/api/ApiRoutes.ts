enum ApiRoutes {
    LOGIN = 'login',
    REFRESH_TOKEN = 'token/refresh',

    GET_ALL_PLAYERS = 'playerinfo/get/all',

    GET_PLAYER_INFO = 'playerinfo/get/{uuid}',

    CREATE_PLAYER = 'playerinfo/create',

    DELETE_PLAYER = 'playerinfo/delete/{uuid}',

    EDIT_PLAYER = 'playerinfo/update/{uuid}',
}

export default ApiRoutes;