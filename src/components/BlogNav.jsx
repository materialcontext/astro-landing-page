export default function BlogNav(props) {
  const prev = props.current - 1;
  const next = props.current + 1;

  return (
    <div className="w-full flex items-center py-3 text-[neueHaasRoman] text-[1.3em] text-[#3864c5]">
      <div className="grow flex justify-start" >{ prev > 0 && <a className="hover:underline" href={`/posts/${prev}`}>Prev</a> }</div>
      <div className="grow flex justify-end" >{ next <= props.pages && <a className="hover:underline" href={`/posts/${next}`}>Next</a> }</div>
    </div>
  )
}