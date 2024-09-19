import Carousel from 'react-bootstrap/Carousel';

function CarouselImages({ src1, src2, src3 }) {
  return (
    <Carousel controls={false} indicators={false}>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={src1} alt="First slide" />
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={src2} alt="Second slide" />
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={src3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselImages;
