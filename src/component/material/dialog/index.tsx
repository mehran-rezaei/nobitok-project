import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useTranslation } from "react-i18next";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function _Dialog({
  open,
  handleClose,
  title,
  description,
  type,
  handelyes,
  handelno,
}: any) {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {!!title ? <DialogTitle>{title}</DialogTitle> : <></>}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {type === "alert" ? (
            <Button onClick={handleClose} sx={{ color: "red" }}>
              {t("close")}
            </Button>
          ) : (
            <>
              <Button onClick={handelyes}>{t("yes")}</Button>
              <Button onClick={handelno}>{t("no")}</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
