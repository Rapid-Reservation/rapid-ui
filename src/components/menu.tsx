import { useState } from "react";
// import styles from "./menu.module.css";
import { Button, Divider, Stack, Container, Drawer, Popover, Box, Tabs, Tab, Typography, List, ListItem, ListItemText, ListItemIcon, Tooltip } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';

// Taken from https://mui.com/material-ui/react-tabs/#introduction
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Taken from https://mui.com/material-ui/react-tabs/#introduction
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Taken from https://mui.com/material-ui/react-tabs/#introduction
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Menu({ handleClose }: { handleClose: () => void }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // State to manage the anchor element for Popover
  const [openPopover, setOpenPopover] = useState<boolean>(false); // State to manage the visibility of the Popover
  const [tabvalue, settabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    settabValue(newValue);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!openPopover) {
      //@ts-ignore
      setAnchorEl(event.currentTarget.parentElement.parentElement); // Set the anchor element when the table is clicked
      setOpenPopover(true); // Open the Popover
    }

    // add item to cart

  };

  const handleClosePopover = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // Prevent event propagation to prevent Popover from reopening
    setOpenPopover(false); // Close the Popover
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabvalue} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Menu" {...a11yProps(0)} />
          <Tab label="Cart (4)" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabvalue} index={0}>
        <Divider>Apps</Divider>
        <Container sx={{ mb: 2 }}>
          <Button onClick={handleClick} size="small" endIcon={<AddIcon />}>Item</Button>
        </Container >
        <Divider>Meals</Divider>
        <Container sx={{ mb: 2 }}>
          <Button onClick={handleClick} size="small" endIcon={<AddIcon />}>Item</Button>
        </Container>
        <Divider>Drinks</Divider>
        <Container sx={{ mb: 2 }}>
          <Button onClick={handleClick} size="small" endIcon={<AddIcon />}>Item</Button>
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={tabvalue} index={1}>
        <List dense={true}>
            <ListItem>
              <ListItemIcon>
                -
              </ListItemIcon>
              <ListItemText
                primary="Cheeseburger"
                secondary={'$5.99'}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                -
              </ListItemIcon>
              <ListItemText
                primary="Fries"
                secondary={'$3.99'}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                -
              </ListItemIcon>
              <ListItemText
                primary="Chicken Tenders"
                secondary={'$5.99'}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                -
              </ListItemIcon>
              <ListItemText
                primary="Soda"
                secondary={'$2.99'}
              />
            </ListItem>
        </List>
        <Divider textAlign="left" sx={{ mb: 2 }}>Total</Divider>
        <Typography textAlign="center">$999.99</Typography>
      </CustomTabPanel>
      <Container>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ m: 2 }}
          >
            Close
          </Button>
          <Tooltip title={<Typography>Submitting your order will reserve the table for you.</Typography>}>
            <Button
              variant="contained"
              sx={{ m: 2 }}
              color="success"
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </Tooltip>
        </Container>
    </>
  );
}
