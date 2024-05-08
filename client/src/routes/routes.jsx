import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetail";
import MediaSearch from "../pages/MediaSearch";
import PasswordUpdate from "../pages/PasswordUpdate";
import ReviewList from "../pages/ReviewList";
import ProtectedPage from "../components/common/ProtectedPage";
import FavouriteList from "../pages/FavouriteList";
import MediaList from "../pages/MediaList";


export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favouriteList: "/favourites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/person:personId",
    element: <PersonDetail />,
    state: "person.detail",
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },
  {
    path: "/favourites",
    element: (
      <ProtectedPage>
        <FavouriteList/>
      </ProtectedPage>
    ),
    state: "favourites",
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList/>
      </ProtectedPage>
    ),
    state: "reviews",
  },
 
  {
    path: "/:mediaType",
    element: <MediaList />,
    state: "media.list",
  },
  {
    path: "/:mediaType/:mediaId",
    element: <mediaDetail/>
  }
];


export default routes