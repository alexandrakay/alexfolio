import React from "react"
import { graphql } from 'gatsby'
import { Router, Link } from '@reach/router';

import Layout from '../components/layout'
import Hero from '../components/hero'

//this is for spa
const Project = React.lazy(() => import('../components/projects'))
const About = React.lazy(() => import('../components/about.js'))

const LazyComponent = ({ Component, ...props }) => (
  <React.Suspense fallback={'<p>Loading...</p>'}>
    <Component {...props} />
  </React.Suspense>
);

const IndexPage = ({ data }) => {
  return (
    <>
    <Layout>

    <Link to='/'>Home</Link>

      <Link to='/projects/'>Projects</Link>
      <Link to="/about">About</Link>
  
      <Router>
      <Hero content={data.hero.edges[0].node} path="/" />
      <LazyComponent Component={Project} path="projects" />
      <LazyComponent Component={About} path="about" />
    </Router>
    </Layout>
</>
  )
}

export default IndexPage


export const pageQuery = graphql`
  {
    hero: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            greetings
            emoji
            subtitlePrefix
            subtitleHighlight
          }
          rawMarkdownBody
        }
      }
    }
  }
`