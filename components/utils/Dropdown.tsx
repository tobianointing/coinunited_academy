import Image from "next/image"

export const Dropdown = ({label, children}:{label:string, children: any}) => {
  return (
    <div className="relative group">
        <div className="flex items-center cursor-pointer space-x-2 group-hover:text-site-amber">
            <span>{label}</span>
            <div className="group-hover:rotate-180 transition ease-in duration-300">
                <Image src='/img/drop.svg' alt='dropdown' objectFit="contain" width={9} height={9} />
            </div>
        </div>

        <ul className="z-50 bg-white absolute hidden group-hover:block min-w-[6rem] shadow-xl border rounded">
            {children}
        </ul>
    </div>
  )
}

export const DropdownItem = ({children}:{children: any}) => {
    return (
        <li className="cursor-pointer transition ease-out duration-200 p-3 px-4 hover:bg-[#9797971A]">
            {children}
        </li>
    )
}

