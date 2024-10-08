import React from "react";
import { Link } from "@remix-run/react";

import { Button } from "~/common/button";

export function Logo() {
  return (
    <Button
      as={Link}
      to="/"
      className="font-mono"
      isSquare
      intent="tertiary"
      formSize="lg"
    >
      <svg
        viewBox="0 0 496 101"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "2.2rem" }}
      >
        <g className="fill-primary-500">
          <path d="M33.324,97.001l-0,-55.334l13.676,-0c1.657,-0 3,-1.343 3,-3l0,-35.664c0,-1.656 -1.343,-3.003 -3,-3.003l-44,0c-1.657,0 -3,1.347 -3,3.003l0,93.998c0,1.656 1.343,3 3,3l27.324,-0c1.656,-0 3,-1.344 3,-3" />
          <path d="M66.678,2.996l-0,55.34l-13.684,0c-1.654,0 -2.994,1.34 -2.994,2.994l0,35.677c0,1.653 1.34,2.996 2.994,2.996l44.013,0c1.654,0 2.994,-1.343 2.994,-2.996l-0,-94.011c-0,-1.653 -1.34,-2.993 -2.994,-2.993l-27.336,-0c-1.653,-0 -2.993,1.34 -2.993,2.993" />
        </g>
        <g className="fill-grey-990 dark:fill-grey-10">
          <path d="M170.559,33.372l-7.992,-0l0,-10.177l-11.78,0l-0,10.177l-5.807,-0l-0,8.849l5.807,-0l-0,22.122c-0.055,8.324 5.614,12.444 14.158,12.085c3.042,-0.111 5.199,-0.719 6.388,-1.106l-1.852,-8.766c-0.581,0.11 -1.825,0.387 -2.932,0.387c-2.35,-0 -3.982,-0.885 -3.982,-4.148l0,-20.574l7.992,-0l0,-8.849Z" />
          <path d="M195.411,76.677c12.886,-0 20.906,-8.822 20.906,-21.902c-0,-13.163 -8.02,-21.956 -20.906,-21.956c-12.887,-0 -20.906,8.793 -20.906,21.956c0,13.08 8.019,21.902 20.906,21.902Zm0.055,-9.126c-5.945,0 -8.987,-5.447 -8.987,-12.859c-0,-7.411 3.042,-12.886 8.987,-12.886c5.835,-0 8.877,5.475 8.877,12.886c-0,7.412 -3.042,12.859 -8.877,12.859Z" />
          <path d="M234.228,51.291c0.028,-5.475 3.291,-8.683 8.047,-8.683c4.729,-0 7.577,3.097 7.549,8.296l0,24.943l11.781,0l-0,-27.045c-0,-9.9 -5.807,-15.983 -14.657,-15.983c-6.305,-0 -10.867,3.097 -12.775,8.047l-0.498,-0l-0,-7.494l-11.227,-0l-0,42.475l11.78,0l-0,-24.556Z" />
          <path d="M275.036,91.776c8.766,-0 13.412,-4.48 15.818,-11.338l16.509,-47.066l-12.472,-0l-8.877,31.193l-0.442,-0l-8.794,-31.193l-12.389,-0l15.237,43.692l-0.691,1.797c-1.549,3.983 -4.507,4.176 -8.655,2.904l-2.655,8.794c1.687,0.719 4.424,1.217 7.411,1.217Z" />
          <rect x="311.834" y="19.213" width="11.78" height="56.634" />
          <path d="M350.817,76.677c10.508,-0 17.587,-5.116 19.246,-12.997l-10.895,-0.719c-1.189,3.235 -4.231,4.922 -8.158,4.922c-5.89,0 -9.623,-3.899 -9.623,-10.232l-0,-0.027l28.925,-0l0,-3.236c0,-14.435 -8.738,-21.569 -19.965,-21.569c-12.5,-0 -20.602,8.876 -20.602,21.984c-0,13.467 7.992,21.874 21.072,21.874Zm-9.43,-26.354c0.249,-4.839 3.927,-8.711 9.153,-8.711c5.116,0 8.656,3.651 8.683,8.711l-17.836,0Z" />
          <path d="M399.285,33.372l-8.435,-0l0,-2.849c0,-2.876 1.162,-4.562 4.619,-4.562c1.41,-0 2.848,0.304 3.788,0.608l2.074,-8.849c-1.466,-0.443 -4.701,-1.162 -8.324,-1.162c-7.991,0 -13.937,4.508 -13.937,13.744l0,3.07l-6.001,-0l0,8.849l6.001,-0l0,33.626l11.78,0l0,-33.626l8.435,-0l-0,-8.849Z" />
          <rect x="404.917" y="19.213" width="11.78" height="56.634" />
          <path d="M443.9,76.677c10.508,-0 17.588,-5.116 19.247,-12.997l-10.896,-0.719c-1.189,3.235 -4.231,4.922 -8.157,4.922c-5.891,0 -9.624,-3.899 -9.624,-10.232l0,-0.027l28.926,-0l-0,-3.236c-0,-14.435 -8.739,-21.569 -19.966,-21.569c-12.499,-0 -20.602,8.876 -20.602,21.984c0,13.467 7.992,21.874 21.072,21.874Zm-9.43,-26.354c0.249,-4.839 3.927,-8.711 9.153,-8.711c5.116,0 8.656,3.651 8.684,8.711l-17.837,0Z" />
          <path d="M469.526,75.847l11.781,0l-0,-24.031c-0,-5.226 3.816,-8.821 9.015,-8.821c1.631,0 3.871,0.277 4.977,0.636l0,-10.453c-1.051,-0.249 -2.516,-0.415 -3.705,-0.415c-4.757,0 -8.656,2.766 -10.204,8.02l-0.443,-0l0,-7.411l-11.421,-0l0,42.475Z" />
        </g>
      </svg>
    </Button>
  );
}