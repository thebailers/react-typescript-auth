import { css } from '@emotion/core'
import * as colors from '../../styles/colors'

const globalStyles = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: #f5f5f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
  }

  a {
    color: ${colors.anchor};
    text-decoration: none;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
    margin: 15px 0 25px;
  }

  p {
    margin-bottom: 15px;
  }

  button {
    font-size: 16px;
    font-weight: bold;
  }

  button:disabled,
  button[disabled] {
    background: #d6d6d6;
  }

  legend {
    margin: 25px 0 10px;
  }

  .error {
    background: ${colors.errorBackground};
    color: ${colors.error};
    display: block;
    margin: 15px 0 5px;
    padding: 4px;
  }

  .checkboxes {
    margin: 15px 0 35px;
  }

  .checkbox__item {
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.25;
    display: block;
    position: relative;
    min-height: 30px;
    margin-bottom: 10px;
    padding: 0 0 0 30px;
    clear: left;
  }

  .checkbox__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin: 0;
    opacity: 0;
  }

  .checkbox__label {
    display: inline-block;
    font-size: 1rem;
    line-height: 1.25;
    margin-bottom: 0;
    padding: 4px 15px 5px;
    cursor: pointer;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  .checkbox__label::before {
    content: '';
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border: 2px solid #414141;
    border-radius: 3px;
    background: transparent;
  }

  .checkbox__label::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 6px;
    width: 14px;
    height: 5px;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    border: solid;
    border-color: #333;
    border-width: 0 0 4px 4px;
    border-top-color: transparent;
    opacity: 0;
    background: transparent;
  }

  .checkbox__input:checked + .checkbox__label::after {
    opacity: 1;
  }
`

export default globalStyles
