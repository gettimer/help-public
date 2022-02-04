import Head from "next/head";
import Link from "next/link";
import SideMenu from "../components/sidemenu";
import Header from "../components/header";
import Icon from "../components/icon";
import { createHelp, groupByCategory, getHelpsToolsNames } from "../utils/editdata";
import { fetchAPI } from "../lib/api";
import styles from "../styles/pages/layout.module.scss";
import { useRef, useState, useEffect } from "react";
import CopyLink from "../components/copylink";

function General({ pages, generalTool, navigationData, tools }) {
    const [isOpenNav, setIsOpenNav] = useState(false);
    const nav = useRef(null);

    useEffect(() => {
        if (!isOpenNav) return;
        function handleClickOver(event) {
            if (nav.current && !nav.current.contains(event.target)) {
                setIsOpenNav(false);
            }
        }

        window.addEventListener("click", handleClickOver);
        return () => window.removeEventListener("click", handleClickOver);
    }, [isOpenNav]);

    const resetMenu = () => {
        setIsOpenNav(false);
    };

    const capitalizeStr = (str) => {
        let str_edit = str.split("_").join(" ");
        return str_edit.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
    };

    return (
        <>
            <Head>
                <title>General Help</title>
                <link rel='icon' href='/favicon.ico' />
                <meta name="description" content='Circleboom General Help' />
            </Head>
            <Header pages={pages} isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav} showBurger={true} />
            <main className={styles.wrapper}>
                <div ref={nav} className={`${styles.nav} ${isOpenNav && styles.nav_open}`}>
                    <SideMenu data={navigationData} callback={resetMenu} activeItemTool={"common"} tools={tools}/>
                </div>
                <section className={styles.section}>
                    <div className={styles.bread_crumb}>
                        <Link href='/'>
                            <a>HOME</a>
                        </Link>
                        <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M3.75 7.5L6.25 5L3.75 2.5' stroke='#1B2738' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                        <Link href='/publish'>
                            <a>GENERAL</a>
                        </Link>
                    </div>
                    <div className={styles.list}>
                        {Object.entries(generalTool).map(([key, value]) => (
                            <div key={key}>
                                <h3>{capitalizeStr(key)}</h3>
                                <ul>
                                    {value.map((ele) => (
                                        <li className={styles.list_item} key={ele.url}>
                                            <Link href={ele.url}>
                                                <a>
                                                    <span>
                                                        <Icon name='book' />
                                                    </span>
                                                    {ele.title}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* <div className={`${styles.hint} ${styles.hint_info}`}>Denneme dedmnemdnenm ndnmendmend</div>
                        <div className={`${styles.hint} ${styles.hint_warning}`}>Denneme dedmnemdnenm ndnmendmend</div>
                        <div className={`${styles.hint} ${styles.hint_danger}`}>Denneme dedmnemdnenm ndnmendmend</div> */}
                    </div>
                </section>
                <aside className={styles.aside}>
                    <CopyLink />
                    {/* <BlogLinks /> */}
                </aside>
            </main>
            <button className={styles.toggle_nav} onClick={() => setIsOpenNav(!isOpenNav)}>
                {!isOpenNav ? (
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M3 2.25C2.58579 2.25 2.25 2.58579 2.25 3V21C2.25 21.4142 2.58579 21.75 3 21.75H9H21C21.4142 21.75 21.75 21.4142 21.75 21V3C21.75 2.58579 21.4142 2.25 21 2.25H9H3ZM9.75 3.75V20.25H20.25V3.75H9.75ZM8.25 3.75H3.75V20.25H8.25V3.75Z'
                            fill='#0079BD'></path>
                    </svg>
                ) : (
                    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M9.37047 6.99975L13.5089 2.86166C14.1637 2.20685 14.1637 1.14533 13.5089 0.490858C12.8547 -0.163619 11.7926 -0.163619 11.1384 0.490858L7 4.62962L2.86157 0.490858C2.20743 -0.163619 1.14525 -0.163619 0.491109 0.490858C-0.163703 1.14567 -0.163703 2.20718 0.491109 2.86166L4.6292 6.99975L0.491109 11.1378C-0.163703 11.7927 -0.163703 12.8542 0.491109 13.5086C0.818012 13.8362 1.24751 13.9995 1.67634 13.9995C2.10484 13.9995 2.53467 13.8362 2.86157 13.5086L7 9.37055L11.1384 13.509C11.4657 13.8366 11.8948 13.9998 12.3237 13.9998C12.7525 13.9998 13.182 13.8366 13.5089 13.509C14.1637 12.8542 14.1637 11.7927 13.5089 11.1382L9.37047 6.99975Z'
                            fill='white'
                        />
                    </svg>
                )}
            </button>
        </>
    );
}
export async function getStaticProps() {
    const allPages = await fetchAPI();
    let generalToolHelps = [];
    let generalToolOrder;

    let filterPagesData = [];

    allPages.map((elem) => {
        filterPagesData.push({
            ...(({ Content, published_at, created_at, updated_at, Featured, MetaDescription, BlogLinks, Slug, ...rest } = elem) => rest)(),
        });
    });
    allPages.map((ele) => {
        ele.Tool === "common" ? generalToolHelps.push(createHelp(ele)) : null;
    });


    const unorderedGeneralToolOrder = groupByCategory(generalToolHelps);
    generalToolOrder = Object.keys(unorderedGeneralToolOrder)
        .reverse()
        .reduce((obj, key) => {
            obj[key] = unorderedGeneralToolOrder[key].sort((a, b) => b.id - a.id);
            return obj;
        }, {});
    const unorderedNavigationData = filterPagesData.reduce((ele, node) => {
        ele[node.Category] = [...(ele[node.Category] || []), node];
        return ele;
    }, {});

    const tools = getHelpsToolsNames(allPages)


    const navigationData = Object.keys(unorderedNavigationData)
        .reverse()
        .reduce((obj, key) => {
            obj[key] = unorderedNavigationData[key].sort((a, b) => b.id - a.id);
            return obj;
        }, {});

    return {
        props: {
            generalTool: generalToolOrder,
            navigationData,
            pages: allPages,
            tools
        },
        revalidate: 10,
    };
}

export default General;
