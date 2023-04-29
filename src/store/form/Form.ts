import InputField from "@/store/form/InputField";

interface Form {
    title: string;
    description: string;
    inputFields: InputField[];
    submitButtonText: string;
    onClose: () => void;
    onSubmit: () => void;
    visible: boolean;
}

export default Form;