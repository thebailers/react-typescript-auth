import React from 'react'

type P = {
  message: string
}

export const FormErrorPanel = ({ message }: P) => (
  <span className="error" data-testid="error-message">
    {message}
  </span>
)
