import React, { useState, useEffect, FormEvent } from "react";

import DeviceSelectionScreen from "./DeviceSelectionScreen/DeviceSelectionScreen";
import IntroContainer from "../IntroContainer/IntroContainer";
import MediaErrorSnackbar from "./MediaErrorSnackbar/MediaErrorSnackbar";
import RoomNameScreen from "./RoomNameScreen/RoomNameScreen";
import { useAppState } from "../../state";
import { useParams } from "react-router-dom";
import useVideoContext from "../../hooks/useVideoContext/useVideoContext";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Participant } from "@twilio/conversations/lib/participant";

export enum Steps {
  roomNameStep,
  deviceSelectionStep,
}

enum ParticipantTypes {
  DOCTOR = "doctor",//Main room
  PATIENT = "patient",
}

export default function PreJoinScreens() {
  const { user } = useAppState();
  const { getAudioAndVideoTracks } = useVideoContext();
  const { URLRoomName } = useParams();
  const [step, setStep] = useState(Steps.roomNameStep);

  const [name, setName] = useState<string>(user?.displayName || "");
  const [roomName, setRoomName] = useState<string>("");

  const [mediaError, setMediaError] = useState<Error>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  useEffect(() => {
    if (URLRoomName) {
      setRoomName(URLRoomName);
      if (user?.displayName) {
        setStep(Steps.deviceSelectionStep);
      }
    }
  }, [user, URLRoomName]);

  useEffect(() => {
    if (step === Steps.deviceSelectionStep && !mediaError) {
      getAudioAndVideoTracks().catch((error) => {
        console.log("Error acquiring local media:");
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, step, mediaError]);

  const handleSubmit = (type: string, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // If this app is deployed as a twilio function, don't change the URL because routing isn't supported.
    if (type === ParticipantTypes.PATIENT) {
      const currentTime = new Date();

      const startTime = new Date();
      startTime.setHours(0);
      startTime.setMinutes(0);
      startTime.setSeconds(0);

      const endTime = new Date();
      endTime.setHours(24);
      endTime.setMinutes(50);
      endTime.setSeconds(0);

      if (currentTime.getTime() < startTime.getTime()) {
        setModalMessage(`Hi the Appointment starts at ${startTime}`);
        setIsModalOpen(true);
        return;
      }

      if (currentTime.getTime() > endTime.getTime()) {
        setModalMessage(`Hi the Appointment ended  at ${endTime}` + " please contact help team");
        setIsModalOpen(true);
        return;
      }
    }

    if (!window.location.origin.includes("twil.io")) {
      window.history.replaceState(
        null,
        "",
        window.encodeURI(
          `/room/${roomName}${window.location.search || ""}#${type}`
        )
      );
    }
    setStep(Steps.deviceSelectionStep);
  };

  const checkParticipant = (event: FormEvent<HTMLFormElement>) => {
    let participantType = ParticipantTypes.PATIENT;
    if (name === ParticipantTypes.DOCTOR) {
      participantType = ParticipantTypes.DOCTOR;
    }
    handleSubmit(participantType, event);
  };

  const AlertModal = () => {
    return (
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Alert variant="outlined" severity="info">
          <DialogTitle id="alert-modal-title">{modalMessage}</DialogTitle>
          <DialogActions>
            <Button onClick={() => setIsModalOpen(false)} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Alert>
      </Dialog>
    );
  };

  const Intro = () => (
    <IntroContainer>
      <MediaErrorSnackbar error={mediaError} />
      <AlertModal />
      {step === Steps.roomNameStep && (
        <RoomNameScreen
          name={name}
          roomName={roomName}
          setName={setName}
          setRoomName={setRoomName}
          handleSubmit={checkParticipant}
        />
      )}
    </IntroContainer>
  );

  const WaitingScreen = () => (
    <DeviceSelectionScreen name={name} roomName={roomName} setStep={setStep}/>
  );

  return <>{step === Steps.deviceSelectionStep ? WaitingScreen() : Intro()}</>;
}
