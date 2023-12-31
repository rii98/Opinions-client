import { Link } from "react-router-dom";

type Props = {
  r: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
};

const PreviewCard = ({ r }: Props) => {
  return (
    <div>
      <Link
        to={`/profile/${r._id}`}
        key={r._id}
        className="block max-w-lg border-b border-b-slate-400 p-4"
      >
        <div className="flex gap-4 items-start">
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>

          <div>
            <div className="text-sm font-bold">
              {r.firstname + " " + r.lastname}
            </div>
            <div className="text-xs">{r.email}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PreviewCard;
