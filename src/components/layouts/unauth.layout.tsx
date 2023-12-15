import { IChildrenProps } from "../../common/props"

export const UnAuthLayout: React.FC<IChildrenProps> = ({ children }) => {
  
  return (
    <div id="unauth-layout" className="app__layout">
      {children}
    </div>
  )
}