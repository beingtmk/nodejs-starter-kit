// eslint-disable-next-line import/no-named-default
import { default as LISTING_ROUTES } from '@gqlapp/listing-client-react/routes';

// eslint-disable-next-line import/prefer-default-export
export function ListingShareMessage(id, username, title) {
  const link = typeof window !== 'undefined' && window.location.origin,
    listingLink = `${link}${LISTING_ROUTES.listingDetailLink}${id}`;

  const whatsappMessage = `Hey, check out this listing - ${title} by ${username}, you can check it here ${listingLink}. Checkout other listings at ${link}.`;
  const twitterMessage = {
    text: `Hey, check out this listing - ${title} by ${username},`,
    hashtag: '#nodejs',
    link: listingLink
  };
  const emailMessage = `Hey, I have put my listing - ${title}, you can check it here <a href="${listingLink}">${listingLink}</a>. Checkout other listings at <a href="${link}">${link}</a>.`;
  return { whatsappMessage, twitterMessage, link: listingLink, emailMessage };
}
