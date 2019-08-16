import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

const PageWrapper = ({ title, children }) => {
  return (
    <>
      <Helmet>{title && <title>{title}</title>}</Helmet>
      {children}
    </>
  )
}
PageWrapper.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string
}

export default PageWrapper
