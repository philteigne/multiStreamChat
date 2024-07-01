import * as React from "react"
const YoutubeLogo = (props) => (
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
    viewBox="0 1 14 14"
    {...props}
  >
    <path
      d="M0 0h400v400H0z"
      style={{
        fill: "#fff",
        fillRule: "nonzero",
      }}
      transform="matrix(.02996 0 0 .02018 1.029 2.943)"
    />
    <path
      d="M199.917 105.63s-84.292 0-105.448 5.498c-11.328 3.165-20.655 12.492-23.821 23.987-5.497 21.156-5.497 64.968-5.497 64.968s0 43.979 5.497 64.802c3.166 11.495 12.326 20.656 23.821 23.821 21.322 5.664 105.448 5.664 105.448 5.664s84.459 0 105.614-5.498c11.495-3.165 20.655-12.159 23.654-23.82 5.664-20.99 5.664-64.802 5.664-64.802s.166-43.979-5.664-65.135c-2.999-11.495-12.159-20.655-23.654-23.654-21.155-5.83-105.614-5.831-105.614-5.831Zm-26.821 53.974 70.133 40.479-70.133 40.313v-80.792Z"
      style={{
        fill: "red",
        fillRule: "nonzero",
      }}
      transform="matrix(.05191 0 0 .05191 -3.382 -3.382)"
    />
  </svg>
)
export default YoutubeLogo
