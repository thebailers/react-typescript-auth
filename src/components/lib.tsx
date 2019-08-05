import styled from '@emotion/styled'
import * as colors from '../styles/colors'

/**
 * Form Elements
 */
export const TextInputLabel = styled.label`
  display: block;
  font-size: 15px;
  margin: 0 0 5px;
`

export const Input = styled.input`
  border: 1px solid ${colors.grey10};
  border-radius: 4px;
  font-size: 16px;
  line-height: 25px;
  margin-bottom: 20px;
  padding: 12px 15px;
  width: 100%;
`
export const Button = styled.button`
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  line-height: 25px;
  padding: 12px 0;
  text-transform: uppercase;
  width: 100%;
`

export const LinkButton = styled.button`
  background: transparent;
  color: ${colors.anchor};
  border: none;
  font-size: 16px;
  font-weight: normal;
  line-height: 25px;
  padding: 0;
`

/**
 * Typographical
 */

export const H1 = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
`
