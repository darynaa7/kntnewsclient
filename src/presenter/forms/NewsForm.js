import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import NewsUtils from "../../domain/utils/NewsUtils"; // Імпортуємо кастомний хук для доступу до кореневого стору
import '../../App.css';
import {Link, useNavigate} from "react-router-dom";


const NewsForm: FC = observer(({ context }) => {
    const { store } = context;
    const [articles, setArticles] = useState([]);
    const [checkedArticles, setCheckedArticles] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState(3);
    const [showPopular, setShowPopular] = useState(false);
    const [markedNews, setMarkedNews] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [expandedArticle, setExpandedArticle] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate()


    const handleCheckboxChange = (index) => {
        const newCheckedArticles = [...checkedArticles];
        newCheckedArticles[index] = !newCheckedArticles[index];
        setCheckedArticles(newCheckedArticles);
        saveMarkedNews(index);
    };

    const handleReadMoreClick = (index) => {
         if (expandedArticle === index) {
             setExpandedArticle(null);
         } else {
            setExpandedArticle(index);

         };

     };

    const fetchPopularNews = async () => {
        try {
            setLoading(true); // Set loading to true before fetching
            const markedNews = await store.fetchPopularNews();
            setMarkedNews(markedNews);
            setLoaded(true);
            setLoading(false); // Set loading to true before fetching
        } catch (error) {
            setLoaded(false);
            console.error('Error fetching marked news:', error);
        }
    };

    const saveMarkedNews = async (index) => {
        try {
            const markedArticle = articles[index];
            const username = store.user.login;
            await NewsUtils.saveNews(username, markedArticle);
        } catch (error) {
            console.error("Error saving news:", error);
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // setLoading(true); // Set loading to true before fetching
                // const fetchedNews = await NewsUtils.fetchNews();
                // if (fetchedNews && fetchedNews.translatedArticles) {
                //     setArticles(fetchedNews.translatedArticles);
                //     setCheckedArticles(new Array(fetchedNews.translatedArticles.length).fill(false));
                // }
                // setLoading(false);

//кешування новин
               // Set loading to true before fetching
                setLoading(true); // Встановлюємо значення loading в true перед отриманням даних

                const cachedNews = localStorage.getItem('cachedNews');
                if (cachedNews) {
                    // Якщо є збережені дані, використовуємо їх замість нового запиту до API
                    setArticles(JSON.parse(cachedNews));
                    console.log(cachedNews)
                    setLoading(false); // Встановлюємо значення loading в false після завантаження даних
                } else {
                    // Якщо немає збережених даних, отримуємо їх з API
                    const fetchedNews = await NewsUtils.fetchNews();
                    if (fetchedNews && fetchedNews.translatedArticles) {
                        // Зберігаємо отримані новини у локальному сховищі
                        localStorage.setItem('cachedNews', JSON.stringify(fetchedNews.translatedArticles));
                        setArticles(fetchedNews.translatedArticles);
                        setCheckedArticles(new Array(fetchedNews.translatedArticles.length).fill(false));
                    }
                    setLoading(false); // Встановлюємо значення loading в false після завантаження даних
                }

            } catch (error) {
                setLoading(false); // Set loading to true before fetching
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    const renderArticles = () => {
        const displayedArticles = showPopular ? markedNews : articles;

        return displayedArticles.map((article, index) => (
            <li key={index} className="article">
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
                        {article.urlToImage && <img сlassName="article-image" src={article.urlToImage} alt="News" />} {/* Add this line */}
                        <h3 className="article-title">{article.title}</h3>
                    </div>
                    {/*<Link to={`/paticularnews/${index}`} className="read-more">Читати далі</Link>*/}

                    {expandedArticle === index ? (
                             <p className="article-description">{article.description}</p>
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
    };



    return (
        loading ? (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading...</p>
            </div>            ) : (
        <div className="news-container">
            <div className="select-container">
                <select
                    value={showPopular ? 'popular' : 'all'}
                    onChange={(e) => {
                        setShowPopular(e.target.value === 'popular');
                        fetchPopularNews();
                    }}
                >
                    <option value="all">Всі новини</option>
                    <option value="popular">Популярні новини</option>
                </select>
            </div>
            <div className="news-background"></div>
            <h2 className="news-title">Новини</h2>
            <div>

                    <ul className="article-list">
                        {renderArticles()}
                    </ul>

                {visibleArticles < articles.length && (
                    <button onClick={() => setVisibleArticles(visibleArticles + 3)}>Завантажити ще</button>
                )}
            </div>
        </div>)
    );
});

export default NewsForm;

