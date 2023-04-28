import GameInfo from "@/api/records/GameInfo";

interface PlayerInfo {
    username: string
    uuid: string
    gamesPlayed: GameInfo[]
}

export default PlayerInfo;