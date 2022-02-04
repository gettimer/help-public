import Link from 'next/link';

function Custom404() {
  return <><section>
    <img src='https://assets.circleboom.com/website/images/404.svg' />
    <div>
      <Link href='/publish'><a>
        <img src='https://assets.circleboom.com/website/images/circleboom_publish.svg' />
      </a></Link>
      <Link href='/twitter'><a>
        <img src='https://assets.circleboom.com/website/images/circleboom_twitter.svg' />
      </a></Link>
    </div>
  </section>
    <style jsx>{`
        section {
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          width:100vw;
          height:100vh;
        }
        img {
          width:500px;
          max-width:80%;
          margin-bottom:20px;
        }
        div {
          display:flex;
          aling-items:center;
          justify-content:center;
          margin-top:40px;
        }
        a {
          margin:0 20px;
          padding:20px;
          border-radius:7px;
          display:flex;
          align-items:center;
          justify-content:center;
          border:1px solid rgba(var(--font-color-RGBA),.1);
          transition:all .3s;
        }
        a:hover {
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }
        a img {
          zoom:.5
        }
      `}</style>
  </>
}

export default Custom404