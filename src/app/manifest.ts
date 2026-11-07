import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FOXPHASE — Independent Sound. No Limits.",
    short_name: "FOXPHASE",
    description:
      "Official digital experience and Beat Store of independent music producer FOXPHASE.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
  };
}
