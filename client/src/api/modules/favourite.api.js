import privateClient from "../client/private.client";

const favouriteEndpoint = {
  list: "user/favourite",
  add: "user/favourites",
  remove: ({ favouriteId }) => `user/favourites/${favouriteId}`,
};

const favouriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(favouriteEndpoint.list);
      return { response };
    } catch (err) {
      return { err };
    }
  },

  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(favouriteEndpoint.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  remove: async ({ favouriteId }) => {
    try {
      const response = await privateClient.delete(
        favouriteApi.remove({ favouriteId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};


export default favouriteApi; 