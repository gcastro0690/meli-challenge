import Image from 'next/image';
import { useRef } from 'react';

const Navbar = () => {
  const inputRef = useRef(null);

  return (
    <div className="Navbar h-14">
      <div className="container flex justify-center items-center h-full">
        <div
          className="Navbar__logo flex items-baseline relative"
          onClick={() => (window.location.href = `/`)}
        >
          <Image
            src="/assets/Logo_ML.png"
            alt="Mercadolibre"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <form className="Navbar__searchbar relative" action="/items">
          <input
            placeholder="Nunca dejes de buscar"
            name="search"
            ref={inputRef}
          />
          <button
            type="submit"
            onClick={(e) => {
              if (inputRef.current.value === '') {
                e.preventDefault();
              }
            }}
          >
            <div>
              <Image
                src="/assets/ic_Search.png"
                alt="Mercadolibre"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
