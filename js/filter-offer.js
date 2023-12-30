const filterOffer = (offers, offerSlice, markerGroup, cb) => {
  const selectedType = document.querySelector('#housing-type');
  const selectedPrice = document.querySelector('#housing-price');
  const selectedRoom = document.querySelector('#housing-rooms');
  const selectedGuests = document.querySelector('#housing-guests');
  const selectedFeature = document.querySelector('#housing-features');


  selectedType.addEventListener('change', () => {
    const offerByType = offers.filter((item) => item.offer.type === selectedType.value);
    markerGroup.clearLayers();
    offerByType.slice(0, 10).forEach((item) => cb(item));
    if (selectedType.value === 'any') offerSlice.forEach((item) => cb(item));
  });

  selectedPrice.addEventListener('change', () => {
    let offerByPrice;
    switch (selectedPrice.value) {
      case 'middle':
        offerByPrice = offers.filter((item) => item.offer.price >= 10000 && item.offer.price <= 50000).slice(0, 10);
        break;
      case 'low':
        offerByPrice = offers.filter((item) => item.offer.price < 10000).slice(0, 10);
        break;
      case 'high':
        offerByPrice = offers.filter((item) => item.offer.price > 50000).slice(0, 10);
        break;
      default:
        offerByPrice = offerSlice;
    }
    markerGroup.clearLayers();
    offerByPrice.forEach((item) => cb(item));
  });

  selectedRoom.addEventListener('change', () => {
    const offerByRoom = offers.filter((item) => item.offer.rooms === parseInt(selectedRoom.value));
    markerGroup.clearLayers();
    offerByRoom.slice(0, 10).forEach((item) => cb(item));
    if (selectedRoom.value === 'any') offerSlice.forEach((item) => cb(item));
  });

  selectedGuests.addEventListener('change', () => {
    const offerByGuests = offers.filter((item) => item.offer.guests === parseInt(selectedGuests.value));
    markerGroup.clearLayers();
    offerByGuests.slice(0, 10).forEach((item) => cb(item));
    if (selectedGuests.value === 'any') offerSlice.forEach((item) => cb(item));
  });

  let featureList = [];
  let checkedFeature = [];
  const getOfferRank = (offer) => {
    let rank = 0;

    for (const feature of featureList) {
      if (offer.offer.features && offer.offer.features.indexOf(feature) !== -1) {
        rank += 1;
      }
    }

    return rank;
  };

  const compareOffers = (offerA, offerB) => {
    const rankA = getOfferRank(offerA);
    const rankB = getOfferRank(offerB);

    return rankB - rankA;
  };

  selectedFeature.addEventListener('click', (evt) => {
    const offerByFeature = offers.slice();
    if (evt.target.value) {
      if (evt.target.checked) {
        selectedFeature.setAttribute('checked', true);
        featureList.push(evt.target.value);
        checkedFeature.push('check');

        markerGroup.clearLayers();
        offerByFeature.sort(compareOffers).slice(0, 10).forEach((item) => cb(item));
      } else if (!evt.target.checked) {
        checkedFeature.pop();
      }
      if (checkedFeature.length === 0) {
        markerGroup.clearLayers();
        offerSlice.forEach((item) => cb(item));
      }
    }
  });
};

export {filterOffer};
