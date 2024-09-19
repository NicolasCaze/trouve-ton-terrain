import Carousel from 'react-bootstrap/Carousel';



function CarouselImages({src1,src2,src3}) {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <Carousel.Caption>
        <img
            className="d-block w-100"
            src={src1}
            alt="Third slide"
            style={{ height: '500px', objectFit: 'cover' }}
        />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <Carousel.Caption>
        <img
              className="d-block w-100"
              src={src2}
              alt="Third slide"
              style={{ height: '500px', objectFit: 'cover' }}
            />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
        <img
              className="d-block w-100"
              src={src3}
              alt="Third slide"
              style={{ height: '500px', objectFit: 'cover' }}
            />
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselImages;