import Form from "@/store/form/Form";
import InputField from "@/store/form/InputField";
import ApiHandler from "@/api/ApiHandler";
import PlayerInfo from "@/api/records/PlayerInfo";

export default class DeletePlayerForm implements Form{
    description: string;
    inputFields: InputField[];

    submitButtonText: string;
    title: string;
    visible: boolean = true;

    playerInfo: PlayerInfo;

    constructor(playerInfo: PlayerInfo) {
        this.title = "Delete Player";
        this.description = `Are you sure you want to delete ${playerInfo.username}? This is a destructive action.`;

        this.submitButtonText = "Delete";

        this.playerInfo = playerInfo;

    }

    onDelete: (playerInfo: PlayerInfo) => void;

    onClose(): void {
        this.visible = false;
    }

    onSubmit(): void {
        ApiHandler.deletePlayerInfo(this.playerInfo.uuid).then(() => {
            this.onDelete(this.playerInfo);
        });

        this.onClose();
    }

}