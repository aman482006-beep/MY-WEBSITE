import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFCF7",
        border: "3px solid #EAE2D8",
        borderRadius: 34,
        color: "#20232B",
        fontFamily: "Georgia, serif",
        fontSize: 92,
        fontWeight: 700,
        letterSpacing: "-8px",
      }}>
        AJ<span style={{ color: "#F45C2A" }}>.</span>
      </div>
    ),
    { ...size },
  );
}
