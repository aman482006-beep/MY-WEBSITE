import { ImageResponse } from "next/og";

export const alt = "Aman Jain — Finance × Technology × Communication";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 78px",
        background: "#FFFCF7",
        color: "#20232B",
        border: "1px solid #EAE2D8",
        fontFamily: "Georgia, serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 700, letterSpacing: "-5px" }}>AJ<span style={{ color: "#F45C2A" }}>.</span></div>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "5px" }}>AMAN JAIN</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Arial, sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: "4px", color: "#F45C2A" }}>
            FINANCE <span style={{ color: "#B9B4AD" }}>×</span> TECHNOLOGY <span style={{ color: "#B9B4AD" }}>×</span> COMMUNICATION
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 62, lineHeight: 1.08, letterSpacing: "-2px" }}>
            <span>I study finance.</span>
            <span>I <span style={{ color: "#F45C2A", fontStyle: "italic" }}>build</span> with technology.</span>
            <span>I create to make ideas useful.</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "Arial, sans-serif", fontSize: 18, color: "#626670" }}>
          <span>Student · Builder · Creator</span>
          <span style={{ color: "#F45C2A" }}>amanmalu.me</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
