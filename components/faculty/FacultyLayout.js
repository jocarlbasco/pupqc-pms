import React from 'react';
import Store from '@/utils/Store';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacultySidebar from './FacultySidebar';
import FacultyNavbar from './FacultyNavbar';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

function FacultyLayout({ title, children }) {
  const menu = Store((state) => state.menu);
  const { activeMenu } = menu;

  return (
    <div>
      <Head>
        <title>{title ? title + ' - PUPQC' : 'PUPQC'}</title>
        <meta name="description" content="Created by PUPians" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="min-h-screen flex-col justify-between bg-gray-100">
        <div className="flex relative ">
          {/* Sidebar Menu Condition */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar bg-white z-10">
              <FacultySidebar />
            </div>
          ) : (
            <div className="w-0 ">
              <FacultySidebar />
            </div>
          )}
          {/* Navbar */}
          <div
            className={` bg-main-bg min-h-screen w-full ${
              activeMenu ? 'lg:ml-72 ' : 'flex-2'
            }`}
          >
            <div className="fixed md:static bg-main-bg navbar w-full z-10 shadow-sm md:shadow-none">
              <FacultyNavbar />
            </div>
            <div className="">
              {/* <ThemeSettings /> */}
              <main className="mt-14 md:mt-0 px-4 md:px-8 pt-6 flex min-h-screen flex-col justify-between rounded-xl">
                {children}
              </main>
            </div>
            <div className="flex justify-between align-middle p-2 md:mx-6 relative"></div>
          </div>
        </div>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright ©2023 PUPQC PMS</p>
        </footer>
      </div>
    </div>
  );
}

export default FacultyLayout;
