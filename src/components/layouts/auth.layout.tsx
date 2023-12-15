import { useState } from 'react';
import { IChildrenProps } from "../../common/props"
import { Aside } from "../Aside";
import { Header } from "../Header";

export const AuthLayout: React.FC<IChildrenProps> = ({ children }) => {
  const [menuHidden, setMenuHidden] = useState<boolean>(true);
  
  return (
    <div id="auth-layout" className="app__layout">

      {/* Desktop */}
      <Header
        handleMenuShow={() => setMenuHidden(false)}
      />

      <Aside
        isHidden={menuHidden}
        handleMenuShow={() => setMenuHidden(true)}
      />

      {children}

    </div>
  )
}