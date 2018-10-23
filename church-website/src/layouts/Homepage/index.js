import React, {PropTypes} from "react"
import Helmet from "react-helmet"
import { BodyContainer, joinUri, Link } from "phenomic"
import Loading from "../../components/Loading"
import Button from "../../components/Button"
import LatestPosts from "../../components/LatestPosts"
import LatestEvents from "../../components/LatestEvents"
import styles from "./index.css"

import Svg from "react-svg-inline"
import arrowSvg from "../../components/icons/iconmonstr-arrow-65.svg"

const Homepage = (props, { metadata: { pkg } }) => {
  const { isLoading, __url, head, body, footer  } = props;

  const metaTitle = head.metaTitle ? head.metaTitle : head.title

  const meta = [
    { property: "og:locale", content: "en_US" },
    { property: "og:site_name", content: "Surrey Christian Evangelical Church" },
    { property: "og:type", content: "article" },
    { property: "og:title", content: metaTitle },
    {
      property: "og:url",
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
    },
    { property: "og:description", content: head.description },
    { property: "og:image", content: joinUri(process.env.PHENOMIC_USER_URL, head.facebookImage) },
    { property: "article:publisher", content: "http://www.scecchinese.com" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: metaTitle },
    { name: "twitter:creator", content: `@${ pkg.twitter }` },
    { name: "twitter:description", content: head.description },
    { name: "description", content: head.description },
  ]

  return (
    <div className={ styles.page }>
      <Helmet
        title={ metaTitle }
        meta={ meta }
      />
      <section
        className={ styles.hero }
        style={ head.hero && {
          background: `#999 url(${ head.hero }) 50% 30% / cover`,
        } }
      >
        <div className={ styles.wrapper }>
          <h1 className={ styles.heading }>{ head.title }</h1>
        </div>

        <div className={ styles.arrow }>
          <Svg svg={ arrowSvg } cleanup />
        </div>
      </section>
      <section className={ styles.aboutSection }>
        <div className={ styles.wrapper }>
          <div className={ styles.aboutImage }>
            <img src={ head.aboutPhoto }
              srcSet={ head.aboutPhoto + ' 640w, ' + head.aboutPhotoBig + ' 1080w'}
              sizes={'(min-width: 768px) 50vw, 100vw'}
              alt={ "Surrey Christian Evangelical Church" } />
          </div>
          {
            isLoading
            ? <Loading />
            : <div className={ styles.aboutTextContainer }>
                <div className={ styles.body }>
                  <h2>关于我们</h2>
                  <div className={ styles.aboutText }>
                    <BodyContainer>{ body }</BodyContainer>
                  </div>
                </div>
                <Link to='about' className={styles.buttonLink}>
                  <Button>了解更多</Button>
                </Link>
              </div>
          }
        </div>
      </section>

      <section className={ styles.photoHighlight }>
        <div className={ styles.panelImage }
          style={ head.photoHighlight && {
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.0) ), url(${ head.photoHighlight })`,
          } }>
          <Link to='photos' className={styles.buttonLink}>
            <Button big light className={ styles.button }>影集</Button>
          </Link>
        </div>
      </section>

      <section className={ styles.eventsSection }>
        <div className={ styles.wrapper }>
          <div className={ styles.body }>
            <h2 className={ styles.sectionHeading }>Events</h2>
            <div className={ styles.eventsContainer}>
              <div className={ styles.eventsText }>
                <p>I travel around quite a bit. You can find me at these upcoming events!</p>
              </div>
              <LatestEvents className={ styles.eventsList }/>
            </div>
          </div>
          <Link to='events' className={styles.buttonLink}>
            <Button>动态</Button>
          </Link>
        </div>
      </section>

      <section className={ styles.blogSection }>
        <div className={ styles.wrapper }>
          <h2 className={ styles.sectionHeading }>文章</h2>
          <LatestPosts/>
          <Link to='blog' className={styles.buttonLink}>
            <Button>更多文章</Button>
          </Link>
        </div>
      </section>

      <section className={ styles.footerSection }>
        { footer }
      </section>
    </div>
  )
}

Homepage.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
  layout: PropTypes.string,
}

Homepage.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Homepage
