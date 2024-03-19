import { createAd } from "./ad-creation-model.js";

export function adCreationController(adCreation) {
  adCreation.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(adCreation);
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const type = formData.get("type");
    const tags = formData.get("tags").split(",").map(tag => tag.trim());

    try {
      await createAd(title, description, price, type, tags);
      setTimeout(() => {
        window.location = "index.html";
      }, 2000);
    } catch (error) {
      alert(error);
    }
  });
}