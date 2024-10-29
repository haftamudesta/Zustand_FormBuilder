import React from "react";

interface formFieldProps{
        field:{
                label:string,
                type:'text'|'number'|'email'|'password'|'textarea'|'date'|'file',
                value:string
        },
        index:number,
        onUpdate:(
                index:number,
                updatedField:{
                        label:string,
                        type:'text'|'number'|'email'|'password'|'textarea'|'date'|'file',
                        value:string
                }
        )=>void;
        onRemove:(index:number)=>void,
}

export const FormField:React.FC<formFieldProps> = ({field,index,onUpdate,onRemove}) => {

        const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
                onUpdate(index,{...field,value:e.target.value})
        }
        const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
                onUpdate(index,{...field,value:e.target.files?Array.from(e.target.files).map((file)=>file.name).join(', '):''})
        }
  return (
    <div className="mb-4 p-4 rounded-lg border border-gray-300 shadow-md">
        <label htmlFor="">{field.label}</label>
        {field.type==='textarea'?(
                <textarea value={field.value} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:bg-teal-500"/>
        ):field.type==='file'?(<input type="file" value={field.value} onChange={handleFileChange} className="mt-2 border border-gray-300 rounded-lg"/>):(<input type={field.type} value={field.type==='file'? '':field.value} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:bg-teal-500"/>)}

        <button className="px-4 py-0.5 bg-red-500 text-white mt-4 rounded-lg hover:bg-red-600 transition-none duration-200" onClick={()=>onRemove(index)}>Remove</button>
    </div>
  )
}
