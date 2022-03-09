import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import React from 'react'

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <span className='tw-font-bold'>{text}</span>,
    [MARKS.ITALIC]: (text) => <span className='tw-italic'>{text}</span>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (_node, children) => <h2 className='tw-text-h1' />,
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h3 className='tw-text-2xl md:tw-text-h2' />
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h4 className='tw-text-xl md:tw-text-h3' />
    ),
    [BLOCKS.HEADING_4]: (_node, children) => <h5 className='tw-text-h4' />,
    [BLOCKS.HEADING_6]: (_node, children) => (
      <h6 className='tw-text-xl tw-tracking-widest tw-mb-2' />
    ),
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p
        className='tw-text-p'
        // dangerouslySetInnerHTML={{ __html: addColour(children) }}
      />
    ),

    [BLOCKS.LIST_ITEM]: (_node, children) => <li className=''>{children}</li>,
    [BLOCKS.UL_LIST]: (_node, children) => (
      <ul className='tw-pl-8 tw-space-y-2 tw-list-disc tw-mt-4'>{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node, children) => (
      <ol className='tw-pl-8 tw-space-y-2 tw-list-decimal tw-mt-4'>
        {children}
      </ol>
    ),
    // any idea why this doesnt work. trying it on a slider, but i just get ,false, maybe cos its  sibling of a para?
    // [INLINES.HYPERLINK]: (node, children) => {
    //   return (
    //     <afterAll
    //       internalLink={node.data.uri}
    //       text={`${children[0]}`}
    //       variant='primary'
    //       hideChevron
    //       isWhite
    //     ></afterAll>
    //   )
    // },
  },
}

// export const noColourOptions = {
//   renderMark: {
//     [MARKS.BOLD]: (text) => <span className='tw-font-bold'>{text}</span>,
//     [MARKS.ITALIC]: (text) => <span className='tw-italic'>{text}</span>,
//   },
//   renderNode: {
//     [BLOCKS.HEADING_1]: (_node, children) => (
//       <h2 className='tw-text-h1'>{children}</h2>
//     ),
//     [BLOCKS.HEADING_2]: (_node, children) => (
//       <h3 className='tw-text-2xl md:tw-text-h2'>{children}</h3>
//     ),
//     [BLOCKS.HEADING_3]: (_node, children) => (
//       <h4 className='tw-text-xl md:tw-text-h3'>{children}</h4>
//     ),
//     [BLOCKS.HEADING_4]: (_node, children) => (
//       <h5 className='tw-text-h4'>{children}</h5>
//     ),
//     [BLOCKS.HEADING_6]: (_node, children) => (
//       <h6 className='tw-text-xl tw-tracking-widest tw-mb-2'>{children}</h6>
//     ),
//     [INLINES.HYPERLINK]: (node, children) => {
//       return (
//         <OCLink
//           internalLink={node.data.uri}
//           text={children}
//           hideChevron
//           isWhite
//           className='tw-text-p link-normalCase-black-underscore'
//         ></OCLink>
//       )
//     },
//     [BLOCKS.PARAGRAPH]: (_node, children) => (
//       <p className='tw-text-p'>{children}</p>
//     ),
//     [BLOCKS.HR]: () => <Hr />,
//     [BLOCKS.LIST_ITEM]: (_node, children) => <li className=''>{children}</li>,
//     [BLOCKS.UL_LIST]: (_node, children) => (
//       <ul className='tw-pl-8 tw-space-y-2 tw-list-disc tw-mt-4'>{children}</ul>
//     ),
//     [BLOCKS.OL_LIST]: (_node, children) => (
//       <ol className='tw-pl-8 tw-space-y-2 tw-list-decimal tw-mt-4'>
//         {children}
//       </ol>
//     ),
//   },
// }

export const renderBareRichText = (text, richTextOptions) => {
  const textIsString = typeof text === 'string'
  const objectToRender = textIsString ? JSON.parse(text) : text
  return documentToReactComponents(
    objectToRender,
    richTextOptions ? richTextOptions : options
  )
}

// eslint-disable-next-line react/display-name
const RichText = React.forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ text, className, id, richTextOptions }, ref) => {
    const textIsString = typeof text === 'string'
    const objectToRender = textIsString ? JSON.parse(text) : text
    return (
      <div ref={ref} className={className} id={id}>
        {documentToReactComponents(
          objectToRender,
          richTextOptions ? richTextOptions : options
        )}
      </div>
    )
  }
)

export default RichText
