const tagsList = {
  tags1: [],
  tags2: [],
  tags3: [],
};

const getFilledTagsCount = () => {
  return Object.keys(tagsList).filter((tag) => tagsList[tag].length > 0).length;
};

const getDuplicates = () => {
  const seen = [];
  const duplicates = {};

  Object.keys(tagsList).forEach((tagInput) => {
    tagsList[tagInput].forEach((tag) => {
      if (seen.indexOf(tag) !== -1) {
        duplicates[tag] = (duplicates[tag] || 1) + 1;
      } else {
        seen.push(tag);
      }
    });
  });

  return duplicates;
};

const displayDuplicates = (duplicates) => {
  const compareTags = (a, b) => {
    return duplicates[b] - duplicates[a];
  };

  const [fullDuplicates, partialDuplicates] = Object.keys(duplicates)
    .sort(compareTags)
    // .map((tag) => `#${tag}`)
    .reduce(
      (acc, curr) => {
        if (duplicates[curr] === getFilledTagsCount()) {
          acc[0].push(`#${curr}`);
        }
        if (duplicates[curr] >= 2) {
          acc[1].push(`#${curr}`);
        }
        return [acc[0], acc[1]];
      },
      [[], []]
    );
  document.getElementById("duplicate-tags-all").value = fullDuplicates.join(" ");
  document.getElementById("duplicate-tags-2").value = partialDuplicates.join(" ");
};

const bindChange = (id) =>
  document.getElementById(id).addEventListener("change", (e) => {
    if (e.target.value) {
      tagsList[e.target.id] = e.target.value
        .split(/#|,/)
        .slice(1)
        .map((str) => str.trim());
      const duplicates = getDuplicates();
      displayDuplicates(duplicates);
    }
  });

Object.keys(tagsList).forEach((tag) => {
  bindChange(tag);
});
