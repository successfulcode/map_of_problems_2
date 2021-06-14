import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './CustomSearch.module.scss';

const CustomSearch = () => {

    const [ searchItem, setSearchItem ] = useState('')
    const [ coordinates, setCoordinates ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ adress, setAdress ] = useState('')
    const [success, setSuccess] = useState(false)

    console.log('coordinates', coordinates)

    const bounds = [26.29406,55.63400,26.71978,55.53699]

    const getDataFromOSMap = async ()  => {
        try {
            setIsLoading(true)
            // const response = await axios.get(
            //     `https://nominatim.openstreetmap.org/search?format=json&q=${searchItem}&accept-language=LT&countrycodes=LT&polygon_geojson=1&viewbox=`
            //   );
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&country=Lietuva&county=Utenos+apskritis&state=Visagino+savivaldybė&street=${searchItem}&accept-language=LT&countrycodes=LT&polygon_geojson=1&viewbox=`
              );
              const data = await response.data;
              setCoordinates(data);
              setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    useEffect(()=>{ 
        getDataFromOSMap()
     }, [searchItem])

    const setAdressHandler = (id) => {
        coordinates.map((item) => {if(item.place_id === id && item.lat && item.lon ) { setAdress({lat: item.lat, lon: item.lon}); setSearchItem(item.display_name)}
    })
        setCoordinates('')

    } 
    console.log('adress', adress)
    console.log('success', success)
    return(
        <div className={styles.CustomSearch}>
            CustomSearch
            <div>
                <div>
                    <input value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} placeholder='My Custom Search' /> 
                        {isLoading &&
                        <span className={styles.spinner}>
                            <div className="spinner-border text-primary spinner-border-sm" role="status">
                                <span className="sr-only">Kraunasi...</span>
                            </div>
                        </span>
                        }                    
                </div> 
                    <ul className="list-group">
                        {coordinates.length >0 && coordinates.map((item)=><li key={item.place_id} 
                                                                    className='list-group-item d-flex justify-content-between align-items-center'
                                                                    onClick={()=>setAdressHandler(item.place_id)}>
                                                                        {item.display_name}
                                                                </li>)
                            }
                    </ul>
                    { (coordinates.length === 0 && searchItem.trim().length > 0) &&
                                <span> Neradome tokio adreso! </span>
                        }
            
            </div>

            CustomSearch
        </div>
    )
}

export default CustomSearch;