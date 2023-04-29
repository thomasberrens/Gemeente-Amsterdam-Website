import Form from "@/store/form/Form";
import InputField from "@/store/form/InputField";
import PlayerInfo from "@/api/records/PlayerInfo";
import PlayerInfoDTO from "@/api/records/PlayerInfoDTO";
import ApiHandler from "@/api/ApiHandler";

export default class EditPlayerForm implements Form {
    description: string;
    inputFields: InputField[];
    submitButtonText: string;
    title: string;
    visible: boolean = true;

    playerInfo: PlayerInfo;

    onPlayerEdited: (newPlayerInfo: PlayerInfo, oldPlayerInfo: PlayerInfo) => void;

    constructor(playerInfo: PlayerInfo) {
        this.playerInfo = playerInfo;
        this.title = "Edit Player";

        this.description = `Edit ${playerInfo.username}'s information.`;

        this.submitButtonText = "Edit";

        const userNameField = new InputField("Username", "", playerInfo.username);

        this.inputFields = [userNameField]
    }

    onClose(): void {
    }

    onSubmit(): void {
        this.visible = false;

        const newUsername = this.inputFields[0].model;

        const playerInfoDTO = new PlayerInfoDTO(newUsername);

        ApiHandler.editPlayerInfo(this.playerInfo.uuid, playerInfoDTO).then((response) => {
            this.onPlayerEdited(response, this.playerInfo);
        });
    }



}