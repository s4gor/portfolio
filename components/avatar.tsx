import Image from 'next/image';

export default function Avatar() {
  return(
    <Image
    src="/images/emran.jpg"
    alt='Emran Hossain Sagor'
    className='m-0 inline w-14 aspect-square overflow-hidden object-cover rounded-md border rotate-6 -translate-y-0.5 border-neutral-200'
    width='460'
    height='460'
    />
  );
}