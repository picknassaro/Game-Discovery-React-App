import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "067fa8440612494bb004aa100e3d5004",
  },
});
