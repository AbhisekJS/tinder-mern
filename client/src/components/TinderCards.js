import React,{useState,useEffect} from 'react'
import axios from './axios.js'
import TinderCard from 'react-tinder-card'
import './TinderCards.css'

const TinderCards = () => {
    const [people,setPeople]= useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true);
        axios.get('/tinder/cards').then(response=>{
            setLoading(false)
            setPeople(response.data) 
        })
        // eslint-disable-next-line
    },[])
    
    const swiped = (direction,nameToDelete) => {
        console.log('Removed ' + direction)
      }
      
      const outOfFrame = (name) => {
        console.log(name + ' left the screen')
      }
    return (
        <div>
            <div className="tinderCards">
                <div className="tinderCards__cardContainer">
                    {loading && <h3>Loading...</h3>}
                    {people && people.map(person=>(
                        <TinderCard
                        className="swipe"
                        key={person._id}
                        preventSwipe={["up","down"]}
                        onSwipe={(dir)=>swiped(dir,person.username)}
                        onCardLeftScreen={()=> outOfFrame(person.username)}>
                             <div style={{ backgroundImage: 'url(' + person.imgUrl + ')' }} className='card'>
              <h3>{person.username}</h3>
            </div>
                        </TinderCard>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TinderCards
