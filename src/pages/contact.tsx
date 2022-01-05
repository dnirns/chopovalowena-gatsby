import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'

type ContactType = {
  node: {
    id: string
    title: string
    emailAddress: string
  }
}

const contact = ({ data: { contacts } }) => {
  return (
    <Layout>
      <main className='md:w-1/2 global-text-sizes'>
        <ul className='space-y-6 '>
          {contacts.edges.map((contact: ContactType, i) => {
            return (
              <li key={contact.node.id}>
                <h2>{contact.node.title}:</h2>
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
            <a href='#'>TERMS & CONDITIONS</a>
          </li>
        </ul>
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
  }
`
