import { TScalerArgs } from "../types";

const getBase64Thumbnail = ({
  file,
  scale = 0.1,
}: TScalerArgs): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvasElement = document.createElement("canvas");
        const ctx = canvasElement.getContext("2d");

        if (!ctx) {
          return;
        }

        const width = (canvasElement.width = img.width * scale);
        const height = (canvasElement.height = img.height * scale);

        ctx.drawImage(img, 0, 0, width, height);

        return resolve(canvasElement.toDataURL());
      };

      img.src = e?.target?.result as string;
    };

    reader.onerror = (e) => {
      reject(e.toString());
    };
  });
};

export default getBase64Thumbnail;
