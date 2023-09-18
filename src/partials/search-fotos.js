async function pingPixabay({ q = '', page = '1' }) {
  try {
    const queryString = new URLSearchParams({
      ...DEFAULT_PIXABAY_PARAMS,
      page,
      q,
    });
      
    const response = await fetch()
  } catch (e) {
    return { error: e.toString() };
  }
}

export async function searchFotos(e) {
  e.preventDefault();

  e.target.page.value = '1';
  await loadPhotos({ q, pade: '1' });
}
