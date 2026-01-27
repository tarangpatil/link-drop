import { User } from "@/generated/client";
import { MouseEvent, useEffect, useState } from "react";

type Props = {
  user: User;
};
export default function ({ user }: Props) {
  const [invited, setInvited] = useState(false);

  useEffect(() => {
    fetch(`/api/query/invite?q=${user.email}`)
      .then((res) => res.json())
      .then((data) => setInvited(data));
  }, []);

  function handleInvite() {
    fetch(`/api/query/invite`, {
      body: JSON.stringify({ sendTo: user.email }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setInvited(true);
      });
  }

  return (
    <li className="list-group-item">
      <p className="my-0 d-flex justify-content-between align-items-center">
        {user.name}
        <span>
          <button
            className="mx-1 btn btn-outline-secondary"
            disabled={invited}
            onClick={handleInvite}
          >
            <i className="bi bi-send"></i> {invited ? "Invited" : "Invite"}
          </button>
        </span>
      </p>
    </li>
  );
}
