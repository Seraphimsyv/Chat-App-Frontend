import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import './index.css';

interface IHeaderProps {
  handleMenuShow: () => void;
}

export const Header: React.FC<IHeaderProps> = (props) => {
  const { 
    handleMenuShow
  } = props;

  return (
    <>
      <div id="header">
        
        <Button
          color='primary'
          sx={{
            height: '100%'
          }}
          onClick={handleMenuShow}
        >
          <MenuIcon/>
        </Button>

      </div>
    </>
  )
}