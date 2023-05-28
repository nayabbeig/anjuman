import { QRCodeSVG } from "qrcode.react";

import MoonStar from "../assets/images/MoonStar.png";

const QRGenerator = ({ value }) => {
  console.log("qr value", value);
  return (
    <QRCodeSVG
      value={value}
      size={100}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      includeMargin={false}
      imageSettings={{
        src: MoonStar,
        x: undefined,
        y: undefined,
        height: 24,
        width: 24,
        excavate: true,
      }}
    />
  );
};

export default QRGenerator;
