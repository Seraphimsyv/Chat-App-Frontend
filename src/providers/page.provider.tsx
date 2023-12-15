import { useState, useContext, createContext } from 'react';
import { IChildrenProps } from '../common/props';

interface IContext {
  url: string;
  handleSetUrl: (url: string) => void;
}

interface IProvider extends IChildrenProps {}

const PageContext = createContext<IContext | undefined>(undefined);

const PageProvider: React.FC<IProvider> = ({ children }) => {
  const [url, setUrl] = useState<string>('/');

  const handleSetUrl = (url: string) => {
    window.history.pushState(null, '', url);
    setUrl(url);
  }

  return (
    <>
      <PageContext.Provider value={{ url, handleSetUrl }}>
        {children}
      </PageContext.Provider>
    </>
  )
}

const usePage = () => {
  const context = useContext(PageContext);

  if (!context)
    throw new Error('Page context must be wrapped in Provider');

  return context;
}

export { PageContext, PageProvider, usePage };