import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout/Layout'
import Modal from '../components/elements/Modal'

type ContactType = {
  node: {
    id: string
    title: string
    emailAddress: string
  }
}

const contact = ({ data: { contacts, terms } }) => {
  const [termsOpen, setTermsOpen] = useState(false)

  const handleToggleModal = () => {
    setTimeout(() => {
      setTermsOpen(!termsOpen)
    }, 10)
  }

  console.log(terms.nodes)
  return (
    <Layout>
      {termsOpen && (
        <Modal text={terms.nodes[0]} toggleModal={handleToggleModal} />
      )}

      <main className='md:w-1/2 min-h-full  text-xl lg:text-3xl xl:text-4xl '>
        <ul className='space-y-8 text-left '>
          {contacts.edges.map((contact: ContactType, i) => {
            return (
              <li key={contact.node.id}>
                <h2 className='pb-1'>{contact.node.title}:</h2>
                <a
                  href={`mailto:${contact.node.emailAddress}`}
                  className={`${
                    i === 0
                      ? 'hover:text-clpink'
                      : i === 1
                      ? 'hover:text-clgreen'
                      : 'hover:text-clorange'
                  } hover:underline`}
                >
                  {contact.node.emailAddress}
                </a>
              </li>
            )
          })}
          <li className='hover:text-clorange hover:underline'>
            <button onClick={handleToggleModal}>TERMS & CONDITIONS</button>
          </li>
        </ul>
        <div className='h-10 w-10 md:h-8 md:w-8 md:absolute mt-12 bottom-[10%] left-4 md:bottom-4 md:left-4 hover:text-clred '>
          <a href='https://insagram.com/chopovalowena'>
            <svg
              fill='currentColor'
              version='1.1'
              id='Layer_1'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 24 24'
              xmlSpace='preserve'
            >
              <path d='M12,6c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S15.3,6,12,6z M12,16c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S14.2,16,12,16z' />
              <circle cx='18.5' cy='5.5' r='1.5' />
              <g>
                <path d='M21.5,2.5v19h-19v-19H21.5 M24,0H0v24h24V0L24,0z' />
              </g>
            </svg>
          </a>
        </div>
      </main>
    </Layout>
  )
}

export default contact

export const ContactQuery = graphql`
  query ContactQuery {
    contacts: allContentfulContact(sort: { fields: createdAt, order: ASC }) {
      edges {
        node {
          id
          emailAddress
          title
        }
      }
    }
    terms: allContentfulTermsAndConditions {
      nodes {
        title
        body {
          raw
        }
      }
    }
  }
`
