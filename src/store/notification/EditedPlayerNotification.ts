import Notification from "@/store/notification/Notification";
import NotificationType from "@/store/notification/NotificationType";
import PlayerInfo from "@/api/records/PlayerInfo";
import {Router} from "vue-router";
import {RouteTypes} from "@/router/RouteTypes";

export default class EditedPlayerNotification implements Notification {
    labels: string[];
    title: string;
    type: NotificationType = NotificationType.ORANGE;
    visible: boolean;

    router: Router;

    playerId: string = "";

    constructor(newPlayerInfo: PlayerInfo, oldPlayerInfo: PlayerInfo, router: Router) {
        this.title = "Edited player.";
        this.labels = ["New name: " + newPlayerInfo.username, "Old name: " + oldPlayerInfo.username];

        this.router = router;

        this.playerId = newPlayerInfo.uuid;

        this.visible = true;
    }

    onClick(): void {
        this.router.push(RouteTypes.PLAYER.path.replace(":uuid", this.playerId));
    }

}