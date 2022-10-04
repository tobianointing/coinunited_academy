
const Container = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="container mx-auto overflow-hidden p-5 max-w-6xl">
         {children}   
    </div>
  )
}

export const Container_2 = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="container mx-auto my-5  p-5 max-w-4xl">
         {children}   
    </div>
  )
}

export default Container;