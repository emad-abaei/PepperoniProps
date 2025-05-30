function Loader() {
  return (
    <div
      className='absolute inset-0 flex items-center justify-center bg-slate-200/50 backdrop-blur-sm'
      role='alert'
      aria-live='assertive'>
      <div className='loader' />
    </div>
  );
}

export default Loader;
