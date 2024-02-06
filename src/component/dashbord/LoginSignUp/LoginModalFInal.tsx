import React , {useContext} from 'react';
import { modalHandler } from '@/context/ModalContextProvider';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';


const LoginModalFInal = () => {
  const { t } = useTranslation();
  const { state , dispatch}:any = useContext(modalHandler)
  const sendData = () => {
    dispatch({type : 'OFF_FINAL'})
  }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        borderRadius: '20px',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        // overflow:'scroll',
        // overflow : 'hidden',
        maxHeight: 700,
        minHeight: 250,
      };

      const [open, setOpen] = React.useState(true);
      // const [open, setOpen] = React.useState(false);
  
      const handleOpen = () => setOpen(true);
      const handleClose = () => {
        setOpen(false);
        dispatch({type : 'OFF_FINAL'})
      }


    return (
        <div>
        <Modal
          // keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
      <Box sx={style} 
      // {...  { dir: "ltr" }}
      >
        <div className='flex justify-center items-center flex-col w-full'>
            <h1 className="text-center text-2xl my-10">{t('changePassword')}   </h1>
            <div className="text-center text-lg mt-3 text-[#9C9C9C]">
                 {t('passwordchangedsuccessfully')}
            </div>
        </div>
        
      </Box>
        </Modal>
        
        {/* <h1 onClick={handleOpen}>open me</h1> */}
        </div>
    );
};

export default LoginModalFInal;