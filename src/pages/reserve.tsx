import Header from "@/components/header";
import Floor from "@/components/floor";

export default function Reserve() {
  // The style tag here makes the floor component render BELOW the fixed header component
  return (
    <>
      <Header />
      <div style={{ marginTop: "80px" }}>
        <Floor />
      </div>
    </>
  );
}
