import React from 'react';

export default class ImageDisplay extends React.Component {
  render() {
    const images = this.props.images;
    if (images.length) {
      return (
        <div className="images-container">
          {images.map((image, idx) =>
            <div key={idx} className="image-box">
              <img src={image.img_src} alt={`${image.rover.name} taken ${image.earth_date}`} />
              <p className="img-caption"> Taken by {image.rover.name}, {image.earth_date}</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <span>Sorry, there are no photos from that rover on that Sol.</span>
        </div>
      )
    }

  }
}
