import gameImageMissing from "../assets/images/gameImageMissing.webp";

const getCroppedImageUrl = (url: string) => {
  if (url) {
    const target = "media/";
    const index = url.indexOf(target) + target.length;
    return url.slice(0, index) + "crop/600/400/" + url.slice(index);
  } else {
    return gameImageMissing;
  }
};

export default getCroppedImageUrl;
