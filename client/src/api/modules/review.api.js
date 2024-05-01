import privateClient from "../client/private.client";

const reviewEndpoints = {
  list: "reviews",
  add: "reviews",
  remove: ({ reviewId }) => `reviews/${reviewId}`,
};

const reviewApi = {
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      });
      return {response}
    } catch (err) {
      throw new Error(err.message);
    }
  },

  remove: async ({reviewId})=>{
    try{
        const response = await privateClient.delete(reviewEndpoints.remove(reviewId))
        return {response}
    }catch(err){
        throw new Error(err.message)
    }
  },

  getList: async ()=>{
    try{
        const response = await privateClient.get(reviewEndpoints.list)
        return {response}
    }catch(err){
        throw new Error(err.message)
    }
  }
};

export default reviewApi;
