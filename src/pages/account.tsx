import Header from "@/components/header";
import AccountDetails from "@/components/accountDetails";

export default function Reserve() {
  // The style tag here makes the floor component render BELOW the fixed header component
  return (
    <>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <AccountDetails />
      </div>
    </>
  );
}
