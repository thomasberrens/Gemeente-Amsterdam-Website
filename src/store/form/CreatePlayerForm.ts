import Form from "@/store/form/Form";
import InputField from "@/store/form/InputField";
import ApiHandler from "@/api/ApiHandler";
import PlayerInfoDTO from "@/api/records/PlayerInfoDTO";
import PlayerInfo from "@/api/records/PlayerInfo";

export default class CreatePlayerForm implements Form {
    title: string;
    description: string;
    inputFields: InputField[];
    submitButtonText: string;
    visible: boolean = true;

    onPlayerCreated: (playerInfo: PlayerInfo) => void;

    constructor() {
        this.title = "Create Player";
        this.description = "";

        const userNameField = new InputField("Username", "", "username");

        this.inputFields = [userNameField];
        this.submitButtonText = "Create";

    }

    onClose() {
        console.log("????")
       this.visible = false;
       this.inputFields[0].model = "";
    }

    onSubmit() {
        const username = this.inputFields[0].model;

        const playerInfo = new PlayerInfoDTO(username);

         ApiHandler.createPlayerInfo(playerInfo).then((response) => {
            console.log(response);

            this.onPlayerCreated(response);

        }).catch((error) => {
            console.log(error);
        });

        this.onClose();
    }

}