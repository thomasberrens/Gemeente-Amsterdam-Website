import { defineStore } from 'pinia';
import Form from "@/store/form/Form";
import InputField from "@/store/form/InputField";

export const useFormStore = defineStore({
    id: 'form',
    state: () => ({
        currentForm: null as Form | null
    }),
    actions: {
        setForm(form: Form) {
            this.currentForm = form;
        },
        clearForm() {
            this.currentForm = null;
        },
    },
    getters: {
        getCurrentForm(): Form | null {
            return this.currentForm;
        },
        isFormVisible(): boolean {
            return !!this.currentForm && this.currentForm.visible;
        },
        getFormTitle(): string | null {
            return this.currentForm?.title || null;
        },
        getFormDescription(): string | null {
            return this.currentForm?.description || null;
        },
        getFormInputFields(): InputField[] | null {
            return this.currentForm?.inputFields || null;
        },
        getFormSubmitButtonText(): string | null {
            return this.currentForm?.submitButtonText || null;
        },
    }
});