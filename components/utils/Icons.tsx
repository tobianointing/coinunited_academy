import Image from "next/image"

export const CheckIcon = () => {
    return <div>
            <Image src="/img/checkIcon.svg" alt="check icon" width={10} height={10} objectFit='contain' priority/>
            </div> 
}

export const PlusIcon = () => {
    return <div> 
                <Image src="/img/plusIcon.svg" alt="plus icon" width={10} height={10} objectFit='contain' priority/>
            </div>
}