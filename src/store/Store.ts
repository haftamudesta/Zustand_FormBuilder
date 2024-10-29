import { create } from 'zustand'

interface formFields{
        label:string,
        type:'text'|'number'|'password'|'textarea'|'date'|'file';
        value:string,
}
interface formStoreState{
        formFields:formFields[],
        addField:(field:formFields)=>void,
        removeField:(index:number)=>void,
        updateField:(index:number,updatedField:formFields)=>void,
        resetForm:()=>void,
}

export const useFormFields=create<formStoreState>((set)=>({
        formFields:[],
        addField: (field)=>set((state)=>({formFields:[...state.formFields,field]})),
        removeField:(index)=>set((state)=>({formFields:state.formFields.filter((_,i)=>i!==index)})),
        
        updateField:(index,updatedField)=>set((state)=>({
                formFields: state.formFields.map((field,i)=>i===index?updatedField:field)})),

        resetForm:()=>set({formFields:[]})
}))