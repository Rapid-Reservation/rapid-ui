import Header from "@/components/header";
import Menu from "@/components/menu";

export default function MenuPage() {
  return (
    <>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <Menu
          tableID={0}
          handleClose={function (): void {
            throw new Error("Function not implemented.");
          }}
          handleReserve={function (): Promise<void> {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </>
  );
}
