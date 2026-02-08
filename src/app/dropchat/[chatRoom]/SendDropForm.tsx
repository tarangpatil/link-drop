"use client";
import { sendDrop } from "@/lib/actions/drop";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

type Props = {
  userEmail: string;
  recipientEmail: string;
};

export default function SendDropCard({ recipientEmail, userEmail }: Props) {
  const [state, action, isPending] = useActionState(sendDrop, {});
  const router = useRouter();
  console.log(state, !!state.errors);

  useEffect(() => {
    if (state && !isPending && !state.errors) {
      router.refresh();
    }
  }, [isPending]);

  return (
    <form action={action} className={state.errors && "was-validated"}>
      <input
        type="hidden"
        name="sender-email"
        value={userEmail}
        className="d-none"
      />
      <input
        type="hidden"
        name="receiver-email"
        value={recipientEmail}
        className="d-none"
      />
      <div className="input-group">
        <input
          type="text"
          name="drop-text"
          placeholder="Send another drop"
          className="form-control"
          required
        />
        <button className="btn btn-primary rounded-end" type="submit">
          <i className="bi bi-send"></i> Send
        </button>
        {state.errors && (
          <div className={"invalid-feedback is-invalid"}>{state.errors}</div>
        )}
      </div>
    </form>
  );
}
