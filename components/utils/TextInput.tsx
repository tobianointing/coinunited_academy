interface ITextInput {
    type: string;
    name: string;
    placeholder: string;
    icon: any;
    className?: string; 
}



const TextInput = ({name, placeholder, icon, className, type}:ITextInput) => {
  const Icon = icon
    return (
    <div className="group focus-within:border-[#ED8B18] flex items-center space-x-2 bg-white px-3 w-full border-[#76808F80] border p-1 rounded-md">
        <Icon className='w-5 h-5 text-[#62636B] group-focus-within:text-[#ED8B18]' />
        <input 
        className={"bg-white border-none p-1 focus:ring-0 text-[1.125rem] placeholder:text-[#62636B] " + className} 
        type={type} name={name} placeholder={placeholder} />
    </div>
  )
}

export default TextInput
