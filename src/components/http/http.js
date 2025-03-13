import axios from "axios";

export const fetchPhotosByQuery = async (topic, currentPage) => {
  const axiosOptions = {
    params: {
      query: topic,
      client_id: "0xFw0fsfncTJR3UQA9BTOt1vOaGllxXaYkfRuukCxhE",
      page: currentPage,
      per_page: 10,
    },
  };

  const response = await axios.get(
    `https://api.unsplash.com/search/photos`,
    axiosOptions
  );

  return response.data;
};
