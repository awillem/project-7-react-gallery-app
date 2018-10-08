import React, { Component } from 'react';
import {
  Route, 
  Redirect, 
  BrowserRouter, 
  Switch
} from 'react-router-dom';
import './css/index.css';
import axios from 'axios';
import config from './.config';



//Component Imports
import Header from './Header';
import GalleryForm from './GalleryForm';
import NotFound from './NotFound';


const apiKey = config.apiKey;
class App extends Component {
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  state = {
    imgs: [],
    query: "",
    cats: [],
    dogs: [],
    computers: [],
    loading: true
  }

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cat&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState( prevState => ({
          ...prevState,
          cats: response.data.photos.photo,
          loading: false
        }));
             })
             .catch(error => {
              console.log('Error fetching and parsing data', error);
            });
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dog&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState( prevState => ({
          ...prevState,
          dogs: response.data.photos.photo,
          loading: false
        }));
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState( prevState => ({
          ...prevState,
          computers: response.data.photos.photo,
          loading: false
        }));
             })
             .catch(error => {
              console.log('Error fetching and parsing data', error);
            });
  }
  

  performSearch = (query) => {
    this.setState( prevState => ({
      ...prevState,
      loading: true
    }));
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&page=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState( prevState => ({
        ...prevState,
        query: query,
        imgs: response.data.photos.photo,
        loading: false
      }));
           })
           .catch(error => {
            console.log('Error fetching and parsing data', error);
          });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header 
            cats={this.state.cats}
            dogs={this.state.dogs}
            computers={this.state.computers}
            onSearch={this.performSearch}
          />
           { this.state.loading ? <p>Loading...</p> : 
          <Switch>           
            <Route exact path="/" render={ () => <Redirect to='/cats' />} />
            <Route path="/cats" render={ () => <GalleryForm images={this.state.cats} title={'Cats'} />} />
            <Route path="/dogs" render={ () => <GalleryForm images={this.state.dogs} title={'Dogs'} />} />
            <Route path="/computers" render={ () => <GalleryForm images={this.state.computers} title={'Computers'} />} />
            <Route path="/search" render={ () => <GalleryForm images={this.state.imgs} title={this.state.query} />} />
            
            <Route component={NotFound} />
           </Switch> }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
