import { useState } from "react"
import "./HomeFeedContentController.css"

const HomeFeedContentController = (
    {
        trendingHomeFeed, 
        setTrendingHomeFeed, 
        sortByHomeFeed, 
        setSortByHomeFeed
    }) => 
{
    
    const [ showHomeFeedSortDropdown, setShowHomeFeedSortDropdown ] = useState(false)
    

    return (
        <div className="homefeed-controller-container">
            <button 
                className={trendingHomeFeed?`trending-homefeed-btn trending-homefeed-active`:`trending-homefeed-btn`}
                onClick={()=>setTrendingHomeFeed(prevState => !prevState)}
            >
                Trending
            </button>
            <div className="homefeed-sort-dropdown">
                <span 
                    className="homefeed-dropdown-value"
                    onClick={()=>{setShowHomeFeedSortDropdown(prevState=>!prevState)}}
                >
                    {sortByHomeFeed} ▽
                </span>
                <div className={showHomeFeedSortDropdown
                ?`homefeed-dropdown-options-container homefeed-dropdown-options-container-active`
                :`homefeed-dropdown-options-container`}>
                    <p 
                        className="homefeed-sort-dropdown-option"
                        onClick={()=>{
                            setSortByHomeFeed("Latest")
                            setShowHomeFeedSortDropdown(false)
                        }}
                    >
                        Latest
                    </p>
                    <p 
                        className="homefeed-sort-dropdown-option"
                        onClick={()=>{
                            setSortByHomeFeed("Oldest")
                            setShowHomeFeedSortDropdown(false)
                        }}
                    >
                        Oldest
                    </p>
                </div>
            </div>
        </div>
    )
}

export { HomeFeedContentController }