import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { articles } from '../data/articles';
import { Menu, X,   LibraryBig } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import styled from '@emotion/styled';
import { ArrowRight } from 'lucide-react';
import { updates } from "../data/updates";

const GlassMorphButton = styled(Link)`
  background: rgba(239, 68, 68, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(239, 68, 68, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: translateY(-2px);
  }
`;

const NewBadge = styled.span`
  background: linear-gradient(225deg, #ef4444 0%, #f97316 100%);
  animation: glow 1.5s ease-in-out infinite alternate;
  font-size: 0.55rem;
  padding: 0.15rem 0.5rem;
  border-radius: 9999pxdata:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaXJjbGUtYXJyb3ctb3V0LXVwLXJpZ2h0LWljb24gbHVjaWRlLWNpcmNsZS1hcnJvdy1vdXQtdXAtcmlnaHQiPjxwYXRoIGQ9Ik0yMiAxMkExMCAxMCAwIDEgMSAxMiAyIi8+PHBhdGggZD0iTTIyIDIgMTIgMTIiLz48cGF0aCBkPSJNMTYgMmg2djYiLz48L3N2Zz4=;

  @keyframes glow {
    from {
      box-shadow: 0 0 5px #ef4444, 0 0 10px #ef4444, 0 0 15px #f97316;
    }
    to {
      box-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #f97316;
    }
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const logoRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const CircleArrowOutUpRight = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-arrow-out-up-right-icon lucide-circle-arrow-out-up-right"><path d="M22 12A10 10 0 1 1 12 2" /><path d="M22 2 12 12" /><path d="M16 2h6v6" /></svg>
  );



    const Projector = (props: React.SVGProps<SVGSVGElement>) => (
<svg fill="#ffffff" height="32px" width="32px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path  d="M488.079,52H23.921C10.731,52,0,62.73,0,75.921V324v128c0,4.418,3.582,8,8,8h88c2.254,0,4.404-0.951,5.92-2.619 c1.516-1.669,2.258-3.899,2.043-6.144c-0.154-1.606-1.777-17.983-5.834-39.237h315.741c-4.057,21.255-5.68,37.631-5.834,39.237 c-0.215,2.244,0.527,4.475,2.043,6.144c1.516,1.668,3.666,2.619,5.92,2.619h88c4.418,0,8-3.582,8-8V324V75.921 C512,62.73,501.269,52,488.079,52z M496,75.921V316h-5.917c-4.221-8.493-14.151-30.1-23.99-63.401 C454.56,213.563,440.882,150.282,440.041,68h48.038C492.447,68,496,71.554,496,75.921z M95.771,259.232 C117.11,218.786,142.42,153.208,143.927,68h39.958c-0.524,19.915-3.015,39.613-7.427,58.944c-0.049,0.133-0.103,0.262-0.146,0.399 c-0.174,0.563-0.277,1.131-0.325,1.696c-3.225,13.678-7.414,27.168-12.565,40.416c-10.955,28.18-26.25,55.352-45.458,80.763 c-18.423,24.371-36.999,42.469-49.825,53.711C76.307,292.642,86.026,277.706,95.771,259.232z M41.472,311.974 c5.193-11.755,12.379-29.905,19.589-54.199C72.977,217.62,87.111,152.533,87.959,68h39.968 c-1.497,81.625-25.639,144.425-45.995,183.175C65.932,281.631,49.785,302.267,41.472,311.974z M197.651,98.509 C214.186,104.657,234.494,108,256,108c21.507,0,41.814-3.343,58.349-9.491c1.048,8.587,2.449,17.121,4.199,25.591 c-19.33,5.175-40.787,7.9-62.548,7.9c-21.762,0-43.218-2.724-62.548-7.9C195.201,115.629,196.603,107.096,197.651,98.509z M312.756,81.933C297.544,88.353,277.157,92,256,92c-21.157,0-41.543-3.647-56.756-10.066c0.319-4.632,0.534-9.277,0.65-13.934 h112.212C312.222,72.656,312.437,77.301,312.756,81.933z M189.827,139.696C210.365,145.139,233.054,148,256,148 c22.945,0,45.635-2.862,66.173-8.305c2.075,7.985,4.475,15.904,7.18,23.751C306.088,169.124,281.438,172,256,172 c-25.436,0-50.087-2.876-73.353-8.555C185.352,155.599,187.752,147.681,189.827,139.696z M335.933,128.686 c-0.058-0.443-0.145-0.887-0.281-1.329c-0.013-0.043-0.032-0.082-0.045-0.125c-4.453-19.424-6.965-39.219-7.492-59.232h39.958 c1.507,85.208,26.817,150.786,48.155,191.232c9.746,18.474,19.465,33.41,27.632,44.696c-12.826-11.242-31.402-29.34-49.825-53.711 c-19.209-25.411-34.503-52.583-45.458-80.763C343.382,156.094,339.168,142.484,335.933,128.686z M384.073,68h39.968 c0.848,84.533,14.982,149.62,26.898,189.775c7.216,24.316,14.409,42.478,19.603,54.231c-8.234-9.599-24.195-29.974-40.162-60.24 C409.884,212.916,385.575,149.93,384.073,68z M23.921,68h48.038c-0.841,82.282-14.52,145.563-26.052,184.599 C36.069,285.9,26.138,307.507,21.917,316H16V75.921C16,71.554,19.553,68,23.921,68z M16,332h10.76c0.005,0,0.01,0.001,0.016,0.001 c0.005,0,0.01-0.001,0.015-0.001h2.214c11.704,28.738,16.906,89.681,18.469,112H16V332z M63.524,444 c-1.398-20.751-6.152-78.486-17.491-112h6.284c13.321,16.592,22.159,45.871,27.711,71.446C80.015,403.629,80,403.813,80,404 c0,1.363,0.343,2.645,0.944,3.768c3.06,14.818,4.999,28.021,6.062,36.232H63.524z M94.775,396 c-5.666-24.71-14.401-52.298-27.396-70.559c11.834-9.328,37.309-31.237,62.995-65.107c19.52-25.739,35.197-53.25,46.654-81.807 C202.074,184.808,228.621,188,256,188c27.381,0,53.928-3.192,78.972-9.473c11.457,28.557,27.134,56.067,46.654,81.807 c25.686,33.87,51.161,55.78,62.995,65.107c-12.995,18.26-21.73,45.849-27.396,70.559H94.775z M431.057,407.766 c0.6-1.123,0.943-2.404,0.943-3.766c0-0.181-0.015-0.358-0.027-0.536c0.084-0.387,0.166-0.771,0.252-1.159 c7.217-32.631,16.675-56.811,27.464-70.305h6.279c-11.339,33.514-16.094,91.249-17.491,112h-23.487 C426.049,435.783,427.988,422.567,431.057,407.766z M464.526,444c1.562-22.316,6.759-83.25,18.47-112H496v112H464.526z"></path> </g></svg>
  );



    const  Podcast = (props: React.SVGProps<SVGSVGElement>) => (
<svg version="1.1" id="svg2" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" sodipodi:docname="New document 1" inkscape:version="0.48.4 r9939" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  height="31px" width="31px" viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200" xml:space="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="layer1" transform="translate(0,147.63782)" inkscape:label="Layer 1" inkscape:groupmode="layer"> <path id="path3002" inkscape:connector-curvature="0" d="M600-129.985c-331.358,0-600,268.642-600,600 c0,254.238,158.227,471.312,381.507,558.643V975.8c-195.6-84.58-332.482-279.088-332.482-505.783 C49.025,165.669,295.654-81.162,600-81.162c304.346,0,550.975,246.831,550.975,551.176c0,226.697-136.882,421.205-332.48,505.785 v52.857C1041.866,941.372,1200,724.319,1200,470.015C1200,138.657,931.358-129.985,600-129.985z M599.798-10.953 c-226.008,0-409.146,183.34-409.146,409.348c0,152.788,83.745,285.819,207.801,356.086v-43.779 c-102.395-66.168-170.275-181.277-170.275-312.307c0-205.298,166.323-371.823,371.62-371.823 c205.298,0,371.823,166.525,371.823,371.823c0,131.03-68.023,246.139-170.479,312.307v43.779 c124.115-70.268,208.002-203.299,208.002-356.086C1009.146,172.386,825.806-10.953,599.798-10.953z M600,121.595 c-135.062,0-244.52,109.456-244.52,244.52c0,68.818,28.502,130.89,74.244,175.318v-57.498 c-23.163-33.464-36.719-74.054-36.719-117.82c0-114.354,92.639-206.994,206.994-206.994c114.354,0,207.195,92.639,207.195,206.994 c0,43.767-13.52,84.355-36.719,117.82v57.297c45.622-44.416,74.042-106.4,74.042-175.117 C844.52,231.051,735.062,121.595,600,121.595z M600,249.101c-64.605,0-117.014,52.408-117.014,117.015 c0,64.605,52.408,116.811,117.014,116.811s117.014-52.207,117.014-116.813C717.014,301.508,664.605,249.101,600,249.101z M600,513.19c-140.271,0-142.031,51.646-142.031,51.646s-0.54,150.783,12.105,229.59c12.645,78.809,65.366,240.283,65.366,240.283 H664.56c0,0,52.741-162.076,65.366-240.889s12.105-228.984,12.105-228.984S740.271,513.19,600,513.19L600,513.19z"></path> </g> </g></svg>
  );

    const  Drama = (props: React.SVGProps<SVGSVGElement>) => (
<svg fill="#ffffff" height="34px" width="34px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 208.204 208.204" xml:space="preserve" stroke="#ffffff" stroke-width="1.665632"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M83.536,208.204c-0.001,0-0.001,0-0.001,0c-4.229,0-8.409-0.68-12.425-2.021c-12.261-4.094-29.286-12.973-40.765-32.028 C9.018,138.758,0.998,86.08,0.92,85.552c-0.136-0.911,0.368-1.796,1.22-2.145c23.929-9.8,48.852-17.602,74.103-23.198 C84.545,29.028,98.881,1.354,99.026,1.074c0.426-0.816,1.358-1.234,2.248-1.018c36.468,8.91,71.785,22.332,104.967,39.892 c0.813,0.431,1.229,1.361,1.004,2.254c-0.129,0.518-13.267,52.157-37.955,85.297c-9.42,12.645-22.084,21.476-37.659,26.263 c-2.078,18.565-10.966,32.37-18.521,41.015C105.653,203.31,94.873,208.204,83.536,208.204z M5.125,86.51 c1.489,8.905,9.77,54.251,28.645,85.58c10.851,18.011,26.983,26.417,38.606,30.298c3.607,1.204,7.361,1.815,11.157,1.815 c0,0,0.002,0,0.002,0c10.184,0,19.865-4.395,26.563-12.059c8.063-9.227,17.728-24.639,17.979-45.664 c0.439-36.894-15.276-79.747-18.566-88.298c-1.94,0.285-3.879,0.585-5.815,0.895c-0.055,0.008-0.109,0.015-0.163,0.019 c-8.373,1.343-16.866,2.955-25.247,4.791c-0.116,0.025-0.232,0.04-0.348,0.045C53.142,69.378,28.656,76.971,5.125,86.51z M130.558,122.328c1.176,8.683,1.727,16.804,1.639,24.197c-0.012,0.937-0.045,1.888-0.102,2.891 c13.995-4.638,25.42-12.805,33.988-24.306c21.861-29.345,34.532-73.652,36.884-82.366c-32.015-16.797-66.013-29.718-101.102-38.422 C98.965,10.132,87.81,33.27,80.645,59.257c6.833-1.443,13.754-2.739,20.639-3.865c0.02-1.677,0.335-3.348,0.932-4.918 c0.08-0.209,0.171-0.413,0.264-0.614l0.074-0.164c0.306-0.681,0.964-1.135,1.709-1.178l21.811-1.267 c0.76-0.042,1.452,0.332,1.834,0.972c2.261,3.791,2.662,8.323,1.1,12.433c-1.817,4.781-6.099,8.204-11.056,9.035 c2.305,6.981,5.05,16.047,7.521,26.2c4.684,1.907,8.723,5.486,12.631,11.175c1.138,1.656,2.166,3.433,3.058,5.28 c5.907,12.261,4.417,21.206,4.351,21.581c-0.144,0.811-0.771,1.451-1.578,1.612c-0.808,0.16-1.631-0.19-2.076-0.883 c-0.046-0.071-4.666-7.221-11.169-12.229C130.644,122.394,130.601,122.361,130.558,122.328z M129.744,116.839 c1.18,0.784,2.315,1.595,3.385,2.419c3.416,2.631,6.309,5.737,8.408,8.28c-0.363-3.385-1.383-8.066-3.979-13.456 c-0.803-1.664-1.729-3.263-2.751-4.752c-2.634-3.834-5.281-6.559-8.141-8.347C127.89,106.426,128.922,111.741,129.744,116.839z M111.529,54.054c0.558,0.177,1.03,0.59,1.258,1.155c0.07,0.174,1.636,4.077,3.882,10.621c3.838-0.4,7.214-2.95,8.601-6.596 c0.984-2.592,0.885-5.418-0.249-7.917l-19.255,1.119c-0.242,0.759-0.394,1.532-0.455,2.315c1.73-0.267,3.461-0.524,5.196-0.771 c0.094-0.013,0.187-0.02,0.279-0.02C111.046,53.944,111.295,53.978,111.529,54.054z M79.613,180.085 c-4.121,0-8.605-0.879-13.709-2.687c-2.26-0.801-4.497-1.793-6.648-2.95c-14.295-7.688-19.11-17.327-19.308-17.734 c-0.36-0.74-0.229-1.626,0.329-2.231c0.558-0.605,1.431-0.806,2.199-0.506c0.096,0.037,9.702,3.75,19.639,4.028 c9.996,0.277,18-1.854,18.075-1.875c0.078-0.021,8.068-2.235,16.538-7.525c8.432-5.266,14.841-13.328,14.904-13.409 c0.512-0.647,1.365-0.914,2.153-0.675c0.788,0.24,1.349,0.938,1.412,1.759c0.035,0.451,0.757,11.202-7.686,25.064 c-1.271,2.086-2.699,4.074-4.243,5.908C95.793,176.127,88.497,180.085,79.613,180.085z M46.787,159.562 c2.7,3.195,7.268,7.546,14.364,11.363c1.972,1.06,4.021,1.969,6.089,2.702c4.668,1.654,8.715,2.458,12.374,2.458 c7.597,0,13.949-3.519,20.595-11.41c1.414-1.678,2.721-3.499,3.886-5.412c4.192-6.882,5.93-12.945,6.644-17.067 c-2.851,2.933-7.019,6.757-11.893,9.801c-8.995,5.618-17.262,7.899-17.61,7.993c-0.327,0.088-8.633,2.31-19.233,2.012 C56.258,161.842,50.729,160.651,46.787,159.562z M40.179,132.538c-0.349,0-0.698-0.091-1.011-0.274 c-3.261-1.91-5.601-4.966-6.589-8.605c-2.07-7.626,2.449-15.515,10.075-17.586c1.231-0.334,2.498-0.504,3.763-0.504 c6.447,0,12.131,4.35,13.823,10.579c0.052,0.191,0.092,0.383,0.13,0.575l0.036,0.174c0.167,0.775-0.14,1.576-0.783,2.041 l-18.271,13.22C41.003,132.411,40.591,132.538,40.179,132.538z M46.416,109.57c-0.912,0-1.825,0.123-2.715,0.364 c-5.497,1.493-8.755,7.18-7.262,12.677c0.601,2.21,1.893,4.122,3.692,5.493l16.033-11.601 C54.729,112.386,50.819,109.57,46.416,109.57z M101.759,115.817c-0.064,0-0.128-0.003-0.192-0.009l-22.448-2.163 c-0.79-0.076-1.46-0.612-1.708-1.366l-0.059-0.173c-0.063-0.182-0.125-0.365-0.176-0.553c-2.071-7.628,2.449-15.517,10.074-17.588 c1.231-0.334,2.497-0.504,3.763-0.504c6.447,0,12.131,4.35,13.823,10.579c0.988,3.64,0.515,7.46-1.332,10.756 C103.147,115.429,102.477,115.817,101.759,115.817z M80.869,109.795l19.699,1.898c0.858-2.092,1.006-4.396,0.406-6.606 c-1.219-4.49-5.316-7.626-9.962-7.626c-0.912,0-1.825,0.123-2.715,0.364C83.035,99.253,79.825,104.524,80.869,109.795z M158.655,86.258c-1.738,0-3.45-0.315-5.089-0.938c-3.578-1.36-6.412-4.032-7.981-7.523c-1.568-3.492-1.683-7.385-0.322-10.963 c1.562-4.11,4.871-7.232,9.079-8.565c0.711-0.225,1.488-0.037,2.017,0.491l15.464,15.433c0.526,0.525,0.718,1.299,0.497,2.009 l-0.048,0.156c-0.066,0.218-0.134,0.436-0.216,0.652C169.952,82.543,164.568,86.258,158.655,86.258z M154.444,62.5 c-2.507,1.115-4.458,3.162-5.443,5.753c-0.98,2.58-0.897,5.386,0.233,7.903s3.174,4.443,5.754,5.423 c1.182,0.45,2.416,0.677,3.667,0.677c4.07,0,7.794-2.442,9.44-6.133L154.444,62.5z"></path> </g></svg>
  );

     const  Theater = (props: React.SVGProps<SVGSVGElement>) => (
<svg xmlns="http://www.w3.org/2000/svg"  height="32px" width="35px" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-theater-icon lucide-theater"><path d="M2 10s3-3 3-8"/><path d="M22 10s-3-3-3-8"/><path d="M10 2c0 4.4-3.6 8-8 8"/><path d="M14 2c0 4.4 3.6 8 8 8"/><path d="M2 10s2 2 2 5"/><path d="M22 10s-2 2-2 5"/><path d="M8 15h8"/><path d="M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/><path d="M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/></svg>);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    if (logoRef.current) {
      anime({
        targets: logoRef.current,
        rotateY: [90, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % updates.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { path: '/', label: 'Hall', icon: Theater,   style: { position: 'relative', top: '-0.25rem' }  },
    { path: '/team', label: 'Crew', icon: Drama },
    { path: '/about', label: 'Origin', icon: Podcast },
    { path: '/projects', label: 'Theater', icon: Projector }
  ];

  const getArticleUrl = (item) => {
    if (item.id) {
      const article = articles.find(a => a.id === item.id);
      if (article) return `/articles/${article.slug}`;
    }
    return item.link || '#';
  };

  return (
    <nav className="fixed w-full z-50 mt-5">
      <div className="max-w-screen-4xl mx-auto px-8 sm:px-10 lg:px-18 relative">
        {/* Background Blur Box */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-x-0 top-0 mx-4 md:mx-3 h-12 md:h-20 rounded-full bg-black/60 backdrop-blur-lg border border-white/15 shadow-lg py-2"
            />
          )}
        </AnimatePresence>

        {/* Foreground: Logo + Links */}
        <div className="relative z-1 flex items-center justify-between h-12 md:h-20 px-0">
          {/* Logo */}
          <Link to="/" className="flex items-center h-full -ml-8 md:ml-0">
            <div ref={logoRef} className="flex items-center h-full">
              <img
                src="https://res.cloudinary.com/dbtj6orw2/image/upload/v1745770604/output-onlinegiftools-ezgif.com-optimize_r0ub1p.gif"
                alt="UH Films Logo"
                className="h-20 sm:h-20 md:h-24 lg:h-32 object-contain transition-all duration-300"
              />
            </div>
          </Link>

          {/* Mobile Text Carousel (left of menu button) */}
          <div className="md:hidden flex-1 min-w-0 mx-2 h-8 overflow-hidden relative">
            <div
              className="absolute top-0 left-0 right-0 flex flex-col transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateY(-${currentIndex * 32}px)`,
              }}
            >
              {updates.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 h-8 flex items-center justify-center"
                >
                  <Link
                    to={getArticleUrl(item)}
                    className="flex items-center max-w-full px-1"
                  >
                    <span className="text-white font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.text}
                    </span>
                    <CircleArrowOutUpRight className="w-3 h-3 text-red-400 flex-shrink-0 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Centered Text Carousel */}
          <div className="hidden md:flex flex-1 justify-center items-center overflow-hidden">
            <div
              className="relative h-8 w-full max-w-lg mx-auto"
              style={{ overflow: 'hidden' }}
            >
              <div
                className="absolute inset-0 flex flex-col items-end transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateY(-${currentIndex * 32}px)`,
                  right: '10%'
                }}
              >
                {updates.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 h-8 flex items-center justify-end w-full"
                  >
                    <Link
                      to={getArticleUrl(item)}
                      className="flex items-center group"
                    >
                      <span className="text-white font-medium text-base lg:text-lg whitespace-nowrap overflow-hidden text-ellipsis mr-2 group-hover:text-red-400 transition-colors">
                        {item.text}
                      </span>
                      <CircleArrowOutUpRight className="w-3 h-3 text-red-400 flex-shrink-0 ml-2" />
                    </Link> 
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 -mr-6.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group flex flex-col items-center text-white transition-colors hover:text-red-400 ${location.pathname === link.path ? 'text-red-500 font-semibold' : ''
                    }`}
                >
                  <Icon className={`w-6 h-6 ${link.className || ""}`} /> 
                  <span
                    className="  text-[12px] mt-1 font-medium  tracking-wider  leading-relaxed   font-sans  text-white  drop-shadow-md  "
                  >
                    {link.label}
                  </span>

                </Link>
              );
            })}
            <GlassMorphButton
              to="/courses"
              className=" group px-3 py-2.5 text-[22px] font-medium text-white text-base rounded-full flex items-center  gap-1.5 relative"
            >
              <LibraryBig className="transition-colors duration-300 group-hover:text-red-400 " />
              <span className="leading-tight text-[22px]">Course's</span>
            </GlassMorphButton>
          </div>


          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none relative z-50"
            aria-label="Menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <div className="relative">
                <Menu className="h-6 w-6" />
                <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-red-500 to-orange-500 transform translate-x-1/2 -translate-y-1/2"></span>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-9 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative mt-24 mx-6 p-8 rounded-xl bg-gray-900/80 border border-gray-800 backdrop-blur-md"
            >
              <div className="flex flex-col space-y-6">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 100,
                        delay: index * 0.05
                      }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center text-xl py-3 text-white hover:text-red-400 transition-colors ${location.pathname === link.path ? 'font-bold text-red-500' : 'font-medium'
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-6 h-6 mr-4" />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    delay: navLinks.length * 0.05
                  }}
                >
                  <Link
                    to="/courses"
                    className="flex items-center gap-3 text-xl py-3 text-white group"
                    onClick={() => setIsOpen(false)}
                  >
                    <NewBadge className="text-xs font-bold px-2 py-1">
                      New
                    </NewBadge>
                    <span className="font-bold group-hover:text-red-400 transition-colors">
                      Course's
                    </span>

                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 