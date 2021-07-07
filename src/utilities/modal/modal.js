import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import "./modal.scss";
import CloseIcon from "@material-ui/icons/Close";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    minHeight: "150px",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
}));

export default function SimpleModal({
  openModal,
  header,
  content,
  handleClose,
  buttonType,
  handleModalChange,
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="modal-close">
        <CloseIcon onClick={handleClose}></CloseIcon>
      </div>
      <h2 id="simple-modal-title">{header}</h2>
      <p id="simple-modal-description">{content}</p>
      <div className="button-container">
        <Button
          variant="contained"
          className="btn-primary"
          onClick={() => handleModalChange(buttonType)}
        >
          {buttonType}
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
