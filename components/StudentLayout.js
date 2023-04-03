import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentNavbar from './StudentNavbar';
import StudentSidebar from './StudentSidebar';

import Store from '@/utils/Store';

import { FiSettings } from 'react-icons/fi';

function StudentLayout({ title, children }) {
  const menu = Store((state) => state.menu);

  const { activeMenu } = menu;

  return (
    <>
      <Head>
        <title>{title ? title + ' - PUPQC' : 'PUPQC'}</title>
        <meta name="description" content="Created by PUPians" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <div className="flex relative ">
          {/* Button settings in the below right corner */}
          <div className="fixed right-4 bottom-4">
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white rounded-full bg-red-600"
                // onClick={() => setThemeSettings(true)}
                // // For dynamic theming of background
                // style={{ background: currentColor }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* Sidebar Menu Condition */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar ">
              <StudentSidebar />
            </div>
          ) : (
            <div className="w-0 ">
              <StudentSidebar />
            </div>
          )}

          {/* Navbar */}
          <div
            className={` bg-main-bg min-h-screen w-full ${
              activeMenu ? 'md:ml-72 ' : 'flex-2'
            }`}
          >
            <div className="fixed md:static bg-main-bg  navbar w-full">
              <StudentNavbar />
            </div>
            <main className="container m-auto p-8 mt-4 flex min-h-screen flex-col justify-between bg-gray-100 rounded-xl">
              {children}
            </main>
            <div className="flex justify-between align-middle p-2 md:mx-6 relative"></div>
          </div>
        </div>

        {/* <header className="text-gray-600 body-font shadow-md">
          <StudentNavbar />
        </header>
        <StudentSidebar /> */}

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright ©2023 JBShop</p>
        </footer>
      </div>
    </>
  );
}

export default StudentLayout;
