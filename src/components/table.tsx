import { useState } from "react";
import { Button, Popover, Typography, Modal, Box } from "@mui/material"; // Import Popover, Typography, Modal, and Box from Material-UI
import styles from "./table.module.css";
import Menu from "@/components/menu";

export default function Table({ data }: { data: TableData }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // State to manage the anchor element for Popover
  const [openPopover, setOpenPopover] = useState<boolean>(false); // State to manage the visibility of the Popover
  const [openModal, setOpenModal] = useState<boolean>(false); // State to manage the visibility of the Modal
  const [available, setAvailable] = useState<boolean>(data.table_available);
  const url = "https://rapid-api-rho.vercel.app"; //live version
  //const url = "http://127.0.0.1:8000"; localhost
  const availabilityStyle = available
    ? styles.tableAvailable
    : styles.tableNotAvailable;
  const popoverLabel = available ? `Reserve Table` : `Unreserve Table`;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set the anchor element when the table is clicked
    setOpenPopover(true); // Open the Popover
  };

  const handleClosePopover = (event: React.MouseEvent<HTMLElement> | null) => {
    if (event) {
      event.stopPropagation(); // Prevent event propagation to prevent Popover from reopening
    }
    setOpenPopover(false); // Close the Popover
  };

  const handleReserve = async () => {
    try {
      // Run the setReservation function
      await setReservation();

      // Close the Popover after reservation
      setOpenPopover(false);
    } catch (error) {
      console.error("Error reserving table:", error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true); // Open the Modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the Modal
  };

  const setReservation = async () => {
    try {
      // Toggle the local state
      setAvailable((prevAvailable) => !prevAvailable);

      // Determine the endpoint based on the current availability
      const endpoint = available
        ? `${url}/table/set/${data.table_id}`
        : `${url}/table/clear/${data.table_id}`;

      // Send a POST request to the determined endpoint to update the availability state
      await fetch(endpoint, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error updating table availability:", error);
    }
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "popover" : undefined;
  const modalStyle = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%)",
    width: 450,
    bgcolor: "background.paper",
    // color: "black",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div
      className={[styles.table, availabilityStyle].join(" ")}
      onClick={handleClick}
    >
      <div className={styles.tDisplay}>
        <img src="/final_table.png" alt="Table" />
      </div>
      <div className={styles.cDisplay}>🪑 x{data.max_customer}</div>
      <button className={styles.statusButton}>
        {available ? `${data.table_id} - Open` : `${data.table_id} - Reserved`}
      </button>

      {/* Popover component */}
      <Popover
        id={popoverId}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={(event: React.MouseEvent<HTMLElement>) => {
          handleClosePopover(event);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div>
          <span className="content-center">
            <Typography sx={{ p: 2 }}>Confirm Reservation</Typography>
          </span>
          <Typography sx={{ p: 2 }}>
            Click the button below to change the status of the table.
          </Typography>
          <div className="lg:items-center">
            {
              // set the popover button to either allow the user to order, or to unreserve the table
              available
              ?
              <Button onClick={handleOpenModal} variant="contained" sx={{ m: 2 }}>
                Place Order
              </Button>
              :
              <Button onClick={handleReserve} variant="contained" sx={{ m: 2 }}>
                {popoverLabel}
              </Button>
            }
          </div>
        </div>
      </Popover>

      {/* Modal component */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Menu
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add your menu items here.
          </Typography>
          <Menu
          tableID={data.table_id}
          handleReserve={handleReserve}
          handleClose={() => {
            handleCloseModal();
            handleClosePopover(null);
          }}/>
        </Box>
      </Modal>
    </div>
  );
}
