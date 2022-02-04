import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { createSlug } from "../utils/editdata";
const marked = require("marked");
import parse from "html-react-parser";

function Header({ pages, setIsOpenNav = null, isOpenNav = null, showBurger = false }) {
    const [isOpenHeaderNav, setIsOpenHeaderNav] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchKey, setSearchKey] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const headerNav = useRef(null);
    const searchInput = useRef(null);

    useEffect(() => {
        if (!isOpenHeaderNav) return;
        function handleClickOver(event) {
            if (headerNav.current && !headerNav.current.contains(event.target)) {
                setIsOpenHeaderNav(false);
            }
        }

        window.addEventListener("click", handleClickOver);
        return () => window.removeEventListener("click", handleClickOver);
    }, [isOpenHeaderNav]);

    useEffect(() => {
        if (!searchActive) return;
        function handleClickOver(event) {
            if (searchInput.current && !searchInput.current.contains(event.target)) {
                searchInput.current.children[0].value = "";
                setSearchActive(false);
                setSearchResults(null);
                setSearchKey(null);
            }
        }

        window.addEventListener("click", handleClickOver);
        return () => window.removeEventListener("click", handleClickOver);
    }, [searchActive]);

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchKey(value);
        let matchingResults = [];
        pages.map((ele) => {
            if (ele.Title.toLowerCase().includes(value.toLowerCase()) || ele.Content.toLowerCase().includes(value.toLowerCase())) {
                const start = ele.Title.substring(0, ele.Title.toLowerCase().search(value.toLowerCase()));

                if (ele.Title.toLowerCase().includes(value.toLowerCase())) {
                    matchingResults.push({
                        title: ele.Title.toLowerCase()
                            .split(value.toLowerCase())
                            .join("<span>" + value + "</span>"),
                        category: ele.Category,
                        tool: ele.Tool,
                        url: createSlug(ele.Title),
                    });
                } else {
                    matchingResults.push({
                        title: ele.Title.toLowerCase(),
                        category: ele.Category,
                        tool: ele.Tool,
                        url: createSlug(ele.Title),
                    });
                }
            }
        });

        if (matchingResults.length === 0) {
            setSearchResults(null);
        } else {
            setSearchResults(matchingResults);
        }
    };

    return (
        <>
            <header>
                <div className={`brand ${showBurger && "brand_with_burger"}`}>
                    <a href='/'></a>
                </div>
                <div ref={headerNav} className={`nav_container ${isOpenHeaderNav ? "nav_container_open" : ""}`}>
                    <ul>
                        {/* <li>
                            <Link href='/publish'>
                                <a>Publish Tool</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/twitter'>
                                <a>Twitter Tool</a>
                            </Link>
                        </li> */}
                        <li>
                            <Link href='/'>
                                <a>Plans & Pricings</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='https://blog.circleboom.com/' rel='noreferrer' target='_blank'>
                                <a>Blog</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='https://account.circleboom.com' rel='noreferrer' target='_blank'>
                                <a>Manage your Account</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/*<div className='toggle_btn' onClick={() => setIsOpenNav(!isOpenNav)}></div>*/}
                <div className={`search ${searchActive ? "search_active" : ""}`}>
                    <div ref={searchInput} className='box' onClick={() => setSearchActive(true)}>
                        <input type='text' onChange={handleChange} />
                        {searchKey !== null && searchKey.length > 2 ? (
                            <div className='result'>
                                {searchResults !== null ? (
                                    <>
                                        {searchResults.map((elem) => (
                                            <Link key={elem.tool + elem.url} href={`/${elem.tool}/${elem.category}/${elem.url}`}>
                                                <a onClick={() => setSearchActive(false)}>
                                                    <small>
                                                        {elem.tool} tool {">"} {elem.category}{" "}
                                                    </small>
                                                    {parse(marked(elem.title))}
                                                </a>
                                            </Link>
                                        ))}
                                    </>
                                ) : (
                                    <div className='no_result'>No results found</div>
                                )}
                            </div>
                        ) : undefined}

                        <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M14.7949 13.125L11.1621 9.49219C11.8066 8.52539 12.1875 7.35352 12.1875 6.09375C12.1875 2.72461 9.46289 0 6.09375 0C2.72461 0 0 2.72461 0 6.09375C0 9.46289 2.72461 12.1875 6.09375 12.1875C7.35352 12.1875 8.52539 11.8066 9.49219 11.1621L13.125 14.7949C13.418 15.0586 13.8574 15.0586 14.1211 14.7949L14.7949 14.1211C15.0586 13.8574 15.0586 13.418 14.7949 13.125ZM2.34375 6.09375C2.34375 4.01367 4.01367 2.34375 6.09375 2.34375C8.17383 2.34375 9.84375 4.01367 9.84375 6.09375C9.84375 8.17383 8.17383 9.84375 6.09375 9.84375C4.01367 9.84375 2.34375 8.17383 2.34375 6.09375Z'
                                fill='#526A72'
                            />
                        </svg>
                    </div>
                    {searchKey !== null && searchKey.length > 2 ? <div className='layout'></div> : undefined}
                </div>
                {showBurger && (
                    <div className='burger' onClick={() => setIsOpenHeaderNav(!isOpenHeaderNav)}>
                        <div className={isOpenHeaderNav ? "first_line_clicked" : "first_line"}></div>
                        <div className={isOpenHeaderNav ? "second_line_clicked" : "second_line"}></div>
                        <div className={isOpenHeaderNav ? "third_line_clicked" : "third_line"}></div>
                    </div>
                )}
            </header>
            <style jsx>
                {`
                    header {
                        width: 100%;
                        height: 94px;
                        position: fixed;
                        top: 0;
                        left: 0;
                        background-color: var(--body-light);
                        border-bottom: 1px solid var(--border-color);
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        z-index: 9;
                        padding-left: 320px;
                        padding-right: 256px;
                    }
                    .brand {
                        width: 320px;
                        height: 94px;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                    .brand a {
                        display: block;
                        width: 100%;
                        height: 94px;
                        background-repeat: no-repeat;
                        background-position: center left 30px;
                        background-image: var(--logo);
                    }
                    ul {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        width: 100%;
                        max-width: 1176px;
                        margin: 0px auto;
                        padding-right: 30px;
                    }
                    ul li {
                        padding-left: 20px;
                    }
                    ul li a {
                        color: var(--font-color);
                        font-weight: 600;
                        font-size: 14px;
                    }
                    .search {
                        width: 256px;
                        height: 94px;
                        position: absolute;
                        right: 0;
                        top: 0;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        transition: width 0.3s ease-in-out;
                    }
                    .search .box {
                        width: 174px;
                        height: 40px;
                        position: relative;
                    }
                    .search .box input {
                        width: 100%;
                        height: 100%;
                        border-radius: 3px;
                        border: 1px solid var(--border-color);
                        padding: 0 15px;
                    }
                    .search .box svg {
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    .search .box svg path {
                        fill: var(--font-color);
                    }

                    .result {
                        width: 150%;
                        height: auto;
                        max-height: 280px;
                        overflow: auto;
                        border-radius: 3px;
                        background-color: var(--body-light);
                        border: 1px solid var(--border-color);
                        position: absolute;
                        right: 0;
                        top: 100%;
                        margin-top: 5px;
                    }
                    .result a {
                        padding: 15px 20px;
                        color: var(--font-color);
                        font-size: 13px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: flex-start;
                    }
                    .result a span {
                        color: var(--blue);
                        font-weight: 700;
                    }
                    .result a small {
                        display: block;
                        font-size: 10px;
                        font-weight: 700;
                        opacity: 0.5;
                    }
                    .result a:not(:last-child) {
                        border-bottom: 1px solid var(--border-color);
                    }

                    .no_result {
                        padding: 20px;
                    }

                    .layout {
                        width: 100vw;
                        height: 100vh;
                        position: absolute;
                        right: 0;
                        top: 0;
                        background-color: rgba(255, 255, 255, 0.9);
                        z-index: -1;
                    }

                    .burger {
                        position: absolute;
                        right: 20px;
                        display: none;
                        flex-direction: column;
                        justify-content: space-around;
                        width: 22px;
                        height: 22px;
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        padding: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 11;
                    }

                    .burger:focus {
                        outline: none;
                    }

                    .burger div {
                        display: none;
                        position: relative;
                        width: 22px;
                        height: 3px;
                        background: var(--font-color);
                        border-radius: 10px;
                        transition: all 0.2s linear;
                        transform-origin: 1px;
                    }

                    .burger .first_line {
                        transform: rotate(0);
                    }

                    .burger .first_line_clicked {
                        transform: rotate(45deg);
                    }

                    .burger .second_line {
                        opacity: 1;
                        transform: translateX(0);
                    }

                    .burger .second_line_clicked {
                        opacity: 0;
                        transform: translateX(20px);
                    }

                    .burger .third_line {
                        transform: rotate(0);
                    }

                    .burger .third_line_clicked {
                        transform: rotate(-45deg);
                    }

                    .toggle_btn {
                        display: none;
                        position: fixed;
                        width: 30px;
                        height: 30px;
                        border: 1px solid black;
                        border-radius: 50%;
                        bottom: 20px;
                        right: 20px;
                        cursor: pointer;
                    }

                    @media (max-width: 1024px) {
                        header {
                            padding: 0 20px;
                        }

                        .result {
                            width: 100%;
                        }

                        .brand a {
                            display: block;
                            width: 90%;
                            height: 94px;
                            background-repeat: no-repeat;
                            background-position: center left 30px;
                            background-image: var(--logo);
                            background-size: 70%;
                        }

                        ul {
                            padding-right: 0;
                        }

                        .search {
                            width: 36px;
                            right: 60px;
                        }

                        .search_active {
                            width: calc(100% - 80px);
                        }

                        .search .box {
                            width: 100%;
                        }

                        .layout {
                            left: -20px;
                        }

                        .burger {
                            display: flex;
                        }
                        .burger div {
                            display: block;
                        }
                        .nav_container {
                            position: fixed;
                            padding: 15px;
                            top: 94px;
                            right: -100%;
                            background-color: white;
                            height: calc(100vh - 72px);
                            transition: right 0.3s ease-in-out;
                        }

                        .nav_container_open {
                            right: 0;
                        }

                        .nav_container ul {
                            flex-direction: column;
                        }

                        .nav_container ul li {
                            padding: 15px;
                        }

                        .toggle_btn {
                            display: block;
                            z-index: 999999;
                        }
                    }
                `}
            </style>
        </>
    );
}

export default Header;
