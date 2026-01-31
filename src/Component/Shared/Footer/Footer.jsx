import React from 'react';


const Footer = () => {
  return (
    <div className='mt-4 '>
      <footer className="footer footer-horizontal footer-center  text-base-content rounded p-10 bg-slate-150">
  <nav className="grid grid-flow-col gap-4">
    <a className="link link-hover">About Us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Working Hours</a>
    <a className="link link-hover">Notification</a>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
     <a href="https://x.com" target="_blank" rel="noopener noreferrer">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="fill-current"
  >
    <path d="M18.244 2H21.552L14.196 10.4L22.852 22H16.078L10.768 14.977L4.657 22H1.347L9.217 12.983L0.852 2H7.797L12.6 8.42L18.244 2ZM17.115 20.077H18.95L6.799 3.823H4.828L17.115 20.077Z"/>
  </svg>
</a>

      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
  <aside className='flex'>
    
    <img src="https://i.ibb.co/TqL6T16F/5528439.jpg" alt="logo" className='w-6 h-6 rounded-full'/>
    <p className='text-green-400'> LocalChefBazaar</p>
    <p className='mr-2'>© 2026 LocalChefBazaar</p>
  </aside>
</footer>
      
    </div>
  );
};

export default Footer;