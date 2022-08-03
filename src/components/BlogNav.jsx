import {useEffect,useState} from "react";

export default function BlogNav(props) {
  const [prev, setPrev] = useState(0);
  const [next, setNext] = useState(1000);

  useEffect(() => {
    const page = parseInt(window.location.pathname.split('/')[2]);
    setNext(page + 1);
    setPrev(page - 1);
  });

  return (
    <div className="w-full flex items-center py-3 text-[neueHaasRoman] text-[1.3em] text-[#3864c5]">
      <div className="grow flex justify-start" >{ prev > 0 && <a href={`/posts/${prev}`}>Prev</a> }</div>
      <div className="grow flex justify-end" >{ next <= props.pages && <a href={`/posts/${next}`}>Next</a> }</div>
    </div>
  )
}