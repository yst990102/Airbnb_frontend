import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TitleForm from '../components/TitleForm';
import AddressForm from '../components/AddressForm';
import TypeForm from '../components/TypeForm';
import PropertyInfoForm from '../components/PropertyInfoForm';
import AmenitieForm from '../components/AmenitieForm';
import ThumbnailForm from '../components/ThumbnailForm';
import PriceForm from '../components/PriceForm';

import HeaderNav from '../components/HeaderNav';
import Background from '../img/Background';

// create a new listing
const PageCreateListing = () => {
  const [token, setToken] = React.useState(localStorage.getItem('token') || '');

  const [submitSuccess, setSubmitSuccess] = React.useState(true);
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState({});
  const [type, setType] = React.useState({});
  const [propertyInfo, setPropertyInfo] = React.useState({});
  const [amenitie, setAmenitie] = React.useState([]);
  const [thumbnails, setThumbnails] = React.useState({
    cover: '',
    addition: []
  });
  const [price, setPrice] = React.useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const form = useLocation().search.slice(1);

  // send create new listing request
  const submit = async () => {
    const response = await fetch('https://airbnb-backend.up.railway.app/listings/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        address,
        price,
        thumbnail: thumbnails.cover,
        metadata: {
          additiothumbnail: thumbnails.addition,
          type,
          propertyInfo,
          amenitie
        }
      })
    });

    if (response.status === 200) {
      // successfull create
      navigate(
        {
          pathname: '/mylistings',
          search: 'create_success'
        },
        { state: true }
      );
    } else {
      // fail to create new listing due to duplicate title
      setSubmitSuccess(false);
      navigate({
        pathname: '/mylistings/create',
        search: 'title'
      });
    }
  };

  React.useEffect(() => {
    const loggedInToken = localStorage.getItem('token');

    // check whether user is login
    if (loggedInToken) {
      setToken(loggedInToken);
    } else {
      navigate(
        {
          pathname: '/login'
        },
        {
          state: {
            pathname: location.pathname,
            search: 'title'
          }
        }
      );
    }
  }, []);

  return (
    <>
      <Background />
      <HeaderNav token={token} setToken={setToken} />
      <main
        style={{
          position: 'relative',
          height: 'calc(100vh - 80px)'
        }}
      >
        {/* title form */}
        {form === 'title' && (
          <TitleForm
            title={title}
            setTitle={setTitle}
            submitSuccess={submitSuccess}
            setSubmitSuccess={setSubmitSuccess}
            path="create"
          />
        )}
        {/* address form */}
        {form === 'address' && (
          <AddressForm
            address={address}
            setAddress={setAddress}
            path="create"
          />
        )}
        {/* type form */}
        {form === 'type' && (
          <TypeForm type={type} setType={setType} path="create" />
        )}
        {/* property information form */}
        {form === 'propertyinfo' && (
          <PropertyInfoForm
            propertyInfo={propertyInfo}
            setPropertyInfo={setPropertyInfo}
            path="create"
          />
        )}
        {/* amenities form */}
        {form === 'amenities' && (
          <AmenitieForm
            amenitie={amenitie}
            setAmenitie={setAmenitie}
            path="create"
          />
        )}
        {/* thumbnail form */}
        {form === 'thumbnail' && (
          <ThumbnailForm
            thumbnails={thumbnails}
            setThumbnails={setThumbnails}
            path="create"
          />
        )}
        {/* price form */}
        {form === 'price' && (
          <PriceForm
            price={price}
            setPrice={setPrice}
            submit={submit}
            path="create"
          />
        )}
      </main>
    </>
  );
};

export default PageCreateListing;
