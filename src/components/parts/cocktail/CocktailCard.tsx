import { memo, VFC } from "react";
import { Link } from "react-router-dom";

type Props_type = {
  id: string;
  name: string;
  image: string;
  glass: string | null;
  info: string | null;
};

const CocktailCard: VFC<Props_type> = memo(
  ({ id, name, image, glass, info }) => {
    return (
      <div className="col">
        <div className="card h-2">
          <img src={image} alt={name} className="card-img-top" />
          <div className="card-body" style={{ textAlign: "left" }}>
            <h5 className="card-title">{name}</h5>
            <h4 className="card-title">{glass}</h4>
            <p className="card-text">{info}</p>
            <Link to={`/cocktail/${id}`}>
              <button className="btn btn-info">Detail</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

export default CocktailCard;
