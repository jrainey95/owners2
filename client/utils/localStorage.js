export const getSavedHorseIds = () => {
  const savedHorseIds = localStorage.getItem("saved_horses")
    ? JSON.parse(localStorage.getItem("saved_horses"))
    : [];

  return savedHorseIds;
};

export const saveHorseIds = (horseIdArr) => {
  if (horseIdArr.length) {
    localStorage.setItem("saved_horses", JSON.stringify(horseIdArr));
  } else {
    localStorage.removeItem("saved_horses");
  }
};

export const removeHorseId = (bookId) => {
  const savedBookIds = localStorage.getItem("saved_horses")
    ? JSON.parse(localStorage.getItem("saved_horses"))
    : null;

  if (!savedHorseIds) {
    return false;
  }

  const updatedSavedHorseIds = savedHorseIds?.filter(
    (savedHorseId) => savedHorseId !== horseId
  );
  localStorage.setItem("saved_horses", JSON.stringify(updatedSavedHorseIds));

  return true;
};
