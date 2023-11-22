"use client";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import Link from "next/link";
import { useEffect, useState } from "react";
import ConnectButton from "./connect-button";
import AccountDialog from "./account-dialog";
import { User } from "@/models/User";
import { Logo } from "@/components/logo";
import { MobileMenu } from "./mobile-menu";
export function Menu() {
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    setAccount(user);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-10 p-2 bg-white">
      <Menubar className="rounded-none border-b border-none px-2 lg:px-4">
        <MenubarMenu>
          <div className=" lg:hidden">
            <MobileMenu />
          </div>
          <MenubarTrigger>
            <Logo text="Arttribute Studio" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              {" "}
              <Link href="/" passHref>
                Studio Home
              </Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Link href="/" passHref>
                {" "}
                About Arttribute
              </Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {account ? (
          <>
            <MenubarMenu>
              <MenubarTrigger className="hidden md:block">
                Account
              </MenubarTrigger>
              <MenubarContent forceMount>
                <MenubarLabel inset>Account</MenubarLabel>
                <MenubarSeparator />
                <MenubarRadioGroup value={account.name}>
                  <MenubarRadioItem value={account.name}>
                    {account.name}
                  </MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>
                  <Link href="/buy" passHref className="flex">
                    <div className="mt-0.5 mr-2"> {coinsIcon}</div>

                    {account.credits}
                    <div className="ml-2">
                      {" "}
                      <Link href="/buy" passHref className="font-semibold">
                        Get more
                      </Link>
                    </div>
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <AccountDialog user={account} setAccount={setAccount} />
              </MenubarContent>
            </MenubarMenu>
            <ConnectButton action="Disconnect" setAccount={setAccount} />
          </>
        ) : (
          <ConnectButton action="Connect" setAccount={setAccount} />
        )}
      </Menubar>
    </div>
  );
}

