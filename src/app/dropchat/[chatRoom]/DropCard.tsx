import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  drop: {
    senderId: number;
    receiverId: number;
    sentAt: Date;
    dropText: string;
  };
};

type OGData = {
  title: string | null;
  image: string | null;
};

export default function DropCard({ drop }: Props) {
  const [OGData, setOGData] = useState<OGData>();

  useEffect(() => {
    const fetchURL = new URL(location.href);
    fetchURL.pathname = `/api/og`;
    fetchURL.searchParams.set("url", drop.dropText);
    fetch(fetchURL)
      .then((res) => res.json())
      .then(setOGData);
  }, []);

  return (
    <div className="card mb-3">
      <div className="card-body" style={{ maxWidth: `90vw` }}>
        {OGData?.image && (
          <img
            src={OGData.image}
            alt={"image not found"}
            className="card-img-top h-auto mb-2 rounded"
            loading="eager"
          />
        )}
        {OGData?.title && <p className="card-title">{OGData.title}</p>}
        <p className="card-text small text-secondary">
          {drop.dropText.length > 30
            ? drop.dropText.substring(0, 30) + "..."
            : drop.dropText}
        </p>
        <Link
          href={drop.dropText}
          target="_blank"
          className="btn btn-secondary"
        >
          <i className="bi bi-box-arrow-up-right small"></i>
        </Link>
      </div>
    </div>
  );
}
