import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";


const main = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon/>,
    state: "home"
  },
  {
    display: "movies",
    path: "/movie",
    icon: <SlideshowOutlinedIcon/>,
    state: "movie"
  },
  {
    display: "tv series",
    path: "/tv",
    icon: <LiveTvOutlinedIcon/>,
    state: "tv"
  },
  {
    display: "search",
    path: "/serach",
    icon: <SearchOutlinedIcon/>,
    state: "search"
  },
  {
    display: "music",
    path: "/music",
    icon: <HomeOutlinedIcon/>
  },
];


const user = [
    {
        display: "favourites",
        path: "/favourites",
        icon: <FavoriteBorderOutlinedIcon/>,
        state: "favourites"
      },
    {
        display: "reviews",
        path: "/reviews",
        icon: <RateReviewOutlinedIcon/>,
        state: "reviews"
      },
    {
        display: "password update",
        path: "/password-update",
        icon: <LockResetOutlinedIcon/>
      },
]

const menuConfigs = {main, user}

export default menuConfigs 