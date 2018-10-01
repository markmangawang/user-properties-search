// TODO: add tests
export const imageUrlFaker = (keyword = 'house', customId) => {
  const id = Math.floor(Math.random() * 500) + 1;

  return `https://loremflickr.com/320/240/${keyword}/all?lock=${customId || id}`;
}
