export function scrollOnLoading() {
  const { height: cardHeight } = document
    .querySelector('.ImageGallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2.47,
    behavior: 'smooth',
  });
}
