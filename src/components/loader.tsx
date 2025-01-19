import Image from 'next/image';
import loader from '~/images/loaders/heart-rainbow.webp';

export default function Loader() {
  return (
    <div className="loading-wrapper">
      <p className="sr-only">Loading...</p>
      <Image src={loader} alt="" priority />
    </div>
  );
}
