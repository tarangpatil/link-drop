"use client";

import { useState } from "react";
import DropCard from "./DropCard";

type Props = {
  dropsSent: {
    senderId: number;
    receiverId: number;
    sentAt: Date;
    dropText: string;
  }[];
  dropsReceived: {
    senderId: number;
    receiverId: number;
    sentAt: Date;
    dropText: string;
  }[];
};

export default function ChatWindow({ dropsSent, dropsReceived }: Props) {
  const [panel, setPanel] = useState<"sent" | "received">("sent");

  return (
    <section className="my-4 position-relative d-lg-none">
      <div
        className="position-absolute col-6"
        style={{
          height: "2.5rem",
          zIndex: -1,
          backgroundColor: `rgba(13, 110, 253, 0.1)`,
          borderBottom: `0.1rem solid rgb(13, 110, 253)`,
          transition: `all ease-in-out 150ms`,
          left: panel === "sent" ? `0px` : `50%`,
        }}
      ></div>
      <div className="row mb-3">
        <div className="col" style={{ borderRight: "1px solid gray" }}>
          <p className="text-center my-0 py-2" onClick={() => setPanel("sent")}>
            Sent
          </p>
        </div>
        <div className="col" style={{ borderLeft: "1px solid gray" }}>
          <p
            className="text-center my-0 py-2"
            onClick={() => setPanel("received")}
          >
            Received
          </p>
        </div>
      </div>
      <div
        className="row position-relative overflow-x-hidden"
        style={{ width: "100vw", minHeight: "50vh" }}
      >
        <div
          className="w-100 position-absolute top-0"
          style={{
            left: panel === "sent" ? "0%" : "-100%",
            transition: `all ease-in-out 150ms`,
          }}
        >
          {dropsSent.map((drop, idx) => (
            <DropCard {...{ drop }} key={idx} />
          ))}
        </div>
        <div
          className="w-100 position-absolute top-0"
          style={{
            left: panel === "received" ? "0%" : "100%",
            transition: `all ease-in-out 150ms`,
          }}
        >
          {dropsReceived.map((drop, idx) => (
            <DropCard {...{ drop }} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
