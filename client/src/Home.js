import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Home.css';

const Home = props => {
  useEffect(() => {
    axios.get('/api/get/allposts')
      .then(res => setState(res.data))
  },[])

  const [state,setState] = useState('')

  return(
    <div>
      Home<p>{state}</p>
    </div>
  )
};

export default Home;