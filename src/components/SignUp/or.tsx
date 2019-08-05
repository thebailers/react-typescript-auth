/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import * as colors from '../../styles/colors'

const or = css`
  color: ${colors.grey20};
  overflow: hidden;
  text-align: center;

  span.orWrap {
    padding: 16px;
    position: relative;
    text-align: center;
  }

  span.or {
    overflow-wrap: break-word !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    line-height: 1.28571em !important;
    color: rgb(118, 118, 118) !important;
    margin: 0px !important;
    text-align: cenmter;
  }

  span:before,
  span:after {
    content: '';
    border-bottom: 1px solid ${colors.grey30};
    position: absolute;
    top: 50%;
    width: 5000px;
  }

  span:before {
    right: 100%;
  }

  span:after {
    left: 100%;
  }
`

const Or = () => (
  <div css={or}>
    <span className="orWrap">
      <span className="or">Or, sign in with</span>
    </span>
  </div>
)

export default Or
