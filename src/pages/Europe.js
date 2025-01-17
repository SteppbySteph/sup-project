import React from 'react'
import data from '../data.json'
import BackButton from 'components/Backbutton'
import Footer from 'components/Footer'
import Header from 'components/Header'

import { 
  CardContainer, 
  FooterStyling, 
  HeaderContainer, 
  Image, 
  StyledBackButton 
} from 'components/Styles'

const Europe = () => {

  return (
    <div>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <StyledBackButton>
        <BackButton />
      </StyledBackButton>
      
      {data.europe.map((item) => (
        <CardContainer>
          <Image src={item.image} key={item.image} alt='place'/>
          <h4 key={item.id}>{item.place}</h4>
          <p key={item.id}>{item.description}</p>
        </CardContainer>
      ))}
      
      <FooterStyling>
        <Footer/>
      </FooterStyling>
    </div>
  )
}

export default Europe
