import React from "react";
const { useState, useEffect, useRef } = React;
import Head from "next/head";
import Link from "next/link";
import unfetch from "isomorphic-unfetch";
import Header from "../components/header";
import { createHelp, createSlug, groupByCategory } from "../utils/editdata";
import { fetchAPI } from "../lib/api";
import styles from "../styles/pages/index.module.scss";
const marked = require("marked");
import parse from "html-react-parser";

function Layout({ pages }) {
    const [searchKey, setSearchKey] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [featuredItems, setFeaturedItems] = useState(null);

    useEffect(() => {
        let helpItems = [];
        pages.map((item) => {
            helpItems.push(createHelp(item));
        });
        helpItems = helpItems.filter((e) => e.featured);
        helpItems = groupByCategory(helpItems);

        setFeaturedItems(helpItems);
    }, []);

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
            <Head>
                <title>Circleboom Help</title>
                <link rel='icon' href='/favicon.ico' />
                <meta name="description" content='Circleboom Help Tool' />
            </Head>
            <Header pages={pages} showBurger={true} />
            <main className={styles.home}>
                <div className={styles.search}>
                    <h1>How can we help you ?</h1>
                    <div className={styles.search_box}>
                        <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M14.7949 13.125L11.1621 9.49219C11.8066 8.52539 12.1875 7.35352 12.1875 6.09375C12.1875 2.72461 9.46289 0 6.09375 0C2.72461 0 0 2.72461 0 6.09375C0 9.46289 2.72461 12.1875 6.09375 12.1875C7.35352 12.1875 8.52539 11.8066 9.49219 11.1621L13.125 14.7949C13.418 15.0586 13.8574 15.0586 14.1211 14.7949L14.7949 14.1211C15.0586 13.8574 15.0586 13.418 14.7949 13.125ZM2.34375 6.09375C2.34375 4.01367 4.01367 2.34375 6.09375 2.34375C8.17383 2.34375 9.84375 4.01367 9.84375 6.09375C9.84375 8.17383 8.17383 9.84375 6.09375 9.84375C4.01367 9.84375 2.34375 8.17383 2.34375 6.09375Z'
                                fill='#526A72'
                            />
                        </svg>
                        <input type='text' placeholder='write a question or problem' onChange={handleChange} />
                        {searchKey !== null && searchKey.length > 2 ? (
                            <div className={styles.result}>
                                {searchResults !== null ? (
                                    <>
                                        {searchResults.map((elem) => (
                                            <Link key={`/${elem.tool}/${elem.category}/${elem.url}`} href={`/${elem.tool}/${elem.category}/${elem.url}`}>
                                                <a>
                                                    <small>
                                                        {elem.tool} tool {">"} {elem.category}{" "}
                                                    </small>
                                                    {parse(marked(elem.title))}
                                                </a>
                                            </Link>
                                        ))}
                                    </>
                                ) : (
                                    <div className={styles.no_result}>No results found</div>
                                )}
                            </div>
                        ) : undefined}
                    </div>
                    <div className={styles.popular_searches}>
                        Popular searches: <a>twitter</a> <a>revoke access</a> <a>subscribe</a> <a>billing</a>
                    </div>
                    {searchKey !== null && searchKey.length > 2 ? <div className={styles.layout}></div> : undefined}
                </div>
                <div className={styles.featured}>
                    <div>
                        <span>FAQs</span>
                        {featuredItems &&
                            featuredItems.faq &&
                            featuredItems.faq.map((e) => (
                                <Link key={e.url} href={e.url}>
                                    <a>{e.title}</a>
                                </Link>
                            ))}
                    </div>
                    <div>
                        <span>Account Management</span>
                        {featuredItems &&
                            featuredItems.account &&
                            featuredItems.account.map((e) => (
                                <Link key={e.url} href={e.url}>
                                    <a>{e.title}</a>
                                </Link>
                            ))}
                    </div>
                    <div>
                        <span>Features</span>
                        {featuredItems &&
                            featuredItems.feature &&
                            featuredItems.feature.map((e) => (
                                <Link key={e.url} href={e.url}>
                                    <a>{e.title}</a>
                                </Link>
                            ))}
                    </div>
                </div>
            </main>
        </>
    );
}

export async function getStaticProps() {
    const pages = await fetchAPI();

    return {
        props: {
            pages,
        },
        revalidate: 10,
    };
}

export default Layout;
