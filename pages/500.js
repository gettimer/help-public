import { useRouter } from 'next/router'

function Custom500() {
  const router = useRouter()
  return <><a onClick={() => router.back()}>
    <img src='https://assets.circleboom.com/website/images/500.svg' />
  </a>
    <style jsx>{`
        a {
          display:flex;
          align-teism:center;
          justify-content:center;
          width:100vw;
          height:100vh;
        }
      `}</style>
  </>
}

export default Custom500