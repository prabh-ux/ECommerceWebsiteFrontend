import React from 'react'
import Hero from '../components/Hero'
import HomeSec1 from '../components/HomeSec1'
import HomeSec2 from '../components/HomeSec2'
import HeroSec3 from '../components/HeroSec3'
import HomeSec4 from '../components/HomeSec4'


const Home = ({selected}) => {

  return (
    <div>
      <Hero selected={selected} />
      <HomeSec1   selected={selected}/>
       <HomeSec2   selected={selected}/> 
      <HomeSec4 selected={selected}/>
      <HeroSec3  selected={selected} />
    </div>
  )
}

export default Home