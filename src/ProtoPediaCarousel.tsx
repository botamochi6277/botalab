import Carousel from 'react-material-ui-carousel';
import prototypes from "./assets/prototypes.json";

const ProtoPediaCarousel = () => {

  const items = prototypes.prototypes.map(
    p => (<div key={p.name}>{p.name}</div>)
  )
  return (
    <>
      <Carousel>
        {items}
      </Carousel>
    </>
  )
}


export default ProtoPediaCarousel;