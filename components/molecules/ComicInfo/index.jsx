import styles from './styles.module.scss';
import Title from 'components/atoms/Title';
import Paragraph from 'components/atoms/Paragraph';
import Image from 'components/atoms/Image';
import Price from 'components/atoms/Price';

const ComicInfo = ({
  defaultSize = 'md',
	title = 'X-Men Legends #2',
	rating = '4/10',
  ratingSize = 'md',
	src = '',
	currency = '$',
	price = '500',
  priceSize = 'lg'
}) => {
	return (
		<div className={styles.info}>
			<Title content={title} size={defaultSize} className={styles.title} />
			<Paragraph content={`Calificación: ${rating}`} size={ratingSize} className={styles.rating} />
			{/* <Image src={src} alt={title}/> */}
			<div className={`${styles.img}`}></div>
      <Price
				content={`${currency}${price}`}
				className={styles.comicInfoPrice}
				size={priceSize}
			/>
		</div>
	);
};

export default ComicInfo;
