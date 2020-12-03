import React from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
  } from "react-router-dom";
import './SideMenu.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons';

function SideMenu({ userTrendingData }) {
    console.log("trend", userTrendingData);
    const filteredTrendingItems = userTrendingData ? userTrendingData[0].trends.slice(0, 5) : null;    
    const ListOfTrendingItems = () => {
        return filteredTrendingItems ?
            filteredTrendingItems.map((item, index) => {
                return <div key={index} className="sideMenu-userTrending-items-container">
                    <div className="sideMenu-userTrending-description">
                        {item.name}
                    </div> 

                    {
                        item.promoted_content 
                            ? <div className="sideMenu-userTrending-promoted">
                                <svg viewBox="0 0 24 24" className="sideMenu-promoted-icon"> 
                                    <g>
                                        <path d="M20.75 2H3.25C2.007 2 1 3.007 1 4.25v15.5C1 20.993 2.007 22 3.25 22h17.5c1.243 0 2.25-1.007 2.25-2.25V4.25C23 3.007 21.993 2 20.75 2zM17.5 13.504c0 .483-.392.875-.875.875s-.875-.393-.875-.876V9.967l-7.547 7.546c-.17.17-.395.256-.62.256s-.447-.086-.618-.257c-.342-.342-.342-.896 0-1.237l7.547-7.547h-3.54c-.482 0-.874-.393-.874-.876s.392-.875.875-.875h5.65c.483 0 .875.39.875.874v5.65z">
                                        </path>
                                    </g>
                                </svg>
                                <span className="sideMenu-promoted-text">Promoted</span>
                            </div>
                            : null
                    }

                    <div className="sideMenu-userTrending-tweetNumbers">
                        {item.tweet_volume ? `${item.tweet_volume} Tweets` : null }
                    </div>
                </div>
            }) : null;
    };

    return (
        <div className="sideMenu-container">
            <div className="sideMenu-searchBar-container">
                <div className="sideMenu-searchBar">
                    <div className="sideMenu-searchIcon">
                        <svg viewBox="0 0 24 24" className="sideMenu-search-icon">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                                </path>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="sideMenu-searchBar-textArea-container">
                    <input className="sideMenu-searchBar-textArea" placeholder="Search Twitter">
                    </input>
                </div>
            </div>

            <div className="sideMenu-userTrending">
                <div className="sideMenu-userTrending-title">
                    What's happening
                </div>

                <ListOfTrendingItems />

                <div className="sideMenu-userTrending-more-items">
                    Show More
                </div>
            </div>
            
            <div className="sideMenu-termsOfService">

            </div>
        </div>
    );
};

export default SideMenu;
