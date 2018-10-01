// TODO: add tests
export default (categories) => {
  const resultsBuild = {};

  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];

    if (category.results.length > 0) {
      const { results, resultBuilder, name, key } = category;

      const categoryResults = results.map(resultBuilder);

      resultsBuild[key] = {
        name,
        results: categoryResults,
      };
    }
  }

  return resultsBuild;
}
