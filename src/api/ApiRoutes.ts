enum ApiRoutes {
    GET_ALL_CHOICES = 'result/choice/all',
    GET_ALL_USERS_CHOICES = 'result/choice/all/users',

    LOGIN = 'login',
    REFRESH_TOKEN = 'token/refresh',

    GET_ALL_PLAYERS = 'playerinfo/get/all',

    GET_PLAYER_INFO = 'playerinfo/get/{uuid}'
}

export default ApiRoutes;