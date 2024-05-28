import React, {FC, useContext, useEffect, useState} from 'react';

//import {observer} from "mobx-react-lite";
import LoginForm from "./LoginForm";
import NewsUtils from "../../domain/utils/NewsUtils";
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";

function Redirect(props: { to: string }) {
    return null;
}

const ProfileForm: FC = observer(({ context }) => {
    const { store } = context;

    const [markedNews, setMarkedNews] = useState([]);
    const [username, setUsername] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [logedout, setLogedout] = useState(false);
    const [expandedArticle, setExpandedArticle] = useState(null);
    const [clickCounts, setClickCounts] = useState({});
    const [visibleArticles, setVisibleArticles] = useState(3);
    const [checkedArticles, setCheckedArticles] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await store.checkAuth();
            if (!isAuthenticated) {
                navigate("/register");
            }
        };
        checkAuthentication();
    }, [store]);

    useEffect(() => {
        // const isAuthenticated = await store.checkAuth();
        // if (isAuthenticated) {
        //     fetchMarkedNews();
        // }
        const checkAuthenticationForFetching = async () => {
            const isAuthenticated = await store.checkAuth();
            if (isAuthenticated) {
                console.log("user: " + JSON.stringify(store.user))
                fetchMarkedNews(store.user.login);
            }
        };
        checkAuthenticationForFetching()
    }, []);

    useEffect(() => {
        if (loaded && markedNews.length > 0) {
            // Set all checkboxes to true by default
            setCheckedArticles(new Array(markedNews.length).fill(true));
        }
    }, [loaded, markedNews]);


    // useEffect(() => {
    //     if (!store.checkAuth()){
    //         navigate("/login")
    //     }
    //
    //     //store.checkIfUserLoggedIn()
    //     // if TRUE: navigate("/login")
    //     // if FALSE: show page
    // }, [store]);


    const handleCheckboxChange = (index) => {
        const newCheckedArticles = [...checkedArticles];
        newCheckedArticles[index] = !newCheckedArticles[index];
        setCheckedArticles(newCheckedArticles);
        console.log(newCheckedArticles)
        console.log(index)

        // Після зміни стану позначок новин, викликаємо функцію збереження новин
            unsaveMarkedNews(index);

    };

    const unsaveMarkedNews = async (index) => {
        try {
            console.log(markedNews[index])

            const markedArticle = markedNews[index];
            console.log(markedArticle)

            const username = store.user.login; // Отримуємо ім'я користувача зі стору (припускаючи, що ви його зберігаєте там)

            await NewsUtils.unsaveNews(username, markedArticle, (error) => {
                console.error("Error unsaving news:", error);
            });
        } catch (error) {
            console.error("Error unsaving news:", error);
        }
    };

    const fetchMarkedNews = async (login) => {
        try {
            const markedNews = await store.fetchMarkedNews(login);

            console.log(markedNews)
            console.log(login)

            setMarkedNews(markedNews); // Assuming fetchedNews is an array
            setLoaded(true);
        } catch (error) {
            setLoaded(false)
            console.error('Error fetching marked news:', error);
        }
    };
    const handleReadMoreClick = (index) => {
        if (expandedArticle === index) {
            setExpandedArticle(null);
        } else {
            setExpandedArticle(index);
            setClickCounts((prevCounts) => ({
                ...prevCounts,
                [index]: (prevCounts[index] || 0) + 1
            }));
        }
    };
    const handleLogout = async () => {
        try {
            const username = store.user.login
            await store.logout(username, (error) => {

            });
            navigate('/register');
        } catch (error) { }
    };


    if (!markedNews) return <div></div>

    let newsItems;

    if (loaded && markedNews && markedNews.length > 0) {
        newsItems = markedNews.map((news, index) => (

        <li key={index} className="article-profile">
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={checkedArticles[index]}
                    onChange={() => handleCheckboxChange(index)}
                />
                <div className="checkmark"></div>
            </div>
            <div className="article-item">
                    <div className="article-photo-content">
                        {news.urlToImage && <img сlassName="article-image" src={news.urlToImage} alt="News" />} {/* Add this line */}
                        <h3 className="article-title">{news.title}</h3>
                    </div>
                {expandedArticle === index ? (
                    <p className="article-description">{news.description}</p>
                ) : null}
                <span
                    className="read-more"
                    onClick={() => handleReadMoreClick(index)}
                    style={{fontStyle: 'italic', color: 'gray', cursor: 'pointer'}}
                >
                            Читати далі
                        </span>
            </div>
        </li>
        ));
    } else if (!loaded) {
        newsItems = <p>Loading...</p>;
    } else {
        newsItems = (
            <li>
                <p>Немає позначених новин</p>
            </li>
        );
    }

    console.log(store.user)

    return (
        <div>
            <div className='profile'>
            <h1>Вітаю, {store.user.login}</h1>
                {/*<Link*/}
                {/*    to={"/login"}*/}

                {/*>*/}
                {/*    <button onClick={handleLogout} className='logout' >вийти</button>*/}

                {/*</Link>*/}
                <button onClick={handleLogout} className='logout' >вийти</button>
                <h2>Ваші позначені новини:</h2>
            </div>
            <div>
                <ul className="article-list-profile">
                    {newsItems}
                </ul>

            </div>

        </div>
    );
});

export default ProfileForm;