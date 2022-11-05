
const Container = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="container mx-auto overflow-hidden px-5 py-3 md:p-5 max-w-6xl">
         {children}   
    </div>
  )
}

export const Container_2 = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="container mx-auto overflow-hidden p-5 max-w-[720px]">
         {children}   
    </div>
  )
}

export default Container;