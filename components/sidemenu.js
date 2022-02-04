import Link from "next/link";
import { createSlug } from "../utils/editdata";

function SideMenu({ callback, data, activeItemTool = null, tools }) {
    const capitalizeStr = (str) => {
        let str_edit = str.split("_").join(" ");
        return str_edit.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
    };

    

    return (
        <>
            {/* <div>
                {Object.entries(data).map(([key, value], i) => {
                    return (
                        <ul key={key + value}>
                            <li key={key} className='category'>
                                <span>{capitalizeStr(key)}</span>
                            </li>
                            {value.map((elem) => (
                                <li
                                    key={elem.id}
                                    onClick={() => callback()}
                                    className={activeItemUrl === elem.id ? "active" : undefined}>
                                    <Link href={`/${elem.Tool}/${elem.Category.includes('_') ? elem.Category.replace('_', '-') : elem.Category}/${createSlug(elem.Title)}`}>
                                        <a>{elem.Title}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    );
                })}
            </div> */}
            <div>
                <ul>
                    {/* {tools.map((e) => {
                        if (e === "common") {
                            return <li key={e.id}>General</li>;
                        }

                        let name = e.toolName.charAt(0);
                        name = name.toUpperCase();
                        name = name + e.toolName.slice(1) + ' Tool';
                        return <li key={e.id}>{name}</li>;
                    })} */}
                    <li onClick={callback} className={activeItemTool === "common" && "active"}><Link href={'/general'}><a>General</a></Link></li>
                    <li onClick={callback} className={activeItemTool === "twitter" && "active"}><Link href={'/twitter'}><a>Twitter Tool</a></Link></li>
                    <li onClick={callback} className={activeItemTool === "publish" && "active"}><Link href={'/publish'}><a>Publish Tool</a></Link></li>
                </ul>
            </div>

            <style jsx>{`
                div {
                    max-height: calc(100vh - 94px);
                    align-self: flex-start;
                    overflow: auto;
                    padding: 10px 30px 10px 30px;
                    padding-bottom: 10px;
                    width: 100%;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 0;
                }
                li {
                    padding: 10px 10px;
                    border: 1px solid transparent;
                    border-radius: 3px;
                }
                a {
                    color: var(--font-color);
                    font-size: 16px;
                    letter-spacing: 1px;
                }
                li.active {
                    background-color: var(--body-light);
                    border-color: var(--blue);
                }
                li.active a {
                    color: var(--blue);
                }

                li.category {
                    margin-top: 20px;
                }

                span {
                    font-weight: 700;
                    font-size: 10px;
                    letter-spacing: 1px;
                    opacity: 0.5;
                }
                @media (max-width: 1024px) {
                    div {
                        background-color: var(--bg-color);
                        width: 100%;
                        padding: 30px 30px;
                        max-height: 100vh;
                        min-height: 100vh;
                    }
                }
            `}</style>
        </>
    );
}

export default SideMenu;
