import React from "react"

import Svg from "react-svg-inline"
import facebookSvg from "../icons/iconmonstr-facebook-3.svg"
import instagramSvg from "../icons/iconmonstr-instagram-6.svg"

import styles from "./index.css"

const Footer = () => (
  <footer className={ styles.footer }>
    { /* If you like Phenomic, this is a way to share the love ;) */ }
    <p>
      { "Website by "}
      <a
        href="http://www.scecchinese.com"
        className={ styles.footerLink }
        target="_blank"
        rel="noopener noreferrer"
      >
        { "素里中国福音教会" }
      </a>
      { ". Made with " }
      <span className={ styles.heart }>{ "♥" }</span>
      { " and " }
      <a
        href={ process.env.PHENOMIC_HOMEPAGE }
        className={ styles.footerLink }
        target="_blank"
        rel="noopener noreferrer"
      >
        { `<${ process.env.PHENOMIC_NAME} />` }
      </a>
    </p>

    <ul className={ styles.socialLinks }>
      <li>
        <a
          href={ `` }
          className={ styles.link }
          target="_blank"
          rel="me noopener noreferrer"
        >
          <Svg svg={ facebookSvg } cleanup />
        </a>
      </li>
      <li>
        <a
          href={ `` }
          className={ styles.link }
          target="_blank"
          rel="me noopener noreferrer"
        >
          <Svg svg={ instagramSvg } cleanup />
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer
