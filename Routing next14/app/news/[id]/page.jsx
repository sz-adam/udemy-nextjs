//... id page
import React from 'react'

function NewsDetailPage({params}) {
   const newsId = params.id
  return (
    <div>
     <p>
        news id: {newsId}
     </p>
    </div>
  )
}

export default NewsDetailPage
