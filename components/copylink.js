import { useRouter } from "next/router";
import { useState } from "react";

function CopyLink() {
    const router = useRouter()
    let url = router.pathname
    const [copied, setCopied] = useState(false);

    function copyStringToClipboard(str) {
        var el = document.createElement("textarea");
        el.value = str;
        el.setAttribute("readonly", "");
        el.style = { position: "absolute", left: "-9999px" };
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);

        setTimeout(function () {
            setCopied(false);
        }, 2000);
    }

    function runCopyString() {
        copyStringToClipboard(url)
    }

    return (
        <>
            <div>
                <a onClick={runCopyString}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 484.457 484.457' width={15} height={15}>
                        <g>
                            <path d='M447.112,37.345C423.031,13.263,391.012,0,356.957,0c-34.057,0-66.075,13.263-90.156,37.345L166.215,137.931l21.213,21.213L288.013,58.558C306.428,40.143,330.913,30,356.957,30c26.043,0,50.527,10.143,68.942,28.558s28.558,42.899,28.558,68.942c0,26.044-10.143,50.528-28.558,68.943L325.313,297.029l21.213,21.213l100.586-100.586c24.082-24.081,37.345-56.1,37.345-90.156S471.194,61.426,447.112,37.345z' />
                            <path d='M196.443,425.899c-18.415,18.415-42.899,28.558-68.942,28.558s-50.527-10.143-68.943-28.55C40.142,407.484,30,383,30,356.957c0-26.044,10.142-50.528,28.557-68.943l100.586-100.586l-21.213-21.213L37.344,266.801C13.263,290.882,0,322.9,0,356.957c0,34.056,13.263,66.074,37.344,90.155c24.082,24.082,56.1,37.345,90.156,37.345s66.075-13.263,90.156-37.345l100.586-100.586l-21.213-21.213L196.443,425.899z' />
                            <path d='M321.688,141.552l21.213,21.213L162.768,342.898l-21.213-21.213L321.688,141.552z' />
                        </g>
                    </svg>
                    Copy link
                </a>
                {copied && <span>The link copied!</span>}
                {/* <span>The link copied!</span> */}
            </div>
            <style jsx>{`
                div {
                    padding: 30px 30px 30px 50px;
                    text-align: center;
                    height: auto;
                }
                a {
                    position: relative;
                }

                a:hover {
                    cursor: pointer;
                    color: var(--blue);
                }

                a:hover svg {
                    fill: var(--blue);
                }

                a svg {
                    position: absolute;
                    left: -20px;
                    top: 1px;
                    fill: var(--font-color);
                }

                span {
                    position: absolute;
                    border: 1px solid var(--font-color-transparent);
                    color: var(--font-color-transparent);
                    border-radius: 4px;
                    font-size: 14px;
                    right: 20px;
                    left: 20px;
                    top: 70px;
                    padding: 5px;
                }
                @media (max-width: 1024px) {
                    div {
                        height: auto;
                        text-align: start;
                    }

                    span{
                        position: static;
                        margin-left: 20px;
                    }
                }
            `}</style>
        </>
    );
}

export default CopyLink;
