import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    height={18}
    viewBox="0 0 13 14"
    {...props}
  >
    <path
      d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600v1100Z"
      style={{
        fill: "#fff",
        fillRule: "nonzero",
      }}
      transform="translate(.3) scale(.005)"
    />
    <path
      d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500Zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100Z"
      style={{
        fill: "#9146ff",
        fillRule: "nonzero",
      }}
      transform="translate(.3) scale(.005)"
    />
    <path
      d="M1700 550h200v600h-200zM1150 550h200v600h-200z"
      style={{
        fill: "#9146ff",
      }}
      transform="translate(.3) scale(.005)"
    />
  </svg>
)
export default SvgComponent
