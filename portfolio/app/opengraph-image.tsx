import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ECE7DD",
          padding: "70px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#6F6A60",
          }}
        >
          <span>{site.role}</span>
          <span>{site.location}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -4,
              color: "#131210",
            }}
          >
            ARYAN
          </span>
          <span
            style={{
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -4,
              color: "#F23A1D",
            }}
          >
            JAISWAL
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#131210",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#F23A1D",
            }}
          />
          <span>Full-stack products, built end to end and shipped.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
