import {useRouter} from 'next/router'

function PorfolioProjectPage() {
    const router=useRouter()

   console.log(router.pathname)
   console.log(router.query)
  return (
    <div>
      dsadasdasd
    </div>
  )
}

export default PorfolioProjectPage
