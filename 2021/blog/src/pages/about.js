import React from "react"
import Link from "gatsby-link"

const AboutPage = () => (
  <div style={{
    background: "yellow",
    paddingTop: "10px"
  }}>
    <h1>こんにちは！</h1>
    ようこそ！楽しんでね！

    <ul style={{
      listStyle: "none",
      display: 'flex',
      justifyContent: 'space-evenly'
    }}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/page-2">ページ２</Link></li>
    </ul>
  </div>
)

export default AboutPage