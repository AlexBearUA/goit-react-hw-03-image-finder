export function scrollOnLoading() {
  const { height: cardHeight } = document
    .querySelector('.ImageGallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 1.75,
    behavior: 'smooth',
  });
}