const coinsIcon = (
  <svg
    fill="#000000"
    height="16px"
    width="16px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <g>
      <g>
        <path
          d="M298.667,42.667h-85.333C95.503,42.667,0,138.17,0,256s95.503,213.333,213.333,213.333h85.333
   C416.497,469.333,512,373.83,512,256S416.497,42.667,298.667,42.667z M160.074,418.194C91.894,395.824,42.667,331.668,42.667,256
   S91.894,116.176,160.074,93.806c-0.159,0.136-0.314,0.278-0.472,0.415c-0.858,0.738-1.704,1.488-2.55,2.24
   c-0.5,0.444-1.005,0.883-1.5,1.331c-0.981,0.888-1.947,1.79-2.911,2.695c-0.348,0.327-0.702,0.646-1.047,0.975
   c-1.302,1.239-2.588,2.495-3.858,3.766c-0.289,0.289-0.569,0.586-0.856,0.876c-0.977,0.989-1.95,1.983-2.908,2.991
   c-0.451,0.475-0.892,0.959-1.339,1.439c-0.78,0.836-1.56,1.674-2.326,2.523c-0.489,0.541-0.969,1.091-1.452,1.637
   c-0.711,0.804-1.421,1.61-2.121,2.424c-0.494,0.576-0.981,1.157-1.469,1.738c-0.673,0.801-1.342,1.604-2.003,2.415
   c-0.489,0.6-0.973,1.203-1.456,1.808c-0.647,0.811-1.288,1.626-1.923,2.447c-0.473,0.611-0.944,1.224-1.411,1.84
   c-0.632,0.835-1.255,1.676-1.875,2.521c-0.45,0.614-0.901,1.226-1.345,1.845c-0.627,0.874-1.243,1.756-1.857,2.639
   c-0.417,0.6-0.838,1.198-1.249,1.802c-0.648,0.953-1.282,1.916-1.915,2.88c-0.358,0.546-0.724,1.087-1.077,1.637
   c-0.767,1.192-1.517,2.397-2.261,3.605c-0.204,0.331-0.415,0.657-0.618,0.99c-0.939,1.544-1.859,3.101-2.76,4.671
   c-0.246,0.429-0.482,0.866-0.725,1.297c-0.647,1.147-1.292,2.295-1.919,3.455c-0.323,0.597-0.633,1.201-0.951,1.802
   c-0.531,1.005-1.061,2.01-1.576,3.025c-0.336,0.663-0.663,1.331-0.993,1.998c-0.477,0.965-0.952,1.932-1.416,2.905
   c-0.332,0.697-0.656,1.398-0.98,2.099c-0.443,0.957-0.881,1.917-1.31,2.883c-0.318,0.716-0.632,1.435-0.943,2.155
   c-0.416,0.965-0.825,1.933-1.227,2.905c-0.3,0.725-0.598,1.45-0.89,2.179c-0.396,0.988-0.781,1.981-1.163,2.976
   c-0.276,0.72-0.553,1.439-0.822,2.162c-0.383,1.032-0.752,2.071-1.119,3.111c-0.245,0.694-0.495,1.385-0.733,2.083
   c-0.386,1.131-0.755,2.271-1.123,3.41c-0.198,0.613-0.404,1.223-0.597,1.839c-0.475,1.518-0.929,3.045-1.37,4.578
   c-0.07,0.242-0.147,0.482-0.216,0.725c-0.505,1.778-0.987,3.567-1.447,5.363c-0.14,0.548-0.267,1.101-0.403,1.65
   c-0.31,1.253-0.618,2.506-0.906,3.768c-0.16,0.7-0.306,1.405-0.459,2.108c-0.244,1.121-0.486,2.242-0.713,3.369
   c-0.152,0.759-0.293,1.521-0.437,2.283c-0.205,1.082-0.406,2.165-0.595,3.252c-0.137,0.789-0.265,1.581-0.393,2.374
   c-0.173,1.07-0.34,2.142-0.497,3.217c-0.117,0.804-0.23,1.61-0.338,2.417c-0.145,1.08-0.28,2.162-0.409,3.247
   c-0.095,0.804-0.189,1.608-0.276,2.414c-0.118,1.104-0.224,2.212-0.325,3.321c-0.072,0.792-0.147,1.583-0.211,2.377
   c-0.093,1.155-0.168,2.314-0.243,3.474c-0.048,0.752-0.103,1.503-0.143,2.257c-0.069,1.285-0.116,2.576-0.162,3.868
   c-0.022,0.633-0.055,1.263-0.072,1.897c-0.052,1.929-0.081,3.863-0.081,5.804c0,1.941,0.029,3.875,0.081,5.804
   c0.017,0.634,0.05,1.264,0.072,1.897c0.046,1.291,0.093,2.582,0.162,3.868c0.04,0.755,0.095,1.505,0.143,2.257
   c0.074,1.16,0.15,2.319,0.243,3.474c0.064,0.794,0.139,1.585,0.211,2.377c0.101,1.109,0.207,2.217,0.325,3.321
   c0.086,0.806,0.18,1.61,0.276,2.414c0.129,1.085,0.264,2.167,0.409,3.247c0.108,0.807,0.221,1.612,0.338,2.417
   c0.157,1.075,0.324,2.147,0.497,3.217c0.128,0.792,0.256,1.584,0.393,2.374c0.188,1.088,0.39,2.17,0.595,3.252
   c0.144,0.761,0.285,1.524,0.437,2.283c0.226,1.127,0.469,2.248,0.713,3.369c0.153,0.703,0.299,1.408,0.459,2.108
   c0.288,1.261,0.596,2.515,0.906,3.768c0.136,0.549,0.262,1.103,0.403,1.65c0.46,1.797,0.941,3.585,1.447,5.363
   c0.069,0.243,0.146,0.482,0.216,0.725c0.442,1.532,0.896,3.06,1.37,4.578c0.193,0.616,0.399,1.225,0.597,1.839
   c0.368,1.14,0.737,2.279,1.123,3.41c0.238,0.697,0.488,1.389,0.733,2.083c0.367,1.04,0.736,2.079,1.119,3.111
   c0.269,0.724,0.546,1.443,0.823,2.164c0.381,0.994,0.766,1.986,1.162,2.974c0.292,0.729,0.591,1.455,0.891,2.181
   c0.402,0.972,0.811,1.94,1.227,2.905c0.311,0.72,0.624,1.439,0.943,2.155c0.429,0.965,0.867,1.924,1.31,2.882
   c0.325,0.702,0.649,1.403,0.981,2.101c0.463,0.972,0.937,1.938,1.414,2.902c0.33,0.667,0.657,1.336,0.994,2
   c0.515,1.014,1.045,2.02,1.576,3.024c0.317,0.601,0.628,1.205,0.951,1.802c0.626,1.157,1.269,2.304,1.915,3.448
   c0.245,0.434,0.481,0.873,0.729,1.305c0.901,1.569,1.82,3.126,2.759,4.67c0.202,0.332,0.414,0.658,0.618,0.99
   c0.744,1.208,1.494,2.413,2.261,3.605c0.354,0.55,0.72,1.092,1.079,1.639c0.632,0.962,1.265,1.924,1.912,2.876
   c0.412,0.606,0.833,1.204,1.251,1.805c0.614,0.883,1.229,1.764,1.856,2.637c0.445,0.619,0.896,1.233,1.347,1.847
   c0.619,0.843,1.242,1.684,1.873,2.517c0.467,0.617,0.939,1.23,1.412,1.842c0.635,0.82,1.275,1.635,1.922,2.446
   c0.483,0.605,0.967,1.208,1.456,1.808c0.661,0.81,1.329,1.614,2.002,2.414c0.489,0.582,0.977,1.164,1.472,1.741
   c0.698,0.814,1.407,1.618,2.117,2.421c0.484,0.547,0.965,1.097,1.455,1.639c0.766,0.848,1.544,1.683,2.323,2.519
   c0.448,0.481,0.891,0.967,1.344,1.443c0.953,1.003,1.921,1.992,2.893,2.976c0.292,0.295,0.577,0.598,0.87,0.891
   c1.27,1.271,2.556,2.526,3.857,3.765c0.347,0.33,0.702,0.651,1.051,0.979c0.962,0.904,1.927,1.805,2.906,2.69
   c0.498,0.451,1.006,0.892,1.509,1.339c0.843,0.749,1.687,1.497,2.542,2.232C159.76,417.915,159.914,418.058,160.074,418.194z
    M298.667,426.667C204.401,426.667,128,350.266,128,256S204.401,85.333,298.667,85.333S469.333,161.734,469.333,256
   S392.933,426.667,298.667,426.667z"
        />
      </g>
    </g>
  </svg>
);
