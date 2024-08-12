import React, { useEffect } from 'react';
import { account } from '../appwrite/config';


function Home() {

    useEffect(() => {
      console.log(account);
      
    
     
    }, [])
    
  return (
    <div>Home</div>
  )
}

export default Home