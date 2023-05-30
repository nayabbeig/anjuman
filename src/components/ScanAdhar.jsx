import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { QrReader } from "react-qr-reader";

export const closeCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  stream.getTracks().forEach(function (track) {
    track.stop();
    track.enabled = false;
  });
  const videoElement = document.getElementById("adharScanner");
  videoElement?.current?.stopCamera?.();
};

export const useScanner = () => {
  const [selectedCamera, setSelectedCamera] = useState(null);
  console.log("selectedCamera", selectedCamera);

  const CameraSelector = () => {
    const [cameraList, setCameraList] = useState(null);

    useEffect(() => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        console.log("devices", devices);
        const videoInputDevices = devices?.filter?.(
          (device) => device.kind === "videoinput"
        );
        // const droidCam =
        //   devices.find((device) => device.label === "DroidCam Source 3") ||
        //   devices.find((device) => device.label === "DroidCam Source 2");
        // setSelectedDevice(droidCam.deviceId || "");
        setCameraList([...videoInputDevices] || []);
        // setSelectedCamera(videoInputDevices[0]);
      });
    }, []);

    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Camera Devices
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {cameraList?.map((camera) => (
            <Dropdown.Item onClick={() => setSelectedCamera(camera)}>
              {camera.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const QRScanner = ({ setData }) => {
    function xmlToJson(xml) {
      const parser = new DOMParser();
      const xmlElement = parser.parseFromString(xml, "text/xml");
      const xmlNode = xmlElement.all[0];
      const properties = xmlNode.getAttributeNames();
      const object = {};
      properties.forEach((property) => {
        object[property] = xmlNode.getAttribute(property);
      });
      return object;
    }
    return (
      <>
        <CameraSelector />
        {
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                // alert(result?.text);
                console.log(result?.text);
                setData(JSON.stringify(xmlToJson(result?.text)));
              }

              if (!!error) {
                console.info("error scanning");
              }
            }}
            scanDelay={100}
            style={{ width: "100%", border: "5px solid black" }}
            videoId="adharScanner"
            constraints={
              (selectedCamera?.deviceId || undefined) && {
                deviceId: selectedCamera.deviceId,
              }
            }
          />
        }
      </>
    );
  };

  return [QRScanner, CameraSelector];
};

export const ScanAdhar = ({ setData }) => {
  const [deviceId, setDeviceId] = useState(null);
  console.log("deviceId", deviceId);
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      console.log("devices", devices);
      const droidCam =
        devices.find((device) => device.label === "DroidCam Source 3") ||
        devices.find((device) => device.label === "DroidCam Source 2");
      setDeviceId(droidCam.deviceId || "");
    });
  }, []);

  function xmlToJson(xml) {
    const parser = new DOMParser();
    const xmlElement = parser.parseFromString(xml, "text/xml");
    const xmlNode = xmlElement.all[0];
    const properties = xmlNode.getAttributeNames();
    const object = {};
    properties.forEach((property) => {
      object[property] = xmlNode.getAttribute(property);
    });
    return object;
  }
  return (
    <>
      {typeof deviceId === "string" && (
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              alert(result?.text);
              setData(JSON.stringify(xmlToJson(result?.text)));
            }

            if (!!error) {
              console.info(error);
            }
          }}
          scanDelay={100}
          style={{ width: "100%", border: "5px solid black" }}
          videoId="adharScanner"
          //   constraints={
          //     (deviceId || undefined) && {
          //       deviceId,
          //     }
          //   }
        />
      )}
    </>
  );
};

export default ScanAdhar;
