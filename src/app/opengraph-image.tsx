import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "MAENGDI — Game UI/UX & Visual Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "65px 75px",
        background: "#f7f7f2",
        color: "#22241f",
      }}
    >
      <div style={{ display: "flex", fontSize: 19, letterSpacing: 4 }}>
        A THOUGHTFUL MIND. A PLAYFUL EYE.
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 135,
            fontWeight: 700,
            letterSpacing: -9,
          }}
        >
          MAENGDI<span style={{ color: "#b93b20" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 35, marginTop: 17 }}>
          Game UI/UX & Visual Designer.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 17,
          color: "#62675c",
          borderTop: "1px solid #dcded5",
          paddingTop: 23,
        }}
      >
        <span>Thoughtful design.</span>
        <span>Playful perspective.</span>
      </div>
    </div>,
    size,
  );
}
