import { Link } from "react-router-dom"
import './WhatsHappeningCard.css'

function WhatsHappeningCard()
{
    return (
        <a 
            target="_blank" 
            href="https://www.youtube.com/watch?v=k9pP6G-AAHw" 
            rel="noreferrer"
        >
            <div className='whats-happening-card'>
                                
                <h4>Book review &#183; Trending</h4>
                <div className='whats-happening-details'>
                    <p>
                        Pewdiepie talks about Nietzsche
                    </p>
                    <img className="whats-happening-img" src={"https://i.redd.it/m9qf7y1ijsx31.jpg"} alt="matrix"></img>
                </div>

            </div>
        </a>
    )
}

export { WhatsHappeningCard }