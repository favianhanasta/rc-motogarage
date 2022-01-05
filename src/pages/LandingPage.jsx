import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import { UncontrolledCarousel } from 'reactstrap';
import lp_1 from '../assets/lp_1.png'
import lp_2 from '../assets/lp_2.png'
import lp_3 from '../assets/lp_3.png'
import lp_4 from '../assets/lp_4.png'

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            images : [
                {src:{lp_1}},
                {url:'https://lelogama.go-jek.com/cache/19/09/1909a04fe9d3b2b3ed9e8a39ab70c75d.webp'},
            ]
         }
    }
    render() { 
        return ( 
            <div>
                <SimpleImageSlider
                    width={'100%'}
                    height={600}
                    images={this.state.images}
                    showBullets={true}
                    showNavs={true}
                    autoPlay={true}    
                />
            </div>
         );
    }
}
 
export default LandingPage;