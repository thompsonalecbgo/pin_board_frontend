const url = "http://localhost:8000/api/v1";

export const findLink = (arr, note1, note2) => {
  return arr.filter((el) => {
    return (
      (el.note1 == note1.id && el.note2 == note2.id) ||
      (el.note2 == note1.id && el.note1 == note2.id)
    );
  });
};

export const findOtherLinks = (arr, note1, note2) => {
  return arr.filter((el) => {
    return !(
      (el.note1 == note1.id && el.note2 == note2.id) ||
      (el.note2 == note1.id && el.note1 == note2.id)
    );
  });
};

export async function getLinksData() {
  const res = await fetch(`${url}/links/`);
  const links = await res.json();
  if (links.errors) {
    throw new Error("Failed to fetch API");
  }
  return links;
}

export async function addLink({ note1, note2 }) {
  const res = await fetch(`${url}/links/`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ note1, note2 }),
  });
  const link = await res.json();
  if (link.errors) {
    console.error(link.errors);
    throw new Error("Failed to fetch API");
  }
  return link;
}

export async function deleteLink({ id }) {
  try {
    await fetch(`${url}/links/${id}/`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error.message);
  }
}
