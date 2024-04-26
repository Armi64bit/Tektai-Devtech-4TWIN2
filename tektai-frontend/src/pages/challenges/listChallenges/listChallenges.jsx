import React, { useState, useEffect } from "react";
import axios from 'axios';
import Challenges from "./challenge";
import { Link } from "react-router-dom";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import '../createChallenge/card.css'

function ListChallenges() {
    
    const [activeTab, setActiveTab] = useState('Ongoing');
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("color-theme", newTheme);
    };
    // Mock user role and login status
    const isLoggedIn = () => {
        const storedToken = localStorage.getItem('token');
        return !!storedToken;
    };
   
    return (
        <div className="ml-4 flex flex-col min-h-screen overflow-hidden">
            <Header />
            {/* <div className="bg-dark_purple flex max-w-5xl mx-auto gap-8 group">
                <div className="bg-white/10 group-hover:blur-sm hover:!blur-none | cursor-pointer p-8 rounded-xl mix-blend-luminosity">
                    <img src="../../../../public/default-profile-picture.png" alt="company profile image here" className="h-20 mx-auto"/>
                    <h4 className="uppercase text-xl font-bold"> company name</h4>
                    <p className="text-sm leading-7 my-3 font-light opacity-50">desc</p>
                    <button>Participate</button>
                </div>

                <div className="bg-white/10 group-hover:blur-sm hover:!blur-none | cursor-pointer p-8 rounded-xl mix-blend-luminosity">
                    <img src="../../../../public/default-profile-picture.png" alt="company profile image here" className="h-20 mx-auto"/>
                    <h4 className="uppercase text-xl font-bold"> company name</h4>
                    <p className="text-sm leading-7 my-3 font-light opacity-50">desc</p>
                    <button>Participate</button>
                </div>

                <div className="bg-white/10 group-hover:blur-sm hover:!blur-none | cursor-pointer p-8 rounded-xl mix-blend-luminosity">
                    <img src="../../../../public/default-profile-picture.png" alt="company profile image here" className="h-20 mx-auto"/>
                    <h4 className="uppercase text-xl font-bold"> company name</h4>
                    <p className="text-sm leading-7 my-3 font-light opacity-50">desc</p>
                    <button>Participate</button>
                </div>
            </div> */}

            <main className="flex-grow container mx-auto space-y-12">
                <div className="pt-36">
                    <div className="px-4 md:px-8">
                        <h1 className="text-3xl font-bold text-left mb-6">Browse Challenges :</h1>
                    </div>
                </div>
                {/*search */}
                <div className="max-w-screen-xl px-4 mx-auto lg:px-12 w-full">
                    <div className="relative shadow-sm sm:rounded-lg">
                        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true"
                                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search"
                                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 "
                                            placeholder="Search" required="" />
                                    </div>
                                </form>
                            </div>
                            {/* Button to create challenge */}
                            {isLoggedIn() && user.role === "company" && (
    <div className="flex items-center mb-4">
        <Link to="/challenges/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Challenge
        </Link>
    </div>
)}


                            {/* Button to view history challenges */}
                            {isLoggedIn() && user.role  === "company" && (
                           <div className="flex items-center">
                           <Link to="/historychallenges" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                             <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
                               <path d="M12 8V12L14.5 14.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                               <path d="M5.60423 5.60423L5.0739 5.0739V5.0739L5.60423 5.60423ZM4.33785 6.87061L3.58786 6.87438C3.58992 7.28564 3.92281 7.61853 4.33408 7.6206L4.33785 6.87061ZM6.87963 7.63339C7.29384 7.63547 7.63131 7.30138 7.63339 6.88717C7.63547 6.47296 7.30138 6.13549 6.88717 6.13341L6.87963 7.63339ZM5.07505 4.32129C5.07296 3.90708 4.7355 3.57298 4.32129 3.57506C3.90708 3.57715 3.57298 3.91462 3.57507 4.32882L5.07505 4.32129ZM3.75 12C3.75 11.5858 3.41421 11.25 3 11.25C2.58579 11.25 2.25 11.5858 2.25 12H3.75ZM16.8755 20.4452C17.2341 20.2378 17.3566 19.779 17.1492 19.4204C16.9418 19.0619 16.483 18.9393 16.1245 19.1468L16.8755 20.4452ZM19.1468 16.1245C18.9393 16.483 19.0619 16.9418 19.4204 17.1492C19.779 17.3566 20.2378 17.2341 20.4452 16.8755L19.1468 16.1245ZM5.14033 5.07126C4.84598 5.36269 4.84361 5.83756 5.13505 6.13191C5.42648 6.42626 5.90134 6.42862 6.19569 6.13719L5.14033 5.07126ZM18.8623 5.13786C15.0421 1.31766 8.86882 1.27898 5.0739 5.0739L6.13456 6.13456C9.33366 2.93545 14.5572 2.95404 17.8017 6.19852L18.8623 5.13786ZM5.0739 5.0739L3.80752 6.34028L4.86818 7.40094L6.13456 6.13456L5.0739 5.0739ZM4.33408 7.6206L6.87963 7.63339L6.88717 6.13341L4.34162 6.12062L4.33408 7.6206ZM5.08784 6.86684L5.07505 4.32129L3.57507 4.32882L3.58786 6.87438L5.08784 6.86684ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM16.1245 19.1468C14.9118 19.8483 13.5039 20.25 12 20.25V21.75C13.7747 21.75 15.4407 21.2752 16.8755 20.4452L16.1245 19.1468ZM20.25 12C20.25 13.5039 19.8483 14.9118 19.1468 16.1245L20.4452 16.8755C21.2752 15.4407 21.75 13.7747 21.75 12H20.25ZM6.19569 6.13719C7.68707 4.66059 9.73646 3.75 12 3.75V2.25C9.32542 2.25 6.90113 3.32791 5.14033 5.07126L6.19569 6.13719Z" fill="#fff"/>
                             </svg>
                             <span className="ml-1">History Challenge</span>
                           </Link>
                         </div>
                         

                          
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div>
                    <div className="flex space-x-4 mb-4">
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Ongoing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('Ongoing')}
                        >
                            Ongoing
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('Completed')}
                        >
                            Completed
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Upcoming' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('Upcoming')}
                        >
                            Upcoming
                        </button>
                    </div>

                    <div>
                   {activeTab === 'Ongoing' && <div><h1 className="text-xl font-bold my-4">Ongoing Challenges</h1> <Challenges status="Ongoing" /></div>}
                        {activeTab === 'Completed' && <div><h1 className="text-xl font-bold my-4">Completed Challenges</h1> <Challenges status="Completed" /></div>}
                        {activeTab === 'Upcoming' && <div><h1 className="text-xl font-bold my-4">Upcoming Challenges</h1> <Challenges status="Upcoming" /></div>}
                    </div>
                </div>

      

                <div className="mx-auto max-w-screen-2xl py-12 px-4 md:px-8">
                    
                    {/* Render other content here */}
                </div>

            </main> 
            <Footer/>
        </div>
    );
}

