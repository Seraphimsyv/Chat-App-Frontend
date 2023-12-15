import { useEffect, useRef } from 'react';
import './index.css';

interface IAsideProps {
  isHidden: boolean;
  handleMenuShow: () => void;
}

export const Aside: React.FC<IAsideProps> = (props) => {
  const { isHidden } = props;
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (asideRef.current) {

      if (isHidden) {
        asideRef.current.classList.contains('show')
        && asideRef.current.classList.remove('show');

        asideRef.current.classList.add('hidden');
      } else {
        asideRef.current.classList.contains('hidden')
        && asideRef.current.classList.remove('hidden');

        asideRef.current.classList.add('show');
      }
    }
  }, [isHidden])

  const handleHideMenu = (evt: React.MouseEvent<HTMLDivElement>) => {

    if (!asideRef.current) return;

    if (evt.target === asideRef.current) props.handleMenuShow();
  }

  return (
    <>
      <aside
        id="aside-block"
        ref={asideRef}
        onClick={handleHideMenu}
      >

        <div id="aside-menu">

        </div>

      </aside>
    </>
  )
}