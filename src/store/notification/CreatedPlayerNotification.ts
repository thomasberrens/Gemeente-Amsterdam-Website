import Notification from "@/store/notification/Notification";
import PlayerInfo from "@/api/records/PlayerInfo";
import {RouteTypes} from "@/router/RouteTypes";
import {Router} from "vue-router";
import NotificationType from "@/store/notification/NotificationType";


export default class CreatedPlayerNotification implements Notification {

    labels: string[] = ["Name: {0}", "PlayerID: {0}"];
    title: string = "Created player.";
    type: NotificationType = NotificationType.SUCCESS;
    visible: boolean = true;

    playerId: string = "";

    router: Router;

    constructor(playerInfo: PlayerInfo, router: Router) {
        this.labels[0] = this.labels[0].replace("{0}", playerInfo.username);
        this.labels[1] = this.labels[1].replace("{0}", playerInfo.uuid);

        this.playerId = playerInfo.uuid;

        this.router = router;

    }

    onClick(): void {

        console.log("router, ", this.router)

        this.router.push(RouteTypes.PLAYER.path.replace(":uuid", this.playerId));
    }


}