export default ListChallenges;



{/* <article class="mb-4 p-6 rounded-xl bg-white bg-slate-300 flex flex-col bg-clip-border">
        <div class="flex pb-6 items-center justify-between">
          <div class="flex">
            <a class="inline-block mr-4" href="#">
              <img class="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/men/35.jpg" />
            </a>
            <div class="flex flex-col">
              <div>
                <a class="inline-block text-lg font-bold dark:text-white" href="#">Wade Warren</a>
              </div>
              <div class="text-slate-500 dark:text-slate-300 dark:text-slate-400">
                July 17, 2018
              </div>
            </div>
          </div>
        </div>
        <h2 class="text-3xl font-extrabold dark:text-white">
          Web Design templates Selection
        </h2>
        
        <p class="dark:text-slate-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div class="py-4">
          <a class="inline-flex items-center" href="#">
            <span class="mr-2">
              <svg class="fill-rose-600 dark:fill-rose-400" style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
                <path
                  d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                </path>
              </svg>
            </span>
            <span class="text-lg font-bold">34</span>
          </a>
        </div>
        <div class="relative">
          <input
            class="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
            type="text" placeholder="Write a comment" />
          <span class="flex absolute right-3 top-2/4 -mt-3 items-center">
            <svg class="mr-2" style={{width: '26px', height: '26px'}} viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z">
              </path>
            </svg>
            <svg class="fill-blue-500 dark:fill-slate-50" style={{width: '24px', height: '24px'}} viewBox="0 0 24 24">
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
            </svg>
          </span>
        </div>



        <div class="pt-6">
          <div class="media flex pb-4">
            <a class="mr-4" href="#">
              <img class="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/men/82.jpg" />
            </a>
            <div class="media-body">
              <div>
                <a class="inline-block text-base font-bold mr-2" href="#">Leslie Alexander</a>
                <span class="text-slate-500 dark:text-slate-300">25 minutes ago</span>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur.</p>
              <div class="mt-2 flex items-center">
                <a class="inline-flex items-center py-2 mr-3" href="#">
                  <span class="mr-2">
                    <svg class="fill-rose-600 dark:fill-rose-400" style={{width: '22px', height: '22px'}}
                      viewBox="0 0 24 24">
                      <path
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                      </path>
                    </svg>
                  </span>
                  <span class="text-base font-bold">12</span>
                </a>
                <button class="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  Repply
                </button>
              </div>
            </div>
          </div>
         
          <div class="media flex pb-4">
            <a class="inline-block mr-4" href="#">
              <img class="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/women/76.jpg" />
            </a>
            <div class="media-body">
              <div>
                <a class="inline-block text-base font-bold mr-2" href="#">Tina Mills</a>
                <span class="text-slate-500 dark:text-slate-300">3 minutes ago</span>
              </div>
              <p>Dolor sit ameteiusmod consectetur adipiscing elit.</p>
              <div class="mt-2 flex items-center">
                <a class="inline-flex items-center py-2 mr-3" href="#">
                  <span class="mr-2">
                    <svg class="fill-rose-600 dark:fill-rose-400" style={{width: '22px', height: '22px'}}
                      viewBox="0 0 24 24">
                      <path
                        d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z">
                      </path>
                    </svg>
                  </span>
                  <span class="text-base font-bold">0</span>
                </a>
                <button class="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
                  Repply
                </button>
              </div>
            </div>
          </div>
       
          <div class="w-full">
            <a href="#"
              class="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">Show
              more comments</a>
          </div>
        </div>
      </article> */}