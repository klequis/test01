import React from 'react'
import styled from 'styled-components'
import { ErrorLabel } from './ErrorLabel'
import classNames from 'classnames'

// eslint-disable-next-line
import { green, redf, yellow, purple } from 'logger'

const SelectControl = styled.select`
  width: 100%;
  max-width: ${(props) => props.maxWidth}px;
`

// max-width: ${props => props.maxWidth === 'none' ? 'none' : props.maxWidth}
// padding-bottom: 30.4px;

/**
 *
 * @param {array} margin // [num, num, num, num]
 */
const computeMargin = (margin) => {
  // if ()
}

/*
    <ErrorLabel /> is not used but there to preserve spacing when Select
    is used in row with TextEdit which will display error messages.
*/
export const Select = ({
  children,
  disabled,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  name,
  maxWidth,
  minWidth,
  onChange,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  value
}) => {
  green('Select: maxWidth', maxWidth)

  return (
    <div>
      <SelectControl
        className={classNames('custom-select', 'custom-select-sm')}
        disabled={disabled}
        margin={margin}
        SelectControl
        maxWidth={maxWidth}
        name={name}
        onChange={onChange}
        value={value}
      >
        {children}
      </SelectControl>
      <ErrorLabel text="" />
    </div>
  )
}
