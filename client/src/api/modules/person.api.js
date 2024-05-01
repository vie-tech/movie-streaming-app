import publicClient from "../client/public.client";

const personEndpoint = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`
};

const personApi = {
    detail: async ({personId})=>{
        try{
            const response = await publicClient.get(personEndpoint.detail(personId))
            return {response}
        }catch(err){
            throw new Error(err)
        }
    },

    medias: async ({personId})=>{
        try{
            const response = await publicClient.get(personEndpoint.medias(personId))
            return {response}
        }catch(err){
            throw new Error(err)
        }
    },

}