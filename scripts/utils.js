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
