import ImageCard from "../ImageCard/ImageCard";
import css from "../ImageGallery/ImageGallery.module.css";
export default function ImageGallery({ items, openModal }) {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {items.map((image) => (
          <li key={image.id} className={css.item}>
            <ImageCard info={image} openModal={openModal} />
          </li>
        ))}
      </ul>
    </div>
  );
}
