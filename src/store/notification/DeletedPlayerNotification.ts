import Notification from "@/store/notification/Notification";
import PlayerInfo from "@/api/records/PlayerInfo";
import NotificationType from "@/store/notification/NotificationType";

export default class DeletedPlayerNotification implements Notification{
    labels: string[];
    title: string;
    type: NotificationType = NotificationType.RED;
    visible: boolean;

    constructor(playerInfo: PlayerInfo) {
        this.labels = []
        this.title = "Deleted player.";
        this.visible = true;

        this.labels[0] = "Name: {0}".replace("{0}", playerInfo.username);
        this.labels[1] = "PlayerID: {0}".replace("{0}", playerInfo.uuid);
    }

    onClick(): void {
    }

}