/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JXoVUGpxHep2NsrzQs8untNs26EqNg8i3zzIwOwxCoEgOoI5XhP00hpQ01TMa74aLnuW8Wh1wc1kudWRZ9caU4j00T9edEgUk'
);

export const bookTour = async tourId => {
  try {
    //1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    //2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    // console.log(err);
    showAlert('error', err);
  }
};
