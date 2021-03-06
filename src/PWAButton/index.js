import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PWAPrompt from "react-ios-pwa-prompt";
import { recordAddToHomescreen } from "../gaEvents";

function isMobile() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

function addToHomeScreen(setShowIOSPrompt) {
  recordAddToHomescreen();
  if (["iPhone", "iPad", "iPod"].includes(navigator.platform)) {
    setShowIOSPrompt(false);
    process.nextTick(() => {
      setShowIOSPrompt(true);
    });
  } else {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
    }
  }
}

function PWAInstallButton() {
  // TODO: don't show on desktop
  // TODO: don't show if the app is already installed
  // Adds the `deferredPrompt` object to the window.
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    window.deferredPrompt = event;
  });
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  return (
    <>
      {isMobile() ? (
        <Button
          size="sm"
          variant="outline-success"
          className="ml-auto a2hs-button"
          onClick={() => addToHomeScreen(setShowIOSPrompt)}
        >
          Add to Homescreen
        </Button>
      ) : null}
      {showIOSPrompt && (
        <PWAPrompt
          debug={true}
          promptOnVisit={50}
          timesToShow={50}
          delay={200}
          copyClosePrompt="Close"
          permanentlyHideOnDismiss={false}
        />
      )}
    </>
  );
}

export default PWAInstallButton;
