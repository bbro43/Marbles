// Who looks like what in The Commons, the team rooms and story scenes.
// The list lives in data/people.json so Billy can edit it without touching code:
// each brawler's id → { name, model }. A model of null means that brawler isn't shown.
let PEOPLE = null;

export async function loadPeople() {
  if (!PEOPLE) PEOPLE = (await (await fetch('data/people.json')).json()).people;
  return PEOPLE;
}

// the model file for one brawler, or null (not in the list, or set to null)
export async function modelFor(id) {
  return (await loadPeople())[id]?.model || null;
}
