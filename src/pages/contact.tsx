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
      <main className='md:w-1/2'>
        <ul className='space-y-6 text-3xl'>
          {contacts.edges.map((contact: ContactType) => {
            return (
              <li key={contact.node.id}>
                <h2>{contact.node.title}:</h2>
                <a
                  href={`mailto:${contact.node.emailAddress}`}
                  className='hover:text-pink-600'
                >
                  {contact.node.emailAddress}
                </a>
              </li>
            )
          })}
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
