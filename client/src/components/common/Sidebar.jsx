import {
  Drawer,
  List,
  ListItemButton,
  ListitemIcon,
  ListItemText,
  Stack,
  Toolbar,
  TYpography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo"
import uiConfigs from "../../configs/ui.configs"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {themeModes} from "../../configs/theme.configs"
import { setThemeMode } from "../../redux/features/themeModeSlice";
const Sidebar = ({ open, toggleSidebar }) => {
    const dispatch = useDispatch()

    const {user} = useSelector((state)=> state.user)
    const {appState} = useSelector((state)=> state.appState)
    const {themeMode} = useSelector((state)=> state.themeMode)

    const sidebarWidth = uiConfigs.size.sideBarWidth
    const onSwitchTheme = ()=>{
        const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
    }

    const drawer  = (
        <>
        <Toolbar sx={{paddingY: "20px", color: "text.primary"}}>
        <Stack width="100%" direction="row" justifyContent="center">

        </Stack>
        </Toolbar>
        </>
    )
  return <></>;
};

export default Sidebar;
