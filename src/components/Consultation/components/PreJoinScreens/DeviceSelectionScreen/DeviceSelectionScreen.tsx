import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Popover,
  Button,
  Hidden,
} from "@material-ui/core";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import HelpIcon from "@material-ui/icons/Help";

import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import LocalVideoPreview from "./LocalVideoPreview/LocalVideoPreview";
import DeviceSelectionDialog from "../../DeviceSelectionDialog/DeviceSelectionDialog";
import AvatarIcon from "../../../icons/AvatarIcon";
import ToggleAudioButton from "../../Buttons/ToggleAudioButton/ToggleAudioButton";
import ToggleVideoButton from "../../Buttons/ToggleVideoButton/ToggleVideoButton";
import DisconnectButton from "../../Buttons/DisconnectButton/DisconnectButton";
import ChatButton from "../../Buttons/ChatButton/ChatButton";

import AddPersonButton from "../../Buttons/AddPersonButton/AddPersonButton";
import useChatContext from "../../../hooks/useChatContext/useChatContext";
import useVideoContext from "../../../hooks/useVideoContext/useVideoContext";
import { useAppState } from "../../../state";
import { Steps } from "../PreJoinScreens";
import { deviceSelectionScreenStyles as useStyles } from "./styles";
import NetworkQualityLevel from "../../NetworkQualityLevel/NetworkQualityLevel";


interface DeviceSelectionScreenProps {
  name: string;
  roomName: string;
  setStep: (step: Steps) => void;
}

enum ParticipantTypes {
  DOCTOR = "doctor",
  PATIENT = "patient",
}

