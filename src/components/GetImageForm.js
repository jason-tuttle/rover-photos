import React from 'react';
import GetImageButton from './GetImageButton';
import ImageDisplay from './ImageDisplay';

const API_KEY = "MBRgvlOKuAYkGiAn8EonJ8sbjVtra2epKgMNLRhZ";
//https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
const ROVER_CAMS = {
  curiosity: ['fhaz', 'rhaz', 'mast', 'chemcam', 'mahli', 'mardi', 'navcam'],
  opportunity: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites'],
  spirit: ['fhaz', 'rhaz', 'navcam', 'pancam', 'minites']
}

export default class GetImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rover: 'curiosity',
      camera: 'fhaz',
      sol: 1000,
      images: [],
      loading: false
    }
  }

  handleRoverChange = (e) => {
    this.setState({rover: e.target.value});
  }

  handleCameraChange = (e) => {
    this.setState({camera: e.target.value});
  }

  handleSolChange = (e) => {
    this.setState({sol: Number(e.target.value)});
  }

  fetchRoverImage = () => {
    this.setState({loading: true});
    const {camera, rover, sol} = this.state;
    const imageUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${API_KEY}`;
    fetch(imageUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data.photos);
        this.setState({images: data.photos, loading: false});
      });
  };

  render() {
    const {images, rover, camera, loading} = this.state;
    return (
      <div className="form-container">
        <form>
          <label htmlFor="rover">Rover</label>
            <select onChange={this.handleRoverChange} id="rover" value={this.state.value}>
              <option value="curiosity">Curiosity</option>
              <option value="opportunity">Opportunity</option>
              <option value="spirit">Spirit</option>
            </select><br />
            <label htmlFor="camera">Camera Type</label>
            <select onChange={this.handleCameraChange} id="camera" value={this.state.value}>
              <option value="fhaz" disabled={!ROVER_CAMS[rover].includes('fhaz')}>FHAZ (Front Hazard)</option>
              <option value="rhaz" disabled={!ROVER_CAMS[rover].includes('rhaz')}>RHAZ (Rear Hazard)</option>
              <option value="mast" disabled={!ROVER_CAMS[rover].includes('mast')}>Mast Camera</option>
              <option value="chemcam" disabled={!ROVER_CAMS[rover].includes('chemcam')}>Chemistry and Camera Complex</option>
              <option value="mahli" disabled={!ROVER_CAMS[rover].includes('mahli')}>Mars Hand Lens Imager</option>
              <option value="mardi" disabled={!ROVER_CAMS[rover].includes('mardi')}>Mars Descent Imager</option>
              <option value="navcam" disabled={!ROVER_CAMS[rover].includes('navcam')}>NAVCAM (Navigation Cam)</option>
              <option value="pancam" disabled={!ROVER_CAMS[rover].includes('pancam')}>Panoramic Camera</option>
              <option value="minites" disabled={!ROVER_CAMS[rover].includes('minites')}>Miniature Thermal Emission Spectrometer (Mini-TES)</option>
            </select><br />
            <label htmlFor="sol">Martian Sol: 1000-2000</label>
            <input type="number" onChange={this.handleSolChange} max="2000" min="1000" value={this.state.value}/>
        </form>
        <GetImageButton clickFn={this.fetchRoverImage}/>
        <ImageDisplay images={images} loading={loading}/>
      </div>
    )
  }
}
