import { readFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * The shared frame for social-preview images, rendered by `next/og` at build
 * time. Satori supports flexbox only, so every multi-child box is
 * `display: flex`, and the fonts are read once from tracked files rather than
 * fetched.
 */
export const openGraphSize = { width: 1200, height: 630 }
export const openGraphContentType = "image/png"

const palette = {
  paper: "#F4F1E8",
  peat: "#15211B",
  peatMuted: "#4F5B54",
  synthetic: "#C8E84A",
  syntheticInk: "#1B2600",
}

const root = process.cwd()
const [display, body, mark] = await Promise.all([
  readFile(join(root, "assets/fonts/BricolageGrotesque-ExtraBold.ttf")),
  readFile(join(root, "assets/fonts/SplineSans-Regular.ttf")),
  readFile(join(root, "public/lab-notes-mark.png")),
])

export const openGraphFonts = [
  { name: "Bricolage Grotesque", data: display, weight: 800, style: "normal" },
  { name: "Spline Sans", data: body, weight: 400, style: "normal" },
] as const

const markDataUrl = `data:image/png;base64,${mark.toString("base64")}`

type OpenGraphCardProps = {
  eyebrow: string
  title: string
  titleSize: number
  description: string
  /** Short uppercase label in the acid tag, bottom left. */
  tag: string
  /** Plain sentence beside the tag. */
  note: string
}

export function OpenGraphCard({
  eyebrow,
  title,
  titleSize,
  description,
  tag,
  note,
}: OpenGraphCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 56,
        background: palette.paper,
        border: `6px solid ${palette.peat}`,
        color: palette.peat,
        fontFamily: "Spline Sans",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/image cannot render inside ImageResponse */}
        <img
          src={markDataUrl}
          width={72}
          height={72}
          alt=""
          style={{ width: 72, height: 72 }}
        />
        <div
          style={{
            display: "flex",
            marginLeft: 20,
            fontFamily: "Bricolage Grotesque",
            fontSize: 34,
            letterSpacing: -1,
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Bricolage Grotesque",
            fontSize: titleSize,
            lineHeight: 1,
            letterSpacing: -titleSize * 0.04,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 28,
            lineHeight: 1.35,
            color: palette.peatMuted,
            maxWidth: 1000,
            lineClamp: 3,
          }}
        >
          {description}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            padding: "10px 16px",
            background: palette.synthetic,
            color: palette.syntheticInk,
            border: `3px solid ${palette.peat}`,
            fontFamily: "Bricolage Grotesque",
            fontSize: 22,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {tag}
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: 20,
            fontSize: 24,
            color: palette.peatMuted,
          }}
        >
          {note}
        </div>
      </div>
    </div>
  )
}
