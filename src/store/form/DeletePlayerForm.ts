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

    constructor(playerInfo?: PlayerInfo) {
        if (!playerInfo) return;
        this.title = "Delete Player";
        this.description = `Are you sure you want to delete ${playerInfo.username}? This is a destructive action.`;

        this.submitButtonText = "Delete";

        this.playerInfo = playerInfo;

        // Set visible to true only when playerInfo object is not empty
        if (playerInfo && playerInfo.uuid) {
            this.visible = true;
        }

    }

    onDelete: (playerInfo: PlayerInfo) => void;

    onFormClosed: () => void;

    onClose(): void {

        this.visible = false;
        this.onFormClosed();
    }

    onSubmit(): void {
        ApiHandler.deletePlayerInfo(this.playerInfo.uuid).then(() => {
            this.onDelete(this.playerInfo);
        });

        this.onClose();
    }

}