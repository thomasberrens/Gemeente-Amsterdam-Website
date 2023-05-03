import Notification from "@/store/notification/Notification";
import PlayerInfo from "@/api/records/PlayerInfo";
import NotificationType from "@/store/notification/NotificationType";

export default class DeletedPlayerNotification implements Notification{
    labels: string[];
    title: string;
    type: NotificationType = NotificationType.DELETED;
    visible: boolean;

    constructor(playerInfo: PlayerInfo) {
        this.labels = ["Name: {0}", "PlayerID: {0}"];
        this.title = "Deleted player.";
        this.visible = true;

        this.labels[0] = this.labels[0].replace("{0}", playerInfo.username);
        this.labels[1] = this.labels[1].replace("{0}", playerInfo.uuid);
    }

    onClick(): void {
    }

}