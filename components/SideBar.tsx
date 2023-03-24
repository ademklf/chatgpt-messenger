"use client";
import NewChat from "./NewChat";

function SideBar() {
  return (
    <div className="flex h-screen flex-col p-2">
      <div className="flex-1">
        <div className="flex flex-col gap-y-2">
          <NewChat />
          <div>{/*ModelSelection */}</div>

          {/*Map through the ChatRows */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