export default function DeviceSelectionScreen({
  name,
  roomName,
  setStep,
}: DeviceSelectionScreenProps) {
  const classes = useStyles();
  const [deviceSettingsOpen, setDeviceSettingsOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(1);
  const { getToken, isFetching } = useAppState();
  const { connect: chatConnect } = useChatContext();
  const {
    connect: videoConnect,
    isAcquiringLocalTracks,
    isConnecting,

  } = useVideoContext();

  // const localParticipant = room!.localParticipant;

  const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;
  const GRADIENT_COLORS: any = [
    ["#FFCA28", 0.5],
    ["#E65100", 0.5],
  ];

  useEffect(() => {
    const type = window.location.hash.replace("#", "");
    if (type === ParticipantTypes.DOCTOR) {
      handleJoin();
    }
  }, []);

  const currentDateTime = new Date();
  let futureDateTime = new Date();
  futureDateTime.setSeconds(currentDateTime.getSeconds() + 10);

  const getDurationInMinutes = (): number => {
    return moment(futureDateTime).diff(moment(currentDateTime), "minutes");
  };

  const getDurationInSeconds = (): number => {
    return moment(futureDateTime).diff(moment(currentDateTime), "seconds");
  };

  const doctorInfo = {
    name: "Dr Lisa Ray Md",
    duration: `${getDurationInMinutes()} Minutes`,
    startTime: moment().format("hh:mm a"),
    endTime: moment(futureDateTime).format("hh:mm a"),
  };

  const getTimer = (): React.ReactElement => {
    const hours = formatZeros(Math.floor((remainingTime % (3600 * 24)) / 3600));
    const minutes = formatZeros(Math.floor((remainingTime % 3600) / 60));
    const seconds = formatZeros(remainingTime % 60);

    return (
      <p className={classes.timer}>
        <div>
          <span className={hours === "00" ? "" : classes.textOrange}>
            {hours}
          </span>
          :
          <span className={minutes === "00" ? "" : classes.textOrange}>
            {minutes}
          </span>
          :
          <span className={seconds === "00" ? "" : classes.textOrange}>
            {seconds}
          </span>
        </div>
        <p className={classes.timerMiniText}>
          <p className={classes.miniText}>Hours</p>
          <p className={classes.miniText}>Minutes</p>
          <p className={classes.miniText}>Seconds</p>
        </p>
      </p>
    );
  };

  const formatZeros = (number: number): string | number => {
    return number < 10 ? "0" + number : number;
  };

  const renderTimer = (): React.ReactElement => {
    return (
      <CountdownCircleTimer
        isPlaying
        duration={getDurationInSeconds()}
        strokeWidth={4}
        size={100}
        isLinearGradient
        colors={GRADIENT_COLORS as any}
        onComplete={() => handleJoin()}
      >
        {({ remainingTime }) => {
          remainingTime && setRemainingTime(remainingTime);
          return <AvatarIcon />;
        }}
      </CountdownCircleTimer>
    );
  };

  const renderActions = (): React.ReactElement => {
    return (
      <Grid container justify="center">
              {/* <div >
        <NetworkQualityLevel participant={localParticipant} />
        <p className={classes.textStyling}>
    rohith
        </p>
      </div> */}

        <Grid
          container
          direction="column"
          justify="space-between"
          style={{ height: "100%" }}
        >
          <div className={classes.audioVideoTestBtnContainer}>
            <Grid className={classes.iconContainer}>
              <PopupState variant="popover">
                {(popupState) => (
                  <div>
                    <HelpIcon
                      color="action"
                      fontSize="large"
                      {...bindTrigger(popupState)}
                    />
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                    >
                      <Box p={2}>
                        <Typography>
                          Having connectivity issues?
                          <br />
                          click on chat icon to let your provider know.
                        </Typography>
                      </Box>
                    </Popover>
                  </div>
                )}
              </PopupState>
            </Grid>
            <Button
              variant="outlined"
              onClick={() => setDeviceSettingsOpen(true)}
              className={classes.testAudiVideoBtn}
            >
              Test your audio and video
            </Button>
          </div>

          <div className={classes.buttonsContainer}>
            <ToggleAudioButton
              className={classes.buttons}
              disabled={disableButtons}
              hideLabel
            />
            <ToggleVideoButton
              className={classes.buttons}
              disabled={disableButtons}
              hideLabel
            />
            <ChatButton className={classes.buttons} onClick={() => {}} />
            <AddPersonButton className={classes.buttons} onClick={() => {}} />
            <DisconnectButton
              className={classes.disconnectButton}
              onClick={() => {
                window.location.href = "/video";
                setStep(Steps.roomNameStep);
              }}
            />
          </div>
        </Grid>
      </Grid>
    );
  };

  const renderDurationInfo = (): React.ReactElement => {
    return (
      <div className={classes.durationInfoContainer}>
        <p className={classes.textStyling}>
          Start time: {doctorInfo.startTime}
        </p>
        <p className={classes.textStyling}>Ends at: {doctorInfo.endTime}</p>
      </div>
    );
  };

  const handleJoin = () => {
    getToken(name, roomName).then((token) => {
      videoConnect(token);
      // process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== "true" &&
      //   chatConnect(token);
    });
  };

  if (isFetching || isConnecting) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ height: "100%" }}
      >
        <div>
          <CircularProgress variant="indeterminate" />
        </div>
        <div>
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", fontSize: "16px" }}
          >
            Joining Meeting
          </Typography>
        </div>
      </Grid>
    );
  }

  return (
    <>
      <div className={classes.background}>
        <div className={classes.bodyContainer}>
          {renderTimer()}

          <div className={classes.contentStyling}>
            <p className={classes.doctorNameStyling}>{doctorInfo.name}</p>
            <p className={classes.captionStyling}>
              Call Duration: <strong>{doctorInfo.duration}</strong>
            </p>
            <p className={classes.content}>
              Waiting for your physician to start this meeting
            </p>
            <p className={classes.captionStyling}>Meeting starts in:</p>
            {getTimer()}
          </div>

          <div className={classes.localPreviewContainer}>
            <LocalVideoPreview identity={name} />
          </div>
          {renderDurationInfo()}
        </div>
        {renderActions()}
      </div>

      <DeviceSelectionDialog
        open={deviceSettingsOpen}
        onClose={() => {
          setDeviceSettingsOpen(false);
        }}
      />
    </>
  );
}
