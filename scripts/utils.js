const removeDuplicates = (wishlist) => {
    const seen = new Set();
    return wishlist.filter(obj => {
      const objectString = JSON.stringify(obj);
      if (!seen.has(objectString)) {
        seen.add(objectString);
        return true;
      }
      return false;
    });
  }
const sortData = (data, sortBy) => {
    if (order === 'ascending') {
        return data.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]));
    } else if (order === 'descending') {
        return data.sort((a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy]));
    } else {
        // Default to ascending order if order is not specified or incorrect
        return data.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]));
    }
}