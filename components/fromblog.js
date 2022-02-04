import Link from "next/link";

function BlogLinks({ blogLinks }) {
    return (
        <>
            <div>
                <h6>From The Circleboom Blog</h6>
                {blogLinks.map((item) => (
                    <Link href={item.Link}>
                        <a key={item.id}>
                            <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M7.9585 6.04167L12.7502 1.25' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                                <path d='M9.55518 1.25H12.7496V4.44444' stroke='black' strokeLinecap='round' strokeLinejoin='round' />
                                <path
                                    d='M12.75 8.27778V11.4722C12.75 12.1779 12.1779 12.75 11.4722 12.75H7H2.52778C1.82208 12.75 1.25 12.1779 1.25 11.4722V2.52778C1.25 1.82208 1.82208 1.25 2.52778 1.25H5.72222'
                                    stroke='black'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                            {item.Link}
                        </a>
                    </Link>
                ))}
            </div>
            <style jsx>
                {`
                    div {
                        width: 100%;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        border-top: 1px solid var(--border-color);
                        padding: 30px;
                    }
                    h6 {
                        font-weight: 700;
                        font-size: 14px;
                        margin-bottom: 20px;
                    }
                    a {
                        display: flex;
                        color: var(--blue);
                        font-size: 13px;
                        padding-bottom: 10px;
                    }
                    svg {
                        margin-right: 8px;
                        min-width: 10px;
                    }
                    svg path {
                        stroke: var(--blue);
                    }

                    @media (max-width: 1024px) {
                        div {
                            position: initial;
                        }
                    }
                `}
            </style>
        </>
    );
}

export default BlogLinks;
