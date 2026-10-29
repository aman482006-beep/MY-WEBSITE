import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFCF7",
        border: "2px solid #EAE2D8",
        borderRadius: 14,
        color: "#20232B",
        fontFamily: "Georgia, serif",
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: "-3px",
      }}>
        AJ<span style={{ color: "#F45C2A" }}>.</span>
      </div>
    ),
    { ...size },
  );
}
