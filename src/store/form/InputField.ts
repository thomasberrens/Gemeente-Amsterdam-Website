export default class InputField {
    name: string;
    model: string;
    placeholder: string;

    constructor(name: string, model: string, placeholder: string) {
        this.name = name;
        this.model = model;
        this.placeholder = placeholder;
    }
}
