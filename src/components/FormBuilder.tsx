import { ChangeEvent, useState } from "react"
import { useFormStore } from "../store/Store"
import { FormField } from "./FormField"

interface newField{
        label:string,
        type:'text'|'number'|'email'|'password'|'textarea'|'date'|'file',
        value:string,
}

const FormBuilder = () => {
        const {formFields,addField,removeField,updateField,resetForm}=useFormStore()
        const [newfield,setNewField]=useState<newField>({
                label:'',
                type:'text',
                value:''
        })
        const handleAddField=()=>{
                addField(newfield)
                setNewField({
                        label:'',
                        type:'text',
                        value:''
                })
        }
        const handleResetForm=()=>{
                resetForm()
        }

        const handleChanges=(e:ChangeEvent<HTMLIFrameElement| HTMLTextAreaElement|HTMLSelectElement>)=>{
                const {name,value}=e.target;
                setNewField(prev=>({...prev,[name]:value}))
        }
        const handleFieldUpdate=(index:number,updatedField:newField)=>{
                updateField(index,updatedField)
        }
        const handleFieldRemove=(index:number)=>{
                removeField(index)
        }
        
        
  return (
    <main className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl mt-4">
        <h1 className="text-3xl text-center font-bold mb-6">
                Form Builder
        </h1>
        <div className="flex flex-col">
                <div className="flex gap-4">
                        <input type="text"
                        name="label"
                        placeholder="field label"
                        value={newfield.label}
                        className="p-2 mt-4 bm-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                        onChange={handleChanges}
                        />
                        <select name="type"
                        value={newfield.type}
                        onChange={handleChanges}
                        className="p-2 bm-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
                        >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="password">Password</option>
                                <option value="email">Email</option>
                                <option value="textarea">Text Area</option>
                                <option value="date">Date</option>
                                <option value="file">File</option>
                        </select>
                </div>
                <div className="flex gap-8 mb-4">
                        <button type="button"
                        onClick={handleAddField}
                        className="bg-blue-400 text-white hover:text-purple-600 mt-4 px-4 py-0.5 rounded-lg"
                        >Add Field</button>
                        <button type="button"
                        onClick={()=>handleResetForm}
                        className="bg-red-400 text-white hover:text-green-500 mt-4 px-4 py-0.5 rounded-lg"
                        >Reset Form</button>
                </div>
                <form action="">
                        {
                                formFields.map((field,index)=>(
                                        <FormField 
                                        key={index}
                                        field={field}
                                        index={index}
                                        onUpdate={handleFieldUpdate}
                                        onRemove={handleFieldRemove}
                                        />
                                ))
                        }
                </form>

        </div>
    </main>
  )
}

export default FormBuilder